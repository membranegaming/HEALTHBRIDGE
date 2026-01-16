"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Clock,
    Play,
    User,
    AlertCircle,
    CheckCircle,
    Phone,
    Video,
    FileText,
    ChevronRight,
    Timer,
    Users,
    Pause,
    SkipForward,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const queuePatients = [
    {
        id: 1,
        name: "John Doe",
        age: 45,
        gender: "M",
        token: "A-001",
        type: "Follow-up",
        condition: "Hypertension",
        waitTime: "5 min",
        priority: "normal",
        appointmentTime: "10:00 AM",
        phone: "+91 98765 43210",
    },
    {
        id: 2,
        name: "Emily Davis",
        age: 32,
        gender: "F",
        token: "E-001",
        type: "Emergency",
        condition: "Chest Pain",
        waitTime: "2 min",
        priority: "emergency",
        appointmentTime: "Walk-in",
        phone: "+91 98765 43211",
        vitals: { bp: "140/90", hr: 95, temp: 99.2 },
    },
    {
        id: 3,
        name: "Mary Smith",
        age: 28,
        gender: "F",
        token: "A-002",
        type: "Consultation",
        condition: "Palpitations",
        waitTime: "12 min",
        priority: "priority",
        appointmentTime: "10:30 AM",
        phone: "+91 98765 43212",
    },
    {
        id: 4,
        name: "Robert Brown",
        age: 55,
        gender: "M",
        token: "A-003",
        type: "Check-up",
        condition: "Annual Checkup",
        waitTime: "18 min",
        priority: "normal",
        appointmentTime: "11:00 AM",
        phone: "+91 98765 43213",
    },
    {
        id: 5,
        name: "Lisa Anderson",
        age: 40,
        gender: "F",
        token: "A-004",
        type: "Follow-up",
        condition: "Arrhythmia",
        waitTime: "25 min",
        priority: "normal",
        appointmentTime: "11:30 AM",
        phone: "+91 98765 43214",
    },
];

export default function QueuePage() {
    const [currentPatient, setCurrentPatient] = useState<typeof queuePatients[0] | null>(null);
    const [queue, setQueue] = useState(queuePatients);

    const callNext = () => {
        if (queue.length > 0) {
            // Sort by priority: emergency > priority > normal
            const sorted = [...queue].sort((a, b) => {
                const priorityOrder = { emergency: 0, priority: 1, normal: 2 };
                return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
            });
            setCurrentPatient(sorted[0]);
            setQueue(queue.filter(p => p.id !== sorted[0].id));
        }
    };

    const completeConsultation = () => {
        setCurrentPatient(null);
    };

    const emergencyCount = queue.filter(p => p.priority === "emergency").length;
    const priorityCount = queue.filter(p => p.priority === "priority").length;

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Patient Queue</h1>
                    <p className={styles.dashboardSubtitle}>{queue.length} patients waiting</p>
                </div>
                <div className={styles.headerActions}>
                    {!currentPatient && queue.length > 0 && (
                        <button className="btn btn-secondary" onClick={callNext}>
                            <Play size={20} />
                            Call Next Patient
                        </button>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
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
                        <div className={styles.statValue}>{emergencyCount}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Priority</span>
                        <div className={styles.statValue}>{priorityCount}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <Timer size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Avg Wait Time</span>
                        <div className={styles.statValue}>12m</div>
                    </div>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Current Patient */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Current Patient</h3>
                    </div>
                    <div className={styles.cardBody}>
                        {currentPatient ? (
                            <div>
                                {/* Patient Info */}
                                <div style={{
                                    background: currentPatient.priority === "emergency" ? 'rgba(239, 68, 68, 0.05)' : 'var(--secondary-50)',
                                    border: `1px solid ${currentPatient.priority === "emergency" ? 'rgba(239, 68, 68, 0.2)' : 'var(--secondary-200)'}`,
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    marginBottom: '1.5rem',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '50%',
                                            background: 'var(--gradient-secondary)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                        }}>
                                            {currentPatient.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{currentPatient.name}</h3>
                                                <span className={`${styles.badge} ${currentPatient.priority === "emergency" ? styles.error :
                                                        currentPatient.priority === "priority" ? styles.warning :
                                                            styles.secondary
                                                    }`}>
                                                    {currentPatient.token}
                                                </span>
                                            </div>
                                            <p style={{ color: 'var(--text-muted)' }}>
                                                {currentPatient.age} yrs • {currentPatient.gender} • {currentPatient.type}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Condition</span>
                                            <span style={{ fontWeight: 600 }}>{currentPatient.condition}</span>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Contact</span>
                                            <span style={{ fontWeight: 600 }}>{currentPatient.phone}</span>
                                        </div>
                                    </div>

                                    {currentPatient.vitals && (
                                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--error)', display: 'block', marginBottom: '0.5rem' }}>
                                                ⚠️ Vital Signs Alert
                                            </span>
                                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
                                                <span>BP: {currentPatient.vitals.bp}</span>
                                                <span>HR: {currentPatient.vitals.hr} bpm</span>
                                                <span>Temp: {currentPatient.vitals.temp}°F</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Actions */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <Link href={`/doctor/consultation/${currentPatient.id}`} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                                        <FileText size={20} />
                                        Start Consultation
                                    </Link>
                                    <button className="btn btn-outline" style={{ justifyContent: 'center' }}>
                                        <Video size={20} />
                                        Video Call
                                    </button>
                                </div>

                                {/* Complete/Skip */}
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button className="btn btn-success" style={{ flex: 1 }} onClick={completeConsultation}>
                                        <CheckCircle size={20} />
                                        Complete
                                    </button>
                                    <button className="btn btn-outline" onClick={() => { setQueue([...queue, currentPatient]); setCurrentPatient(null); }}>
                                        <SkipForward size={20} />
                                        Skip
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                padding: '3rem',
                                color: 'var(--text-muted)',
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'var(--gray-100)',
                                    margin: '0 auto 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Pause size={40} />
                                </div>
                                <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>No Active Consultation</p>
                                <p>Click &quot;Call Next Patient&quot; to start</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Queue List */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle}>Waiting Queue</h3>
                            <p className={styles.cardSubtitle}>{queue.length} patients</p>
                        </div>
                    </div>
                    <div className={styles.cardBody}>
                        {queue.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                <CheckCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>Queue is empty!</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {queue.map((patient, index) => (
                                    <div key={patient.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: patient.priority === "emergency" ? 'rgba(239, 68, 68, 0.05)' :
                                            patient.priority === "priority" ? 'rgba(234, 179, 8, 0.05)' : 'var(--bg-tertiary)',
                                        border: `1px solid ${patient.priority === "emergency" ? 'rgba(239, 68, 68, 0.2)' :
                                                patient.priority === "priority" ? 'rgba(234, 179, 8, 0.2)' : 'var(--gray-200)'
                                            }`,
                                        borderLeft: `4px solid ${patient.priority === "emergency" ? 'var(--error)' :
                                                patient.priority === "priority" ? '#ca8a04' : 'var(--gray-300)'
                                            }`,
                                        borderRadius: '12px',
                                    }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            background: patient.priority === "emergency" ? 'rgba(239, 68, 68, 0.1)' :
                                                patient.priority === "priority" ? 'rgba(234, 179, 8, 0.1)' : 'var(--gray-100)',
                                            color: patient.priority === "emergency" ? 'var(--error)' :
                                                patient.priority === "priority" ? '#a16207' : 'var(--text-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: '0.875rem',
                                        }}>
                                            {patient.token}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.125rem' }}>
                                                <span style={{ fontWeight: 600 }}>{patient.name}</span>
                                                {patient.priority === "emergency" && (
                                                    <AlertCircle size={14} style={{ color: 'var(--error)' }} />
                                                )}
                                            </div>
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                                {patient.age}y • {patient.type} • {patient.condition}
                                            </span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{patient.appointmentTime}</span>
                                            <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Wait: {patient.waitTime}</span>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => {
                                                setCurrentPatient(patient);
                                                setQueue(queue.filter(p => p.id !== patient.id));
                                            }}
                                        >
                                            <Play size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
