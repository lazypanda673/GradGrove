"use client";
import MentorDashboard from "../components/dashboard/MentorDashboard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MentorPage() {
  return (
    <>
      <Navbar role="mentor" />
      <MentorDashboard />
      <Footer />
    </>
  );
}
