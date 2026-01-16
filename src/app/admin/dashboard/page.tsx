"use client";

import Link from "next/link";
import {
  Users,
  Stethoscope,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Building,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import styles from "../../dashboard.module.css";

// Mock data
const stats = [
  {
    label: "Total Patients",
    value: "12,458",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "primary"
  },
  {
    label: "Appointments Today",
    value: "148",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    color: "secondary"
  },
  {
    label: "Revenue (MTD)",
    value: "₹24.5L",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "success"
  },
  {
    label: "Active Doctors",
    value: "42",
    change: "-2",
    trend: "down",
    icon: Stethoscope,
    color: "accent"
  },
];

const recentPatients = [
  { id: 1, name: "Rahul Sharma", type: "Cardiology", time: "10 min ago", status: "checked-in" },
  { id: 2, name: "Priya Patel", type: "Orthopedics", time: "25 min ago", status: "in-consultation" },
  { id: 3, name: "Amit Kumar", type: "General", time: "40 min ago", status: "completed" },
  { id: 4, name: "Sneha Reddy", type: "Pediatrics", time: "1 hr ago", status: "completed" },
  { id: 5, name: "Vikram Singh", type: "Dermatology", time: "1.5 hrs ago", status: "completed" },
];

const departmentStats = [
  { name: "Cardiology", patients: 42, doctors: 8, revenue: "4.2L", trend: 12 },
  { name: "Orthopedics", patients: 38, doctors: 6, revenue: "3.8L", trend: 8 },
  { name: "Pediatrics", patients: 35, doctors: 5, revenue: "2.5L", trend: -3 },
  { name: "General Medicine", patients: 65, doctors: 12, revenue: "5.5L", trend: 15 },
  { name: "Dermatology", patients: 28, doctors: 4, revenue: "2.1L", trend: 5 },
];

const alerts = [
  { id: 1, type: "warning", message: "5 insurance claims pending approval", time: "2 hrs ago" },
  { id: 2, type: "info", message: "System maintenance scheduled for 2 AM", time: "5 hrs ago" },
  { id: 3, type: "error", message: "Pharmacy stock low on 12 items", time: "1 day ago" },
];

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          <p className={styles.dashboardSubtitle}>Overview of hospital operations</p>
        </div>
        <div className={styles.headerActions}>
          <select style={{
            padding: '0.5rem 1rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--gray-200)',
            borderRadius: '12px',
            fontSize: '0.9375rem',
            cursor: 'pointer'
          }}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles[stat.color]}`}>
              <stat.icon size={24} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
            <div className={`${styles.statChange} ${styles[stat.trend]}`}>
              {stat.trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={styles.dashboardGrid}>
        {/* Revenue Chart Placeholder */}
        <section className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Revenue Overview</h3>
              <p className={styles.cardSubtitle}>Monthly revenue trends</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.chartPlaceholder}>
              <Activity size={48} />
              <p>Revenue Chart</p>
              <span>Interactive chart visualization</span>
            </div>
          </div>
        </section>

        {/* Recent Patients */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Recent Patients</h3>
              <p className={styles.cardSubtitle}>Latest patient check-ins</p>
            </div>
            <Link href="/admin/patients" className={styles.viewAll}>
              View All
            </Link>
          </div>
          <div className={styles.cardBody}>
            {recentPatients.map((patient) => (
              <div key={patient.id} className={styles.listItem}>
                <div className={`${styles.itemAvatar} ${styles.primary}`} style={{ width: '40px', height: '40px', fontSize: '0.8125rem' }}>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.itemInfo}>
                  <h4>{patient.name}</h4>
                  <span>{patient.type}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`${styles.badge} ${patient.status === 'checked-in' ? styles.primary :
                      patient.status === 'in-consultation' ? styles.warning :
                        styles.success
                    }`} style={{ marginBottom: '0.25rem', display: 'block' }}>
                    {patient.status.replace('-', ' ')}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{patient.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Department Performance */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Department Performance</h3>
              <p className={styles.cardSubtitle}>This month&apos;s statistics</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Patients</th>
                    <th>Doctors</th>
                    <th>Revenue</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentStats.map((dept, index) => (
                    <tr key={index}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                          <Building size={16} />
                          {dept.name}
                        </div>
                      </td>
                      <td>{dept.patients}</td>
                      <td>{dept.doctors}</td>
                      <td>₹{dept.revenue}</td>
                      <td>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: dept.trend >= 0 ? 'var(--success)' : 'var(--error)'
                        }}>
                          {dept.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {Math.abs(dept.trend)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section className={styles.card} style={{ gridColumn: 'span 2' }}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>System Alerts</h3>
              <p className={styles.cardSubtitle}>Important notifications</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {alerts.map((alert) => (
                <div key={alert.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: alert.type === 'warning' ? 'rgba(234, 179, 8, 0.1)' :
                    alert.type === 'info' ? 'rgba(59, 130, 246, 0.1)' :
                      'rgba(239, 68, 68, 0.1)',
                  color: alert.type === 'warning' ? '#a16207' :
                    alert.type === 'info' ? 'var(--primary-600)' :
                      'var(--error)'
                }}>
                  <AlertCircle size={20} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>{alert.message}</p>
                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
