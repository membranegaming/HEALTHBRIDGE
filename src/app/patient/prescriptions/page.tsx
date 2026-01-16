"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Search,
    Download,
    Eye,
    Calendar,
    User,
    Pill,
    Filter,
    Printer,
    RefreshCw,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const prescriptions = [
    {
        id: "RX-2026-001",
        doctor: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        date: "Jan 15, 2026",
        diagnosis: "Hypertension",
        medicines: [
            { name: "Amlodipine 5mg", dosage: "Once daily", duration: "30 days" },
            { name: "Metoprolol 25mg", dosage: "Twice daily", duration: "30 days" },
        ],
        status: "active",
        refillsLeft: 2,
    },
    {
        id: "RX-2026-002",
        doctor: "Dr. Michael Chen",
        specialty: "General Physician",
        date: "Jan 10, 2026",
        diagnosis: "Common Cold, Fever",
        medicines: [
            { name: "Paracetamol 500mg", dosage: "As needed", duration: "5 days" },
            { name: "Cetirizine 10mg", dosage: "Once daily", duration: "7 days" },
        ],
        status: "completed",
        refillsLeft: 0,
    },
    {
        id: "RX-2025-089",
        doctor: "Dr. Emily Davis",
        specialty: "Dermatologist",
        date: "Dec 28, 2025",
        diagnosis: "Eczema",
        medicines: [
            { name: "Hydrocortisone Cream 1%", dosage: "Apply twice daily", duration: "14 days" },
            { name: "Cetaphil Moisturizer", dosage: "Apply as needed", duration: "30 days" },
        ],
        status: "active",
        refillsLeft: 1,
    },
    {
        id: "RX-2025-078",
        doctor: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        date: "Dec 15, 2025",
        diagnosis: "Cholesterol Management",
        medicines: [
            { name: "Atorvastatin 10mg", dosage: "Once daily at night", duration: "90 days" },
        ],
        status: "active",
        refillsLeft: 3,
    },
];

export default function PrescriptionsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedPrescription, setSelectedPrescription] = useState<typeof prescriptions[0] | null>(null);

    const filteredPrescriptions = prescriptions.filter((rx) => {
        const matchesSearch = rx.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rx.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || rx.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>My Prescriptions</h1>
                    <p className={styles.dashboardSubtitle}>{prescriptions.length} prescriptions</p>
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
                        <RefreshCw size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Refills Available</span>
                        <div className={styles.statValue}>{prescriptions.reduce((sum, p) => sum + p.refillsLeft, 0)}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.accent}`}>
                        <Calendar size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>This Month</span>
                        <div className={styles.statValue}>2</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by doctor, diagnosis, or Rx ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '0.875rem 1rem 0.875rem 3rem',
                            background: 'var(--bg-secondary)', border: '1px solid var(--gray-200)',
                            borderRadius: '12px', fontSize: '0.9375rem',
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {["all", "active", "completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-outline'}`}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Prescriptions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredPrescriptions.map((rx) => (
                    <div key={rx.id} className={styles.card} style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                background: 'var(--gradient-secondary)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, flexShrink: 0,
                            }}>
                                {rx.doctor.split(' ').slice(1, 3).map(n => n[0]).join('')}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontWeight: 700 }}>{rx.doctor}</h3>
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--primary-600)' }}>{rx.id}</span>
                                    <span className={`${styles.badge} ${rx.status === 'active' ? styles.success : styles.outline}`}>
                                        {rx.status}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                                    {rx.specialty} • {rx.diagnosis} • {rx.date}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {rx.medicines.map((med, i) => (
                                        <span key={i} style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                                            padding: '0.375rem 0.75rem', background: 'var(--primary-50)',
                                            borderRadius: '20px', fontSize: '0.8125rem', color: 'var(--primary-700)',
                                        }}>
                                            <Pill size={12} /> {med.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                {rx.refillsLeft > 0 && (
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--success)' }}>
                                        {rx.refillsLeft} refill{rx.refillsLeft > 1 ? 's' : ''} left
                                    </span>
                                )}
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-sm btn-outline" onClick={() => setSelectedPrescription(rx)}>
                                        <Eye size={16} /> View
                                    </button>
                                    <button className="btn btn-sm btn-outline"><Download size={16} /></button>
                                    <button className="btn btn-sm btn-outline"><Printer size={16} /></button>
                                </div>
                                {rx.status === 'active' && rx.refillsLeft > 0 && (
                                    <Link href="/patient/medicines/cart" className="btn btn-sm btn-primary">
                                        <RefreshCw size={14} /> Order Refill
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Prescription Detail Modal */}
            {selectedPrescription && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }} onClick={() => setSelectedPrescription(null)}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '20px',
                        padding: '2rem', maxWidth: '500px', width: '90%',
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                            Prescription Details
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rx ID</span>
                                <p style={{ fontWeight: 600 }}>{selectedPrescription.id}</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date</span>
                                <p style={{ fontWeight: 600 }}>{selectedPrescription.date}</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Doctor</span>
                                <p style={{ fontWeight: 600 }}>{selectedPrescription.doctor}</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Diagnosis</span>
                                <p style={{ fontWeight: 600 }}>{selectedPrescription.diagnosis}</p>
                            </div>
                        </div>
                        <h4 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Medicines</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {selectedPrescription.medicines.map((med, i) => (
                                <div key={i} style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                    <p style={{ fontWeight: 600 }}>{med.name}</p>
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                        {med.dosage} • {med.duration}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setSelectedPrescription(null)}>
                                Close
                            </button>
                            <button className="btn btn-primary" style={{ flex: 1 }}>
                                <Download size={16} /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
