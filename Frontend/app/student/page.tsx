"use client";
import StudentDashboard from "../components/StudentDashboard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function StudentPage() {
  return (
    <>
      <Navbar role="student" />
      <StudentDashboard />
      <Footer />
    </>
  );
}
