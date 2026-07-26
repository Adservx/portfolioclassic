import { Works } from "@/components/work";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        <Works />
      </main>
      <Footer />
    </>
  );
}
