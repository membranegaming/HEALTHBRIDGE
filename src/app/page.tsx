"use client";

import Link from "next/link";
import {
  Calendar,
  FileText,
  Users,
  CreditCard,
  Shield,
  Pill,
  Clock,
  Heart,
  Star,
  ArrowRight,
  Stethoscope,
  Video,
  Ambulance,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <header className={styles.hero}>
        <nav className={styles.heroNav}>
          <Link href="/" className={styles.heroLogo}>
            <div className={styles.logoIcon}>
              <Heart size={28} />
            </div>
            <span>HealthBridge</span>
          </Link>
          <div className={styles.heroNavLinks}>
            <a href="#features">Features</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <Link href="/login" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
              Sign In
            </Link>
            <Link href="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </nav>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <Star size={16} fill="currentColor" />
              <span>Trusted by 500+ Healthcare Providers</span>
            </div>
            <h1 className={styles.heroTitle}>
              Your Complete<br />
              <span className={styles.gradientText}> Digital Health </span>
              Companion
            </h1>
            <p className={styles.heroSubtitle}>
              Streamline patient care, reduce wait times, and digitize your entire hospital workflow with HealthBridge — the complete hospital management platform.
            </p>
            <div className={styles.heroActions}>
              <Link href="/register" className="btn btn-lg btn-primary">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link href="/login" className="btn btn-lg btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                Book Demo
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>50K+</span>
                <span className={styles.heroStatLabel}>Patients Served</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>200+</span>
                <span className={styles.heroStatLabel}>Hospitals</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>99.9%</span>
                <span className={styles.heroStatLabel}>Uptime</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.dashboardPreview}>
              <div className={styles.previewHeader}>
                <div className={styles.previewDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>Patient Dashboard</span>
              </div>
              <div className={styles.previewContent}>
                <div className={styles.previewSidebar}>
                  <div className={`${styles.previewNavItem} ${styles.active}`}></div>
                  <div className={styles.previewNavItem}></div>
                  <div className={styles.previewNavItem}></div>
                  <div className={styles.previewNavItem}></div>
                </div>
                <div className={styles.previewMain}>
                  <div className={styles.previewCard}></div>
                  <div className={styles.previewCardsRow}>
                    <div className={`${styles.previewCard} ${styles.small}`}></div>
                    <div className={`${styles.previewCard} ${styles.small}`}></div>
                    <div className={`${styles.previewCard} ${styles.small}`}></div>
                  </div>
                  <div className={styles.previewTable}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Features</span>
          <h2>Everything You Need to Manage Healthcare</h2>
          <p>From appointment booking to prescription fulfillment, we&apos;ve got you covered.</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.primary}`}>
              <Calendar size={28} />
            </div>
            <h3>Smart Appointments</h3>
            <p>Real-time doctor availability, auto queue management, and instant token generation.</p>
            <ul className={styles.featureList}>
              <li>Online booking 24/7</li>
              <li>Smart wait time estimates</li>
              <li>Automated reminders</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.secondary}`}>
              <FileText size={28} />
            </div>
            <h3>Digital Consultations</h3>
            <p>Paperless consultations with digital prescriptions and medical history access.</p>
            <ul className={styles.featureList}>
              <li>E-prescriptions</li>
              <li>Voice-to-text notes</li>
              <li>Complete patient history</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.accent}`}>
              <Pill size={28} />
            </div>
            <h3>Medicine Ordering</h3>
            <p>One-click medicine ordering with smart reminders and refill alerts.</p>
            <ul className={styles.featureList}>
              <li>Home delivery</li>
              <li>Dosage reminders</li>
              <li>Auto refill alerts</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.success}`}>
              <CreditCard size={28} />
            </div>
            <h3>Seamless Billing</h3>
            <p>Transparent billing with multiple payment options and digital receipts.</p>
            <ul className={styles.featureList}>
              <li>UPI & cards accepted</li>
              <li>Installment plans</li>
              <li>Digital invoices</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.warning}`}>
              <Shield size={28} />
            </div>
            <h3>Insurance Claims</h3>
            <p>Cashless claim processing with real-time eligibility checks.</p>
            <ul className={styles.featureList}>
              <li>Pre-authorization</li>
              <li>Claim tracking</li>
              <li>Direct settlement</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.pink}`}>
              <Users size={28} />
            </div>
            <h3>Digital Consent</h3>
            <p>Legally compliant e-signatures for surgeries and high-risk procedures.</p>
            <ul className={styles.featureList}>
              <li>Aadhaar e-Sign</li>
              <li>Multi-language forms</li>
              <li>Secure storage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className={styles.portalsSection} id="services">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Role-Based Access</span>
          <h2>Tailored Dashboards for Everyone</h2>
          <p>Specialized interfaces designed for each user&apos;s needs.</p>
        </div>

        <div className={styles.portalsGrid}>
          <div className={`${styles.portalCard} ${styles.patient}`}>
            <div className={styles.portalIcon}>
              <Users size={36} />
            </div>
            <h3>Patient Portal</h3>
            <p>Book appointments, view prescriptions, manage health records, and track billing — all in one place.</p>
            <ul className={styles.portalFeatures}>
              <li><CheckCircle size={18} /> View upcoming appointments</li>
              <li><CheckCircle size={18} /> Download prescriptions</li>
              <li><CheckCircle size={18} /> Track health metrics</li>
              <li><CheckCircle size={18} /> Make payments online</li>
            </ul>
            <Link href="/patient/dashboard" className="btn btn-primary" style={{ width: '100%' }}>
              Explore Patient Portal
            </Link>
          </div>

          <div className={`${styles.portalCard} ${styles.doctor}`}>
            <div className={styles.portalIcon}>
              <Stethoscope size={36} />
            </div>
            <h3>Doctor Portal</h3>
            <p>Manage schedules, conduct consultations, create prescriptions, and access patient history efficiently.</p>
            <ul className={styles.portalFeatures}>
              <li><CheckCircle size={18} /> View patient queue</li>
              <li><CheckCircle size={18} /> Digital prescriptions</li>
              <li><CheckCircle size={18} /> Schedule management</li>
              <li><CheckCircle size={18} /> Patient records access</li>
            </ul>
            <Link href="/doctor/dashboard" className="btn btn-secondary" style={{ width: '100%' }}>
              Explore Doctor Portal
            </Link>
          </div>

          <div className={`${styles.portalCard} ${styles.admin}`}>
            <div className={styles.portalIcon}>
              <Shield size={36} />
            </div>
            <h3>Admin Portal</h3>
            <p>Comprehensive analytics, staff management, inventory control, and audit logs for complete oversight.</p>
            <ul className={styles.portalFeatures}>
              <li><CheckCircle size={18} /> Real-time analytics</li>
              <li><CheckCircle size={18} /> Staff management</li>
              <li><CheckCircle size={18} /> Revenue tracking</li>
              <li><CheckCircle size={18} /> Audit compliance</li>
            </ul>
            <Link href="/admin/dashboard" className="btn btn-outline" style={{ width: '100%' }}>
              Explore Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Extra Features */}
      <section className={styles.extraFeatures}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Coming Soon</span>
          <h2>Advanced Features</h2>
          <p>Next-generation healthcare technology at your fingertips.</p>
        </div>

        <div className={styles.extraGrid}>
          <div className={styles.extraCard}>
            <Video size={32} style={{ color: 'var(--primary-600)' }} />
            <h4>Telemedicine</h4>
            <p>Virtual consultations for remote patients</p>
          </div>
          <div className={styles.extraCard}>
            <Ambulance size={32} style={{ color: 'var(--error)' }} />
            <h4>Ambulance Booking</h4>
            <p>One-tap emergency ambulance dispatch</p>
          </div>
          <div className={styles.extraCard}>
            <Smartphone size={32} style={{ color: 'var(--secondary-600)' }} />
            <h4>ABDM Integration</h4>
            <p>ABHA ID & unified health records</p>
          </div>
          <div className={styles.extraCard}>
            <Clock size={32} style={{ color: 'var(--accent-purple)' }} />
            <h4>AI Symptom Checker</h4>
            <p>Smart appointment suggestions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Healthcare Experience?</h2>
          <p>Join thousands of patients and healthcare providers who trust HealthBridge.</p>
          <div className={styles.ctaActions}>
            <Link href="/register" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary-700)' }}>
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="btn btn-lg btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.heroLogo} style={{ color: 'white' }}>
              <div className={styles.logoIcon} style={{ background: 'var(--primary-600)' }}>
                <Heart size={24} />
              </div>
              <span>HealthBridge</span>
            </Link>
            <p>Your complete digital health companion for seamless healthcare management.</p>
          </div>

          <div className={styles.footerColumn}>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#demo">Request Demo</a>
          </div>

          <div className={styles.footerColumn}>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#careers">Careers</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>

          <div className={styles.footerColumn}>
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#hipaa">HIPAA Compliance</a>
            <a href="#security">Security</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 HealthBridge. All rights reserved. Made with ❤️ for better healthcare.</p>
        </div>
      </footer>
    </div>
  );
}
