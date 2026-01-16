"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Trash2,
    Plus,
    Minus,
    ShoppingCart,
    CreditCard,
    Truck,
    MapPin,
    CheckCircle,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const initialCartItems = [
    { id: 1, name: "Metformin 500mg", quantity: 2, price: 245, image: "💊" },
    { id: 2, name: "Lisinopril 10mg", quantity: 1, price: 180, image: "💊" },
    { id: 3, name: "Vitamin D3 1000IU", quantity: 3, price: 350, image: "💊" },
];

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const total = subtotal - discount + deliveryFee;

    const applyPromo = () => {
        if (promoCode.toUpperCase() === "HEALTH10") {
            setDiscount(Math.round(subtotal * 0.1));
        }
    };

    return (
        <div className={styles.dashboard} style={{ maxWidth: '900px' }}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/patient/medicines" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>My Cart</h1>
                        <p className={styles.dashboardSubtitle}>{cartItems.length} items</p>
                    </div>
                </div>
            </div>

            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <ShoppingCart size={64} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Add medicines to your cart to order</p>
                    <Link href="/patient/medicines" className="btn btn-primary">Browse Medicines</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
                    {/* Cart Items */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Cart Items</h3>
                        </div>
                        <div className={styles.cardBody}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {cartItems.map((item) => (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: '12px',
                                    }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '12px',
                                            background: 'var(--primary-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                        }}>
                                            {item.image}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h4>
                                            <p style={{ color: 'var(--primary-600)', fontWeight: 700 }}>₹{item.price}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                style={{
                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                    border: '1px solid var(--gray-200)', background: 'var(--bg-secondary)',
                                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span style={{ width: '40px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                style={{
                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                    border: '1px solid var(--gray-200)', background: 'var(--bg-secondary)',
                                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <p style={{ fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>
                                            ₹{item.price * item.quantity}
                                        </p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="btn btn-ghost btn-sm"
                                            style={{ color: 'var(--error)' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Order Summary */}
                    <div>
                        <section className={styles.card} style={{ marginBottom: '1rem' }}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Delivery Address</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                    <MapPin size={20} style={{ color: 'var(--primary-600)', marginTop: '2px' }} />
                                    <div>
                                        <p style={{ fontWeight: 600 }}>Home</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                            123 Main Street, Apt 4B, Mumbai 400001
                                        </p>
                                    </div>
                                    <button className="btn btn-sm btn-outline" style={{ marginLeft: 'auto' }}>Change</button>
                                </div>
                            </div>
                        </section>

                        <section className={styles.card} style={{ marginBottom: '1rem' }}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Promo Code</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        style={{
                                            flex: 1, padding: '0.75rem', borderRadius: '10px',
                                            border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)',
                                        }}
                                    />
                                    <button className="btn btn-outline" onClick={applyPromo}>Apply</button>
                                </div>
                                {discount > 0 && (
                                    <p style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                        <CheckCircle size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                                        Promo applied! You saved ₹{discount}
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Order Summary</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                                            <span>Discount</span>
                                            <span>-₹{discount}</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                                        <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                                    </div>
                                    <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 700 }}>Total</span>
                                        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary-700)' }}>₹{total}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--secondary-50)', borderRadius: '10px' }}>
                                    <Truck size={18} style={{ color: 'var(--secondary-600)' }} />
                                    <span style={{ fontSize: '0.875rem', color: 'var(--secondary-700)' }}>
                                        {deliveryFee === 0 ? 'Free delivery on orders above ₹500!' : `Add ₹${500 - subtotal} more for free delivery`}
                                    </span>
                                </div>

                                <Link href="/patient/medicines/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    <CreditCard size={18} />
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}
