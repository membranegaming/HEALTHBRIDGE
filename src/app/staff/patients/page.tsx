"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users,
    Plus,
    Search,
    Phone,
    Mail,
    Calendar,
    FileText,
    Edit,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const patients = [
    { id: 1, name: "John Doe", age: 45, gender: "Male", phone: "+91 98765 43210", email: "john@email.com", lastVisit: "Jan 15, 2026", bloodGroup: "O+" },
    { id: 2, name: "Jane Smith", age: 32, gender: "Female", phone: "+91 98765 43211", email: "jane@email.com", lastVisit: "Jan 14, 2026", bloodGroup: "A+" },
    { id: 3, name: "Robert Brown", age: 58, gender: "Male", phone: "+91 98765 43212", email: "robert@email.com", lastVisit: "Jan 10, 2026", bloodGroup: "B+" },
    { id: 4, name: "Maria Garcia", age: 28, gender: "Female", phone: "+91 98765 43213", email: "maria@email.com", lastVisit: "Jan 12, 2026", bloodGroup: "AB-" },
    { id: 5, name: "Alex Johnson", age: 41, gender: "Male", phone: "+91 98765 43214", email: "alex@email.com", lastVisit: "Jan 8, 2026", bloodGroup: "O-" },
    { id: 6, name: "Emily Chen", age: 35, gender: "Female", phone: "+91 98765 43215", email: "emily@email.com", lastVisit: "Jan 5, 2026", bloodGroup: "A-" },
];

export default function StaffPatientsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Patients</h1>
                    <p className={styles.dashboardSubtitle}>{patients.length} registered patients</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/staff/patients/register" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}>
                        <Plus size={18} /> Register Patient
                    </Link>
                </div>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', maxWidth: '400px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by name, phone, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '0.875rem 1rem 0.875rem 3rem',
                            background: 'var(--bg-secondary)', border: '1px solid var(--gray-200)',
                            borderRadius: '12px', fontSize: '0.9375rem',
                        }}
                    />
                </div>
            </div>

            {/* Patients Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
                {filteredPatients.map((patient) => (
                    <div key={patient.id} className={styles.card} style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: '1.125rem', flexShrink: 0,
                            }}>
                                {patient.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{patient.name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                    {patient.age} yrs • {patient.gender} • {patient.bloodGroup}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <Phone size={14} /> {patient.phone}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <Mail size={14} /> {patient.email}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                        <Calendar size={14} /> Last visit: {patient.lastVisit}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                            <button className="btn btn-sm btn-outline" style={{ flex: 1 }}><FileText size={14} /> Records</button>
                            <button className="btn btn-sm btn-outline" style={{ flex: 1 }}><Edit size={14} /> Edit</button>
                            <Link href="/staff/appointments/new" className="btn btn-sm" style={{ flex: 1, background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', border: 'none', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <Calendar size={14} /> Book
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
