"use client";
import React, { useState } from "react";
import Link from "next/link";

export function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      href={to}
      className="mx-2 text-white/90 hover:text-white hover:bg-white/15 font-medium hover:font-semibold text-base no-underline rounded-xl px-5 py-2.5 hover:shadow-lg transition-all duration-300 hover:tracking-wide cursor-pointer border border-transparent hover:border-white/20 hover:-translate-y-0.5 hover:backdrop-blur-lg"
    >
      {children}
    </Link>
  );
}

export function DropdownItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="py-3 px-4 cursor-pointer hover:bg-gradient-to-r hover:from-gg-primary hover:to-gg-blue text-gg-foreground hover:text-white font-medium hover:font-semibold rounded-lg transition-all duration-300 my-1 hover:translate-x-1 hover:shadow-lg">
      <Link 
        href={to}
        className="text-inherit no-underline text-sm flex items-center gap-2"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Navbar({ role }: { role?: string }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="px-8 py-4 bg-gradient-to-r from-gg-primary to-gg-blue text-white flex items-center justify-between shadow-xl sticky top-0 z-50 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center gap-4">
        <span className="bg-white/15 rounded-full p-2 shadow-lg inline-block transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-6 hover:shadow-xl">
          <img src="/Brand_logo.png" alt="GradGrove Logo" className="w-9 h-9 block" />
        </span>
        <span className="font-bold text-2xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent tracking-wide">
          GradGrove
        </span>
      </div>
      <div className="flex gap-2">
        {role === "admin" && <NavLink to="/admin">Admin Dashboard</NavLink>}
        {role === "mentor" && <NavLink to="/mentor">Mentor Dashboard</NavLink>}
        {role === "student" && <NavLink to="/student">Student Dashboard</NavLink>}
        {role === "counsellor" && <NavLink to="/counsellor">Counsellor Dashboard</NavLink>}
        {!role && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/#features">Features</NavLink>
            <NavLink to="/#team">Team</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 relative">
        {/* Notification icon */}
        {role && (
          <span 
            className="cursor-pointer text-xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 relative" 
            title="Notifications"
          >
            🔔
            {/* Notification badge */}
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2 text-xs animate-pulse"></span>
          </span>
        )}
        {/* Send Alert button for counsellor */}
        {role === "counsellor" && (
          <button
            className="bg-gradient-to-r from-gg-green to-gg-blue text-white font-semibold rounded-xl px-5 py-2.5 border-none cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 text-sm flex items-center gap-2 hover:-translate-y-0.5 hover:scale-105"
            onClick={() => alert('Alert sent to students!')}
          >
            <span className="text-base">📢</span>
            Send Alert
          </button>
        )}
        {/* Profile picture */}
        {role && (
          <>
            <span 
              className="cursor-pointer rounded-full overflow-hidden w-10 h-10 inline-block bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/30 transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img src="/Brand_logo.png" alt="Profile" className="w-9 h-9 object-cover m-0.5" />
            </span>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute top-14 right-0 bg-white/95 backdrop-blur-xl text-gray-800 rounded-xl shadow-2xl min-w-[200px] z-50 border border-white/30 animate-pulse">
                <ul className="list-none m-0 p-4">
                  <DropdownItem to="/profile">👤 Profile Page</DropdownItem>
                  <DropdownItem to="/settings">⚙️ Settings</DropdownItem>
                  <DropdownItem to="/help">❓ Help</DropdownItem>
                  <DropdownItem to={`/${role}`}>📊 Dashboard</DropdownItem>
                  <DropdownItem to="/logout">🚪 Logout</DropdownItem>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
