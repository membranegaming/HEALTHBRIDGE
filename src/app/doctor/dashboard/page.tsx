"use client";

import Link from "next/link";
import {
  Users,
  Clock,
  Calendar,
  TrendingUp,
  ChevronRight,
  Play,
  FileText,
  CheckCircle,
  UserCheck,
  Stethoscope,
} from "lucide-react";
import styles from "../../dashboard.module.css";

// Mock data
const queuePatients = [
  { id: 1, name: "John Doe", token: "A-001", type: "Follow-up", waitTime: "5 min", priority: "normal" },
  { id: 2, name: "Mary Smith", token: "A-002", type: "Consultation", waitTime: "12 min", priority: "priority" },
  { id: 3, name: "Robert Brown", token: "A-003", type: "Check-up", waitTime: "18 min", priority: "normal" },
  { id: 4, name: "Emily Davis", token: "E-001", type: "Emergency", waitTime: "2 min", priority: "emergency" },
];

const todayStats = [
  { label: "Patients Seen", value: "12", change: "+3", trend: "up", icon: UserCheck, color: "primary" },
  { label: "In Queue", value: "8", change: "", trend: "", icon: Clock, color: "warning" },
  { label: "Appointments Today", value: "18", change: "", trend: "", icon: Calendar, color: "secondary" },
  { label: "Avg. Consultation", value: "15m", change: "-2m", trend: "down", icon: TrendingUp, color: "success" },
];

const upcomingAppointments = [
  { id: 1, patient: "Alice Johnson", time: "11:30 AM", type: "Follow-up", avatar: "AJ" },
  { id: 2, patient: "David Wilson", time: "12:00 PM", type: "New Patient", avatar: "DW" },
  { id: 3, patient: "Lisa Anderson", time: "12:30 PM", type: "Check-up", avatar: "LA" },
  { id: 4, patient: "Mark Taylor", time: "2:00 PM", type: "Consultation", avatar: "MT" },
];

const recentPrescriptions = [
  { id: 1, patient: "John Doe", date: "Today, 10:15 AM", medicines: 3 },
  { id: 2, patient: "Sarah Lee", date: "Today, 9:30 AM", medicines: 2 },
  { id: 3, patient: "Mike Chen", date: "Yesterday", medicines: 4 },
];

export default function DoctorDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Good Morning, Dr. Johnson! 👋</h1>
          <p className={styles.dashboardSubtitle}>You have 8 patients waiting in the queue</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/doctor/queue" className="btn btn-secondary">
            <Play size={20} />
            Start Consultation
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {todayStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles[stat.color]}`}>
              <stat.icon size={24} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
            {stat.change && (
              <span className={`${styles.statChange} ${styles[stat.trend]}`}>
                {stat.change}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={styles.dashboardGrid}>
        {/* Patient Queue */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Patient Queue</h3>
              <p className={styles.cardSubtitle}>Current waiting patients</p>
            </div>
            <Link href="/doctor/queue" className={styles.viewAll}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.queueHeader}>
              <span className={styles.queueLabel}>Now Serving</span>
              <div className={styles.queueCurrent}>
                <div className={styles.currentToken}>A-000</div>
                <span>Break Time</span>
              </div>
            </div>

            <div className={styles.queueList}>
              {queuePatients.map((patient) => (
                <div key={patient.id} className={`${styles.queueItem} ${styles[patient.priority]}`}>
                  <div>
                    <span className={`${styles.tokenBadge} ${patient.priority === 'emergency' ? styles.emergency : patient.priority === 'priority' ? styles.priorityToken : ''}`}>
                      {patient.token}
                    </span>
                  </div>
                  <div className={styles.itemInfo}>
                    <h4>{patient.name}</h4>
                    <span>{patient.type}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} />
                    <span>{patient.waitTime}</span>
                  </div>
                  <button className="btn btn-sm btn-secondary">
                    <Play size={16} />
                    Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Today&apos;s Schedule</h3>
              <p className={styles.cardSubtitle}>Upcoming appointments</p>
            </div>
            <Link href="/doctor/schedule" className={styles.viewAll}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className={styles.listItem}>
                <div style={{ width: '80px', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{apt.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div className={`${styles.itemAvatar} ${styles.primary}`} style={{ width: '40px', height: '40px' }}>
                    {apt.avatar}
                  </div>
                  <div className={styles.itemInfo}>
                    <h4>{apt.patient}</h4>
                    <span className={`${styles.badge} ${styles.outline}`}>{apt.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Quick Actions</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.quickActionsGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <Link href="/doctor/queue" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.secondary}`}>
                  <Stethoscope size={24} />
                </div>
                <span>Start Consultation</span>
              </Link>
              <Link href="/doctor/prescriptions/new" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.primary}`}>
                  <FileText size={24} />
                </div>
                <span>New Prescription</span>
              </Link>
              <Link href="/doctor/patients" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.accent}`}>
                  <Users size={24} />
                </div>
                <span>View Patients</span>
              </Link>
              <Link href="/doctor/schedule" className={styles.quickAction}>
                <div className={`${styles.quickActionIcon} ${styles.warning}`}>
                  <Calendar size={24} />
                </div>
                <span>Manage Schedule</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Prescriptions */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Recent Prescriptions</h3>
              <p className={styles.cardSubtitle}>Latest prescriptions written</p>
            </div>
            <Link href="/doctor/prescriptions" className={styles.viewAll}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.cardBody}>
            {recentPrescriptions.map((rx) => (
              <div key={rx.id} className={styles.listItem}>
                <div className={`${styles.itemIcon} ${styles.secondary}`}>
                  <FileText size={20} />
                </div>
                <div className={styles.itemInfo}>
                  <h4>{rx.patient}</h4>
                  <span>{rx.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span>{rx.medicines} medicines</span>
                  <CheckCircle size={16} style={{ color: 'var(--success)' }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
