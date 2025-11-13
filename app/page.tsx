import Navbar from "@/components/Navbar";
import Articles from "@/components/Content";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Page content fills the available space */}
      <div className="grow">
        <Articles />
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </main>
  );
}
