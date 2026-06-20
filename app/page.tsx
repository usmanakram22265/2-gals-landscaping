import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Preloader from "@/components/Preloader";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import ScrollReveal from "@/components/ScrollReveal";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Preloader />
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Team />
        <Quote />
      </main>
      <Footer />
      <ScrollReveal />
      <BackToTop />
    </div>
  );
}
