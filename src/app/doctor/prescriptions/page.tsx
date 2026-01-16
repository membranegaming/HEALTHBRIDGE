"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Plus,
    Search,
    Download,
    Eye,
    Calendar,
    User,
    Pill,
    Edit,
    Copy,
    Printer,
    Filter,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const prescriptions = [
    {
        id: "RX-2026-001",
        patient: "John Doe",
        patientId: 1,
        date: "Jan 15, 2026",
        diagnosis: "Hypertension",
        medicines: [
            { name: "Amlodipine 5mg", dosage: "Once daily", duration: "30 days" },
            { name: "Metoprolol 25mg", dosage: "Twice daily", duration: "30 days" },
        ],
        status: "active",
        followUp: "Feb 15, 2026",
    },
    {
        id: "RX-2026-002",
        patient: "Mary Smith",
        patientId: 2,
        date: "Jan 12, 2026",
        diagnosis: "Palpitations, Anxiety",
        medicines: [
            { name: "Propranolol 10mg", dosage: "As needed", duration: "30 days" },
        ],
        status: "active",
        followUp: "Jan 26, 2026",
    },
    {
        id: "RX-2025-089",
        patient: "Robert Brown",
        patientId: 3,
        date: "Jan 10, 2026",
        diagnosis: "Arrhythmia",
        medicines: [
            { name: "Amiodarone 200mg", dosage: "Once daily", duration: "60 days" },
            { name: "Warfarin 5mg", dosage: "Once daily", duration: "60 days" },
            { name: "Aspirin 75mg", dosage: "Once daily", duration: "60 days" },
        ],
        status: "active",
        followUp: "Mar 10, 2026",
    },
    {
        id: "RX-2025-088",
        patient: "Emily Davis",
        patientId: 4,
        date: "Jan 8, 2026",
        diagnosis: "Chest Pain - Non-cardiac",
        medicines: [
            { name: "Pantoprazole 40mg", dosage: "Before breakfast", duration: "14 days" },
            { name: "Domperidone 10mg", dosage: "Before meals", duration: "14 days" },
        ],
        status: "completed",
    },
    {
        id: "RX-2025-085",
        patient: "David Wilson",
        patientId: 5,
        date: "Dec 28, 2025",
        diagnosis: "Heart Failure Class II",
        medicines: [
            { name: "Furosemide 40mg", dosage: "Once daily", duration: "30 days" },
            { name: "Ramipril 5mg", dosage: "Once daily", duration: "30 days" },
            { name: "Spironolactone 25mg", dosage: "Once daily", duration: "30 days" },
            { name: "Carvedilol 6.25mg", dosage: "Twice daily", duration: "30 days" },
        ],
        status: "active",
        followUp: "Jan 28, 2026",
    },
];

export default function PrescriptionsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredPrescriptions = prescriptions.filter((rx) => {
        const matchesSearch = rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rx.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || rx.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Prescriptions</h1>
                    <p className={styles.dashboardSubtitle}>Manage and create prescriptions</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/doctor/prescriptions/new" className="btn btn-secondary">
                        <Plus size={20} />
                        New Prescription
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <FileText size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Prescriptions</span>
                        <div className={styles.statValue}>{prescriptions.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <Pill size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Active</span>
                        <div className={styles.statValue}>{prescriptions.filter(p => p.status === "active").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}>
                        <Calendar size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>This Week</span>
                        <div className={styles.statValue}>3</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <User size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Pending Follow-ups</span>
                        <div className={styles.statValue}>2</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by patient, diagnosis, or Rx ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem 0.875rem 3rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--gray-200)',
                            borderRadius: '12px',
                            fontSize: '0.9375rem',
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {["all", "active", "completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`btn btn-sm ${statusFilter === status ? 'btn-secondary' : 'btn-outline'}`}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Prescriptions List */}
            <section className={styles.card}>
                <div className={styles.cardBody}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredPrescriptions.map((rx) => (
                            <div key={rx.id} style={{
                                padding: '1.25rem',
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--gray-200)',
                                borderRadius: '16px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: 'var(--gradient-primary)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                        }}>
                                            {rx.patient.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{rx.patient}</h4>
                                                <span style={{ fontSize: '0.8125rem', color: 'var(--primary-600)', fontWeight: 500 }}>{rx.id}</span>
                                                <span className={`${styles.badge} ${rx.status === 'active' ? styles.success : styles.outline}`}>
                                                    {rx.status}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                <span style={{ fontWeight: 500 }}>Diagnosis:</span> {rx.diagnosis}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{rx.date}</span>
                                        <button className="btn btn-ghost btn-sm"><Eye size={18} /></button>
                                        <button className="btn btn-ghost btn-sm"><Edit size={18} /></button>
                                        <button className="btn btn-ghost btn-sm"><Printer size={18} /></button>
                                        <button className="btn btn-ghost btn-sm"><Copy size={18} /></button>
                                    </div>
                                </div>

                                {/* Medicines */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: '0.75rem',
                                    marginBottom: rx.followUp ? '1rem' : 0,
                                }}>
                                    {rx.medicines.map((med, i) => (
                                        <div key={i} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem',
                                            background: 'var(--bg-secondary)',
                                            borderRadius: '10px',
                                        }}>
                                            <Pill size={18} style={{ color: 'var(--secondary-600)' }} />
                                            <div>
                                                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{med.name}</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                    {med.dosage} • {med.duration}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {rx.followUp && (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid var(--gray-200)',
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                    }}>
                                        <Calendar size={16} />
                                        <span>Follow-up:</span>
                                        <span style={{ fontWeight: 600 }}>{rx.followUp}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
