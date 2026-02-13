import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useMotionValue, useAnimation, PanInfo } from "framer-motion";
import luca1 from "@/assets/luca-1.jpeg";
import luca3 from "@/assets/luca-3.jpeg";
import luca4 from "@/assets/luca-4.jpeg";
import luca5 from "@/assets/luca-5.jpeg";
import luca6 from "@/assets/luca-6.jpeg";
import luca7 from "@/assets/luca-7.jpeg";
import luca8 from "@/assets/luca-8.jpeg";
import luca9 from "@/assets/luca-9.jpeg";
import luca10 from "@/assets/luca-10.png";

const images = [luca1, luca3, luca4, luca5, luca6, luca7, luca8, luca9, luca10];

const CARD_WIDTH = 420;
const GAP = 24;
const SPEED = 50; // pixels per second

const HeroSection = () => {
  const tripled = [...images, ...images, ...images];
  const setWidth = images.length * (CARD_WIDTH + GAP);

  const x = useMotionValue(0);
  const controls = useAnimation();
  const isPaused = useRef(false);
  const [dragging, setDragging] = useState(false);

  // Wrap x so it stays within [-setWidth, 0] for seamless looping
  const wrapX = useCallback(
    (val: number) => {
      let v = val % setWidth;
      if (v > 0) v -= setWidth;
      return v;
    },
    [setWidth]
  );

  const startAutoScroll = useCallback(() => {
    if (isPaused.current) return;
    const currentX = x.get();
    const wrapped = wrapX(currentX);
    x.set(wrapped);

    const distance = setWidth;
    const duration = distance / SPEED;

    controls.start({
      x: wrapped - setWidth,
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, x, setWidth, wrapX]);

  useEffect(() => {
    startAutoScroll();
  }, [startAutoScroll]);

  // Keep x wrapped to prevent drifting too far
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (latest < -setWidth * 2 || latest > 0) {
        const wrapped = wrapX(latest);
        x.set(wrapped);
      }
    });
    return unsubscribe;
  }, [x, setWidth, wrapX]);

  const handleDragStart = () => {
    isPaused.current = true;
    setDragging(true);
    controls.stop();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    // Apply momentum: let the drag velocity carry briefly, then resume
    const velocity = info.velocity.x;
    const currentX = wrapX(x.get());
    x.set(currentX);

    // Glide to a stop based on velocity
    const glideDistance = velocity * 0.3;
    const targetX = currentX + glideDistance;

    controls
      .start({
        x: targetX,
        transition: { type: "tween", duration: 0.4, ease: "easeOut" },
      })
      .then(() => {
        isPaused.current = false;
        startAutoScroll();
      });
  };

  const handlePointerDown = () => {
    isPaused.current = true;
    controls.stop();
  };

  const handlePointerUp = () => {
    if (!dragging) {
      isPaused.current = false;
      startAutoScroll();
    }
  };

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

      <div
        className="w-full"
        style={{ overflow: "clip", cursor: dragging ? "grabbing" : "grab" }}
      >
        <motion.div
          className="flex"
          style={{ gap: GAP, x }}
          animate={controls}
          drag="x"
          dragConstraints={{ left: -setWidth * 2, right: setWidth }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {tripled.map((src, i) => (
            <div
              key={i}
              className="shrink-0 rounded-3xl overflow-hidden shadow-lg select-none"
              style={{ width: CARD_WIDTH, height: 520 }}
            >
              <img
                src={src}
                alt={`Luca Berger photo ${(i % images.length) + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                loading={i > 3 ? "lazy" : "eager"}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
