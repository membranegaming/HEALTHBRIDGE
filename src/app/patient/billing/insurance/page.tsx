"use client";

import { useState } from "react";
import Link from "next/link";
import {
    DollarSign,
    CreditCard,
    FileText,
    Shield,
    Download,
    Clock,
    CheckCircle,
    AlertCircle,
    X,
    Plus,
    Search,
    Building,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const insurancePlans = [
    {
        id: 1,
        provider: "Star Health Insurance",
        policyNumber: "STH-2025-789456",
        type: "Family Floater",
        coverage: 1000000,
        used: 245000,
        status: "active",
        validTill: "Dec 31, 2026",
        members: ["John Doe", "Jane Doe", "Jimmy Doe"],
    },
    {
        id: 2,
        provider: "ICICI Lombard",
        policyNumber: "ICL-2024-123789",
        type: "Individual",
        coverage: 500000,
        used: 0,
        status: "active",
        validTill: "Mar 15, 2026",
        members: ["John Doe"],
    },
];

const claims = [
    {
        id: "CLM-2026-001",
        date: "Jan 10, 2026",
        provider: "Star Health Insurance",
        amount: 45000,
        status: "approved",
        treatment: "Cardiac Consultation & Tests",
        hospital: "HealthBridge Medical Center",
    },
    {
        id: "CLM-2025-089",
        date: "Dec 20, 2025",
        provider: "Star Health Insurance",
        amount: 125000,
        status: "approved",
        treatment: "Angioplasty Procedure",
        hospital: "HealthBridge Medical Center",
    },
    {
        id: "CLM-2025-078",
        date: "Nov 15, 2025",
        provider: "Star Health Insurance",
        amount: 15000,
        status: "pending",
        treatment: "General Health Checkup",
        hospital: "HealthBridge Medical Center",
    },
    {
        id: "CLM-2025-065",
        date: "Oct 05, 2025",
        provider: "Star Health Insurance",
        amount: 60000,
        status: "rejected",
        treatment: "Cosmetic Procedure",
        hospital: "External Clinic",
        rejectReason: "Not covered under policy",
    },
];

export default function InsurancePage() {
    const [activeTab, setActiveTab] = useState<"plans" | "claims">("plans");
    const [showAddModal, setShowAddModal] = useState(false);

    const totalCoverage = insurancePlans.reduce((sum, p) => sum + p.coverage, 0);
    const totalUsed = insurancePlans.reduce((sum, p) => sum + p.used, 0);
    const pendingClaims = claims.filter(c => c.status === "pending");

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Insurance</h1>
                    <p className={styles.dashboardSubtitle}>Manage your health insurance and claims</p>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline" onClick={() => setShowAddModal(true)}>
                        <Plus size={18} /> Add Insurance
                    </button>
                    <Link href="/patient/billing/claims/new" className="btn btn-primary">
                        <FileText size={18} /> File Claim
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <Shield size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Coverage</span>
                        <div className={styles.statValue}>₹{(totalCoverage / 100000).toFixed(0)}L</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}>
                        <DollarSign size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Used This Year</span>
                        <div className={styles.statValue}>₹{(totalUsed / 1000).toFixed(0)}K</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Claims Approved</span>
                        <div className={styles.statValue}>{claims.filter(c => c.status === "approved").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Pending Claims</span>
                        <div className={styles.statValue}>{pendingClaims.length}</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => setActiveTab("plans")}
                    className={`btn btn-sm ${activeTab === "plans" ? 'btn-primary' : 'btn-outline'}`}
                >
                    <Shield size={16} /> Insurance Plans
                </button>
                <button
                    onClick={() => setActiveTab("claims")}
                    className={`btn btn-sm ${activeTab === "claims" ? 'btn-primary' : 'btn-outline'}`}
                >
                    <FileText size={16} /> Claims History
                </button>
            </div>

            {activeTab === "plans" && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {insurancePlans.map((plan) => {
                        const usagePercent = (plan.used / plan.coverage) * 100;
                        return (
                            <section key={plan.id} className={styles.card}>
                                <div className={styles.cardBody}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '12px',
                                            background: 'var(--gradient-primary)', color: 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Shield size={28} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <h3 style={{ fontWeight: 700 }}>{plan.provider}</h3>
                                                <span className={`${styles.badge} ${styles.success}`}>{plan.status}</span>
                                            </div>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                                                {plan.type} • Policy: {plan.policyNumber} • Valid till {plan.validTill}
                                            </p>
                                            <div style={{ marginBottom: '0.75rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                        Used ₹{(plan.used / 1000).toFixed(0)}K of ₹{(plan.coverage / 100000).toFixed(0)}L
                                                    </span>
                                                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{usagePercent.toFixed(0)}%</span>
                                                </div>
                                                <div style={{ height: '8px', background: 'var(--gray-200)', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%', width: `${usagePercent}%`,
                                                        background: usagePercent > 80 ? 'var(--error)' : usagePercent > 50 ? 'var(--warning)' : 'var(--success)',
                                                        borderRadius: '4px',
                                                    }} />
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                                                {plan.members.map((member, i) => (
                                                    <span key={i} style={{
                                                        padding: '0.25rem 0.625rem', background: 'var(--bg-tertiary)',
                                                        borderRadius: '20px', fontSize: '0.75rem',
                                                    }}>{member}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <button className="btn btn-sm btn-outline"><Download size={14} /> Card</button>
                                            <button className="btn btn-sm btn-outline">Details</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}

            {activeTab === "claims" && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {claims.map((claim) => (
                        <section key={claim.id} className={styles.card}>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: claim.status === 'approved' ? 'rgba(34, 197, 94, 0.1)' :
                                            claim.status === 'pending' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: claim.status === 'approved' ? 'var(--success)' :
                                            claim.status === 'pending' ? 'var(--warning)' : 'var(--error)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {claim.status === 'approved' ? <CheckCircle size={24} /> :
                                            claim.status === 'pending' ? <Clock size={24} /> : <X size={24} />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <h4 style={{ fontWeight: 600 }}>{claim.treatment}</h4>
                                            <span className={`${styles.badge} ${claim.status === 'approved' ? styles.success :
                                                    claim.status === 'pending' ? styles.warning : styles.error
                                                }`}>
                                                {claim.status}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                            {claim.id} • {claim.date} • {claim.provider}
                                        </p>
                                        {claim.rejectReason && (
                                            <p style={{ fontSize: '0.8125rem', color: 'var(--error)', marginTop: '0.25rem' }}>
                                                Reason: {claim.rejectReason}
                                            </p>
                                        )}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                                            ₹{claim.amount.toLocaleString()}
                                        </p>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{claim.hospital}</span>
                                    </div>
                                    <button className="btn btn-sm btn-outline"><Download size={14} /></button>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            )}

            {/* Add Insurance Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }} onClick={() => setShowAddModal(false)}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '20px',
                        padding: '2rem', maxWidth: '500px', width: '90%',
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Add Insurance Policy</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Insurance Provider</label>
                                <input placeholder="e.g., Star Health Insurance" style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '10px',
                                    border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)',
                                }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Policy Number</label>
                                <input placeholder="e.g., STH-2025-123456" style={{
                                    width: '100%', padding: '0.75rem', borderRadius: '10px',
                                    border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)',
                                }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Coverage Amount</label>
                                    <input type="number" placeholder="e.g., 1000000" style={{
                                        width: '100%', padding: '0.75rem', borderRadius: '10px',
                                        border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)',
                                    }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Valid Till</label>
                                    <input type="date" style={{
                                        width: '100%', padding: '0.75rem', borderRadius: '10px',
                                        border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)',
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>
                                <Plus size={16} /> Add Policy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
