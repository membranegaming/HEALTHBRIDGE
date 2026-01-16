"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    Plus,
    Search,
    Filter,
    CheckCircle,
    X,
    User,
    Phone,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const appointments = [
    { id: 1, time: "09:00 AM", patient: "John Doe", phone: "+91 98765 43210", doctor: "Dr. Sarah Johnson", type: "Follow-up", status: "checked-in" },
    { id: 2, time: "09:30 AM", patient: "Jane Smith", phone: "+91 98765 43211", doctor: "Dr. Michael Chen", type: "New Visit", status: "completed" },
    { id: 3, time: "10:00 AM", patient: "Robert Brown", phone: "+91 98765 43212", doctor: "Dr. Emily Davis", type: "Consultation", status: "confirmed" },
    { id: 4, time: "10:30 AM", patient: "Maria Garcia", phone: "+91 98765 43213", doctor: "Dr. Sarah Johnson", type: "Check-up", status: "confirmed" },
    { id: 5, time: "11:00 AM", patient: "Alex Johnson", phone: "+91 98765 43214", doctor: "Dr. Michael Chen", type: "Follow-up", status: "pending" },
    { id: 6, time: "11:30 AM", patient: "Emily Chen", phone: "+91 98765 43215", doctor: "Dr. Emily Davis", type: "New Visit", status: "confirmed" },
    { id: 7, time: "02:00 PM", patient: "David Wilson", phone: "+91 98765 43216", doctor: "Dr. Sarah Johnson", type: "Consultation", status: "confirmed" },
    { id: 8, time: "02:30 PM", patient: "Lisa Anderson", phone: "+91 98765 43217", doctor: "Dr. Michael Chen", type: "Check-up", status: "cancelled" },
];

export default function StaffAppointmentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch = apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apt.doctor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Appointments</h1>
                    <p className={styles.dashboardSubtitle}>Manage today&apos;s appointments</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/staff/appointments/new" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}>
                        <Plus size={18} /> New Appointment
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                        <Calendar size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Today</span>
                        <div className={styles.statValue}>{appointments.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Completed</span>
                        <div className={styles.statValue}>{appointments.filter(a => a.status === "completed").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <User size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Checked In</span>
                        <div className={styles.statValue}>{appointments.filter(a => a.status === "checked-in").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Pending</span>
                        <div className={styles.statValue}>{appointments.filter(a => a.status === "pending" || a.status === "confirmed").length}</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by patient or doctor..."
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
                    {["all", "confirmed", "checked-in", "completed", "cancelled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-outline'}`}
                            style={statusFilter === status ? { background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' } : {}}
                        >
                            {status.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Appointments Table */}
            <section className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((apt) => (
                                    <tr key={apt.id}>
                                        <td>
                                            <span style={{ fontWeight: 600, color: '#d97706' }}>{apt.time}</span>
                                        </td>
                                        <td>
                                            <div>
                                                <p style={{ fontWeight: 600 }}>{apt.patient}</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apt.phone}</span>
                                            </div>
                                        </td>
                                        <td>{apt.doctor}</td>
                                        <td>{apt.type}</td>
                                        <td>
                                            <span className={`${styles.badge} ${apt.status === 'completed' ? styles.success :
                                                    apt.status === 'checked-in' ? styles.primary :
                                                        apt.status === 'cancelled' ? styles.error : styles.warning
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {apt.status === 'confirmed' && (
                                                    <button className="btn btn-sm" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', border: 'none' }}>
                                                        Check In
                                                    </button>
                                                )}
                                                {apt.status === 'confirmed' && (
                                                    <button className="btn btn-sm btn-outline" style={{ color: 'var(--error)' }}>Cancel</button>
                                                )}
                                                <button className="btn btn-sm btn-outline">View</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
