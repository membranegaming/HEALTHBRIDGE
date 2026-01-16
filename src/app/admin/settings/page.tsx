"use client";

import { useState } from "react";
import {
    Settings,
    Building,
    Clock,
    Bell,
    Shield,
    Database,
    Mail,
    Globe,
    Zap,
    Save,
    RefreshCw,
} from "lucide-react";
import styles from "../../dashboard.module.css";

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General", icon: Building },
        { id: "operations", label: "Operations", icon: Clock },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
        { id: "integrations", label: "Integrations", icon: Zap },
        { id: "backup", label: "Backup & Data", icon: Database },
    ];

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>System Settings</h1>
                    <p className={styles.dashboardSubtitle}>Configure hospital management system</p>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Tabs */}
                <section className={styles.card}>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.875rem 1rem',
                                        background: activeTab === tab.id ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        color: activeTab === tab.id ? '#7c3aed' : 'var(--text-secondary)',
                                        fontWeight: activeTab === tab.id ? 600 : 500,
                                    }}
                                >
                                    <tab.icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className={styles.card}>
                    <div className={styles.cardBody}>
                        {activeTab === "general" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>General Settings</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Hospital Name</label>
                                        <input type="text" defaultValue="HealthBridge Medical Center" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Contact Email</label>
                                            <input type="email" defaultValue="admin@healthbridge.com" style={{
                                                width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                                border: '1px solid var(--gray-200)', borderRadius: '10px',
                                            }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Contact Phone</label>
                                            <input type="tel" defaultValue="+91 1800 123 4567" style={{
                                                width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                                border: '1px solid var(--gray-200)', borderRadius: '10px',
                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Address</label>
                                        <textarea defaultValue="123 Healthcare Avenue, Medical District, Mumbai 400001" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px', minHeight: '80px',
                                        }} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Timezone</label>
                                            <select defaultValue="IST" style={{
                                                width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                                border: '1px solid var(--gray-200)', borderRadius: '10px',
                                            }}>
                                                <option value="IST">India Standard Time (IST)</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Currency</label>
                                            <select defaultValue="INR" style={{
                                                width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                                border: '1px solid var(--gray-200)', borderRadius: '10px',
                                            }}>
                                                <option value="INR">Indian Rupee (₹)</option>
                                                <option value="USD">US Dollar ($)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}><Save size={18} /> Save Changes</button>
                            </div>
                        )}

                        {activeTab === "operations" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Operating Hours</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                        <div key={day} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                        }}>
                                            <span style={{ fontWeight: 500, width: '100px' }}>{day}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <input type="time" defaultValue={day === "Sunday" ? "" : "08:00"} style={{
                                                    padding: '0.5rem', background: 'var(--bg-secondary)',
                                                    border: '1px solid var(--gray-200)', borderRadius: '8px',
                                                }} disabled={day === "Sunday"} />
                                                <span>to</span>
                                                <input type="time" defaultValue={day === "Sunday" ? "" : "20:00"} style={{
                                                    padding: '0.5rem', background: 'var(--bg-secondary)',
                                                    border: '1px solid var(--gray-200)', borderRadius: '8px',
                                                }} disabled={day === "Sunday"} />
                                            </div>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <input type="checkbox" defaultChecked={day !== "Sunday"} />
                                                <span>{day === "Sunday" ? "Closed" : "Open"}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}><Save size={18} /> Save Changes</button>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Notification Settings</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { label: "Email Notifications", desc: "Send email alerts to staff" },
                                        { label: "SMS Alerts", desc: "Send SMS for appointments" },
                                        { label: "Push Notifications", desc: "Browser push notifications" },
                                        { label: "Daily Reports", desc: "Send daily summary emails" },
                                        { label: "Inventory Alerts", desc: "Low stock notifications" },
                                    ].map((item) => (
                                        <div key={item.label} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                        }}>
                                            <div>
                                                <p style={{ fontWeight: 600 }}>{item.label}</p>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                                            </div>
                                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Security Settings</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Password Policy</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label><input type="checkbox" defaultChecked /> Minimum 8 characters</label>
                                            <label><input type="checkbox" defaultChecked /> Require uppercase and lowercase</label>
                                            <label><input type="checkbox" defaultChecked /> Require numbers</label>
                                            <label><input type="checkbox" defaultChecked /> Require special characters</label>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Session Settings</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span>Auto logout after</span>
                                            <select defaultValue="30" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
                                                <option value="15">15 minutes</option>
                                                <option value="30">30 minutes</option>
                                                <option value="60">1 hour</option>
                                            </select>
                                            <span>of inactivity</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "integrations" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Integrations</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { name: "SMS Gateway", status: "connected", provider: "Twilio" },
                                        { name: "Email Service", status: "connected", provider: "SendGrid" },
                                        { name: "Payment Gateway", status: "connected", provider: "Razorpay" },
                                        { name: "Lab Integration", status: "pending", provider: "Not configured" },
                                    ].map((integration) => (
                                        <div key={integration.name} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                        }}>
                                            <div>
                                                <h4 style={{ fontWeight: 600 }}>{integration.name}</h4>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{integration.provider}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span className={`${styles.badge} ${integration.status === 'connected' ? styles.success : styles.warning}`}>
                                                    {integration.status}
                                                </span>
                                                <button className="btn btn-sm btn-outline">Configure</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "backup" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Backup & Data</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Automatic Backups</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <select defaultValue="daily" style={{ padding: '0.75rem 1rem', borderRadius: '10px', flex: 1 }}>
                                                <option value="hourly">Every hour</option>
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                            </select>
                                            <span style={{ color: 'var(--text-muted)' }}>Last backup: Today, 3:00 AM</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button className="btn btn-outline" style={{ flex: 1 }}><RefreshCw size={18} /> Backup Now</button>
                                        <button className="btn btn-outline" style={{ flex: 1 }}><Database size={18} /> Restore</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
