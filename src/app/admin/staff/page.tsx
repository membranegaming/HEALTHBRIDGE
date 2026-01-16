"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Filter,
    User,
    Phone,
    Mail,
    Calendar,
    Clock,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Stethoscope,
    Building,
    DollarSign,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const staff = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        role: "Cardiologist",
        department: "Cardiology",
        email: "sarah.j@hospital.com",
        phone: "+91 98765 43210",
        joinDate: "Jan 15, 2020",
        status: "active",
        patients: 145,
        salary: "₹2,50,000",
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        role: "General Physician",
        department: "General Medicine",
        email: "michael.c@hospital.com",
        phone: "+91 98765 43211",
        joinDate: "Mar 20, 2019",
        status: "active",
        patients: 230,
        salary: "₹1,80,000",
    },
    {
        id: 3,
        name: "Dr. Emily Davis",
        role: "Pediatrician",
        department: "Pediatrics",
        email: "emily.d@hospital.com",
        phone: "+91 98765 43212",
        joinDate: "Jun 1, 2021",
        status: "active",
        patients: 180,
        salary: "₹2,00,000",
    },
    {
        id: 4,
        name: "Nurse Priya Sharma",
        role: "Head Nurse",
        department: "ICU",
        email: "priya.s@hospital.com",
        phone: "+91 98765 43213",
        joinDate: "Sep 10, 2018",
        status: "active",
        salary: "₹65,000",
    },
    {
        id: 5,
        name: "Dr. Robert Wilson",
        role: "Orthopedic Surgeon",
        department: "Orthopedics",
        email: "robert.w@hospital.com",
        phone: "+91 98765 43214",
        joinDate: "Feb 28, 2022",
        status: "on-leave",
        patients: 95,
        salary: "₹3,00,000",
    },
    {
        id: 6,
        name: "Technician Raj Kumar",
        role: "Lab Technician",
        department: "Laboratory",
        email: "raj.k@hospital.com",
        phone: "+91 98765 43215",
        joinDate: "Nov 5, 2020",
        status: "active",
        salary: "₹45,000",
    },
];

const departments = ["All", "Cardiology", "General Medicine", "Pediatrics", "ICU", "Orthopedics", "Laboratory"];

export default function StaffPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredStaff = staff.filter((s) => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = departmentFilter === "All" || s.department === departmentFilter;
        const matchesStatus = statusFilter === "all" || s.status === statusFilter;
        return matchesSearch && matchesDept && matchesStatus;
    });

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Staff Management</h1>
                    <p className={styles.dashboardSubtitle}>{staff.length} team members</p>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline">
                        <Filter size={20} />
                        Export
                    </button>
                    <Link href="/admin/staff/new" className="btn btn-primary">
                        <Plus size={20} />
                        Add Staff
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <User size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Staff</span>
                        <div className={styles.statValue}>{staff.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}>
                        <Stethoscope size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Doctors</span>
                        <div className={styles.statValue}>{staff.filter(s => s.role.includes('Dr') || s.role.includes('Physician') || s.role.includes('Surgeon')).length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Active</span>
                        <div className={styles.statValue}>{staff.filter(s => s.status === "active").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>On Leave</span>
                        <div className={styles.statValue}>{staff.filter(s => s.status === "on-leave").length}</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by name or role..."
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
                <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    style={{
                        padding: '0.875rem 1rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--gray-200)',
                        borderRadius: '12px',
                        fontSize: '0.9375rem',
                        minWidth: '160px',
                    }}
                >
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {["all", "active", "on-leave"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-outline'}`}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {status.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Staff Table */}
            <section className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Staff Member</th>
                                    <th>Department</th>
                                    <th>Contact</th>
                                    <th>Join Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStaff.map((member) => (
                                    <tr key={member.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: 'var(--gradient-primary)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    fontSize: '0.8125rem',
                                                }}>
                                                    {member.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{member.name}</p>
                                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{member.role}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                                <Building size={14} />
                                                {member.department}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                <p style={{ fontSize: '0.8125rem' }}>{member.email}</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.phone}</span>
                                            </div>
                                        </td>
                                        <td>{member.joinDate}</td>
                                        <td>
                                            <span className={`${styles.badge} ${member.status === "active" ? styles.success : styles.warning}`}>
                                                {member.status === "active" ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {member.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn btn-ghost btn-sm"><Edit size={16} /></button>
                                                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
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
