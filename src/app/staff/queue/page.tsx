"use client";

import { useState } from "react";
import {
    Users,
    Clock,
    CheckCircle,
    AlertCircle,
    Phone,
    ArrowRight,
    Volume2,
    SkipForward,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const initialQueue = [
    { id: 1, token: "A-012", name: "John Doe", doctor: "Dr. Sarah Johnson", waitTime: 15, priority: "normal", checkInTime: "09:45 AM" },
    { id: 2, token: "E-001", name: "Maria Garcia", doctor: "Dr. Sarah Johnson", waitTime: 5, priority: "emergency", checkInTime: "10:05 AM" },
    { id: 3, token: "A-013", name: "Jane Smith", doctor: "Dr. Michael Chen", waitTime: 25, priority: "priority", checkInTime: "09:35 AM" },
    { id: 4, token: "A-014", name: "Robert Brown", doctor: "Dr. Emily Davis", waitTime: 10, priority: "normal", checkInTime: "09:50 AM" },
    { id: 5, token: "A-015", name: "Alex Johnson", doctor: "Dr. Sarah Johnson", waitTime: 8, priority: "normal", checkInTime: "09:52 AM" },
];

export default function StaffQueuePage() {
    const [queue, setQueue] = useState(initialQueue);
    const [currentPatient, setCurrentPatient] = useState<typeof initialQueue[0] | null>(null);

    const callNext = () => {
        if (queue.length > 0) {
            const sorted = [...queue].sort((a, b) => {
                const priorityOrder = { emergency: 0, priority: 1, normal: 2 };
                if (priorityOrder[a.priority as keyof typeof priorityOrder] !== priorityOrder[b.priority as keyof typeof priorityOrder]) {
                    return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
                }
                return a.waitTime - b.waitTime;
            });
            setCurrentPatient(sorted[0]);
            setQueue(queue.filter(p => p.id !== sorted[0].id));
        }
    };

    const skipPatient = (id: number) => {
        const patient = queue.find(p => p.id === id);
        if (patient) {
            setQueue([...queue.filter(p => p.id !== id), { ...patient, waitTime: patient.waitTime + 15 }]);
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Queue Management</h1>
                    <p className={styles.dashboardSubtitle}>{queue.length} patients waiting</p>
                </div>
                <div className={styles.headerActions}>
                    <button onClick={callNext} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}>
                        <Volume2 size={18} /> Call Next Patient
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                        <Users size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>In Queue</span>
                        <div className={styles.statValue}>{queue.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.error}`}>
                        <AlertCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Emergency</span>
                        <div className={styles.statValue}>{queue.filter(p => p.priority === "emergency").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Avg Wait</span>
                        <div className={styles.statValue}>{queue.length > 0 ? Math.round(queue.reduce((a, b) => a + b.waitTime, 0) / queue.length) : 0} min</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Served Today</span>
                        <div className={styles.statValue}>24</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '1.5rem' }}>
                {/* Current Patient */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Now Serving</h3>
                    </div>
                    <div className={styles.cardBody}>
                        {currentPatient ? (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '100px', height: '100px', borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1rem', fontWeight: 800, fontSize: '1.5rem',
                                }}>
                                    {currentPatient.token}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{currentPatient.name}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{currentPatient.doctor}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    <button className="btn btn-outline">No Show</button>
                                    <button className="btn btn-success">Complete</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                <Users size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                <p>No patient being served</p>
                                <button onClick={callNext} className="btn btn-primary" style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}>
                                    Call Next
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Queue List */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Waiting List</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {queue.sort((a, b) => {
                                const priorityOrder = { emergency: 0, priority: 1, normal: 2 };
                                return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
                            }).map((patient, index) => (
                                <div key={patient.id} style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                    borderLeft: `4px solid ${patient.priority === 'emergency' ? 'var(--error)' :
                                            patient.priority === 'priority' ? 'var(--warning)' : 'var(--success)'
                                        }`,
                                }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        background: index === 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'var(--gray-200)',
                                        color: index === 0 ? 'white' : 'var(--text-primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: '0.75rem',
                                    }}>
                                        {patient.token}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 600 }}>{patient.name}</span>
                                            <span className={`${styles.badge} ${patient.priority === 'emergency' ? styles.error :
                                                    patient.priority === 'priority' ? styles.warning : styles.success
                                                }`} style={{ fontSize: '0.625rem', textTransform: 'uppercase' }}>
                                                {patient.priority}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{patient.doctor} • Check-in: {patient.checkInTime}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 700, color: patient.waitTime > 20 ? 'var(--warning)' : 'var(--text-primary)' }}>
                                            {patient.waitTime} min
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => skipPatient(patient.id)} className="btn btn-sm btn-outline" title="Skip"><SkipForward size={14} /></button>
                                        <button className="btn btn-sm btn-outline"><Phone size={14} /></button>
                                    </div>
                                </div>
                            ))}
                            {queue.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    <CheckCircle size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                    <p>No patients in queue</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
