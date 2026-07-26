import { Praise } from "@/components/testimonials";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        <Praise />
      </main>
      <Footer />
    </>
  );
}
