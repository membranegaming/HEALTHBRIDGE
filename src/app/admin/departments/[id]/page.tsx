"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Building,
    Users,
    Stethoscope,
    Activity,
    TrendingUp,
    Phone,
    Mail,
    MapPin,
    Edit,
    UserPlus,
    Bed,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const departmentData = {
    id: 1,
    name: "Cardiology",
    head: "Dr. Sarah Johnson",
    headAvatar: "SJ",
    description: "Our Cardiology department provides comprehensive cardiovascular care including diagnosis, treatment, and prevention of heart diseases. We offer advanced cardiac imaging, interventional procedures, and rehabilitation programs.",
    phone: "+91 1800 123 001",
    email: "cardiology@hospital.com",
    floor: "3rd Floor, Block A",
    operatingHours: "24/7",
    stats: {
        doctors: 8,
        nurses: 12,
        beds: 30,
        occupancy: 85,
        patientsToday: 24,
        revenue: "₹45L",
    },
    staff: [
        { name: "Dr. Sarah Johnson", role: "Department Head", specialty: "Interventional Cardiology", avatar: "SJ" },
        { name: "Dr. Amit Patel", role: "Consultant", specialty: "Electrophysiology", avatar: "AP" },
        { name: "Dr. Priya Kumar", role: "Consultant", specialty: "Heart Failure", avatar: "PK" },
        { name: "Nurse Mary Thomas", role: "Head Nurse", specialty: "Cardiac Care", avatar: "MT" },
    ],
    services: [
        "Coronary Angiography",
        "Angioplasty & Stenting",
        "Pacemaker Implantation",
        "Echocardiography",
        "Cardiac Rehabilitation",
        "Heart Failure Management",
    ],
};

export default function DepartmentDetailPage() {
    const params = useParams();
    const router = useRouter();

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/departments" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>{departmentData.name}</h1>
                        <p className={styles.dashboardSubtitle}>Department Details</p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline"><UserPlus size={18} /> Add Staff</button>
                    <button className="btn btn-primary"><Edit size={18} /> Edit Department</button>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}><Stethoscope size={24} /></div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Doctors</span>
                        <div className={styles.statValue}>{departmentData.stats.doctors}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}><Users size={24} /></div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Nurses</span>
                        <div className={styles.statValue}>{departmentData.stats.nurses}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.accent}`}><Bed size={24} /></div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Beds</span>
                        <div className={styles.statValue}>{departmentData.stats.beds}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${departmentData.stats.occupancy >= 90 ? styles.error : styles.success}`}>
                        <Activity size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Occupancy</span>
                        <div className={styles.statValue}>{departmentData.stats.occupancy}%</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
                {/* Main Content */}
                <div>
                    {/* About */}
                    <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>About</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{departmentData.description}</p>
                        </div>
                    </section>

                    {/* Staff */}
                    <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Staff Members</h3>
                            <Link href="/admin/staff" className="btn btn-sm btn-outline">View All</Link>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {departmentData.staff.map((member, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                    }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '50%',
                                            background: 'var(--gradient-primary)', color: 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 700, fontSize: '0.875rem',
                                        }}>
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>{member.name}</p>
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                                {member.role} • {member.specialty}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Services */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Services Offered</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {departmentData.services.map((service, i) => (
                                    <span key={i} style={{
                                        padding: '0.5rem 1rem', background: 'var(--primary-50)',
                                        borderRadius: '20px', fontSize: '0.875rem', color: 'var(--primary-700)',
                                    }}>{service}</span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div>
                    {/* Contact */}
                    <section className={styles.card} style={{ marginBottom: '1rem' }}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Contact Information</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Phone size={18} style={{ color: 'var(--primary-600)' }} />
                                    <span>{departmentData.phone}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Mail size={18} style={{ color: 'var(--secondary-600)' }} />
                                    <span>{departmentData.email}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <MapPin size={18} style={{ color: 'var(--error)' }} />
                                    <span>{departmentData.floor}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Department Head */}
                    <section className={styles.card} style={{ marginBottom: '1rem' }}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Department Head</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%',
                                    background: 'var(--gradient-secondary)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: '1.25rem',
                                }}>
                                    {departmentData.headAvatar}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{departmentData.head}</p>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Senior Cardiologist</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Stats */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Today&apos;s Stats</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Patients Today</span>
                                    <span style={{ fontWeight: 700 }}>{departmentData.stats.patientsToday}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Monthly Revenue</span>
                                    <span style={{ fontWeight: 700, color: 'var(--success)' }}>{departmentData.stats.revenue}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Operating Hours</span>
                                    <span style={{ fontWeight: 700 }}>{departmentData.operatingHours}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
