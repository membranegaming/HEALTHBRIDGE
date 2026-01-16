"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Shield,
    Upload,
    FileText,
    Calendar,
    DollarSign,
    Building,
    CheckCircle,
    AlertCircle,
    User,
    Stethoscope,
} from "lucide-react";
import styles from "../../../../dashboard.module.css";

const insurancePolicies = [
    { id: 1, provider: "Star Health Insurance", policyNumber: "STH-2025-789456", coverage: 1000000, available: 755000 },
    { id: 2, provider: "ICICI Lombard", policyNumber: "ICL-2024-123789", coverage: 500000, available: 500000 },
];

export default function NewClaimPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);
    const [claimData, setClaimData] = useState({
        treatmentType: "",
        treatmentDate: "",
        hospitalName: "HealthBridge Medical Center",
        doctorName: "",
        diagnosis: "",
        claimAmount: "",
        description: "",
    });
    const [documents, setDocuments] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
            router.push('/patient/billing/insurance');
        }, 3000);
    };

    if (submitted) {
        return (
            <div className={styles.dashboard} style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <CheckCircle size={56} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Claim Submitted!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Your claim #CLM-2026-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')} has been submitted successfully
                    </p>
                    <div style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Expected Processing Time</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>3-5 Business Days</p>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Redirecting to insurance page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard} style={{ maxWidth: '800px' }}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/patient/billing/insurance" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>File Insurance Claim</h1>
                        <p className={styles.dashboardSubtitle}>Submit a claim for reimbursement</p>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '1rem', marginBottom: '2rem', padding: '1.5rem',
                background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--gray-200)',
            }}>
                {[
                    { num: 1, label: "Select Policy" },
                    { num: 2, label: "Treatment Details" },
                    { num: 3, label: "Upload Documents" },
                ].map((s, i) => (
                    <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: step >= s.num ? 'var(--success)' : 'var(--gray-200)',
                                color: step >= s.num ? 'white' : 'var(--text-muted)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: '0.875rem',
                            }}>
                                {step > s.num ? <CheckCircle size={20} /> : s.num}
                            </div>
                            <span style={{ fontWeight: step === s.num ? 600 : 500, color: step >= s.num ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                {s.label}
                            </span>
                        </div>
                        {i < 2 && (
                            <div style={{ width: '40px', height: '2px', background: step > s.num ? 'var(--success)' : 'var(--gray-200)' }} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Select Policy */}
            {step === 1 && (
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Select Insurance Policy</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {insurancePolicies.map((policy) => (
                                <div
                                    key={policy.id}
                                    onClick={() => setSelectedPolicy(policy.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1.25rem',
                                        padding: '1.25rem', borderRadius: '16px', cursor: 'pointer',
                                        background: selectedPolicy === policy.id ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-tertiary)',
                                        border: `2px solid ${selectedPolicy === policy.id ? 'var(--success)' : 'transparent'}`,
                                    }}
                                >
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '16px',
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Shield size={28} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{policy.provider}</h4>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Policy: {policy.policyNumber}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 700, color: 'var(--success)' }}>₹{(policy.available / 100000).toFixed(1)}L Available</p>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>of ₹{(policy.coverage / 100000).toFixed(0)}L</span>
                                    </div>
                                    {selectedPolicy === policy.id && <CheckCircle size={24} style={{ color: 'var(--success)' }} />}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button className="btn btn-primary" disabled={!selectedPolicy} onClick={() => setStep(2)}>
                                Continue <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Step 2: Treatment Details */}
            {step === 2 && (
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Treatment Details</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                    <Stethoscope size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Treatment Type *
                                </label>
                                <select
                                    value={claimData.treatmentType}
                                    onChange={(e) => setClaimData({ ...claimData, treatmentType: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                >
                                    <option value="">Select Type</option>
                                    <option value="consultation">Doctor Consultation</option>
                                    <option value="hospitalization">Hospitalization</option>
                                    <option value="surgery">Surgery/Procedure</option>
                                    <option value="diagnostic">Diagnostic Tests</option>
                                    <option value="pharmacy">Pharmacy/Medicines</option>
                                    <option value="daycare">Day Care Treatment</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                    <Calendar size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Treatment Date *
                                </label>
                                <input
                                    type="date"
                                    value={claimData.treatmentDate}
                                    onChange={(e) => setClaimData({ ...claimData, treatmentDate: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                    <Building size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Hospital/Clinic Name
                                </label>
                                <input
                                    value={claimData.hospitalName}
                                    onChange={(e) => setClaimData({ ...claimData, hospitalName: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                    <User size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Doctor Name
                                </label>
                                <input
                                    value={claimData.doctorName}
                                    onChange={(e) => setClaimData({ ...claimData, doctorName: e.target.value })}
                                    placeholder="e.g., Dr. Sarah Johnson"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                    Diagnosis *
                                </label>
                                <input
                                    value={claimData.diagnosis}
                                    onChange={(e) => setClaimData({ ...claimData, diagnosis: e.target.value })}
                                    placeholder="e.g., Cardiac Checkup"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                    <DollarSign size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Claim Amount (₹) *
                                </label>
                                <input
                                    type="number"
                                    value={claimData.claimAmount}
                                    onChange={(e) => setClaimData({ ...claimData, claimAmount: e.target.value })}
                                    placeholder="e.g., 25000"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Additional Details</label>
                                <textarea
                                    value={claimData.description}
                                    onChange={(e) => setClaimData({ ...claimData, description: e.target.value })}
                                    placeholder="Provide any additional information about the treatment..."
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)', minHeight: '80px' }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                            <button className="btn btn-primary" onClick={() => setStep(3)}>Continue</button>
                        </div>
                    </div>
                </section>
            )}

            {/* Step 3: Upload Documents */}
            {step === 3 && (
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Upload Documents</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{
                            border: '2px dashed var(--gray-300)', borderRadius: '16px',
                            padding: '2rem', textAlign: 'center', marginBottom: '1.5rem',
                            background: 'var(--bg-tertiary)', cursor: 'pointer',
                        }}>
                            <Upload size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Drop files here or click to upload</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                PDF, JPG, PNG up to 10MB each
                            </p>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Required Documents:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {[
                                    "Hospital/Clinic Invoice",
                                    "Prescription",
                                    "Discharge Summary (if hospitalized)",
                                    "Lab/Test Reports (if applicable)",
                                ].map((doc, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FileText size={16} style={{ color: 'var(--primary-600)' }} />
                                        <span style={{ fontSize: '0.875rem' }}>{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '12px', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <AlertCircle size={20} style={{ color: 'var(--warning)', marginTop: '2px' }} />
                                <div>
                                    <p style={{ fontWeight: 600, color: 'var(--warning)', marginBottom: '0.25rem' }}>Important</p>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        Ensure all documents are clear and readable. Missing documents may delay claim processing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                <CheckCircle size={18} /> Submit Claim
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
