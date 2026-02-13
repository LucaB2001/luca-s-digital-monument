import { Linkedin, Twitter, Instagram, Github, Mail } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", external: true },
  { icon: Twitter, label: "Twitter/X", href: "https://x.com", external: true },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", external: true },
  { icon: Github, label: "GitHub", href: "https://github.com", external: true },
  { icon: Mail, label: "Email", href: "mailto:hello@lucaberger.com", external: false },
];

const Footer = () => {
  return (
    <footer id="contact" className="py-16 px-6">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-8">
        Find Me Elsewhere
      </h2>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.external ? "_blank" : undefined}
            rel={s.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-2 group transition-all duration-200"
          >
            <s.icon
              size={32}
              className="text-foreground group-hover:text-primary transition-colors duration-200 group-hover:scale-110 transform"
            />
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">
              {s.label}
            </span>
          </a>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-12">
        © 2025 Luca Berger
      </p>
    </footer>
  );
};

export default Footer;
