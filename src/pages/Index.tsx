import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MapSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
