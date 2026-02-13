import { motion } from "framer-motion";

const placeholderImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop",
];

const HeroSection = () => {
  const doubled = [...placeholderImages, ...placeholderImages];
  const cardWidth = 420;
  const gap = 24;
  const totalWidth = placeholderImages.length * (cardWidth + gap);

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

      {/* Carousel */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap }}
          animate={{ x: [0, -totalWidth] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: placeholderImages.length * 6,
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
                alt={`Luca Berger photo ${(i % placeholderImages.length) + 1}`}
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
