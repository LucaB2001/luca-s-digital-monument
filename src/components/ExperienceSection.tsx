const companies = [
  { name: "Ultra Super New", initials: "USN" },
  { name: "UFC", initials: "UFC" },
  { name: "RIZIN Fighting Federation", initials: "RIZIN" },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 tracking-tight">
        Companies I've Worked With
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex flex-col items-center justify-center py-8 transition-all duration-200 hover:opacity-80 hover:scale-105"
          >
            <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-foreground">{company.initials}</span>
            </div>
            <p className="text-sm font-medium text-foreground text-center">{company.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
