"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Building,
    Users,
    Stethoscope,
    TrendingUp,
    Plus,
    Edit,
    MoreVertical,
    Phone,
    Clock,
    DollarSign,
    Activity,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const departments = [
    {
        id: 1,
        name: "Cardiology",
        head: "Dr. Sarah Johnson",
        doctors: 8,
        nurses: 12,
        beds: 30,
        occupancy: 85,
        revenue: "₹45L",
        trend: 12,
        contact: "+91 1800 123 001",
        floor: "3rd Floor, Block A",
    },
    {
        id: 2,
        name: "Orthopedics",
        head: "Dr. Robert Wilson",
        doctors: 6,
        nurses: 10,
        beds: 25,
        occupancy: 72,
        revenue: "₹38L",
        trend: 8,
        contact: "+91 1800 123 002",
        floor: "2nd Floor, Block A",
    },
    {
        id: 3,
        name: "Pediatrics",
        head: "Dr. Emily Davis",
        doctors: 5,
        nurses: 15,
        beds: 40,
        occupancy: 65,
        revenue: "₹28L",
        trend: -3,
        contact: "+91 1800 123 003",
        floor: "4th Floor, Block B",
    },
    {
        id: 4,
        name: "General Medicine",
        head: "Dr. Michael Chen",
        doctors: 12,
        nurses: 20,
        beds: 50,
        occupancy: 90,
        revenue: "₹55L",
        trend: 15,
        contact: "+91 1800 123 004",
        floor: "1st Floor, Block A",
    },
    {
        id: 5,
        name: "Emergency",
        head: "Dr. Amit Patel",
        doctors: 10,
        nurses: 25,
        beds: 20,
        occupancy: 95,
        revenue: "₹35L",
        trend: 5,
        contact: "+91 1800 123 005",
        floor: "Ground Floor, Block A",
    },
    {
        id: 6,
        name: "ICU",
        head: "Dr. Priya Kumar",
        doctors: 8,
        nurses: 30,
        beds: 15,
        occupancy: 100,
        revenue: "₹62L",
        trend: 10,
        contact: "+91 1800 123 006",
        floor: "5th Floor, Block A",
    },
];

export default function DepartmentsPage() {
    const totalDoctors = departments.reduce((sum, d) => sum + d.doctors, 0);
    const totalNurses = departments.reduce((sum, d) => sum + d.nurses, 0);
    const totalBeds = departments.reduce((sum, d) => sum + d.beds, 0);

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Departments</h1>
                    <p className={styles.dashboardSubtitle}>{departments.length} departments</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/admin/departments/new" className="btn btn-primary">
                        <Plus size={20} />
                        Add Department
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <Building size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Departments</span>
                        <div className={styles.statValue}>{departments.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}>
                        <Stethoscope size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Doctors</span>
                        <div className={styles.statValue}>{totalDoctors}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <Users size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Nurses</span>
                        <div className={styles.statValue}>{totalNurses}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.accent}`}>
                        <Activity size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Beds</span>
                        <div className={styles.statValue}>{totalBeds}</div>
                    </div>
                </div>
            </div>

            {/* Departments Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {departments.map((dept) => (
                    <div key={dept.id} className={styles.card} style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Building size={28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>{dept.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Head: {dept.head}</p>
                                </div>
                            </div>
                            <button className="btn btn-ghost btn-sm"><MoreVertical size={18} /></button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-600)' }}>{dept.doctors}</p>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Doctors</span>
                            </div>
                            <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary-600)' }}>{dept.nurses}</p>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nurses</span>
                            </div>
                            <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-purple)' }}>{dept.beds}</p>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Beds</span>
                            </div>
                            <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: dept.occupancy >= 90 ? 'var(--error)' : 'var(--success)' }}>{dept.occupancy}%</p>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Occupied</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <DollarSign size={14} />
                                    {dept.revenue}/mo
                                </span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    color: dept.trend >= 0 ? 'var(--success)' : 'var(--error)',
                                    fontWeight: 600,
                                }}>
                                    <TrendingUp size={14} />
                                    {dept.trend >= 0 ? '+' : ''}{dept.trend}%
                                </span>
                            </div>
                            <Link href={`/admin/departments/${dept.id}`} className="btn btn-sm btn-outline">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
