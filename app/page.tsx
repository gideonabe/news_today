
import Navbar from "@/components/Navbar";
import Articles from '@/components/Content'
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Articles />
      <Footer />

    </main>
  );
}
