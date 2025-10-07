import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-center py-12 px-6 mt-20">
      <div className="container mx-auto max-w-4xl space-y-6">
        <h2 className="text-3xl font-bold text-foreground mb-6">Connect With Us</h2>
        <div className="flex justify-center items-center gap-6 text-lg">
          <a
            href="https://www.linkedin.com/company/eyeq-simats/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://www.instagram.com/eyeq.simats"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors duration-300"
          >
            Instagram
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://chat.whatsapp.com/GxFFprWNX4d8mOQJOTz7d1?mode=ems_wa_t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-secondary transition-colors duration-300"
          >
            WhatsApp
          </a>
        </div>
        <p className="text-muted-foreground text-sm mt-8">
          © 2025 EYEQ Club 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
