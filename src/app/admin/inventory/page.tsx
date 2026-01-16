"use client";

import { useState } from "react";
import {
    Package,
    Search,
    Plus,
    AlertCircle,
    Filter,
    Download,
    Edit,
    TrendingDown,
    CheckCircle,
    Pill,
    Syringe,
    TestTube,
    Box,
} from "lucide-react";
import styles from "../../dashboard.module.css";

const inventory = [
    { id: 1, name: "Paracetamol 500mg", category: "Medicine", stock: 5000, minStock: 1000, unit: "tablets", expiry: "Dec 2026", status: "in-stock" },
    { id: 2, name: "Amoxicillin 250mg", category: "Medicine", stock: 2500, minStock: 500, unit: "capsules", expiry: "Nov 2026", status: "in-stock" },
    { id: 3, name: "Insulin Glargine", category: "Medicine", stock: 150, minStock: 200, unit: "vials", expiry: "Jun 2026", status: "low-stock" },
    { id: 4, name: "Surgical Gloves (M)", category: "Supplies", stock: 800, minStock: 500, unit: "pairs", expiry: "N/A", status: "in-stock" },
    { id: 5, name: "IV Cannula 20G", category: "Supplies", stock: 120, minStock: 200, unit: "pieces", expiry: "N/A", status: "low-stock" },
    { id: 6, name: "N95 Masks", category: "Supplies", stock: 50, minStock: 100, unit: "pieces", expiry: "N/A", status: "critical" },
    { id: 7, name: "Blood Glucose Strips", category: "Lab", stock: 3000, minStock: 500, unit: "strips", expiry: "Sep 2026", status: "in-stock" },
    { id: 8, name: "Saline 0.9% 500ml", category: "IV Fluids", stock: 400, minStock: 200, unit: "bottles", expiry: "Mar 2027", status: "in-stock" },
    { id: 9, name: "Adrenaline 1mg/ml", category: "Emergency", stock: 25, minStock: 50, unit: "ampoules", expiry: "Aug 2026", status: "critical" },
    { id: 10, name: "Morphine 10mg/ml", category: "Controlled", stock: 80, minStock: 30, unit: "ampoules", expiry: "Jul 2026", status: "in-stock" },
];

const categories = ["All", "Medicine", "Supplies", "Lab", "IV Fluids", "Emergency", "Controlled"];

export default function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredInventory = inventory.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const lowStockCount = inventory.filter(i => i.status === "low-stock" || i.status === "critical").length;
    const criticalCount = inventory.filter(i => i.status === "critical").length;

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Medicine": return Pill;
            case "Lab": return TestTube;
            case "Emergency": return Syringe;
            default: return Box;
        }
    };

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Inventory Management</h1>
                    <p className={styles.dashboardSubtitle}>{inventory.length} items in stock</p>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-outline">
                        <Download size={20} />
                        Export
                    </button>
                    <button className="btn btn-primary">
                        <Plus size={20} />
                        Add Item
                    </button>
                </div>
            </div>

            {/* Alert Banner */}
            {criticalCount > 0 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '16px',
                    marginBottom: '1.5rem',
                    color: 'var(--error)',
                }}>
                    <AlertCircle size={24} />
                    <div style={{ flex: 1 }}>
                        <strong>{criticalCount} items are critically low!</strong>
                        <span style={{ marginLeft: '0.5rem', opacity: 0.8 }}>Immediate restocking required.</span>
                    </div>
                    <button className="btn btn-sm" style={{ background: 'var(--error)', color: 'white' }}>
                        View Critical Items
                    </button>
                </div>
            )}

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.primary}`}>
                        <Package size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Items</span>
                        <div className={styles.statValue}>{inventory.length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.success}`}>
                        <CheckCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>In Stock</span>
                        <div className={styles.statValue}>{inventory.filter(i => i.status === "in-stock").length}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.warning}`}>
                        <TrendingDown size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Low Stock</span>
                        <div className={styles.statValue}>{lowStockCount}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.error}`}>
                        <AlertCircle size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Critical</span>
                        <div className={styles.statValue}>{criticalCount}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search inventory..."
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
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                        padding: '0.875rem 1rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--gray-200)',
                        borderRadius: '12px',
                        fontSize: '0.9375rem',
                    }}
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {["all", "in-stock", "low-stock", "critical"].map((status) => (
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

            {/* Inventory Table */}
            <section className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Min. Stock</th>
                                    <th>Expiry</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInventory.map((item) => {
                                    const Icon = getCategoryIcon(item.category);
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        borderRadius: '8px',
                                                        background: 'var(--primary-100)',
                                                        color: 'var(--primary-600)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Icon size={18} />
                                                    </div>
                                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</span>
                                                </div>
                                            </td>
                                            <td>{item.category}</td>
                                            <td>
                                                <span style={{ fontWeight: 600 }}>{item.stock.toLocaleString()}</span>
                                                <span style={{ color: 'var(--text-muted)', marginLeft: '0.25rem' }}>{item.unit}</span>
                                            </td>
                                            <td>{item.minStock.toLocaleString()}</td>
                                            <td>{item.expiry}</td>
                                            <td>
                                                <span className={`${styles.badge} ${item.status === "in-stock" ? styles.success :
                                                        item.status === "low-stock" ? styles.warning :
                                                            styles.error
                                                    }`}>
                                                    {item.status.replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-sm btn-outline">Restock</button>
                                                    <button className="btn btn-ghost btn-sm"><Edit size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
