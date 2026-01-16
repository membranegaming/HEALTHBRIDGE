"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    CreditCard,
    Wallet,
    Building,
    CheckCircle,
    Shield,
    Truck,
    Clock,
    MapPin,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const orderSummary = {
    items: [
        { name: "Metformin 500mg", quantity: 2, price: 245 },
        { name: "Lisinopril 10mg", quantity: 1, price: 180 },
        { name: "Vitamin D3 1000IU", quantity: 3, price: 350 },
    ],
    subtotal: 1320,
    discount: 132,
    delivery: 0,
    total: 1188,
};

export default function CheckoutPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking" | "cod">("card");
    const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
    const [upiId, setUpiId] = useState("");
    const [processing, setProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setOrderPlaced(true);
        }, 2000);
    };

    if (orderPlaced) {
        return (
            <div className={styles.dashboard} style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <CheckCircle size={56} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Order Placed!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Your order #ORD-2026-1234 has been placed successfully
                    </p>
                    <div style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                            <Truck size={20} style={{ color: 'var(--primary-600)' }} />
                            <span>Estimated delivery: <strong>Tomorrow, 10 AM - 2 PM</strong></span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/patient/medicines" className="btn btn-outline">Continue Shopping</Link>
                        <Link href="/patient/dashboard" className="btn btn-primary">Go to Dashboard</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard} style={{ maxWidth: '900px' }}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/patient/medicines/cart" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>Checkout</h1>
                        <p className={styles.dashboardSubtitle}>Complete your order</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
                {/* Payment Methods */}
                <div>
                    <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Delivery Address</h3>
                            <button className="btn btn-sm btn-outline">Change</button>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <MapPin size={20} style={{ color: 'var(--primary-600)', marginTop: '2px' }} />
                                <div>
                                    <p style={{ fontWeight: 600 }}>Home</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                        John Doe, +91 98765 43210<br />
                                        123 Main Street, Apt 4B, Mumbai 400001
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Payment Method</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {[
                                    { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
                                    { id: "upi", label: "UPI", icon: Wallet, desc: "GPay, PhonePe, Paytm" },
                                    { id: "netbanking", label: "Net Banking", icon: Building, desc: "All major banks" },
                                    { id: "cod", label: "Cash on Delivery", icon: Clock, desc: "Pay when you receive" },
                                ].map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '1rem', borderRadius: '12px', cursor: 'pointer',
                                            background: paymentMethod === method.id ? 'var(--primary-50)' : 'var(--bg-tertiary)',
                                            border: `2px solid ${paymentMethod === method.id ? 'var(--primary-400)' : 'transparent'}`,
                                        }}
                                    >
                                        <method.icon size={24} style={{ color: paymentMethod === method.id ? 'var(--primary-600)' : 'var(--text-muted)' }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 600 }}>{method.label}</p>
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{method.desc}</span>
                                        </div>
                                        <div style={{
                                            width: '20px', height: '20px', borderRadius: '50%',
                                            border: `2px solid ${paymentMethod === method.id ? 'var(--primary-600)' : 'var(--gray-300)'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            {paymentMethod === method.id && (
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-600)' }} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {paymentMethod === "card" && (
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Card Number</label>
                                            <input
                                                placeholder="1234 5678 9012 3456"
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)' }}
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Expiry</label>
                                                <input
                                                    placeholder="MM/YY"
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>CVV</label>
                                                <input
                                                    type="password"
                                                    placeholder="***"
                                                    value={cardDetails.cvv}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)' }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Name on Card</label>
                                            <input
                                                placeholder="John Doe"
                                                value={cardDetails.name}
                                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "upi" && (
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>UPI ID</label>
                                    <input
                                        placeholder="yourname@upi"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)' }}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Order Summary */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Order Summary</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                            {orderSummary.items.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{item.name} x{item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                <span>₹{orderSummary.subtotal}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                                <span>Discount</span>
                                <span>-₹{orderSummary.discount}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                                <span>{orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery}`}</span>
                            </div>
                            <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 700 }}>Total</span>
                                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary-700)' }}>₹{orderSummary.total}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                            <Shield size={18} style={{ color: 'var(--success)' }} />
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Secure payment with 256-bit encryption</span>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                            onClick={handlePayment}
                            disabled={processing}
                        >
                            {processing ? "Processing..." : `Pay ₹${orderSummary.total}`}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
