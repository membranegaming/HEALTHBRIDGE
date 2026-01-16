"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Phone,
  Calendar,
  AlertCircle,
  Check
} from "lucide-react";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError("Please enter your full name");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/patient/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        {/* Left Panel - Branding */}
        <div className={styles.authBranding}>
          <div className={styles.brandingContent}>
            <Link href="/" className={styles.brandingLogo}>
              <div className={styles.logoIcon}>
                <Heart size={32} />
              </div>
              <span>HealthBridge</span>
            </Link>
            <h1 className={styles.brandingTitle}>Join HealthBridge</h1>
            <p className={styles.brandingSubtitle}>
              Create your account and take control of your healthcare journey today.
            </p>

            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>📅</div>
                <div className={styles.benefitInfo}>
                  <strong>Easy Appointments</strong>
                  <span>Book with any doctor in seconds</span>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>💊</div>
                <div className={styles.benefitInfo}>
                  <strong>Digital Prescriptions</strong>
                  <span>Access your medicines anytime</span>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>📋</div>
                <div className={styles.benefitInfo}>
                  <strong>Health Records</strong>
                  <span>All your reports in one place</span>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🔒</div>
                <div className={styles.benefitInfo}>
                  <strong>Secure & Private</strong>
                  <span>Your data is always protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className={styles.authFormPanel}>
          <div className={styles.authFormContainer}>
            <div className={styles.authHeader}>
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

            {/* Progress Steps */}
            <div className={styles.progressSteps}>
              <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ""} ${step > 1 ? styles.completed : ""}`}>
                <div className={styles.stepNumber}>{step > 1 ? <Check size={16} /> : "1"}</div>
                <span>Personal Info</span>
              </div>
              <div className={styles.progressLine}></div>
              <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ""}`}>
                <div className={styles.stepNumber}>2</div>
                <span>Account Setup</span>
              </div>
            </div>

            {error && (
              <div className={styles.authError}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              {step === 1 && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name</label>
                    <div className={styles.inputWithIcon}>
                      <User size={20} className={styles.inputIcon} />
                      <input
                        type="text"
                        className={styles.formInput}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <div className={styles.inputWithIcon}>
                      <Mail size={20} className={styles.inputIcon} />
                      <input
                        type="email"
                        className={styles.formInput}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <div className={styles.inputWithIcon}>
                      <Phone size={20} className={styles.inputIcon} />
                      <input
                        type="tel"
                        className={styles.formInput}
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Date of Birth</label>
                      <div className={styles.inputWithIcon}>
                        <Calendar size={20} className={styles.inputIcon} />
                        <input
                          type="date"
                          className={styles.formInput}
                          value={formData.dateOfBirth}
                          onChange={(e) => updateForm("dateOfBirth", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Gender</label>
                      <select
                        className={styles.formInput}
                        value={formData.gender}
                        onChange={(e) => updateForm("gender", e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>

                  <button type="button" onClick={handleNext} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    Continue
                    <ArrowRight size={20} />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Create Password</label>
                    <div className={styles.inputWithIcon}>
                      <Lock size={20} className={styles.inputIcon} />
                      <input
                        type={showPassword ? "text" : "password"}
                        className={styles.formInput}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => updateForm("password", e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div className={styles.passwordStrength}>
                      <div className={`${styles.strengthBar} ${formData.password.length >= 8 ? styles.strong : formData.password.length >= 4 ? styles.medium : ""}`}></div>
                      <span className={styles.strengthText}>
                        {formData.password.length >= 8 ? "Strong" : formData.password.length >= 4 ? "Medium" : "Weak"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Confirm Password</label>
                    <div className={styles.inputWithIcon}>
                      <Lock size={20} className={styles.inputIcon} />
                      <input
                        type="password"
                        className={styles.formInput}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateForm("confirmPassword", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <label className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={formData.agreeTerms}
                      onChange={(e) => updateForm("agreeTerms", e.target.checked)}
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/terms" className={styles.authLink}>Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className={styles.authLink}>Privacy Policy</Link>
                    </span>
                  </label>

                  <div className={styles.formButtons}>
                    <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={isLoading}>
                      {isLoading ? (
                        <span className={styles.spinner}></span>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className={styles.authFooter}>
              <p>
                Already have an account?{" "}
                <Link href="/login" className={styles.authLink}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
