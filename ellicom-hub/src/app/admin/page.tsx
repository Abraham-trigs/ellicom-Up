import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="p-4">{/* Rest of dashboard content */}</main>
    </>
  );
}
