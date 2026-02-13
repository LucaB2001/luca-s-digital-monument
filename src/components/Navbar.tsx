import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Map", href: "#map" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = navItems.map((item) => {
        const el = document.querySelector(item.href);
        if (!el) return { label: item.label, top: Infinity };
        return { label: item.label, top: el.getBoundingClientRect().top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top <= 100 && section.top > closest.top) return section;
        return closest;
      }, { label: "Home", top: -Infinity });

      setActive(current.label);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string, label: string) => {
    setActive(label);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 transition-all duration-200",
          scrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-transparent"
        )}
      >
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 rounded-full bg-secondary/80 backdrop-blur p-1.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href, item.label)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                active === item.label
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex w-full justify-end">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href, item.label)}
              className={cn(
                "px-8 py-3 rounded-full text-lg font-medium transition-all duration-200",
                active === item.label
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
