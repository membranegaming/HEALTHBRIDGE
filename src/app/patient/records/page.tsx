"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Download,
    Eye,
    Calendar,
    User,
    Search,
    Filter,
    Upload,
    FolderOpen,
    Activity,
    Heart,
    Droplets,
    TestTube,
    Image as ImageIcon,
    File,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const healthRecords = [
    {
        id: 1,
        type: "Lab Report",
        name: "Complete Blood Count (CBC)",
        date: "Jan 12, 2026",
        doctor: "Dr. Sarah Johnson",
        category: "blood-test",
        status: "normal",
        icon: Droplets,
    },
    {
        id: 2,
        type: "Prescription",
        name: "Cardiac Medication",
        date: "Jan 10, 2026",
        doctor: "Dr. Sarah Johnson",
        category: "prescription",
        status: "active",
        icon: FileText,
    },
    {
        id: 3,
        type: "Imaging",
        name: "Chest X-Ray",
        date: "Jan 5, 2026",
        doctor: "Dr. Michael Chen",
        category: "imaging",
        status: "normal",
        icon: ImageIcon,
    },
    {
        id: 4,
        type: "Lab Report",
        name: "Lipid Profile",
        date: "Dec 28, 2025",
        doctor: "Dr. Sarah Johnson",
        category: "blood-test",
        status: "attention",
        icon: TestTube,
    },
    {
        id: 5,
        type: "ECG Report",
        name: "Electrocardiogram",
        date: "Dec 20, 2025",
        doctor: "Dr. Sarah Johnson",
        category: "cardiac",
        status: "normal",
        icon: Activity,
    },
    {
        id: 6,
        type: "Consultation Note",
        name: "Follow-up Visit",
        date: "Dec 15, 2025",
        doctor: "Dr. Sarah Johnson",
        category: "consultation",
        status: "completed",
        icon: File,
    },
];

const vitalHistory = [
    { date: "Jan 15", bp: "120/80", hr: 72, temp: 98.4, spo2: 98 },
    { date: "Jan 10", bp: "118/78", hr: 70, temp: 98.6, spo2: 99 },
    { date: "Jan 5", bp: "122/82", hr: 74, temp: 98.2, spo2: 98 },
    { date: "Dec 28", bp: "125/84", hr: 76, temp: 98.4, spo2: 97 },
    { date: "Dec 20", bp: "120/80", hr: 71, temp: 98.6, spo2: 98 },
];

const categories = [
    { id: "all", label: "All Records", count: 6 },
    { id: "blood-test", label: "Blood Tests", count: 2 },
    { id: "imaging", label: "Imaging", count: 1 },
    { id: "prescription", label: "Prescriptions", count: 1 },
    { id: "cardiac", label: "Cardiac", count: 1 },
    { id: "consultation", label: "Consultations", count: 1 },
];

export default function RecordsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredRecords = healthRecords.filter((record) => {
        const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || record.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Health Records</h1>
                    <p className={styles.dashboardSubtitle}>Access your complete medical history</p>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline">
                        <Upload size={20} />
                        Upload Record
                    </button>
                    <button className="btn btn-primary">
                        <Download size={20} />
                        Download All
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <FileText size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Records</span>
                        <div className={styles.statValue}>{healthRecords.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}>
                        <TestTube size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Lab Reports</span>
                        <div className={styles.statValue}>2</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.accent}`}>
                        <ImageIcon size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Imaging</span>
                        <div className={styles.statValue}>1</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <Activity size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Last Updated</span>
                        <div className={styles.statValue}>Today</div>
                    </div>
                </div>
            </div>

            {/* Vital Signs History */}
            <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.cardHeader}>
                    <div>
                        <h3 className={styles.cardTitle}>Vital Signs History</h3>
                        <p className={styles.cardSubtitle}>Recent measurements</p>
                    </div>
                    <Link href="/patient/records/vitals" className={styles.viewAll}>View Full History</Link>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Blood Pressure</th>
                                    <th>Heart Rate</th>
                                    <th>Temperature</th>
                                    <th>SpO2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vitalHistory.map((vital, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{vital.date}</td>
                                        <td>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                <Heart size={14} style={{ color: 'var(--error)' }} />
                                                {vital.bp} mmHg
                                            </span>
                                        </td>
                                        <td>{vital.hr} bpm</td>
                                        <td>{vital.temp}°F</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles.success}`}>{vital.spo2}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className={styles.dashboardGrid}>
                {/* Categories Sidebar */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Categories</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0.875rem 1rem',
                                        background: selectedCategory === cat.id ? 'var(--primary-50)' : 'var(--bg-tertiary)',
                                        border: `1px solid ${selectedCategory === cat.id ? 'var(--primary-200)' : 'transparent'}`,
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <span style={{
                                        fontWeight: selectedCategory === cat.id ? 600 : 500,
                                        color: selectedCategory === cat.id ? 'var(--primary-700)' : 'var(--text-secondary)',
                                    }}>
                                        {cat.label}
                                    </span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        background: selectedCategory === cat.id ? 'var(--primary-100)' : 'var(--gray-100)',
                                        borderRadius: '9999px',
                                        color: selectedCategory === cat.id ? 'var(--primary-700)' : 'var(--text-muted)',
                                    }}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Records List */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle}>Medical Records</h3>
                            <p className={styles.cardSubtitle}>{filteredRecords.length} records found</p>
                        </div>
                        <div style={{ position: 'relative', width: '240px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search records..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--gray-200)',
                                    borderRadius: '10px',
                                    fontSize: '0.875rem',
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {filteredRecords.map((record) => (
                                <div key={record.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--gray-200)',
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: 'var(--primary-100)',
                                        color: 'var(--primary-600)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <record.icon size={24} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{record.name}</h4>
                                            <span className={`${styles.badge} ${record.status === 'normal' ? styles.success :
                                                    record.status === 'attention' ? styles.warning :
                                                        styles.primary
                                                }`}>
                                                {record.status}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                            <span>{record.type}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Calendar size={12} /> {record.date}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <User size={12} /> {record.doctor}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-ghost btn-sm">
                                            <Eye size={18} />
                                        </button>
                                        <button className="btn btn-ghost btn-sm">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
