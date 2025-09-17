"use client";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function StudentPage() {
  return (
    <>
      <Navbar role="student" />
      <StudentDashboard />
      <Footer />
    </>
  );
}
