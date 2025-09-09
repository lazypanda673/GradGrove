"use client";
import MentorDashboard from "../components/MentorDashboard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MentorPage() {
  return (
    <>
      <Navbar role="mentor" />
      <MentorDashboard />
      <Footer />
    </>
  );
}
