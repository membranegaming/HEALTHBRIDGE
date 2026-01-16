"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Filter,
    User,
    Phone,
    Mail,
    Calendar,
    FileText,
    ChevronRight,
    Activity,
    Clock,
    MoreVertical,
    Eye,
    Pill,
    Heart,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const patients = [
    {
        id: 1,
        name: "John Doe",
        age: 45,
        gender: "Male",
        phone: "+91 98765 43210",
        email: "john.doe@email.com",
        lastVisit: "Jan 15, 2026",
        condition: "Hypertension",
        status: "active",
        visits: 8,
        avatar: "JD",
    },
    {
        id: 2,
        name: "Mary Smith",
        age: 28,
        gender: "Female",
        phone: "+91 98765 43211",
        email: "mary.smith@email.com",
        lastVisit: "Jan 12, 2026",
        condition: "Palpitations",
        status: "active",
        visits: 3,
        avatar: "MS",
    },
    {
        id: 3,
        name: "Robert Brown",
        age: 55,
        gender: "Male",
        phone: "+91 98765 43212",
        email: "robert.b@email.com",
        lastVisit: "Jan 10, 2026",
        condition: "Arrhythmia",
        status: "active",
        visits: 12,
        avatar: "RB",
    },
    {
        id: 4,
        name: "Emily Davis",
        age: 32,
        gender: "Female",
        phone: "+91 98765 43213",
        email: "emily.d@email.com",
        lastVisit: "Jan 8, 2026",
        condition: "Chest Pain",
        status: "critical",
        visits: 5,
        avatar: "ED",
    },
    {
        id: 5,
        name: "David Wilson",
        age: 62,
        gender: "Male",
        phone: "+91 98765 43214",
        email: "david.w@email.com",
        lastVisit: "Dec 28, 2025",
        condition: "Heart Failure",
        status: "monitoring",
        visits: 20,
        avatar: "DW",
    },
    {
        id: 6,
        name: "Sarah Lee",
        age: 38,
        gender: "Female",
        phone: "+91 98765 43215",
        email: "sarah.l@email.com",
        lastVisit: "Dec 20, 2025",
        condition: "Valve Disorder",
        status: "active",
        visits: 6,
        avatar: "SL",
    },
];

export default function PatientsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredPatients = patients.filter((patient) => {
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>My Patients</h1>
                    <p className={styles.dashboardSubtitle}>{patients.length} patients under your care</p>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <User size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Patients</span>
                        <div className={styles.statValue}>{patients.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <Activity size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Active</span>
                        <div className={styles.statValue}>{patients.filter(p => p.status === "active").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.error}`}>
                        <Heart size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Critical</span>
                        <div className={styles.statValue}>{patients.filter(p => p.status === "critical").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Monitoring</span>
                        <div className={styles.statValue}>{patients.filter(p => p.status === "monitoring").length}</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search patients by name or condition..."
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
                    {["all", "active", "critical", "monitoring"].map((status) => (
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

            {/* Patients Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {filteredPatients.map((patient) => (
                    <div key={patient.id} className={styles.card} style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                background: patient.status === "critical" ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'var(--gradient-primary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '1rem',
                            }}>
                                {patient.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>{patient.name}</h3>
                                    <span className={`${styles.badge} ${patient.status === "active" ? styles.success :
                                            patient.status === "critical" ? styles.error :
                                                styles.warning
                                        }`}>
                                        {patient.status}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    {patient.age} yrs • {patient.gender} • {patient.condition}
                                </p>
                            </div>
                            <button className="btn btn-ghost btn-sm">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Last Visit</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{patient.lastVisit}</span>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Visits</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{patient.visits}</span>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Contact</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{patient.phone.slice(-10)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link href={`/doctor/patients/${patient.id}`} className="btn btn-sm btn-outline" style={{ flex: 1 }}>
                                <Eye size={16} />
                                View Profile
                            </Link>
                            <Link href={`/doctor/patients/${patient.id}/prescriptions`} className="btn btn-sm btn-secondary" style={{ flex: 1 }}>
                                <FileText size={16} />
                                Records
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
