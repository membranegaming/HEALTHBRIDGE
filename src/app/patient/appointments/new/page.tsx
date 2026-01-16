"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  CheckCircle,
  Search,
  Star,
  MapPin,
  Video,
  Building,
} from "lucide-react";
import styles from "../../../dashboard.module.css";

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", experience: "15 years", rating: 4.9, reviews: 245, fee: 1500, avatar: "SJ", available: true, nextSlot: "Today, 2:00 PM" },
  { id: 2, name: "Dr. Michael Chen", specialty: "General Physician", experience: "10 years", rating: 4.8, reviews: 189, fee: 1200, avatar: "MC", available: true, nextSlot: "Today, 4:30 PM" },
  { id: 3, name: "Dr. Emily Davis", specialty: "Dermatologist", experience: "8 years", rating: 4.7, reviews: 156, fee: 1800, avatar: "ED", available: true, nextSlot: "Tomorrow, 10:00 AM" },
  { id: 4, name: "Dr. Robert Wilson", specialty: "Orthopedic", experience: "20 years", rating: 4.9, reviews: 312, fee: 2000, avatar: "RW", available: false, nextSlot: "Jan 20" },
  { id: 5, name: "Dr. Priya Sharma", specialty: "Pediatrician", experience: "12 years", rating: 4.8, reviews: 278, fee: 1400, avatar: "PS", available: true, nextSlot: "Today, 5:00 PM" },
];

const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
];

const specialties = ["All", "Cardiologist", "General Physician", "Dermatologist", "Orthopedic", "Pediatrician"];

export default function NewAppointmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<"in-person" | "video">("in-person");
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [reason, setReason] = useState("");

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === "All" || doc.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleSubmit = () => {
    // Simulate booking
    router.push('/patient/appointments?booked=true');
  };

  return (
    <div className={styles.dashboard} style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/patient/appointments" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className={styles.dashboardTitle}>Book Appointment</h1>
            <p className={styles.dashboardSubtitle}>
              {step === 1 && "Select a doctor"}
              {step === 2 && "Choose date & time"}
              {step === 3 && "Confirm booking"}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'var(--bg-secondary)',
        borderRadius: '16px',
        border: '1px solid var(--gray-200)',
      }}>
        {[
          { num: 1, label: "Select Doctor" },
          { num: 2, label: "Date & Time" },
          { num: 3, label: "Confirm" },
        ].map((s, i) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: step >= s.num ? 'var(--primary-600)' : 'var(--gray-200)',
                color: step >= s.num ? 'white' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}>
                {step > s.num ? <CheckCircle size={20} /> : s.num}
              </div>
              <span style={{
                fontWeight: step === s.num ? 600 : 500,
                color: step >= s.num ? 'var(--text-primary)' : 'var(--text-muted)',
              }}>
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div style={{
                width: '60px',
                height: '2px',
                background: step > s.num ? 'var(--primary-600)' : 'var(--gray-200)',
                borderRadius: '1px',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <div>
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search doctors..."
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
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              style={{
                padding: '0.875rem 1rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--gray-200)',
                borderRadius: '12px',
                fontSize: '0.9375rem',
              }}
            >
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Doctors List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  background: selectedDoctor?.id === doctor.id ? 'var(--primary-50)' : 'var(--bg-secondary)',
                  border: `2px solid ${selectedDoctor?.id === doctor.id ? 'var(--primary-400)' : 'var(--gray-200)'}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--gradient-secondary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>
                  {doctor.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>{doctor.name}</h3>
                    {!doctor.available && (
                      <span className={`${styles.badge} ${styles.warning}`}>Unavailable</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    {doctor.specialty} • {doctor.experience}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ca8a04' }}>
                      <Star size={14} fill="currentColor" /> {doctor.rating} ({doctor.reviews})
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Next: {doctor.nextSlot}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-700)' }}>₹{doctor.fee}</p>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Consultation</span>
                </div>
                {selectedDoctor?.id === doctor.id && (
                  <CheckCircle size={24} style={{ color: 'var(--primary-600)' }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button
              className="btn btn-primary"
              disabled={!selectedDoctor}
              onClick={() => setStep(2)}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div>
          {/* Appointment Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Appointment Type
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div
                onClick={() => setAppointmentType("in-person")}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: appointmentType === "in-person" ? 'var(--primary-50)' : 'var(--bg-secondary)',
                  border: `2px solid ${appointmentType === "in-person" ? 'var(--primary-400)' : 'var(--gray-200)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Building size={24} style={{ color: appointmentType === "in-person" ? 'var(--primary-600)' : 'var(--text-muted)' }} />
                <div>
                  <p style={{ fontWeight: 600 }}>In-Person Visit</p>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Visit the clinic</span>
                </div>
              </div>
              <div
                onClick={() => setAppointmentType("video")}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: appointmentType === "video" ? 'var(--primary-50)' : 'var(--bg-secondary)',
                  border: `2px solid ${appointmentType === "video" ? 'var(--primary-400)' : 'var(--gray-200)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Video size={24} style={{ color: appointmentType === "video" ? 'var(--primary-600)' : 'var(--text-muted)' }} />
                <div>
                  <p style={{ fontWeight: 600 }}>Video Consultation</p>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Online meeting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Select Date
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {getWeekDates().map((date, i) => {
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                const isToday = i === 0;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    style={{
                      minWidth: '90px',
                      padding: '1rem',
                      background: isSelected ? 'var(--primary-600)' : 'var(--bg-secondary)',
                      border: `1px solid ${isSelected ? 'var(--primary-600)' : 'var(--gray-200)'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{
                      fontSize: '0.75rem',
                      color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
                      marginBottom: '0.25rem',
                    }}>
                      {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: isSelected ? 'white' : 'var(--text-primary)',
                    }}>
                      {date.getDate()}
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
                    }}>
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Select Time
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  style={{
                    padding: '0.875rem',
                    background: selectedTime === slot.time ? 'var(--primary-600)' :
                      !slot.available ? 'var(--gray-100)' : 'var(--bg-secondary)',
                    border: `1px solid ${selectedTime === slot.time ? 'var(--primary-600)' : 'var(--gray-200)'}`,
                    borderRadius: '10px',
                    cursor: slot.available ? 'pointer' : 'not-allowed',
                    color: selectedTime === slot.time ? 'white' :
                      !slot.available ? 'var(--text-muted)' : 'var(--text-primary)',
                    fontWeight: 500,
                    textDecoration: !slot.available ? 'line-through' : 'none',
                  }}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>
              <ArrowLeft size={18} /> Back
            </button>
            <button
              className="btn btn-primary"
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(3)}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && selectedDoctor && selectedDate && (
        <div>
          <section className={styles.card} style={{ marginBottom: '1.5rem' }}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Appointment Summary</h3>
            </div>
            <div className={styles.cardBody}>
              {/* Doctor Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--gray-200)' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--gradient-secondary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}>
                  {selectedDoctor.avatar}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700 }}>{selectedDoctor.name}</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{selectedDoctor.specialty}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-100)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date</span>
                    <p style={{ fontWeight: 600 }}>{formatDate(selectedDate)}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--secondary-100)', color: 'var(--secondary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Time</span>
                    <p style={{ fontWeight: 600 }}>{selectedTime}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {appointmentType === "video" ? <Video size={20} /> : <Building size={20} />}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type</span>
                    <p style={{ fontWeight: 600 }}>{appointmentType === "video" ? "Video Consultation" : "In-Person Visit"}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ₹
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fee</span>
                    <p style={{ fontWeight: 600 }}>₹{selectedDoctor.fee}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reason */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Reason for Visit (Optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe your symptoms or reason for the appointment..."
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--gray-200)',
                borderRadius: '12px',
                minHeight: '100px',
                resize: 'none',
                fontSize: '0.9375rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-outline" onClick={() => setStep(2)}>
              <ArrowLeft size={18} /> Back
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              <CheckCircle size={18} /> Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
