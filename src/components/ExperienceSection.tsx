const companies = [
  { name: "UFC", logo: "/logos/ufc.png", url: "https://ufc.com/" },
  { name: "Ultra Super New", logo: "/logos/ultrasupernew.png", url: "https://ultrasupernew.com/" },
  { name: "First Round Management", logo: "/logos/frm.png", url: "https://1str.com/" },
  { name: "On The House", logo: "/logos/oth.png", url: "https://othnetwork.io/" },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 tracking-tight">
        Companies I've Worked With
      </h2>
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-12 md:gap-16">
        {companies.map((company) => (
          <a
            key={company.name}
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-all duration-200 hover:opacity-80 hover:scale-105"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="h-16 md:h-20 w-auto object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
