import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  location: string;
  isCurrent: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2001",
    location: "Montpellier, France",
    isCurrent: false,
  },
  {
    year: "2001-2010",
    location: "Tokyo, Japan",
    isCurrent: false,
  },
  {
    year: "2011-2017",
    location: "Singapore",
    isCurrent: false,
  },
  {
    year: "2017-2020",
    location: "Gill, Massachusetts",
    isCurrent: false,
  },
  {
    year: "2020",
    location: "Honolulu, Hawaii",
    isCurrent: false,
  },
  {
    year: "2021-2025",
    location: "Miami, Florida",
    isCurrent: false,
  },
  {
    year: "2025-",
    location: "Tokyo, Japan",
    isCurrent: true,
  },
];

const TimelineItem = ({
  year,
  location,
  isCurrent,
  position,
  index,
}: TimelineEvent & { position: "left" | "right"; index: number }) => {
  const accentColor = isCurrent ? "#007AFF" : "#FF0000";

  return (
    <div
      className={`
        relative flex items-center mb-[60px] last:mb-0
        md:mb-[60px]
        ${
          position === "left"
            ? "md:flex-row-reverse"
            : "md:flex-row"
        }
        flex-row
      `}
    >
      {/* Desktop card area - left side */}
      <div
        className={`
          hidden md:flex
          ${position === "left" ? "justify-start" : "justify-end"}
          w-[calc(50%-30px)]
        `}
      >
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-7 shadow-[0px_4px_16px_rgba(0,0,0,0.08)] max-w-[480px] w-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default"
        >
          <p
            className="text-lg font-bold mb-2"
            style={{ color: accentColor }}
          >
            {year}
          </p>
          <h3 className="text-[22px] font-semibold text-black">
            {location}
          </h3>
        </motion.article>
      </div>

      {/* Desktop gap + node */}
      <div className="hidden md:flex items-center justify-center w-[60px] shrink-0 relative">
        <div
          className={`
            w-7 h-7 rounded-full border-[6px] border-white z-10
            shadow-[0px_2px_8px_rgba(0,0,0,0.15)]
          `}
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Desktop spacer for opposite side */}
      <div className="hidden md:block w-[calc(50%-30px)]" />

      {/* Mobile node */}
      <div
        className={`
          md:hidden absolute left-6 -translate-x-1/2
          w-7 h-7 rounded-full border-[6px] border-white z-10
          shadow-[0px_2px_8px_rgba(0,0,0,0.15)]
        `}
        style={{ backgroundColor: accentColor }}
      />

      {/* Mobile card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 }}
        viewport={{ once: true }}
        className="md:hidden bg-white rounded-2xl p-7 shadow-[0px_4px_16px_rgba(0,0,0,0.08)] w-full ml-16 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default"
      >
        <p
          className="text-lg font-bold mb-2"
          style={{ color: accentColor }}
        >
          {year}
        </p>
        <h3 className="text-[22px] font-semibold text-black">
          {location}
        </h3>
      </motion.article>
    </div>
  );
};

const TimelineSection = () => {
  return (
    <section id="journey" className="bg-white pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-[32px] md:text-[40px] font-semibold text-center text-black mb-3">
          My Journey
        </h2>
        <p className="text-center text-[#666666] text-base md:text-lg mb-[60px]">
          My evolution through the years
        </p>

        <div className="relative py-8">
          {/* Desktop vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-[#E0E0E0] top-0 bottom-0 hidden md:block" />

          {/* Mobile vertical line */}
          <div className="absolute left-6 w-[3px] bg-[#E0E0E0] top-0 bottom-0 md:hidden" />

          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={index}
              year={event.year}
              location={event.location}
              isCurrent={event.isCurrent}
              position={index % 2 === 0 ? "left" : "right"}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
