import { Craft } from "@/components/skills";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function CraftPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-16 lg:pt-20">
        <Craft />
      </main>
      <Footer />
    </>
  );
}
