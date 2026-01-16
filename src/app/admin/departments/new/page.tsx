"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Building,
    Users,
    Phone,
    MapPin,
    Save,
    Clock,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

export default function NewDepartmentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        head: "",
        description: "",
        floor: "",
        extension: "",
        email: "",
        beds: "",
        operatingHours: "24/7",
        specialties: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/admin/departments');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.dashboard} style={{ maxWidth: '700px' }}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/departments" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>Add New Department</h1>
                        <p className={styles.dashboardSubtitle}>Create a new hospital department</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Department Details</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Building size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Department Name *
                                </label>
                                <input name="name" value={formData.name} onChange={handleChange} required
                                    placeholder="e.g., Cardiology"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange}
                                    placeholder="Brief description of the department..."
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)', minHeight: '80px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Users size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Department Head *
                                </label>
                                <select name="head" value={formData.head} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                >
                                    <option value="">Select Doctor</option>
                                    <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                                    <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                                    <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                                    <option value="Dr. Robert Wilson">Dr. Robert Wilson</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Number of Beds</label>
                                <input name="beds" type="number" value={formData.beds} onChange={handleChange}
                                    placeholder="e.g., 30"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <MapPin size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Location
                                </label>
                                <input name="floor" value={formData.floor} onChange={handleChange}
                                    placeholder="e.g., 3rd Floor, Block A"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Clock size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Operating Hours
                                </label>
                                <select name="operatingHours" value={formData.operatingHours} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                >
                                    <option value="24/7">24/7</option>
                                    <option value="8AM-8PM">8 AM - 8 PM</option>
                                    <option value="9AM-5PM">9 AM - 5 PM</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Phone size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Extension
                                </label>
                                <input name="extension" value={formData.extension} onChange={handleChange}
                                    placeholder="e.g., 1001"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange}
                                    placeholder="e.g., cardiology@hospital.com"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Specialties/Services</label>
                                <input name="specialties" value={formData.specialties} onChange={handleChange}
                                    placeholder="e.g., Angioplasty, Pacemaker, Heart Surgery"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Link href="/admin/departments" className="btn btn-outline">Cancel</Link>
                    <button type="submit" className="btn btn-primary">
                        <Save size={18} /> Create Department
                    </button>
                </div>
            </form>
        </div>
    );
}
