"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Users,
    ClipboardList,
    Package,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X,
    ChevronDown,
    Home,
} from "lucide-react";
import styles from "../layout.module.css";

const navItems = [
    { href: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/staff/appointments", label: "Appointments", icon: Calendar },
    { href: "/staff/patients", label: "Patients", icon: Users },
    { href: "/staff/queue", label: "Queue Management", icon: ClipboardList },
    { href: "/staff/inventory", label: "Inventory", icon: Package },
    { href: "/staff/settings", label: "Settings", icon: Settings },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <div className={styles.dashboardLayout}>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className={styles.sidebarOverlay}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
                <div className={styles.sidebarHeader}>
                    <Link href="/staff/dashboard" className={styles.sidebarLogo}>
                        <div className={styles.sidebarLogoIcon} style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                            <Home size={20} />
                        </div>
                        <span>HealthBridge</span>
                    </Link>
                    <span className={styles.portalBadge} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>
                        Staff Portal
                    </span>
                </div>

                <nav className={styles.sidebarNav}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                                style={isActive ? { background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' } : {}}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div
                        className={styles.sidebarUser}
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div
                            className={`${styles.avatar} ${styles.avatarMd}`}
                            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                        >
                            MS
                        </div>
                        <div className={styles.sidebarUserInfo}>
                            <div className={styles.sidebarUserName}>Mary Smith</div>
                            <div className={styles.sidebarUserRole}>Receptionist</div>
                        </div>
                        <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                    </div>

                    {showUserMenu && (
                        <div className={styles.userDropdown}>
                            <Link href="/staff/settings" className={styles.dropdownItem} onClick={() => setShowUserMenu(false)}>
                                <Settings size={18} />
                                Settings
                            </Link>
                            <button className={`${styles.dropdownItem} ${styles.danger}`} onClick={handleLogout}>
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Top Header */}
                <header className={styles.topHeader}>
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className={styles.headerSearch}>
                        <input
                            type="text"
                            placeholder="Search patients, appointments..."
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.headerActions}>
                        <button className={styles.headerActionBtn}>
                            <Bell size={20} />
                            <span className={styles.notificationDot} style={{ background: '#f59e0b' }}></span>
                        </button>
                        <div
                            className={`${styles.avatar} ${styles.avatarMd}`}
                            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', cursor: 'pointer' }}
                        >
                            MS
                        </div>
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
