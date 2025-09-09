"use client";
import Admin from "../components/Admin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminPage() {
  return (
    <>
      <Navbar role="admin" />
      <Admin />
      <Footer />
    </>
  );
}
