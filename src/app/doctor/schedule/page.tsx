"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    Plus,
    ChevronLeft,
    ChevronRight,
    User,
    Video,
    MapPin,
    Edit,
    Trash2,
    Check,
    X,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const appointments = [
    { id: 1, date: "2026-01-16", time: "09:00", patient: "John Doe", type: "Follow-up", duration: 30, status: "confirmed" },
    { id: 2, date: "2026-01-16", time: "09:30", patient: "Mary Smith", type: "Consultation", duration: 45, status: "confirmed" },
    { id: 3, date: "2026-01-16", time: "10:30", patient: "Robert Brown", type: "Check-up", duration: 30, status: "confirmed" },
    { id: 4, date: "2026-01-16", time: "11:00", patient: "Emily Davis", type: "Follow-up", duration: 30, status: "pending" },
    { id: 5, date: "2026-01-16", time: "14:00", patient: "David Wilson", type: "Video Call", duration: 30, status: "confirmed", isVideo: true },
    { id: 6, date: "2026-01-17", time: "09:00", patient: "Sarah Lee", type: "Consultation", duration: 45, status: "confirmed" },
    { id: 7, date: "2026-01-17", time: "10:00", patient: "Mike Chen", type: "Follow-up", duration: 30, status: "confirmed" },
    { id: 8, date: "2026-01-18", time: "11:00", patient: "Lisa Anderson", type: "Check-up", duration: 30, status: "pending" },
];

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const workingHours = {
    start: "09:00",
    end: "17:00",
    breakStart: "12:00",
    breakEnd: "14:00",
};

export default function SchedulePage() {
    const [selectedDate, setSelectedDate] = useState(new Date("2026-01-16"));
    const [view, setView] = useState<"day" | "week">("day");

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const getAppointmentsForDate = (date: string) => {
        return appointments.filter(apt => apt.date === date);
    };

    const todayAppointments = getAppointmentsForDate(formatDate(selectedDate));

    const navigateDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const getWeekDates = () => {
        const dates = [];
        const start = new Date(selectedDate);
        start.setDate(start.getDate() - start.getDay());
        for (let i = 0; i < 7; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Schedule Management</h1>
                    <p className={styles.dashboardSubtitle}>Manage your appointments and availability</p>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline">
                        <Clock size={20} />
                        Set Working Hours
                    </button>
                    <button className="btn btn-secondary">
                        <Plus size={20} />
                        Block Time
                    </button>
                </div>
            </div>

            {/* Calendar Controls */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderRadius: '16px',
                border: '1px solid var(--gray-200)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigateDate(-1)}>
                        <ChevronLeft size={20} />
                    </button>
                    <div style={{ textAlign: 'center', minWidth: '200px' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h3>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            {todayAppointments.length} appointments
                        </span>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => navigateDate(1)}>
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className={`btn btn-sm ${view === "day" ? "btn-secondary" : "btn-outline"}`}
                        onClick={() => setView("day")}
                    >
                        Day
                    </button>
                    <button
                        className={`btn btn-sm ${view === "week" ? "btn-secondary" : "btn-outline"}`}
                        onClick={() => setView("week")}
                    >
                        Week
                    </button>
                    <button className="btn btn-sm btn-outline" onClick={() => setSelectedDate(new Date("2026-01-16"))}>
                        Today
                    </button>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Day View */}
                <section className={styles.card} style={{ gridColumn: view === "day" ? "span 1" : "span 2" }}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>
                            {view === "day" ? "Today's Schedule" : "Week View"}
                        </h3>
                    </div>
                    <div className={styles.cardBody}>
                        {view === "day" ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {timeSlots.map((slot) => {
                                    const apt = todayAppointments.find(a => a.time === slot);
                                    const isBreak = slot >= workingHours.breakStart && slot < workingHours.breakEnd;

                                    return (
                                        <div key={slot} style={{
                                            display: 'flex',
                                            alignItems: 'stretch',
                                            gap: '1rem',
                                            minHeight: '60px',
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                                color: 'var(--text-muted)',
                                                paddingTop: '0.5rem',
                                            }}>
                                                {slot}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                {isBreak ? (
                                                    <div style={{
                                                        padding: '1rem',
                                                        background: 'var(--gray-100)',
                                                        borderRadius: '12px',
                                                        color: 'var(--text-muted)',
                                                        fontSize: '0.875rem',
                                                        textAlign: 'center',
                                                    }}>
                                                        🍽️ Lunch Break
                                                    </div>
                                                ) : apt ? (
                                                    <div style={{
                                                        padding: '1rem',
                                                        background: apt.isVideo ? 'rgba(139, 92, 246, 0.05)' : 'var(--secondary-50)',
                                                        border: `1px solid ${apt.isVideo ? 'rgba(139, 92, 246, 0.2)' : 'var(--secondary-200)'}`,
                                                        borderLeft: `4px solid ${apt.isVideo ? '#8b5cf6' : 'var(--secondary-500)'}`,
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                            <div style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                borderRadius: '50%',
                                                                background: apt.isVideo ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : 'var(--gradient-secondary)',
                                                                color: 'white',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                                {apt.isVideo ? <Video size={18} /> : <User size={18} />}
                                                            </div>
                                                            <div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                    <span style={{ fontWeight: 600 }}>{apt.patient}</span>
                                                                    <span className={`${styles.badge} ${apt.status === 'confirmed' ? styles.success : styles.warning}`}>
                                                                        {apt.status}
                                                                    </span>
                                                                </div>
                                                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                                                    {apt.type} • {apt.duration} min
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <button className="btn btn-ghost btn-sm"><Edit size={16} /></button>
                                                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div style={{
                                                        padding: '1rem',
                                                        background: 'var(--bg-tertiary)',
                                                        border: '1px dashed var(--gray-200)',
                                                        borderRadius: '12px',
                                                        color: 'var(--text-muted)',
                                                        fontSize: '0.875rem',
                                                        textAlign: 'center',
                                                        cursor: 'pointer',
                                                    }}>
                                                        Available
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                                {getWeekDates().map((date) => {
                                    const dateStr = formatDate(date);
                                    const dayAppts = getAppointmentsForDate(dateStr);
                                    const isToday = dateStr === formatDate(selectedDate);

                                    return (
                                        <div key={dateStr} style={{
                                            padding: '1rem',
                                            background: isToday ? 'var(--secondary-50)' : 'var(--bg-tertiary)',
                                            border: `1px solid ${isToday ? 'var(--secondary-200)' : 'var(--gray-200)'}`,
                                            borderRadius: '12px',
                                            minHeight: '150px',
                                        }}>
                                            <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                                                    {daysOfWeek[date.getDay()]}
                                                </span>
                                                <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{date.getDate()}</span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                {dayAppts.slice(0, 3).map((apt) => (
                                                    <div key={apt.id} style={{
                                                        padding: '0.375rem 0.5rem',
                                                        background: 'var(--secondary-100)',
                                                        borderRadius: '6px',
                                                        fontSize: '0.6875rem',
                                                    }}>
                                                        <span style={{ fontWeight: 600 }}>{apt.time}</span> {apt.patient.split(' ')[0]}
                                                    </div>
                                                ))}
                                                {dayAppts.length > 3 && (
                                                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                                        +{dayAppts.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* Working Hours */}
                {view === "day" && (
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Working Hours</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Morning Session</span>
                                    <span style={{ fontWeight: 600 }}>{workingHours.start} - {workingHours.breakStart}</span>
                                </div>
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Lunch Break</span>
                                    <span style={{ fontWeight: 600 }}>{workingHours.breakStart} - {workingHours.breakEnd}</span>
                                </div>
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Afternoon Session</span>
                                    <span style={{ fontWeight: 600 }}>{workingHours.breakEnd} - {workingHours.end}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1rem' }}>This Week</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {daysOfWeek.map((day, i) => (
                                        <div key={day} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '0.5rem',
                                        }}>
                                            <span style={{ fontWeight: 500 }}>{day}</span>
                                            {i === 0 || i === 6 ? (
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Off</span>
                                            ) : (
                                                <span style={{ color: 'var(--success)', fontSize: '0.875rem' }}>9 AM - 5 PM</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
