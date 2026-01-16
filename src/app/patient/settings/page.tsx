"use client";

import { useState } from "react";
import {
    User,
    Bell,
    Lock,
    Shield,
    Globe,
    Moon,
    Smartphone,
    Save,
    Camera,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Heart,
    CheckCircle,
} from "lucide-react";
import styles from "../../dashboard.module.css";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [notifications, setNotifications] = useState({
        appointments: true,
        reminders: true,
        updates: false,
        marketing: false,
        sms: true,
        email: true,
    });

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Lock },
        { id: "privacy", label: "Privacy", icon: Shield },
        { id: "preferences", label: "Preferences", icon: Globe },
    ];

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Settings</h1>
                    <p className={styles.dashboardSubtitle}>Manage your account preferences</p>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Tabs Sidebar */}
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
                                        background: activeTab === tab.id ? 'var(--primary-50)' : 'transparent',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        width: '100%',
                                        textAlign: 'left',
                                        color: activeTab === tab.id ? 'var(--primary-700)' : 'var(--text-secondary)',
                                        fontWeight: activeTab === tab.id ? 600 : 500,
                                        transition: 'all 0.2s',
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
                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Profile Information</h3>

                                {/* Avatar */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        background: 'var(--gradient-primary)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        fontWeight: 700,
                                        position: 'relative',
                                    }}>
                                        JD
                                        <button style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'var(--bg-secondary)',
                                            border: '2px solid white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}>
                                            <Camera size={14} />
                                        </button>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>John Doe</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>Patient ID: P-2026-001</p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            <User size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                            Full Name
                                        </label>
                                        <input type="text" defaultValue="John Doe" style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)',
                                            borderRadius: '10px',
                                            fontSize: '0.9375rem',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            <Mail size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                            Email
                                        </label>
                                        <input type="email" defaultValue="john.doe@email.com" style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)',
                                            borderRadius: '10px',
                                            fontSize: '0.9375rem',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            <Phone size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                            Phone
                                        </label>
                                        <input type="tel" defaultValue="+91 98765 43210" style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)',
                                            borderRadius: '10px',
                                            fontSize: '0.9375rem',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            <Calendar size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                            Date of Birth
                                        </label>
                                        <input type="date" defaultValue="1981-05-15" style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)',
                                            borderRadius: '10px',
                                            fontSize: '0.9375rem',
                                        }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                            <MapPin size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                            Address
                                        </label>
                                        <textarea defaultValue="123 Main Street, Apt 4B, Mumbai, Maharashtra 400001" style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)',
                                            borderRadius: '10px',
                                            fontSize: '0.9375rem',
                                            resize: 'none',
                                            minHeight: '80px',
                                        }} />
                                    </div>
                                </div>

                                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === "notifications" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Notification Preferences</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { key: "appointments", label: "Appointment Reminders", desc: "Get notified about upcoming appointments" },
                                        { key: "reminders", label: "Medication Reminders", desc: "Reminders to take your medicines on time" },
                                        { key: "updates", label: "Health Updates", desc: "Tips and health-related updates" },
                                        { key: "marketing", label: "Promotional Emails", desc: "Special offers and promotions" },
                                    ].map((item) => (
                                        <div key={item.key} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem',
                                            background: 'var(--bg-tertiary)',
                                            borderRadius: '12px',
                                        }}>
                                            <div>
                                                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.label}</p>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                                            </div>
                                            <label style={{ position: 'relative', width: '48px', height: '28px', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={notifications[item.key as keyof typeof notifications]}
                                                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                                    style={{ opacity: 0, width: 0, height: 0 }}
                                                />
                                                <span style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: notifications[item.key as keyof typeof notifications] ? 'var(--primary-500)' : 'var(--gray-300)',
                                                    borderRadius: '14px',
                                                    transition: 'background 0.2s',
                                                }}>
                                                    <span style={{
                                                        position: 'absolute',
                                                        left: notifications[item.key as keyof typeof notifications] ? '24px' : '4px',
                                                        top: '4px',
                                                        width: '20px',
                                                        height: '20px',
                                                        background: 'white',
                                                        borderRadius: '50%',
                                                        transition: 'left 0.2s',
                                                    }} />
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '2rem 0 1rem' }}>Notification Channels</h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: notifications.sms ? 'var(--primary-50)' : 'var(--bg-tertiary)',
                                        border: `1px solid ${notifications.sms ? 'var(--primary-200)' : 'var(--gray-200)'}`,
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                    }} onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}>
                                        <Smartphone size={24} style={{ marginBottom: '0.5rem', color: notifications.sms ? 'var(--primary-600)' : 'var(--text-muted)' }} />
                                        <p style={{ fontWeight: 600 }}>SMS</p>
                                        {notifications.sms && <CheckCircle size={16} style={{ color: 'var(--success)', marginTop: '0.5rem' }} />}
                                    </div>
                                    <div style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: notifications.email ? 'var(--primary-50)' : 'var(--bg-tertiary)',
                                        border: `1px solid ${notifications.email ? 'var(--primary-200)' : 'var(--gray-200)'}`,
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                    }} onClick={() => setNotifications({ ...notifications, email: !notifications.email })}>
                                        <Mail size={24} style={{ marginBottom: '0.5rem', color: notifications.email ? 'var(--primary-600)' : 'var(--text-muted)' }} />
                                        <p style={{ fontWeight: 600 }}>Email</p>
                                        {notifications.email && <CheckCircle size={16} style={{ color: 'var(--success)', marginTop: '0.5rem' }} />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === "security" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Security Settings</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontWeight: 600 }}>Password</h4>
                                            <button className="btn btn-sm btn-outline">Change</button>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Last changed 30 days ago</p>
                                    </div>

                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontWeight: 600 }}>Two-Factor Authentication</h4>
                                            <span className={`${styles.badge} ${styles.success}`}>Enabled</span>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>SMS verification enabled</p>
                                    </div>

                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontWeight: 600 }}>Active Sessions</h4>
                                            <button className="btn btn-sm btn-outline" style={{ color: 'var(--error)' }}>Log out all</button>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>2 devices currently logged in</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === "privacy" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Privacy Settings</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                    Control how your health data is shared and who can access it.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Data Sharing</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                            Allow doctors to access your complete health history
                                        </p>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-sm btn-primary">All Doctors</button>
                                            <button className="btn btn-sm btn-outline">My Doctors Only</button>
                                            <button className="btn btn-sm btn-outline">Ask Each Time</button>
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Download My Data</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                            Export all your health records and data
                                        </p>
                                        <button className="btn btn-sm btn-outline">Request Export</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === "preferences" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>App Preferences</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <Moon size={20} />
                                                <div>
                                                    <h4 style={{ fontWeight: 600 }}>Dark Mode</h4>
                                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Use dark theme</span>
                                                </div>
                                            </div>
                                            <select style={{
                                                padding: '0.5rem 1rem',
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--gray-200)',
                                                borderRadius: '8px',
                                            }}>
                                                <option>System</option>
                                                <option>Light</option>
                                                <option>Dark</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <Globe size={20} />
                                                <div>
                                                    <h4 style={{ fontWeight: 600 }}>Language</h4>
                                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>App language</span>
                                                </div>
                                            </div>
                                            <select style={{
                                                padding: '0.5rem 1rem',
                                                background: 'var(--bg-secondary)',
                                                border: '1px solid var(--gray-200)',
                                                borderRadius: '8px',
                                            }}>
                                                <option>English</option>
                                                <option>Hindi</option>
                                                <option>Tamil</option>
                                                <option>Telugu</option>
                                            </select>
                                        </div>
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
