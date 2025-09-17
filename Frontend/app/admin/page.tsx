"use client";
import Admin from "../components/pages/Admin";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function AdminPage() {
  return (
    <>
      <Navbar role="admin" />
      <Admin />
      <Footer />
    </>
  );
}
