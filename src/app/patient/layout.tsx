"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  Menu,
  User,
  ChevronDown,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import styles from "../layout.module.css";

interface PatientLayoutProps {
  children: ReactNode;
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { href: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/patient/appointments", label: "Appointments", icon: Calendar, badge: "2" },
    { href: "/patient/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/patient/medicines", label: "Medicines", icon: Pill },
    { href: "/patient/records", label: "Health Records", icon: Shield },
    { href: "/patient/billing", label: "Billing", icon: CreditCard },
    { href: "/patient/settings", label: "Settings", icon: Settings },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.sidebarLogo}>
            <div className={`${styles.sidebarLogoIcon} ${styles.patient}`}>
              <Heart size={24} />
            </div>
            <span>HealthBridge</span>
          </Link>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Menu</div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? `${styles.active} ${styles.patient}` : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.badge && <span className={`${styles.navBadge} ${styles.patient}`}>{item.badge}</span>}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarUser} onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className={`${styles.avatar} ${styles.avatarMd} ${styles.patient}`}>
              <span>JD</span>
            </div>
            <div className={styles.sidebarUserInfo}>
              <div className={styles.sidebarUserName}>John Doe</div>
              <div className={styles.sidebarUserRole}>Patient</div>
            </div>
            <ChevronDown size={18} />
          </div>

          {showUserMenu && (
            <div className={styles.userDropdown}>
              <Link href="/patient/profile" className={styles.dropdownItem}>
                <User size={18} />
                <span>Profile</span>
              </Link>
              <button className={styles.dropdownItem} onClick={toggleTheme}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
              </button>
              <Link href="/login" className={`${styles.dropdownItem} ${styles.danger}`}>
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <button className={styles.mobileMenuBtn} onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <div className={styles.headerSearch}>
            <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>

          <div className={styles.headerActions}>
            <button className={styles.headerActionBtn}>
              <Bell size={20} />
              <span className={styles.notificationDot}></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.pageWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
