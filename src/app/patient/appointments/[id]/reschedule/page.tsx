"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
} from "lucide-react";
import styles from "../../../../dashboard.module.css";

const timeSlots = [
    { time: "09:00 AM", available: true },
    { time: "09:30 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: false },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: false },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: true },
];

const appointmentData = {
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    type: "Follow-up",
    originalDate: "Jan 17, 2026",
    originalTime: "10:00 AM",
};

export default function ReschedulePage() {
    const router = useRouter();
    const params = useParams();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    const getWeekDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const handleReschedule = () => {
        setConfirmed(true);
        setTimeout(() => {
            router.push('/patient/appointments');
        }, 2000);
    };

    if (confirmed) {
        return (
            <div className={styles.dashboard} style={{ maxWidth: '500px' }}>
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <CheckCircle size={48} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Appointment Rescheduled!</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Redirecting to appointments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard} style={{ maxWidth: '700px' }}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/patient/appointments" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>Reschedule Appointment</h1>
                        <p className={styles.dashboardSubtitle}>Select a new date and time</p>
                    </div>
                </div>
            </div>

            {/* Current Appointment Info */}
            <div style={{
                padding: '1rem', marginBottom: '1.5rem', background: 'var(--bg-tertiary)',
                borderRadius: '12px', border: '1px solid var(--gray-200)',
            }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Current Appointment</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontWeight: 600 }}>{appointmentData.doctor}</p>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{appointmentData.specialty} • {appointmentData.type}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 600 }}>{appointmentData.originalDate}</p>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{appointmentData.originalTime}</span>
                    </div>
                </div>
            </div>

            {/* Date Selection */}
            <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Select New Date</h3>
                </div>
                <div className={styles.cardBody}>
                    <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {getWeekDates().map((date, i) => {
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            const isToday = i === 0;
                            return (
                                <div
                                    key={i}
                                    onClick={() => setSelectedDate(date)}
                                    style={{
                                        minWidth: '80px', padding: '0.875rem',
                                        background: isSelected ? 'var(--primary-600)' : 'var(--bg-tertiary)',
                                        border: `1px solid ${isSelected ? 'var(--primary-600)' : 'var(--gray-200)'}`,
                                        borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                                    }}
                                >
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
                                        marginBottom: '0.25rem',
                                    }}>
                                        {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                                    </p>
                                    <p style={{
                                        fontSize: '1.25rem', fontWeight: 700,
                                        color: isSelected ? 'white' : 'var(--text-primary)',
                                    }}>
                                        {date.getDate()}
                                    </p>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
                                    }}>
                                        {date.toLocaleDateString('en-US', { month: 'short' })}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Time Selection */}
            <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Select New Time</h3>
                </div>
                <div className={styles.cardBody}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                        {timeSlots.map((slot) => (
                            <button
                                key={slot.time}
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                                disabled={!slot.available}
                                style={{
                                    padding: '0.75rem',
                                    background: selectedTime === slot.time ? 'var(--primary-600)' :
                                        !slot.available ? 'var(--gray-100)' : 'var(--bg-tertiary)',
                                    border: `1px solid ${selectedTime === slot.time ? 'var(--primary-600)' : 'var(--gray-200)'}`,
                                    borderRadius: '10px',
                                    cursor: slot.available ? 'pointer' : 'not-allowed',
                                    color: selectedTime === slot.time ? 'white' :
                                        !slot.available ? 'var(--text-muted)' : 'var(--text-primary)',
                                    fontWeight: 500,
                                    textDecoration: !slot.available ? 'line-through' : 'none',
                                }}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <Link href="/patient/appointments" className="btn btn-outline">Cancel</Link>
                <button
                    className="btn btn-primary"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleReschedule}
                >
                    <CheckCircle size={18} /> Confirm Reschedule
                </button>
            </div>
        </div>
    );
}
