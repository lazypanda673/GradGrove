"use client";
import React from "react";

export default function Footer() {
    return (
        <footer className="text-center py-12 px-6 text-white text-lg bg-gradient-to-r from-gg-primary to-gg-blue mt-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                <div className="space-y-4">
                    <div className="bg-white rounded-xl p-2 inline-block shadow-lg hover:scale-105 transition-all duration-300">
                        <img src="/Brand_logo.png" alt="GradGrove Logo" className="w-12 block" />
                    </div>
                    <div className="font-bold text-xl text-white">GradGrove</div>
                    <div className="text-base text-white/90 leading-relaxed">
                        AI-based Drop-out Prediction & Counseling System for modern institutions. Empowering students, mentors, and admins with actionable insights and support.
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="font-semibold text-white">Quick Links</div>
                    <div className="space-y-2">
                        <a href="/" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Home</a>
                        <a href="/login" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Login</a>
                        <a href="/signup" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Sign Up</a>
                        <a href="#features" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Features</a>
                        <a href="#team" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Team</a>
                        <a href="#contact" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Contact</a>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="font-semibold text-white">Legal</div>
                    <div className="space-y-2">
                        <a href="#" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Privacy Policy</a>
                        <a href="#" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Terms of Service</a>
                        <a href="#" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Careers</a>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="font-semibold text-white">Connect</div>
                    <div className="space-y-2">
                        <a href="mailto:gradgrove@sih2025.com" className="text-white/90 hover:text-gg-green hover:underline block transition-all duration-200">Email Us</a>
                    </div>
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="text-white/90 hover:text-gg-green text-2xl transition-colors duration-200 hover:scale-110 transform" title="Twitter">🐦</a>
                        <a href="#" className="text-white/90 hover:text-gg-green text-2xl transition-colors duration-200 hover:scale-110 transform" title="LinkedIn">💼</a>
                        <a href="#" className="text-white/90 hover:text-gg-green text-2xl transition-colors duration-200 hover:scale-110 transform" title="Instagram">📸</a>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/70 text-base">
                &copy; 2025 GradGrove Hackathon Prototype. All rights reserved.
            </div>
        </footer>
    );
}
