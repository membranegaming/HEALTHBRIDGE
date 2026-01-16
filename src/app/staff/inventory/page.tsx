"use client";

import { useState } from "react";
import {
    Package,
    Search,
    AlertTriangle,
    Plus,
    TrendingDown,
    CheckCircle,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const inventoryItems = [
    { id: 1, name: "Disposable Gloves (Box)", category: "Medical Supplies", stock: 45, minStock: 20, unit: "boxes", status: "ok" },
    { id: 2, name: "Face Masks (N95)", category: "Medical Supplies", stock: 12, minStock: 30, unit: "boxes", status: "low" },
    { id: 3, name: "Syringes (10ml)", category: "Medical Supplies", stock: 150, minStock: 100, unit: "pcs", status: "ok" },
    { id: 4, name: "Bandages (Roll)", category: "Medical Supplies", stock: 8, minStock: 25, unit: "rolls", status: "low" },
    { id: 5, name: "Cotton Swabs", category: "Medical Supplies", stock: 200, minStock: 50, unit: "pcs", status: "ok" },
    { id: 6, name: "Sanitizer (500ml)", category: "Hygiene", stock: 18, minStock: 15, unit: "bottles", status: "ok" },
    { id: 7, name: "Wheelchair", category: "Equipment", stock: 5, minStock: 3, unit: "units", status: "ok" },
    { id: 8, name: "Blood Pressure Monitor", category: "Equipment", stock: 2, minStock: 5, unit: "units", status: "low" },
];

export default function StaffInventoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showRequestModal, setShowRequestModal] = useState(false);

    const filteredItems = inventoryItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lowStockItems = inventoryItems.filter(i => i.status === "low");

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Inventory</h1>
                    <p className={styles.dashboardSubtitle}>View supplies and request restocking</p>
                </div>
                <div className={styles.headerActions}>
                    <button onClick={() => setShowRequestModal(true)} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}>
                        <Plus size={18} /> Request Supplies
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                        <Package size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Items</span>
                        <div className={styles.statValue}>{inventoryItems.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.error}`}>
                        <AlertTriangle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Low Stock</span>
                        <div className={styles.statValue}>{lowStockItems.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>In Stock</span>
                        <div className={styles.statValue}>{inventoryItems.filter(i => i.status === "ok").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <TrendingDown size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Pending Requests</span>
                        <div className={styles.statValue}>2</div>
                    </div>
                </div>
            </div>

            {/* Low Stock Alert */}
            {lowStockItems.length > 0 && (
                <div style={{
                    padding: '1rem 1.25rem', background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px',
                    marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                    <AlertTriangle size={20} style={{ color: 'var(--error)' }} />
                    <span style={{ color: 'var(--error)', fontWeight: 500 }}>
                        {lowStockItems.length} items are running low on stock and need restocking
                    </span>
                </div>
            )}

            {/* Search */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', maxWidth: '400px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search items..."
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

            {/* Inventory Table */}
            <section className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Current Stock</th>
                                    <th>Min. Required</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span style={{ fontWeight: 600 }}>{item.name}</span>
                                        </td>
                                        <td>{item.category}</td>
                                        <td>
                                            <span style={{ fontWeight: 600, color: item.status === "low" ? 'var(--error)' : 'var(--text-primary)' }}>
                                                {item.stock} {item.unit}
                                            </span>
                                        </td>
                                        <td>{item.minStock} {item.unit}</td>
                                        <td>
                                            <span className={`${styles.badge} ${item.status === "ok" ? styles.success : styles.error}`}>
                                                {item.status === "ok" ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                                                {item.status === "ok" ? "In Stock" : "Low Stock"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => setShowRequestModal(true)}
                                                disabled={item.status === "ok"}
                                            >
                                                Request
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Request Modal */}
            {showRequestModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }} onClick={() => setShowRequestModal(false)}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '20px',
                        padding: '2rem', maxWidth: '450px', width: '90%',
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Request Supplies</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Item</label>
                                <select style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}>
                                    <option>Select item...</option>
                                    {inventoryItems.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Quantity</label>
                                <input type="number" placeholder="Enter quantity" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Urgency</label>
                                <select style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}>
                                    <option value="normal">Normal</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Notes</label>
                                <textarea placeholder="Additional notes..." style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)', minHeight: '80px' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowRequestModal(false)}>Cancel</button>
                            <button className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }} onClick={() => setShowRequestModal(false)}>
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
