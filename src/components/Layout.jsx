import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Brain, GraduationCap, ClipboardList, Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { to: "/", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/syllabus", icon: BookOpen, label: "Temario Completo" },
        { to: "/flashcards", icon: Brain, label: "Memorización" },
        { to: "/quiz", icon: GraduationCap, label: "Simulacro Examen" },
        { to: "/practical", icon: ClipboardList, label: "Supuestos Prácticos" },
    ];

    return (
        <div className="min-h-screen bg-neutral-bg flex font-sans text-gray-800">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">PE Study</h1>
                    <p className="text-xs text-gray-400 mt-1">Oposiciones & Grado</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 font-medium shadow-sm"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
                        <p className="text-sm font-medium opacity-90">Progreso Total</p>
                        <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[0%] rounded-full" />
                        </div>
                        <p className="text-xs mt-2 opacity-75">Sigue así, ¡vas bien!</p>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-indigo-600">PE Study</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white pt-16 px-4">
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    clsx(
                                        "flex items-center gap-3 px-4 py-4 rounded-xl transition-all",
                                        isActive ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-600"
                                    )
                                }
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:p-8 p-4 pt-20 md:pt-8 overflow-y-auto h-screen">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
