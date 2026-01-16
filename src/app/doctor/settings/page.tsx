"use client";

import { useState } from "react";
import {
    User,
    Bell,
    Lock,
    Clock,
    Calendar,
    Save,
    Camera,
    Stethoscope,
} from "lucide-react";
import styles from "../../dashboard.module.css";

export default function DoctorSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "schedule", label: "Schedule", icon: Calendar },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Lock },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h1 className={styles.dashboardTitle}>Settings</h1>
                    <p className={styles.dashboardSubtitle}>Manage your profile and preferences</p>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                <section className={styles.card}>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                        padding: '0.875rem 1rem',
                                        background: activeTab === tab.id ? 'var(--secondary-50)' : 'transparent',
                                        border: 'none', borderRadius: '12px', cursor: 'pointer',
                                        color: activeTab === tab.id ? 'var(--secondary-700)' : 'var(--text-secondary)',
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

                <section className={styles.card}>
                    <div className={styles.cardBody}>
                        {activeTab === "profile" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Doctor Profile</h3>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div style={{
                                        width: '100px', height: '100px', borderRadius: '50%',
                                        background: 'var(--gradient-secondary)', color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '2rem', fontWeight: 700, position: 'relative',
                                    }}>
                                        SJ
                                        <button style={{
                                            position: 'absolute', bottom: 0, right: 0,
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: 'var(--bg-secondary)', border: '2px solid white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        }}>
                                            <Camera size={14} />
                                        </button>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Dr. Sarah Johnson</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>Cardiologist • MCI: 123456</p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Full Name</label>
                                        <input type="text" defaultValue="Dr. Sarah Johnson" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Specialization</label>
                                        <input type="text" defaultValue="Cardiology" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email</label>
                                        <input type="email" defaultValue="sarah.johnson@hospital.com" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Phone</label>
                                        <input type="tel" defaultValue="+91 98765 43210" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Consultation Fee</label>
                                        <input type="text" defaultValue="₹1,500" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Experience</label>
                                        <input type="text" defaultValue="15 years" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Bio</label>
                                        <textarea defaultValue="Senior Cardiologist with 15+ years of experience in interventional cardiology and heart failure management." style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px', minHeight: '100px',
                                        }} />
                                    </div>
                                </div>
                                <button className="btn btn-secondary" style={{ marginTop: '1.5rem' }}><Save size={18} /> Save Changes</button>
                            </div>
                        )}

                        {activeTab === "schedule" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Working Schedule</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Slot Duration</label>
                                        <select defaultValue="30" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }}>
                                            <option value="15">15 minutes</option>
                                            <option value="30">30 minutes</option>
                                            <option value="45">45 minutes</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Buffer Time</label>
                                        <select defaultValue="5" style={{
                                            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--gray-200)', borderRadius: '10px',
                                        }}>
                                            <option value="0">No buffer</option>
                                            <option value="5">5 minutes</option>
                                            <option value="10">10 minutes</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                                        <div key={day} style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px',
                                        }}>
                                            <span style={{ fontWeight: 500, width: '100px' }}>{day}</span>
                                            <input type="time" defaultValue="09:00" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
                                            <span>-</span>
                                            <input type="time" defaultValue="13:00" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
                                            <span style={{ color: 'var(--text-muted)' }}>|</span>
                                            <input type="time" defaultValue="14:00" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
                                            <span>-</span>
                                            <input type="time" defaultValue="17:00" style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--gray-200)' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Notification Preferences</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { label: "New Appointments", desc: "Get notified for new bookings" },
                                        { label: "Cancellations", desc: "Alert when patients cancel" },
                                        { label: "Emergency Cases", desc: "High priority patient alerts" },
                                        { label: "Queue Updates", desc: "Patient queue notifications" },
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
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontWeight: 600 }}>Password</h4>
                                            <button className="btn btn-sm btn-outline">Change</button>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Last changed 45 days ago</p>
                                    </div>
                                    <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontWeight: 600 }}>Two-Factor Authentication</h4>
                                            <span className={`${styles.badge} ${styles.success}`}>Enabled</span>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Authenticator app enabled</p>
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
