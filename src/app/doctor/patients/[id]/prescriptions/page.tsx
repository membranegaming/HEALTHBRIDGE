"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    FileText,
    Download,
    Printer,
    Calendar,
    User,
    Pill,
    Activity,
    Heart,
    Phone,
} from "lucide-react";
import styles from "../../../../dashboard.module.css";

const patientPrescriptions = [
    {
        id: "RX-2026-001",
        date: "Jan 15, 2026",
        diagnosis: "Hypertension, Diabetes Type 2",
        medicines: [
            { name: "Amlodipine 5mg", dosage: "Once daily morning", duration: "30 days" },
            { name: "Metformin 500mg", dosage: "Twice daily with meals", duration: "30 days" },
            { name: "Metoprolol 25mg", dosage: "Once daily", duration: "30 days" },
        ],
        followUp: "Feb 15, 2026",
        notes: "Monitor blood pressure daily. Maintain low sodium diet.",
    },
    {
        id: "RX-2025-089",
        date: "Dec 28, 2025",
        diagnosis: "Routine Follow-up",
        medicines: [
            { name: "Amlodipine 5mg", dosage: "Once daily morning", duration: "30 days" },
            { name: "Metformin 500mg", dosage: "Twice daily with meals", duration: "30 days" },
        ],
        followUp: "Jan 28, 2026",
        notes: "Blood sugar levels improving. Continue current regimen.",
    },
    {
        id: "RX-2025-078",
        date: "Nov 15, 2025",
        diagnosis: "Hypertension - Adjustment",
        medicines: [
            { name: "Amlodipine 5mg", dosage: "Once daily morning", duration: "30 days" },
            { name: "Losartan 50mg", dosage: "Once daily", duration: "30 days" },
        ],
        followUp: "Dec 15, 2025",
        notes: "Switching from Losartan to Metoprolol due to dry cough.",
    },
];

const patientInfo = {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "john.doe@email.com",
    bloodGroup: "O+",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    lastVisit: "Jan 15, 2026",
    totalVisits: 12,
};

export default function PatientPrescriptionsPage() {
    const params = useParams();

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/doctor/patients" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>Patient Records</h1>
                        <p className={styles.dashboardSubtitle}>{patientInfo.name}</p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <Link href={`/doctor/consultation/${params.id}`} className="btn btn-secondary">
                        <FileText size={18} /> New Consultation
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
                {/* Patient Info */}
                <div>
                    <section className={styles.card}>
                        <div className={styles.cardBody}>
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '50%',
                                    background: 'var(--gradient-primary)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1rem', fontWeight: 700, fontSize: '1.75rem',
                                }}>
                                    {patientInfo.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{patientInfo.name}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    {patientInfo.age} yrs • {patientInfo.gender} • {patientInfo.bloodGroup}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                    <Phone size={18} style={{ color: 'var(--primary-600)' }} />
                                    <span style={{ fontSize: '0.875rem' }}>{patientInfo.phone}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                    <Calendar size={18} style={{ color: 'var(--secondary-600)' }} />
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Last Visit</span>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{patientInfo.lastVisit}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                    <Activity size={18} style={{ color: 'var(--success)' }} />
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Visits</span>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{patientInfo.totalVisits}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medical Conditions</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                                    {patientInfo.conditions.map((c, i) => (
                                        <span key={i} style={{
                                            padding: '0.25rem 0.625rem', background: 'var(--primary-50)',
                                            borderRadius: '20px', fontSize: '0.75rem', color: 'var(--primary-700)',
                                        }}>{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Prescriptions */}
                <div>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Prescription History</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {patientPrescriptions.map((rx) => (
                            <section key={rx.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--primary-600)' }}>{rx.id}</span>
                                        <span style={{ color: 'var(--text-muted)' }}>•</span>
                                        <span>{rx.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-sm btn-outline"><Download size={14} /></button>
                                        <button className="btn btn-sm btn-outline"><Printer size={14} /></button>
                                    </div>
                                </div>
                                <div className={styles.cardBody}>
                                    <p style={{ marginBottom: '1rem' }}><strong>Diagnosis:</strong> {rx.diagnosis}</p>

                                    <h4 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>Medicines</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                                        {rx.medicines.map((med, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                padding: '0.625rem', background: 'var(--bg-tertiary)', borderRadius: '8px',
                                            }}>
                                                <Pill size={16} style={{ color: 'var(--secondary-600)' }} />
                                                <div style={{ flex: 1 }}>
                                                    <span style={{ fontWeight: 500 }}>{med.name}</span>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}> — {med.dosage}</span>
                                                </div>
                                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{med.duration}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {rx.notes && (
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                            <strong>Notes:</strong> {rx.notes}
                                        </p>
                                    )}

                                    {rx.followUp && (
                                        <p style={{ fontSize: '0.875rem' }}>
                                            <strong>Follow-up:</strong> <span style={{ color: 'var(--primary-600)' }}>{rx.followUp}</span>
                                        </p>
                                    )}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
