"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  BarChart3,
  Package,
  FileText,
  Settings,
  Bell,
  LogOut,
  Menu,
  User,
  ChevronDown,
  Sun,
  Moon,
  Shield,
} from "lucide-react";
import styles from "../layout.module.css";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/staff", label: "Staff Management", icon: Users },
    { href: "/admin/departments", label: "Departments", icon: Building },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/inventory", label: "Inventory", icon: Package },
    { href: "/admin/audit", label: "Audit Logs", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
  };

  return (
    <div className={styles.dashboardLayout}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.sidebarLogo}>
            <div className={`${styles.sidebarLogoIcon} ${styles.admin}`}>
              <Shield size={24} />
            </div>
            <span>HealthBridge</span>
          </Link>
          <span className={`${styles.portalBadge} ${styles.admin}`}>Admin Portal</span>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Management</div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? `${styles.active} ${styles.admin}` : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarUser} onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className={`${styles.avatar} ${styles.avatarMd} ${styles.admin}`}>
              <span>AD</span>
            </div>
            <div className={styles.sidebarUserInfo}>
              <div className={styles.sidebarUserName}>Admin User</div>
              <div className={styles.sidebarUserRole}>Hospital Admin</div>
            </div>
            <ChevronDown size={18} />
          </div>

          {showUserMenu && (
            <div className={styles.userDropdown}>
              <Link href="/admin/profile" className={styles.dropdownItem}>
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

      {sidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
      )}

      <main className={styles.mainContent}>
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

        <div className={styles.pageWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
