"use client";

import { useState } from "react";
import Link from "next/link";
import {
    CreditCard,
    Download,
    FileText,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    Filter,
    ChevronRight,
    Receipt,
    Wallet,
    TrendingUp,
    IndianRupee,
    Shield,
    Plus,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const bills = [
    {
        id: "INV-2026-001",
        date: "Jan 15, 2026",
        description: "Consultation - Dr. Sarah Johnson",
        department: "Cardiology",
        amount: 1500,
        status: "pending",
        dueDate: "Jan 22, 2026",
    },
    {
        id: "INV-2026-002",
        date: "Jan 12, 2026",
        description: "Lab Tests - Complete Blood Count, Lipid Profile",
        department: "Laboratory",
        amount: 2200,
        status: "pending",
        dueDate: "Jan 19, 2026",
    },
    {
        id: "INV-2025-089",
        date: "Jan 10, 2026",
        description: "Consultation - Dr. Sarah Johnson",
        department: "Cardiology",
        amount: 1500,
        status: "paid",
        paidDate: "Jan 10, 2026",
    },
    {
        id: "INV-2025-088",
        date: "Jan 5, 2026",
        description: "X-Ray - Chest",
        department: "Radiology",
        amount: 800,
        status: "paid",
        paidDate: "Jan 5, 2026",
    },
    {
        id: "INV-2025-085",
        date: "Dec 28, 2025",
        description: "ECG Test",
        department: "Cardiology",
        amount: 500,
        status: "paid",
        paidDate: "Dec 28, 2025",
    },
    {
        id: "INV-2025-082",
        date: "Dec 20, 2025",
        description: "Consultation - Dr. Michael Chen",
        department: "General Medicine",
        amount: 1200,
        status: "paid",
        paidDate: "Dec 20, 2025",
    },
];

const insuranceClaims = [
    { id: "CLM-001", amount: 15000, status: "approved", date: "Jan 5, 2026" },
    { id: "CLM-002", amount: 8500, status: "processing", date: "Jan 10, 2026" },
    { id: "CLM-003", amount: 3200, status: "pending", date: "Jan 15, 2026" },
];

const paymentMethods = [
    { id: 1, type: "card", last4: "4532", brand: "Visa", default: true },
    { id: 2, type: "upi", upiId: "john@okaxis", default: false },
];

export default function BillingPage() {
    const [filter, setFilter] = useState<"all" | "pending" | "paid">("all");
    const [selectedBills, setSelectedBills] = useState<string[]>([]);

    const filteredBills = bills.filter((bill) => {
        if (filter === "all") return true;
        return bill.status === filter;
    });

    const totalPending = bills.filter(b => b.status === "pending").reduce((sum, b) => sum + b.amount, 0);
    const totalPaid = bills.filter(b => b.status === "paid").reduce((sum, b) => sum + b.amount, 0);

    const toggleBillSelection = (id: string) => {
        if (selectedBills.includes(id)) {
            setSelectedBills(selectedBills.filter(b => b !== id));
        } else {
            setSelectedBills([...selectedBills, id]);
        }
    };

    const selectedTotal = bills
        .filter(b => selectedBills.includes(b.id) && b.status === "pending")
        .reduce((sum, b) => sum + b.amount, 0);

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Billing & Payments</h1>
                    <p className={styles.dashboardSubtitle}>Manage your medical bills and payments</p>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline">
                        <Download size={20} />
                        Download Statement
                    </button>
                    {selectedBills.length > 0 && (
                        <button className="btn btn-primary">
                            <CreditCard size={20} />
                            Pay ₹{selectedTotal.toLocaleString()}
                        </button>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Pending Amount</span>
                        <div className={styles.statValue}>₹{totalPending.toLocaleString()}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Paid This Month</span>
                        <div className={styles.statValue}>₹{totalPaid.toLocaleString()}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <TrendingUp size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Insurance Claims</span>
                        <div className={styles.statValue}>₹26,700</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.accent}`}>
                        <Wallet size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Wallet Balance</span>
                        <div className={styles.statValue}>₹2,500</div>
                    </div>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Bills List */}
                <section className={styles.card} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle}>All Bills</h3>
                            <p className={styles.cardSubtitle}>{filteredBills.length} bills found</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {(["all", "pending", "paid"] as const).map((f) => (
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
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '40px' }}></th>
                                        <th>Invoice</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBills.map((bill) => (
                                        <tr key={bill.id}>
                                            <td>
                                                {bill.status === "pending" && (
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBills.includes(bill.id)}
                                                        onChange={() => toggleBillSelection(bill.id)}
                                                        style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>{bill.id}</span>
                                            </td>
                                            <td>
                                                <div>
                                                    <p style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.125rem' }}>{bill.description}</p>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bill.department}</span>
                                                </div>
                                            </td>
                                            <td>{bill.date}</td>
                                            <td>
                                                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{bill.amount.toLocaleString()}</span>
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${bill.status === "paid" ? styles.success : styles.warning}`}>
                                                    {bill.status === "paid" ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                    {bill.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-ghost btn-sm">
                                                        <FileText size={16} />
                                                    </button>
                                                    <button className="btn btn-ghost btn-sm">
                                                        <Download size={16} />
                                                    </button>
                                                    {bill.status === "pending" && (
                                                        <button className="btn btn-sm btn-primary">Pay</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Payment Methods */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Payment Methods</h3>
                        <Link href="/patient/billing/payment-methods" className="btn btn-ghost btn-sm">Manage</Link>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {paymentMethods.map((method) => (
                                <div key={method.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: method.default ? 'var(--primary-50)' : 'var(--bg-tertiary)',
                                    border: `1px solid ${method.default ? 'var(--primary-200)' : 'var(--gray-200)'}`,
                                    borderRadius: '12px',
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: 'var(--bg-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <CreditCard size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        {method.type === "card" ? (
                                            <>
                                                <p style={{ fontWeight: 600 }}>{method.brand} •••• {method.last4}</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expires 12/27</span>
                                            </>
                                        ) : (
                                            <>
                                                <p style={{ fontWeight: 600 }}>UPI</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{method.upiId}</span>
                                            </>
                                        )}
                                    </div>
                                    {method.default && (
                                        <span className={`${styles.badge} ${styles.primary}`}>Default</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Insurance Claims */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Insurance Claims</h3>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link href="/patient/billing/claims/new" className="btn btn-sm btn-primary">
                                <Plus size={14} /> File Claim
                            </Link>
                            <Link href="/patient/billing/insurance" className="btn btn-sm btn-outline">
                                <Shield size={14} /> Manage
                            </Link>
                        </div>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {insuranceClaims.map((claim) => (
                                <div key={claim.id} className={styles.listItem}>
                                    <div className={`${styles.itemIcon} ${styles.primary}`}>
                                        <Receipt size={20} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4>{claim.id}</h4>
                                        <span>{claim.date}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>₹{claim.amount.toLocaleString()}</p>
                                        <span className={`${styles.badge} ${claim.status === "approved" ? styles.success :
                                            claim.status === "processing" ? styles.primary :
                                                styles.warning
                                            }`}>
                                            {claim.status}
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
