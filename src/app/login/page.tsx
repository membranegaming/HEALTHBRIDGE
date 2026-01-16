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
  Shield,
  Clock,
  FileText,
  CheckCircle,
  User,
  Stethoscope,
  Users,
  AlertCircle,
} from "lucide-react";
import styles from "./page.module.css";

const roles = [
  { id: "patient", label: "Patient", icon: User },
  { id: "doctor", label: "Doctor", icon: Stethoscope },
  { id: "staff", label: "Staff", icon: Users },
  { id: "admin", label: "Admin", icon: Shield },
];

const demoCredentials: Record<string, { email: string; password: string }> = {
  patient: { email: "patient@demo.com", password: "demo123" },
  doctor: { email: "doctor@demo.com", password: "demo123" },
  staff: { email: "staff@demo.com", password: "demo123" },
  admin: { email: "admin@demo.com", password: "demo123" },
};

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check demo credentials
    const demo = demoCredentials[selectedRole];
    if (email === demo.email && password === demo.password) {
      // Redirect based on role
      const redirectMap: Record<string, string> = {
        patient: "/patient/dashboard",
        doctor: "/doctor/dashboard",
        staff: "/staff/dashboard",
        admin: "/admin/dashboard",
      };
      router.push(redirectMap[selectedRole]);
    } else {
      setError("Invalid email or password. Try the demo credentials below.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      {/* Left Branding Panel */}
      <div className={styles.authBranding}>
        <div className={styles.brandContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Heart size={28} />
            </div>
            <span>HealthBridge</span>
          </div>

          <h1 className={styles.brandTitle}>Welcome Back</h1>
          <p className={styles.brandSubtitle}>
            Access your health dashboard and manage your healthcare journey with ease.
          </p>

          <div className={styles.brandFeatures}>
            <div className={styles.brandFeature}>
              <CheckCircle size={20} />
              <span>Secure & HIPAA Compliant</span>
            </div>
            <div className={styles.brandFeature}>
              <CheckCircle size={20} />
              <span>24/7 Access to Records</span>
            </div>
            <div className={styles.brandFeature}>
              <CheckCircle size={20} />
              <span>Real-time Appointments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className={styles.authForm}>
        <div className={styles.formHeader}>
          <h1>Sign In</h1>
          <p>Choose your role and enter your credentials</p>
        </div>

        {/* Role Selector */}
        <div className={styles.roleSelector}>
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={`${styles.roleOption} ${selectedRole === role.id ? styles.active : ""}`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className={styles.roleIcon}>
                <role.icon size={20} />
              </div>
              <span>{role.label}</span>
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              className={styles.formInput}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <Lock size={16} />
              Password
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.formInput}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        {/* Demo Credentials */}
        <div className={styles.demoCredentials}>
          <h4>Demo Credentials for {selectedRole}</h4>
          <p>
            Email: {demoCredentials[selectedRole].email}<br />
            Password: {demoCredentials[selectedRole].password}
          </p>
        </div>

        <p className={styles.authFooter}>
          Don&apos;t have an account?{" "}
          <Link href="/register">Create one now</Link>
        </p>
      </div>
    </div>
  );
}
