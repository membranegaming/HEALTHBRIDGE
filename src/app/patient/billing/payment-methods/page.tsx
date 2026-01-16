"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    CreditCard,
    Building,
    Shield,
    Plus,
    CheckCircle,
    Trash2,
    Star,
    Edit,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const existingPaymentMethods = [
    { id: 1, type: "card", name: "HDFC Credit Card", last4: "4532", expiry: "12/27", isDefault: true, brand: "Visa" },
    { id: 2, type: "card", name: "SBI Debit Card", last4: "8721", expiry: "03/26", isDefault: false, brand: "Mastercard" },
    { id: 3, type: "upi", name: "UPI - GPay", upiId: "john@okaxis", isDefault: false },
];

const insurancePolicies = [
    { id: 1, provider: "Star Health Insurance", policyNumber: "STH-2025-789456", coverage: 1000000, status: "active" },
];

export default function PaymentMethodsPage() {
    const router = useRouter();
    const [methods, setMethods] = useState(existingPaymentMethods);
    const [policies, setPolicies] = useState(insurancePolicies);
    const [showAddCard, setShowAddCard] = useState(false);
    const [showAddUPI, setShowAddUPI] = useState(false);
    const [showAddInsurance, setShowAddInsurance] = useState(false);

    const [newCard, setNewCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
    const [newUPI, setNewUPI] = useState("");
    const [newInsurance, setNewInsurance] = useState({ provider: "", policyNumber: "", coverage: "", validTill: "" });

    const addCard = () => {
        if (newCard.number && newCard.name && newCard.expiry) {
            setMethods([...methods, {
                id: Date.now(),
                type: "card",
                name: newCard.name,
                last4: newCard.number.slice(-4),
                expiry: newCard.expiry,
                isDefault: false,
                brand: "Visa",
            }]);
            setNewCard({ number: "", name: "", expiry: "", cvv: "" });
            setShowAddCard(false);
        }
    };

    const addUPI = () => {
        if (newUPI) {
            setMethods([...methods, {
                id: Date.now(),
                type: "upi",
                name: `UPI - ${newUPI.split("@")[0]}`,
                upiId: newUPI,
                isDefault: false,
            }]);
            setNewUPI("");
            setShowAddUPI(false);
        }
    };

    const addInsurance = () => {
        if (newInsurance.provider && newInsurance.policyNumber) {
            setPolicies([...policies, {
                id: Date.now(),
                provider: newInsurance.provider,
                policyNumber: newInsurance.policyNumber,
                coverage: parseInt(newInsurance.coverage) || 500000,
                status: "active",
            }]);
            setNewInsurance({ provider: "", policyNumber: "", coverage: "", validTill: "" });
            setShowAddInsurance(false);
        }
    };

    const setDefault = (id: number) => {
        setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
    };

    const removeMethod = (id: number) => {
        setMethods(methods.filter(m => m.id !== id));
    };

    const removePolicy = (id: number) => {
        setPolicies(policies.filter(p => p.id !== id));
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/patient/billing" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>Payment Methods</h1>
                        <p className={styles.dashboardSubtitle}>Manage your payment options and insurance</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Cards & UPI */}
                <div>
                    <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Cards & UPI</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-sm btn-outline" onClick={() => setShowAddCard(true)}>
                                    <CreditCard size={16} /> Add Card
                                </button>
                                <button className="btn btn-sm btn-outline" onClick={() => setShowAddUPI(true)}>
                                    <Building size={16} /> Add UPI
                                </button>
                            </div>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {methods.map((method) => (
                                    <div key={method.id} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                        border: method.isDefault ? '2px solid var(--primary-400)' : '1px solid transparent',
                                    }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '12px',
                                            background: method.type === 'card' ? 'var(--gradient-primary)' : 'var(--gradient-secondary)',
                                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            {method.type === 'card' ? <CreditCard size={24} /> : <Building size={24} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <p style={{ fontWeight: 600 }}>{method.name}</p>
                                                {method.isDefault && (
                                                    <span className={`${styles.badge} ${styles.primary}`}>Default</span>
                                                )}
                                            </div>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                {method.type === 'card' ? `•••• ${method.last4} | Exp: ${method.expiry}` : method.upiId}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {!method.isDefault && (
                                                <button
                                                    className="btn btn-sm btn-outline"
                                                    onClick={() => setDefault(method.id)}
                                                    title="Set as default"
                                                >
                                                    <Star size={14} />
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-outline"
                                                style={{ color: 'var(--error)' }}
                                                onClick={() => removeMethod(method.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Insurance Policies */}
                <div>
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Insurance Policies</h3>
                            <button className="btn btn-sm btn-primary" onClick={() => setShowAddInsurance(true)}>
                                <Shield size={16} /> Add Insurance
                            </button>
                        </div>
                        <div className={styles.cardBody}>
                            {policies.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    <Shield size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                    <p>No insurance policies added</p>
                                    <p style={{ fontSize: '0.875rem' }}>Add your insurance to pay bills with claims</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {policies.map((policy) => (
                                        <div key={policy.id} style={{
                                            padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                            border: '1px solid var(--gray-200)',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                                <div style={{
                                                    width: '48px', height: '48px', borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <Shield size={24} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                        <p style={{ fontWeight: 600 }}>{policy.provider}</p>
                                                        <span className={`${styles.badge} ${styles.success}`}>{policy.status}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                                        Policy: {policy.policyNumber}
                                                    </p>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--primary-600)', fontWeight: 600 }}>
                                                        Coverage: ₹{(policy.coverage / 100000).toFixed(0)} Lakhs
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn btn-sm btn-outline"><Edit size={14} /></button>
                                                    <button
                                                        className="btn btn-sm btn-outline"
                                                        style={{ color: 'var(--error)' }}
                                                        onClick={() => removePolicy(policy.id)}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--success)', fontWeight: 500 }}>
                                    💡 Tip: When paying bills, you can select "Insurance Claim" as payment method to file a claim directly.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Add Card Modal */}
            {showAddCard && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }} onClick={() => setShowAddCard(false)}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '20px',
                        padding: '2rem', maxWidth: '450px', width: '90%',
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Add Credit/Debit Card</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Card Number</label>
                                <input
                                    placeholder="1234 5678 9012 3456"
                                    value={newCard.number}
                                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Name on Card</label>
                                <input
                                    placeholder="John Doe"
                                    value={newCard.name}
                                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Expiry</label>
                                    <input
                                        placeholder="MM/YY"
                                        value={newCard.expiry}
                                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>CVV</label>
                                    <input
                                        type="password"
                                        placeholder="***"
                                        value={newCard.cvv}
                                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddCard(false)}>Cancel</button>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={addCard}>
                                <Plus size={16} /> Add Card
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add UPI Modal */}
            {showAddUPI && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }} onClick={() => setShowAddUPI(false)}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '20px',
                        padding: '2rem', maxWidth: '400px', width: '90%',
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Add UPI ID</h3>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>UPI ID</label>
                            <input
                                placeholder="yourname@upi"
                                value={newUPI}
                                onChange={(e) => setNewUPI(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddUPI(false)}>Cancel</button>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={addUPI}>
                                <Plus size={16} /> Add UPI
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Insurance Modal */}
            {showAddInsurance && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }} onClick={() => setShowAddInsurance(false)}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '20px',
                        padding: '2rem', maxWidth: '500px', width: '90%',
                    }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Add Insurance Policy</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Insurance Provider *</label>
                                <select
                                    value={newInsurance.provider}
                                    onChange={(e) => setNewInsurance({ ...newInsurance, provider: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                >
                                    <option value="">Select Provider</option>
                                    <option value="Star Health Insurance">Star Health Insurance</option>
                                    <option value="ICICI Lombard">ICICI Lombard</option>
                                    <option value="HDFC Ergo">HDFC Ergo</option>
                                    <option value="Max Bupa">Max Bupa</option>
                                    <option value="Bajaj Allianz">Bajaj Allianz</option>
                                    <option value="Niva Bupa">Niva Bupa</option>
                                    <option value="Care Health">Care Health</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Policy Number *</label>
                                <input
                                    placeholder="e.g., STH-2025-123456"
                                    value={newInsurance.policyNumber}
                                    onChange={(e) => setNewInsurance({ ...newInsurance, policyNumber: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Coverage Amount (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 1000000"
                                        value={newInsurance.coverage}
                                        onChange={(e) => setNewInsurance({ ...newInsurance, coverage: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Valid Till</label>
                                    <input
                                        type="date"
                                        value={newInsurance.validTill}
                                        onChange={(e) => setNewInsurance({ ...newInsurance, validTill: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                    />
                                </div>
                            </div>
                            <div style={{ padding: '0.75rem', background: 'var(--primary-50)', borderRadius: '10px' }}>
                                <p style={{ fontSize: '0.8125rem', color: 'var(--primary-700)' }}>
                                    ℹ️ Your insurance will be verified within 24 hours. You can use it to pay hospital bills via insurance claims.
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddInsurance(false)}>Cancel</button>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={addInsurance}>
                                <Shield size={16} /> Add Insurance
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
