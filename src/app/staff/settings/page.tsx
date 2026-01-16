"use client";

import { useState } from "react";
import {
    User,
    Bell,
    Shield,
    Moon,
    Volume2,
    Save,
} from "lucide-react";
import styles from "../../dashboard.module.css";

export default function StaffSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Settings</h1>
                    <p className={styles.dashboardSubtitle}>Manage your preferences</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Tabs */}
                <div style={{ width: '220px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {[
                            { id: "profile", label: "Profile", icon: User },
                            { id: "notifications", label: "Notifications", icon: Bell },
                            { id: "security", label: "Security", icon: Shield },
                            { id: "preferences", label: "Preferences", icon: Moon },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.875rem 1rem', borderRadius: '12px', border: 'none',
                                    background: activeTab === tab.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                                    color: activeTab === tab.id ? '#d97706' : 'var(--text-secondary)',
                                    fontWeight: activeTab === tab.id ? 600 : 500,
                                    cursor: 'pointer', textAlign: 'left', width: '100%',
                                }}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                    {activeTab === "profile" && (
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Profile Information</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: '1.75rem',
                                    }}>
                                        MS
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: '1.25rem' }}>Mary Smith</h3>
                                        <p style={{ color: 'var(--text-muted)' }}>Receptionist • Front Desk</p>
                                        <button className="btn btn-sm btn-outline" style={{ marginTop: '0.5rem' }}>Change Photo</button>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>First Name</label>
                                        <input defaultValue="Mary" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Last Name</label>
                                        <input defaultValue="Smith" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email</label>
                                        <input defaultValue="mary.smith@hospital.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Phone</label>
                                        <input defaultValue="+91 98765 43220" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}>
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </section>
                    )}

                    {activeTab === "notifications" && (
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Notification Settings</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { label: "New Appointment Alerts", desc: "Get notified when patients book appointments", enabled: true },
                                        { label: "Queue Updates", desc: "Alerts when patients check in", enabled: true },
                                        { label: "Emergency Alerts", desc: "Urgent notifications for emergencies", enabled: true },
                                        { label: "Shift Reminders", desc: "Reminders before your shift starts", enabled: false },
                                        { label: "Sound Notifications", desc: "Play sound for important alerts", enabled: true },
                                    ].map((setting, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                            <div>
                                                <p style={{ fontWeight: 600 }}>{setting.label}</p>
                                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{setting.desc}</span>
                                            </div>
                                            <label style={{ position: 'relative', width: '48px', height: '26px' }}>
                                                <input type="checkbox" defaultChecked={setting.enabled} style={{ display: 'none' }} />
                                                <span style={{
                                                    position: 'absolute', inset: 0, borderRadius: '13px', cursor: 'pointer',
                                                    background: setting.enabled ? '#f59e0b' : 'var(--gray-300)',
                                                    transition: 'background 0.3s',
                                                }}>
                                                    <span style={{
                                                        position: 'absolute', top: '3px', left: setting.enabled ? '25px' : '3px',
                                                        width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                                                        transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                    }} />
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === "security" && (
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Security Settings</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Change Password</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                                        <input type="password" placeholder="Current Password" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                                        <input type="password" placeholder="New Password" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                                        <input type="password" placeholder="Confirm New Password" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }} />
                                        <button className="btn btn-primary" style={{ width: 'fit-content', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderColor: 'transparent' }}>
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === "preferences" && (
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>Preferences</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Moon size={20} />
                                            <div>
                                                <p style={{ fontWeight: 600 }}>Dark Mode</p>
                                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Switch to dark theme</span>
                                            </div>
                                        </div>
                                        <label style={{ position: 'relative', width: '48px', height: '26px' }}>
                                            <input type="checkbox" style={{ display: 'none' }} />
                                            <span style={{ position: 'absolute', inset: 0, borderRadius: '13px', cursor: 'pointer', background: 'var(--gray-300)' }}>
                                                <span style={{ position: 'absolute', top: '3px', left: '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                                            </span>
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Volume2 size={20} />
                                            <div>
                                                <p style={{ fontWeight: 600 }}>Queue Sounds</p>
                                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Play sound when calling patients</span>
                                            </div>
                                        </div>
                                        <label style={{ position: 'relative', width: '48px', height: '26px' }}>
                                            <input type="checkbox" defaultChecked style={{ display: 'none' }} />
                                            <span style={{ position: 'absolute', inset: 0, borderRadius: '13px', cursor: 'pointer', background: '#f59e0b' }}>
                                                <span style={{ position: 'absolute', top: '3px', left: '25px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
