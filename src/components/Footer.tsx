const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-center py-12 px-6 mt-20">
      <div className="container mx-auto max-w-4xl space-y-6">
        <h2 className="text-3xl font-bold text-foreground mb-6">Connect With Us</h2>
        <div className="flex justify-center items-center gap-6 text-lg">
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors duration-300"
          >
            Instagram
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-secondary transition-colors duration-300"
          >
            WhatsApp
          </a>
        </div>
        <p className="text-muted-foreground text-sm mt-8">
          © 2025 EYEQ Club | Designed with ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
