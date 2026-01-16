"use client";

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Calendar,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download,
    BarChart3,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const kpis = [
    { label: "Total Revenue", value: "₹2.45 Cr", change: "+18.5%", trend: "up" },
    { label: "Patient Visits", value: "12,458", change: "+12.3%", trend: "up" },
    { label: "Avg. Wait Time", value: "15 min", change: "-8.2%", trend: "down" },
    { label: "Patient Satisfaction", value: "4.8/5", change: "+0.3", trend: "up" },
];

const departmentRevenue = [
    { name: "General Medicine", revenue: 5500000, percentage: 22 },
    { name: "Cardiology", revenue: 4500000, percentage: 18 },
    { name: "ICU", revenue: 6200000, percentage: 25 },
    { name: "Orthopedics", revenue: 3800000, percentage: 15 },
    { name: "Pediatrics", revenue: 2500000, percentage: 10 },
    { name: "Others", revenue: 2000000, percentage: 10 },
];

const monthlyStats = [
    { month: "Aug", patients: 2100, revenue: 18 },
    { month: "Sep", patients: 2300, revenue: 20 },
    { month: "Oct", patients: 2450, revenue: 21 },
    { month: "Nov", patients: 2600, revenue: 23 },
    { month: "Dec", patients: 2400, revenue: 22 },
    { month: "Jan", patients: 2800, revenue: 25 },
];

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState("30days");

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Analytics</h1>
                    <p className={styles.dashboardSubtitle}>Hospital performance insights</p>
                </div>
                <div className={styles.headerActions}>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        style={{
                            padding: '0.625rem 1rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--gray-200)',
                            borderRadius: '12px',
                            fontSize: '0.9375rem',
                        }}
                    >
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
                        <option value="year">This Year</option>
                    </select>
                    <button className="btn btn-outline">
                        <Download size={20} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className={styles.statsGrid}>
                {kpis.map((kpi, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>{kpi.label}</span>
                            <div className={styles.statValue}>{kpi.value}</div>
                        </div>
                        <div className={`${styles.statChange} ${styles[kpi.trend]}`}>
                            {kpi.trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            {kpi.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.dashboardGrid}>
                {/* Revenue Trend Chart Placeholder */}
                <section className={styles.card} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle}>Revenue & Patient Trends</h3>
                            <p className={styles.cardSubtitle}>Monthly comparison</p>
                        </div>
                    </div>
                    <div className={styles.cardBody}>
                        {/* Simple Bar Chart Visualization */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', height: '250px', paddingBottom: '2rem' }}>
                            {monthlyStats.map((stat, index) => (
                                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'flex-end', height: '180px' }}>
                                        <div style={{
                                            width: '24px',
                                            height: `${(stat.patients / 3000) * 180}px`,
                                            background: 'var(--primary-400)',
                                            borderRadius: '4px 4px 0 0',
                                        }} />
                                        <div style={{
                                            width: '24px',
                                            height: `${(stat.revenue / 30) * 180}px`,
                                            background: 'var(--secondary-400)',
                                            borderRadius: '4px 4px 0 0',
                                        }} />
                                    </div>
                                    <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{stat.month}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '12px', height: '12px', background: 'var(--primary-400)', borderRadius: '2px' }} />
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Patient Visits</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '12px', height: '12px', background: 'var(--secondary-400)', borderRadius: '2px' }} />
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Revenue (₹L)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Department Revenue */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Revenue by Department</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {departmentRevenue.map((dept, index) => (
                                <div key={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{dept.name}</span>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                            ₹{(dept.revenue / 100000).toFixed(1)}L ({dept.percentage}%)
                                        </span>
                                    </div>
                                    <div style={{ height: '8px', background: 'var(--gray-200)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${dept.percentage}%`,
                                            height: '100%',
                                            background: `hsl(${200 + index * 30}, 70%, 50%)`,
                                            borderRadius: '4px',
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Top Metrics */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Performance Metrics</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { label: "Bed Occupancy Rate", value: "82%", target: "85%", status: "warning" },
                                { label: "Doctor Utilization", value: "91%", target: "90%", status: "success" },
                                { label: "Emergency Response", value: "4.2 min", target: "5 min", status: "success" },
                                { label: "Surgery Success Rate", value: "98.5%", target: "98%", status: "success" },
                                { label: "Insurance Claims Approval", value: "87%", target: "90%", status: "warning" },
                            ].map((metric, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: '12px',
                                }}>
                                    <span style={{ fontWeight: 500 }}>{metric.label}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{metric.value}</span>
                                        <span className={`${styles.badge} ${metric.status === 'success' ? styles.success : styles.warning}`}>
                                            {metric.status === 'success' ? '✓' : '!'} {metric.target}
                                        </span>
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
