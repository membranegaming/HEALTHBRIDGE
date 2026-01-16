"use client";

import Link from "next/link";
import {
    Users,
    Calendar,
    ClipboardList,
    Clock,
    CheckCircle,
    UserPlus,
    Phone,
    Activity,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const todayStats = {
    appointments: 45,
    checkedIn: 28,
    waiting: 12,
    completed: 16,
};

const waitingPatients = [
    { id: 1, name: "John Doe", doctor: "Dr. Sarah Johnson", waitTime: "15 min", priority: "normal", token: "A-012" },
    { id: 2, name: "Jane Smith", doctor: "Dr. Michael Chen", waitTime: "25 min", priority: "priority", token: "A-013" },
    { id: 3, name: "Robert Brown", doctor: "Dr. Emily Davis", waitTime: "10 min", priority: "normal", token: "A-014" },
    { id: 4, name: "Maria Garcia", doctor: "Dr. Sarah Johnson", waitTime: "5 min", priority: "emergency", token: "E-001" },
];

const upcomingAppointments = [
    { time: "10:30 AM", patient: "Alex Johnson", doctor: "Dr. Sarah Johnson", type: "Follow-up", status: "confirmed" },
    { time: "11:00 AM", patient: "Emily Chen", doctor: "Dr. Michael Chen", type: "New Visit", status: "confirmed" },
    { time: "11:30 AM", patient: "David Wilson", doctor: "Dr. Emily Davis", type: "Check-up", status: "pending" },
    { time: "12:00 PM", patient: "Lisa Anderson", doctor: "Dr. Sarah Johnson", type: "Consultation", status: "confirmed" },
];

export default function StaffDashboardPage() {
    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Staff Dashboard</h1>
                    <p className={styles.dashboardSubtitle}>Welcome back, Mary! Here&apos;s today&apos;s overview.</p>
                </div>
                <div className={styles.headerActions}>
                    <Link
                        href="/staff/patients/register"
                        className="btn btn-primary"
                        style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}
                    >
                        <UserPlus size={18} /> Register Patient
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
                        <span className={styles.statLabel}>Today&apos;s Appointments</span>
                        <div className={styles.statValue}>{todayStats.appointments}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Checked In</span>
                        <div className={styles.statValue}>{todayStats.checkedIn}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Waiting</span>
                        <div className={styles.statValue}>{todayStats.waiting}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}>
                        <Activity size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Completed</span>
                        <div className={styles.statValue}>{todayStats.completed}</div>
                    </div>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Waiting Queue */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Waiting Queue</h3>
                        <Link href="/staff/queue" className="btn btn-sm btn-outline">View All</Link>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {waitingPatients.map((patient) => (
                                <div key={patient.id} style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                    borderLeft: `4px solid ${patient.priority === 'emergency' ? 'var(--error)' :
                                            patient.priority === 'priority' ? 'var(--warning)' : 'var(--success)'
                                        }`,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}>
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: '0.6875rem', flexShrink: 0,
                                    }}>
                                        {patient.token}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontWeight: 600, marginBottom: '0.125rem' }}>{patient.name}</p>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{patient.doctor}</span>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{
                                            fontWeight: 600, marginBottom: '0.25rem',
                                            color: parseInt(patient.waitTime) > 20 ? 'var(--warning)' : 'var(--text-primary)'
                                        }}>
                                            {patient.waitTime}
                                        </p>
                                        <span className={`${styles.badge} ${patient.priority === 'emergency' ? styles.error :
                                                patient.priority === 'priority' ? styles.warning : styles.success
                                            }`} style={{ fontSize: '0.625rem', textTransform: 'uppercase' }}>
                                            {patient.priority}
                                        </span>
                                    </div>
                                    <button className="btn btn-sm btn-outline" style={{ flexShrink: 0 }}>Call</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Appointments */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Upcoming Appointments</h3>
                        <Link href="/staff/appointments" className="btn btn-sm btn-outline">View All</Link>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {upcomingAppointments.map((apt, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}>
                                    <div style={{
                                        padding: '0.625rem 0.875rem', background: 'rgba(245, 158, 11, 0.15)',
                                        borderRadius: '10px', textAlign: 'center', minWidth: '75px', flexShrink: 0,
                                    }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#d97706' }}>{apt.time}</span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontWeight: 600, marginBottom: '0.125rem' }}>{apt.patient}</p>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{apt.doctor} • {apt.type}</span>
                                    </div>
                                    <span className={`${styles.badge} ${apt.status === 'confirmed' ? styles.success : styles.warning}`}>
                                        {apt.status}
                                    </span>
                                    <button
                                        className="btn btn-sm"
                                        style={{
                                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                            color: 'white',
                                            border: 'none',
                                            flexShrink: 0
                                        }}
                                    >
                                        Check In
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Quick Actions */}
            <section className={styles.card} style={{ marginTop: '1.5rem' }}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Quick Actions</h3>
                </div>
                <div className={styles.cardBody}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1rem'
                    }}>
                        {[
                            { label: "Register Patient", icon: UserPlus, href: "/staff/patients/register", color: "#f59e0b" },
                            { label: "Book Appointment", icon: Calendar, href: "/staff/appointments/new", color: "#3b82f6" },
                            { label: "Manage Queue", icon: ClipboardList, href: "/staff/queue", color: "#10b981" },
                            { label: "Emergency Call", icon: Phone, href: "#", color: "#ef4444" },
                        ].map((action) => (
                            <Link key={action.label} href={action.href} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem',
                                padding: '1.75rem 1.25rem', background: 'var(--bg-tertiary)', borderRadius: '16px',
                                textDecoration: 'none', color: 'inherit', border: '1px solid var(--gray-200)',
                                transition: 'all 0.2s ease',
                            }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '16px',
                                    background: `${action.color}20`, color: action.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <action.icon size={28} />
                                </div>
                                <span style={{ fontWeight: 600, textAlign: 'center', fontSize: '0.9375rem' }}>{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
