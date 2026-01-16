"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    User,
    FileText,
    Pill,
    Save,
    Plus,
    Trash2,
    Clock,
    Activity,
    AlertCircle,
    CheckCircle,
    Stethoscope,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const patientData = {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    vitals: { bp: "138/88", hr: 78, temp: 98.6, weight: 82, height: 178 },
    lastVisit: "Dec 28, 2025",
};

export default function ConsultationPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"notes" | "prescription" | "history">("notes");
    const [notes, setNotes] = useState({
        chiefComplaint: "",
        symptoms: "",
        examination: "",
        diagnosis: "",
        advice: "",
    });
    const [medicines, setMedicines] = useState([
        { id: 1, name: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ]);
    const [followUp, setFollowUp] = useState("");

    const addMedicine = () => {
        setMedicines([...medicines, { id: Date.now(), name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
    };

    const removeMedicine = (id: number) => {
        setMedicines(medicines.filter(m => m.id !== id));
    };

    const updateMedicine = (id: number, field: string, value: string) => {
        setMedicines(medicines.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const handleComplete = () => {
        // Save and complete consultation
        router.push('/doctor/queue');
    };

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/doctor/queue" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>Consultation</h1>
                        <p className={styles.dashboardSubtitle}>Patient #{params.id}</p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline"><Save size={18} /> Save Draft</button>
                    <button className="btn btn-secondary" onClick={handleComplete}>
                        <CheckCircle size={18} /> Complete Consultation
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
                {/* Patient Info Sidebar */}
                <div>
                    <section className={styles.card} style={{ marginBottom: '1rem' }}>
                        <div className={styles.cardBody}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '50%',
                                    background: 'var(--gradient-secondary)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 0.75rem', fontWeight: 700, fontSize: '1.5rem',
                                }}>
                                    JD
                                </div>
                                <h3 style={{ fontWeight: 700 }}>{patientData.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                    {patientData.age} yrs • {patientData.gender} • {patientData.bloodGroup}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Phone</span>
                                    <span>{patientData.phone}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Last Visit</span>
                                    <span>{patientData.lastVisit}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.card} style={{ marginBottom: '1rem' }}>
                        <div className={styles.cardHeader}>
                            <h4 className={styles.cardTitle} style={{ fontSize: '0.9375rem' }}>Vitals</h4>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                                {[
                                    { label: "BP", value: patientData.vitals.bp, unit: "mmHg" },
                                    { label: "Heart Rate", value: patientData.vitals.hr, unit: "bpm" },
                                    { label: "Temperature", value: patientData.vitals.temp, unit: "°F" },
                                    { label: "Weight", value: patientData.vitals.weight, unit: "kg" },
                                ].map((vital, i) => (
                                    <div key={i} style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'center' }}>
                                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{vital.label}</p>
                                        <p style={{ fontWeight: 700 }}>{vital.value}<span style={{ fontSize: '0.6875rem', fontWeight: 400 }}> {vital.unit}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {patientData.allergies.length > 0 && (
                        <section className={styles.card} style={{ marginBottom: '1rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)', marginBottom: '0.5rem' }}>
                                    <AlertCircle size={16} />
                                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Allergies</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                                    {patientData.allergies.map((a, i) => (
                                        <span key={i} style={{
                                            padding: '0.25rem 0.5rem', background: 'rgba(239, 68, 68, 0.1)',
                                            borderRadius: '6px', fontSize: '0.75rem', color: 'var(--error)',
                                        }}>{a}</span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h4 className={styles.cardTitle} style={{ fontSize: '0.9375rem' }}>Medical History</h4>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                                {patientData.conditions.map((c, i) => (
                                    <span key={i} style={{
                                        padding: '0.25rem 0.5rem', background: 'var(--primary-50)',
                                        borderRadius: '6px', fontSize: '0.75rem', color: 'var(--primary-700)',
                                    }}>{c}</span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Main Content */}
                <div>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        {[
                            { id: "notes", label: "Clinical Notes", icon: FileText },
                            { id: "prescription", label: "Prescription", icon: Pill },
                            { id: "history", label: "Visit History", icon: Clock },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`btn btn-sm ${activeTab === tab.id ? 'btn-secondary' : 'btn-outline'}`}
                            >
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === "notes" && (
                        <section className={styles.card}>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        { key: "chiefComplaint", label: "Chief Complaint", placeholder: "Patient's main concern..." },
                                        { key: "symptoms", label: "Symptoms", placeholder: "Describe symptoms, duration, severity..." },
                                        { key: "examination", label: "Physical Examination", placeholder: "Findings from examination..." },
                                        { key: "diagnosis", label: "Diagnosis", placeholder: "Provisional/Confirmed diagnosis..." },
                                        { key: "advice", label: "Advice / Treatment Plan", placeholder: "Treatment notes, lifestyle advice..." },
                                    ].map((field) => (
                                        <div key={field.key}>
                                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>{field.label}</label>
                                            <textarea
                                                value={notes[field.key as keyof typeof notes]}
                                                onChange={(e) => setNotes({ ...notes, [field.key]: e.target.value })}
                                                placeholder={field.placeholder}
                                                style={{
                                                    width: '100%', padding: '0.875rem', minHeight: '80px', resize: 'vertical',
                                                    background: 'var(--bg-tertiary)', border: '1px solid var(--gray-200)', borderRadius: '10px',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === "prescription" && (
                        <section className={styles.card}>
                            <div className={styles.cardBody}>
                                <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Medicines</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {medicines.map((med, idx) => (
                                        <div key={med.id} style={{
                                            padding: '1rem', background: 'var(--bg-tertiary)',
                                            borderRadius: '12px', border: '1px solid var(--gray-200)',
                                        }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                                <input
                                                    placeholder="Medicine name"
                                                    value={med.name}
                                                    onChange={(e) => updateMedicine(med.id, 'name', e.target.value)}
                                                    style={{ padding: '0.625rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                                />
                                                <input
                                                    placeholder="Dosage"
                                                    value={med.dosage}
                                                    onChange={(e) => updateMedicine(med.id, 'dosage', e.target.value)}
                                                    style={{ padding: '0.625rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                                />
                                                <select
                                                    value={med.frequency}
                                                    onChange={(e) => updateMedicine(med.id, 'frequency', e.target.value)}
                                                    style={{ padding: '0.625rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                                >
                                                    <option value="">Frequency</option>
                                                    <option value="once">Once daily</option>
                                                    <option value="twice">Twice daily</option>
                                                    <option value="thrice">Three times daily</option>
                                                    <option value="asneeded">As needed</option>
                                                </select>
                                                <input
                                                    placeholder="Duration"
                                                    value={med.duration}
                                                    onChange={(e) => updateMedicine(med.id, 'duration', e.target.value)}
                                                    style={{ padding: '0.625rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                <input
                                                    placeholder="Special instructions (e.g., Take after meals)"
                                                    value={med.instructions}
                                                    onChange={(e) => updateMedicine(med.id, 'instructions', e.target.value)}
                                                    style={{ flex: 1, padding: '0.625rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }}
                                                />
                                                {medicines.length > 1 && (
                                                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }} onClick={() => removeMedicine(med.id)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={addMedicine}>
                                    <Plus size={16} /> Add Medicine
                                </button>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Follow-up Date</label>
                                    <input
                                        type="date"
                                        value={followUp}
                                        onChange={(e) => setFollowUp(e.target.value)}
                                        style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', width: '200px' }}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === "history" && (
                        <section className={styles.card}>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { date: "Dec 28, 2025", doctor: "Dr. Sarah Johnson", diagnosis: "Hypertension follow-up", prescription: "Amlodipine 5mg" },
                                        { date: "Nov 15, 2025", doctor: "Dr. Sarah Johnson", diagnosis: "Routine checkup", prescription: "Blood tests advised" },
                                        { date: "Sep 10, 2025", doctor: "Dr. Michael Chen", diagnosis: "Common cold", prescription: "Paracetamol, Cetirizine" },
                                    ].map((visit, i) => (
                                        <div key={i} style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: 600 }}>{visit.date}</span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{visit.doctor}</span>
                                            </div>
                                            <p style={{ marginBottom: '0.25rem' }}><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}><strong>Rx:</strong> {visit.prescription}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
