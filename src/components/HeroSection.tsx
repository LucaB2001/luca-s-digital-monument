import { motion } from "framer-motion";
import luca1 from "@/assets/luca-1.jpeg";
import luca2 from "@/assets/luca-2.jpeg";
import luca3 from "@/assets/luca-3.jpeg";
import luca4 from "@/assets/luca-4.jpeg";
import luca5 from "@/assets/luca-5.jpeg";
import luca6 from "@/assets/luca-6.jpeg";
import luca7 from "@/assets/luca-7.jpeg";
import luca8 from "@/assets/luca-8.jpeg";
import luca9 from "@/assets/luca-9.jpeg";
import luca10 from "@/assets/luca-10.jpeg";

const images = [luca1, luca2, luca3, luca4, luca5, luca6, luca7, luca8, luca9, luca10];

const HeroSection = () => {
  const doubled = [...images, ...images];
  const cardWidth = 420;
  const gap = 24;
  const totalWidth = images.length * (cardWidth + gap);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden"
    >
      <div className="text-center px-6 mb-12 md:mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Luca Berger
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A Third Culture Kid Who's a Martial Artist, AI Educator, and Multilingual Storyteller
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap }}
          animate={{ x: [0, -totalWidth] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: images.length * 6,
              ease: "linear",
            },
          }}
        >
          {doubled.map((src, i) => (
            <div
              key={i}
              className="shrink-0 rounded-3xl overflow-hidden shadow-lg"
              style={{ width: cardWidth, height: 520 }}
            >
              <img
                src={src}
                alt={`Luca Berger photo ${(i % images.length) + 1}`}
                className="w-full h-full object-cover"
                loading={i > 3 ? "lazy" : "eager"}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
