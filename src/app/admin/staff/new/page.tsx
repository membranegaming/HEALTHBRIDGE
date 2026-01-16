"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Building,
    Calendar,
    Stethoscope,
    DollarSign,
    Save,
    Upload,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const departments = ["Cardiology", "General Medicine", "Pediatrics", "Orthopedics", "ICU", "Laboratory", "Emergency"];
const roles = ["Doctor", "Nurse", "Technician", "Administrator", "Receptionist", "Pharmacist"];

export default function NewStaffPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        specialization: "",
        experience: "",
        salary: "",
        joinDate: "",
        qualification: "",
        license: "",
        address: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save logic here
        router.push('/admin/staff');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.dashboard} style={{ maxWidth: '800px' }}>
            <div className={styles.dashboardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/staff" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className={styles.dashboardTitle}>Add New Staff</h1>
                        <p className={styles.dashboardSubtitle}>Create a new staff member profile</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Personal Information</h3>
                    </div>
                    <div className={styles.cardBody}>
                        {/* Profile Photo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '100px', height: '100px', borderRadius: '50%',
                                background: 'var(--gray-100)', border: '2px dashed var(--gray-300)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', flexDirection: 'column', gap: '0.25rem',
                            }}>
                                <Upload size={24} style={{ color: 'var(--text-muted)' }} />
                                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Upload</span>
                            </div>
                            <div>
                                <p style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Profile Photo</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>JPG, PNG up to 5MB</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <User size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />First Name *
                                </label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Last Name *</label>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Mail size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Email *
                                </label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Phone size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Phone *
                                </label>
                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Address</label>
                                <textarea name="address" value={formData.address} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)', minHeight: '80px' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Professional Information</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Stethoscope size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Role *
                                </label>
                                <select name="role" value={formData.role} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => <option key={role} value={role}>{role}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Building size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Department *
                                </label>
                                <select name="department" value={formData.department} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Specialization</label>
                                <input name="specialization" value={formData.specialization} onChange={handleChange}
                                    placeholder="e.g., Interventional Cardiology"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Experience</label>
                                <input name="experience" value={formData.experience} onChange={handleChange}
                                    placeholder="e.g., 10 years"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Qualification</label>
                                <input name="qualification" value={formData.qualification} onChange={handleChange}
                                    placeholder="e.g., MBBS, MD"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>License Number</label>
                                <input name="license" value={formData.license} onChange={handleChange}
                                    placeholder="Medical Council Registration"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <Calendar size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Join Date *
                                </label>
                                <input name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <DollarSign size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />Salary (₹/month)
                                </label>
                                <input name="salary" type="number" value={formData.salary} onChange={handleChange}
                                    placeholder="e.g., 150000"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--gray-200)', background: 'var(--bg-tertiary)' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Link href="/admin/staff" className="btn btn-outline">Cancel</Link>
                    <button type="submit" className="btn btn-primary">
                        <Save size={18} /> Add Staff Member
                    </button>
                </div>
            </form>
        </div>
    );
}
