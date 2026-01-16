"use client";

import Link from "next/link";
import {
  Calendar,
  Clock,
  Pill,
  FileText,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Activity,
  Heart,
  Thermometer,
  Droplets,
  ChevronRight,
  Video,
  AlertCircle,
} from "lucide-react";
import styles from "../../dashboard.module.css";

// Mock data
const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Jan 17, 2026",
    time: "10:00 AM",
    type: "Follow-up",
    avatar: "SJ",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "Jan 20, 2026",
    time: "2:30 PM",
    type: "Consultation",
    avatar: "MC",
  },
];

const activePrescriptions = [
  {
    id: 1,
    medicine: "Metformin 500mg",
    dosage: "Twice daily after meals",
    remaining: "15 days",
    refillSoon: false,
  },
  {
    id: 2,
    medicine: "Lisinopril 10mg",
    dosage: "Once daily in morning",
    remaining: "5 days",
    refillSoon: true,
  },
  {
    id: 3,
    medicine: "Atorvastatin 20mg",
    dosage: "Once daily at bedtime",
    remaining: "22 days",
    refillSoon: false,
  },
];

const recentBills = [
  {
    id: 1,
    description: "Consultation - Dr. Sarah Johnson",
    date: "Jan 10, 2026",
    amount: 1500,
    status: "paid",
  },
  {
    id: 2,
    description: "Lab Tests - Complete Blood Count",
    date: "Jan 8, 2026",
    amount: 800,
    status: "pending",
  },
];

const healthMetrics = [
  { label: "Heart Rate", value: "72", unit: "bpm", icon: Heart, color: "error", trend: "normal" },
  { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, color: "success", trend: "normal" },
  { label: "Temperature", value: "98.4", unit: "°F", icon: Thermometer, color: "warning", trend: "normal" },
  { label: "SpO2", value: "98", unit: "%", icon: Droplets, color: "info", trend: "normal" },
];

export default function PatientDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Page Header */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Welcome back, John! 👋</h1>
          <p className={styles.dashboardSubtitle}>Here&apos;s an overview of your health journey</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/patient/appointments/new" className="btn btn-primary">
            <Calendar size={20} />
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Alert Banner */}
      <div className={styles.alertBanner}>
        <AlertCircle size={20} />
        <div>
          <strong>Medication Reminder:</strong> Your prescription for Lisinopril needs a refill in 5 days.
        </div>
        <Link href="/patient/medicines" className="btn btn-sm btn-outline">
          Order Now
        </Link>
      </div>

      {/* Health Metrics */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Health Metrics</h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Last updated: Today, 9:30 AM</span>
        </div>
        <div className={styles.statsGrid}>
          {healthMetrics.map((metric, index) => (
            <div key={index} className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles[metric.color]}`}>
                <metric.icon size={24} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>{metric.label}</span>
                <div className={styles.statValue}>
                  {metric.value}
                  <span className={styles.statUnit}>{metric.unit}</span>
                </div>
              </div>
              <div className={`${styles.statTrend} ${styles[metric.trend]}`}>
                <TrendingUp size={16} />
                Normal
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <div className={styles.dashboardGrid}>
        {/* Upcoming Appointments */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Upcoming Appointments</h3>
              <p className={styles.cardSubtitle}>Your scheduled visits</p>
            </div>
            <Link href="/patient/appointments" className={styles.viewAll}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className={styles.listItem}>
                <div className={`${styles.itemAvatar} ${styles.secondary}`}>
                  <span>{apt.avatar}</span>
                </div>
                <div className={styles.itemInfo}>
                  <h4>{apt.doctor}</h4>
                  <span>{apt.specialty}</span>
                  <div className={styles.itemMeta}>
                    <span><Calendar size={14} /> {apt.date}</span>
                    <span><Clock size={14} /> {apt.time}</span>
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <span className={`${styles.badge} ${styles.primary}`}>{apt.type}</span>
                  <button className="btn btn-ghost btn-sm" style={{ padding: '0.5rem' }}>
                    <Video size={18} />
                  </button>
                </div>
              </div>
            ))}

            <Link href="/patient/appointments/new" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '1rem',
              marginTop: '1rem',
              border: '2px dashed var(--gray-200)',
              borderRadius: '12px',
              color: 'var(--primary-600)',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}>
              <span>+ Schedule New Appointment</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Active Prescriptions */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Active Prescriptions</h3>
              <p className={styles.cardSubtitle}>Current medications</p>
            </div>
            <Link href="/patient/prescriptions" className={styles.viewAll}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {activePrescriptions.map((rx) => (
              <div key={rx.id} className={styles.listItem}>
                <div className={`${styles.itemIcon} ${styles.secondary}`}>
                  <Pill size={20} />
                </div>
                <div className={styles.itemInfo}>
                  <h4>{rx.medicine}</h4>
                  <span>{rx.dosage}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                  <span style={{
                    fontSize: '0.8125rem',
                    color: rx.refillSoon ? '#a16207' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    {rx.refillSoon && <AlertCircle size={14} />}
                    {rx.remaining} left
                  </span>
                  {rx.refillSoon && (
                    <button className="btn btn-sm btn-secondary">Refill</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Quick Actions</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.quickActionsGrid}>
              <Link href="/patient/appointments/new" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.primary}`}>
                  <Calendar size={24} />
                </div>
                <span>Book Appointment</span>
              </Link>
              <Link href="/patient/medicines" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.secondary}`}>
                  <Pill size={24} />
                </div>
                <span>Order Medicines</span>
              </Link>
              <Link href="/patient/records" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.accent}`}>
                  <FileText size={24} />
                </div>
                <span>View Reports</span>
              </Link>
              <Link href="/patient/billing" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.success}`}>
                  <CreditCard size={24} />
                </div>
                <span>Pay Bills</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Bills */}
        <section className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Recent Bills</h3>
              <p className={styles.cardSubtitle}>Payment history</p>
            </div>
            <Link href="/patient/billing" className={styles.viewAll}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {recentBills.map((bill) => (
              <div key={bill.id} className={styles.listItem}>
                <div className={`${styles.itemIcon} ${styles.primary}`}>
                  <CreditCard size={20} />
                </div>
                <div className={styles.itemInfo}>
                  <h4>{bill.description}</h4>
                  <span>{bill.date}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    ₹{bill.amount}
                  </span>
                  <span className={`${styles.badge} ${bill.status === 'paid' ? styles.success : styles.warning}`}>
                    {bill.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
