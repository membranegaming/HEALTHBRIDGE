"use client";

import { useState } from "react";
import {
    FileText,
    Search,
    Filter,
    Download,
    Calendar,
    User,
    Activity,
    Shield,
    Eye,
    AlertCircle,
    CheckCircle,
    Clock,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const auditLogs = [
    {
        id: 1,
        action: "Patient Record Accessed",
        user: "Dr. Sarah Johnson",
        role: "Doctor",
        target: "Patient: John Doe (P-2026-001)",
        timestamp: "Jan 16, 2026, 10:45 AM",
        ip: "192.168.1.105",
        status: "success",
        category: "access",
    },
    {
        id: 2,
        action: "Prescription Created",
        user: "Dr. Michael Chen",
        role: "Doctor",
        target: "Rx-2026-015 for Mary Smith",
        timestamp: "Jan 16, 2026, 10:30 AM",
        ip: "192.168.1.108",
        status: "success",
        category: "create",
    },
    {
        id: 3,
        action: "User Login",
        user: "Admin User",
        role: "Admin",
        target: "Admin Portal",
        timestamp: "Jan 16, 2026, 09:00 AM",
        ip: "192.168.1.1",
        status: "success",
        category: "auth",
    },
    {
        id: 4,
        action: "Failed Login Attempt",
        user: "Unknown",
        role: "N/A",
        target: "Patient Portal",
        timestamp: "Jan 16, 2026, 08:45 AM",
        ip: "203.45.67.89",
        status: "failed",
        category: "auth",
    },
    {
        id: 5,
        action: "Billing Record Modified",
        user: "Staff Priya",
        role: "Staff",
        target: "Invoice INV-2026-089",
        timestamp: "Jan 15, 2026, 05:30 PM",
        ip: "192.168.1.120",
        status: "success",
        category: "modify",
    },
    {
        id: 6,
        action: "Patient Data Export",
        user: "Dr. Sarah Johnson",
        role: "Doctor",
        target: "Patient: Robert Brown (P-2025-089)",
        timestamp: "Jan 15, 2026, 04:15 PM",
        ip: "192.168.1.105",
        status: "success",
        category: "export",
    },
    {
        id: 7,
        action: "System Settings Changed",
        user: "Admin User",
        role: "Admin",
        target: "Email Notification Settings",
        timestamp: "Jan 15, 2026, 02:00 PM",
        ip: "192.168.1.1",
        status: "success",
        category: "config",
    },
    {
        id: 8,
        action: "Unauthorized Access Attempt",
        user: "Staff Raj",
        role: "Staff",
        target: "Admin Dashboard",
        timestamp: "Jan 15, 2026, 11:30 AM",
        ip: "192.168.1.125",
        status: "blocked",
        category: "security",
    },
];

const categories = ["all", "auth", "access", "create", "modify", "export", "config", "security"];

export default function AuditPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [dateRange, setDateRange] = useState("today");

    const filteredLogs = auditLogs.filter((log) => {
        const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.target.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "success": return <CheckCircle size={16} style={{ color: 'var(--success)' }} />;
            case "failed": return <AlertCircle size={16} style={{ color: 'var(--error)' }} />;
            case "blocked": return <Shield size={16} style={{ color: 'var(--error)' }} />;
            default: return <Clock size={16} style={{ color: 'var(--text-muted)' }} />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "auth": return "var(--primary-600)";
            case "access": return "var(--secondary-600)";
            case "create": return "var(--success)";
            case "modify": return "#a16207";
            case "export": return "#8b5cf6";
            case "security": return "var(--error)";
            default: return "var(--text-muted)";
        }
    };

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Audit Logs</h1>
                    <p className={styles.dashboardSubtitle}>System activity and security logs</p>
                </div>
                <div className={styles.headerActions}>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        style={{
                            padding: '0.625rem 1rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--gray-200)',
                            borderRadius: '12px',
                            fontSize: '0.9375rem',
                        }}
                    >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    <button className="btn btn-outline">
                        <Download size={20} />
                        Export Logs
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <Activity size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Events</span>
                        <div className={styles.statValue}>{auditLogs.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Successful</span>
                        <div className={styles.statValue}>{auditLogs.filter(l => l.status === "success").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.error}`}>
                        <AlertCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Failed/Blocked</span>
                        <div className={styles.statValue}>{auditLogs.filter(l => l.status !== "success").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Shield size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Security Events</span>
                        <div className={styles.statValue}>{auditLogs.filter(l => l.category === "security").length}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem 0.875rem 3rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--gray-200)',
                            borderRadius: '12px',
                            fontSize: '0.9375rem',
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`btn btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logs Table */}
            <section className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>User</th>
                                    <th>Target</th>
                                    <th>Timestamp</th>
                                    <th>IP Address</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((log) => (
                                    <tr key={log.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: getCategoryColor(log.category),
                                                }} />
                                                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{log.action}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <p style={{ fontWeight: 500 }}>{log.user}</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.role}</span>
                                            </div>
                                        </td>
                                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {log.target}
                                        </td>
                                        <td style={{ fontSize: '0.8125rem' }}>{log.timestamp}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{log.ip}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                {getStatusIcon(log.status)}
                                                <span className={`${styles.badge} ${log.status === "success" ? styles.success :
                                                        log.status === "failed" ? styles.error :
                                                            styles.error
                                                    }`} style={{ textTransform: 'capitalize' }}>
                                                    {log.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
