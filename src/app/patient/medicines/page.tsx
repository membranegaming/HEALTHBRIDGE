"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Pill,
    Clock,
    AlertCircle,
    ShoppingCart,
    Bell,
    CheckCircle,
    Package,
    Calendar,
    Search,
    Filter,
    Plus,
    RefreshCw,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const activeMedicines = [
    {
        id: 1,
        name: "Metformin 500mg",
        dosage: "Twice daily after meals",
        prescribedBy: "Dr. Sarah Johnson",
        startDate: "Jan 5, 2026",
        endDate: "Feb 5, 2026",
        remaining: 15,
        total: 30,
        refillAvailable: true,
        category: "Diabetes",
    },
    {
        id: 2,
        name: "Lisinopril 10mg",
        dosage: "Once daily in morning",
        prescribedBy: "Dr. Sarah Johnson",
        startDate: "Jan 10, 2026",
        endDate: "Feb 10, 2026",
        remaining: 5,
        total: 30,
        refillAvailable: true,
        category: "Blood Pressure",
        urgent: true,
    },
    {
        id: 3,
        name: "Atorvastatin 20mg",
        dosage: "Once daily at bedtime",
        prescribedBy: "Dr. Michael Chen",
        startDate: "Dec 15, 2025",
        endDate: "Mar 15, 2026",
        remaining: 22,
        total: 90,
        refillAvailable: false,
        category: "Cholesterol",
    },
    {
        id: 4,
        name: "Vitamin D3 1000 IU",
        dosage: "Once daily with breakfast",
        prescribedBy: "Dr. Sarah Johnson",
        startDate: "Jan 1, 2026",
        endDate: "Apr 1, 2026",
        remaining: 45,
        total: 90,
        refillAvailable: true,
        category: "Supplements",
    },
];

const orderHistory = [
    { id: 1, date: "Jan 10, 2026", items: 3, total: 450, status: "delivered" },
    { id: 2, date: "Dec 25, 2025", items: 2, total: 280, status: "delivered" },
    { id: 3, date: "Dec 10, 2025", items: 4, total: 620, status: "delivered" },
];

const reminders = [
    { id: 1, medicine: "Metformin 500mg", time: "8:00 AM", taken: true },
    { id: 2, medicine: "Lisinopril 10mg", time: "8:00 AM", taken: true },
    { id: 3, medicine: "Metformin 500mg", time: "8:00 PM", taken: false },
    { id: 4, medicine: "Atorvastatin 20mg", time: "10:00 PM", taken: false },
];

export default function MedicinesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [cart, setCart] = useState<number[]>([]);

    const filteredMedicines = activeMedicines.filter((med) => {
        const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || med.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["all", ...new Set(activeMedicines.map((m) => m.category))];

    const addToCart = (id: number) => {
        if (!cart.includes(id)) {
            setCart([...cart, id]);
        }
    };

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Medicines</h1>
                    <p className={styles.dashboardSubtitle}>Manage your prescriptions and order refills</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/patient/medicines/cart" className="btn btn-outline" style={{ position: 'relative' }}>
                        <ShoppingCart size={20} />
                        Cart
                        {cart.length > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: 'var(--error)',
                                color: 'white',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <Pill size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Active Medicines</span>
                        <div className={styles.statValue}>{activeMedicines.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <AlertCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Need Refill</span>
                        <div className={styles.statValue}>{activeMedicines.filter(m => m.remaining <= 7).length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Doses Today</span>
                        <div className={styles.statValue}>2/4</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.secondary}`}>
                        <Package size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Orders This Month</span>
                        <div className={styles.statValue}>{orderHistory.length}</div>
                    </div>
                </div>
            </div>

            {/* Today's Reminders */}
            <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.cardHeader}>
                    <div>
                        <h3 className={styles.cardTitle}>Today&apos;s Schedule</h3>
                        <p className={styles.cardSubtitle}>Medication reminders for today</p>
                    </div>
                    <button className="btn btn-ghost btn-sm">
                        <Bell size={18} />
                        Set Reminders
                    </button>
                </div>
                <div className={styles.cardBody}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {reminders.map((reminder) => (
                            <div key={reminder.id} style={{
                                padding: '1rem',
                                background: reminder.taken ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-tertiary)',
                                border: `1px solid ${reminder.taken ? 'rgba(34, 197, 94, 0.2)' : 'var(--gray-200)'}`,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: reminder.taken ? 'var(--success)' : 'var(--gray-200)',
                                    color: reminder.taken ? 'white' : 'var(--text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {reminder.taken ? <CheckCircle size={20} /> : <Clock size={20} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.125rem' }}>{reminder.medicine}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{reminder.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search medicines..."
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
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Medicines */}
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h3 className={styles.cardTitle}>Active Prescriptions</h3>
                        <p className={styles.cardSubtitle}>{filteredMedicines.length} medicines</p>
                    </div>
                </div>
                <div className={styles.cardBody}>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {filteredMedicines.map((medicine) => (
                            <div key={medicine.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                padding: '1.25rem',
                                background: medicine.urgent ? 'rgba(239, 68, 68, 0.03)' : 'var(--bg-tertiary)',
                                border: `1px solid ${medicine.urgent ? 'rgba(239, 68, 68, 0.2)' : 'var(--gray-200)'}`,
                                borderRadius: '16px',
                            }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '12px',
                                    background: 'var(--secondary-100)',
                                    color: 'var(--secondary-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Pill size={28} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{medicine.name}</h4>
                                        <span className={`${styles.badge} ${styles.outline}`}>{medicine.category}</span>
                                        {medicine.urgent && (
                                            <span className={`${styles.badge} ${styles.error}`}>
                                                <AlertCircle size={12} /> Low Stock
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                        {medicine.dosage} • Prescribed by {medicine.prescribedBy}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Calendar size={14} />
                                            {medicine.startDate} - {medicine.endDate}
                                        </span>
                                        <span>
                                            {medicine.remaining} of {medicine.total} remaining
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div style={{ width: '120px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                                        <span>Supply</span>
                                        <span>{Math.round((medicine.remaining / medicine.total) * 100)}%</span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: 'var(--gray-200)',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            width: `${(medicine.remaining / medicine.total) * 100}%`,
                                            height: '100%',
                                            background: medicine.remaining <= 7 ? 'var(--error)' : 'var(--secondary-500)',
                                            borderRadius: '4px',
                                        }} />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {medicine.refillAvailable && (
                                        <button
                                            className={`btn btn-sm ${cart.includes(medicine.id) ? 'btn-success' : 'btn-secondary'}`}
                                            onClick={() => addToCart(medicine.id)}
                                            disabled={cart.includes(medicine.id)}
                                        >
                                            {cart.includes(medicine.id) ? (
                                                <><CheckCircle size={16} /> Added</>
                                            ) : (
                                                <><RefreshCw size={16} /> Refill</>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
