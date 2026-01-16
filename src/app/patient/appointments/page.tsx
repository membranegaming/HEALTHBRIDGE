"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  Plus,
  Video,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Jan 17, 2026",
    time: "10:00 AM",
    type: "Follow-up",
    status: "confirmed",
    isVideo: false,
    avatar: "SJ",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "Jan 20, 2026",
    time: "2:30 PM",
    type: "Consultation",
    status: "confirmed",
    isVideo: true,
    avatar: "MC",
  },
  {
    id: 3,
    doctor: "Dr. Emily Davis",
    specialty: "Dermatologist",
    date: "Jan 25, 2026",
    time: "11:00 AM",
    type: "New Consultation",
    status: "pending",
    isVideo: false,
    avatar: "ED",
  },
  {
    id: 4,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Jan 10, 2026",
    time: "10:00 AM",
    type: "Check-up",
    status: "completed",
    isVideo: false,
    avatar: "SJ",
  },
  {
    id: 5,
    doctor: "Dr. Robert Wilson",
    specialty: "Orthopedic",
    date: "Dec 28, 2025",
    time: "3:00 PM",
    type: "Follow-up",
    status: "completed",
    isVideo: true,
    avatar: "RW",
  },
  {
    id: 6,
    doctor: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    date: "Dec 15, 2025",
    time: "4:30 PM",
    type: "Consultation",
    status: "cancelled",
    isVideo: false,
    avatar: "PS",
  },
];

function AppointmentsContent() {
  const searchParams = useSearchParams();
  const booked = searchParams.get('booked');

  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");
  const [showCancelModal, setShowCancelModal] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(booked === 'true');

  const upcomingAppointments = appointments.filter(a => a.status === "confirmed" || a.status === "pending");
  const pastAppointments = appointments.filter(a => a.status === "completed" || a.status === "cancelled");

  const filteredAppointments = filter === "upcoming" ? upcomingAppointments :
    filter === "past" ? pastAppointments : appointments;

  return (
    <div className={styles.dashboard}>
      {/* Success Message */}
      {showSuccess && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 1.5rem',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '16px',
          marginBottom: '1.5rem',
          color: 'var(--success)',
        }}>
          <CheckCircle size={24} />
          <div style={{ flex: 1 }}>
            <strong>Appointment Booked Successfully!</strong>
            <span style={{ marginLeft: '0.5rem', opacity: 0.8 }}>You will receive a confirmation email shortly.</span>
          </div>
          <button onClick={() => setShowSuccess(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            <X size={20} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>My Appointments</h1>
          <p className={styles.dashboardSubtitle}>{upcomingAppointments.length} upcoming appointments</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/patient/appointments/new" className="btn btn-primary">
            <Plus size={20} />
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.primary}`}>
            <Calendar size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Appointments</span>
            <div className={styles.statValue}>{appointments.length}</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.secondary}`}>
            <Clock size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Upcoming</span>
            <div className={styles.statValue}>{upcomingAppointments.length}</div>
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
          <div className={`${styles.statIcon} ${styles.error}`}>
            <X size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Cancelled</span>
            <div className={styles.statValue}>{appointments.filter(a => a.status === "cancelled").length}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(["upcoming", "past", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className={styles.card} style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--gradient-secondary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                flexShrink: 0,
              }}>
                {appointment.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>{appointment.doctor}</h3>
                  <span className={`${styles.badge} ${appointment.status === "confirmed" ? styles.success :
                    appointment.status === "pending" ? styles.warning :
                      appointment.status === "completed" ? styles.primary :
                        styles.error
                    }`}>
                    {appointment.status}
                  </span>
                  {appointment.isVideo && (
                    <span className={`${styles.badge} ${styles.outline}`}>
                      <Video size={12} /> Video
                    </span>
                  )}
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {appointment.specialty} • {appointment.type}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Calendar size={16} /> {appointment.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Clock size={16} /> {appointment.time}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(appointment.status === "confirmed" || appointment.status === "pending") && (
                  <>
                    {appointment.isVideo && (
                      <button className="btn btn-sm btn-secondary">
                        <Video size={16} /> Join
                      </button>
                    )}
                    <Link href={`/patient/appointments/${appointment.id}/reschedule`} className="btn btn-sm btn-outline">Reschedule</Link>
                    <button
                      className="btn btn-sm btn-outline"
                      style={{ color: 'var(--error)' }}
                      onClick={() => setShowCancelModal(appointment.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {appointment.status === "completed" && (
                  <button className="btn btn-sm btn-outline">View Details</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'var(--text-muted)',
        }}>
          <Calendar size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>No appointments found</p>
          <p>Book your first appointment to get started</p>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <AlertCircle size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Cancel Appointment?</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => setShowCancelModal(null)}
              >
                Keep Appointment
              </button>
              <button
                className="btn"
                style={{ flex: 1, background: 'var(--error)', color: 'white' }}
                onClick={() => setShowCancelModal(null)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={<div className={styles.dashboard}><p>Loading...</p></div>}>
      <AppointmentsContent />
    </Suspense>
  );
}
