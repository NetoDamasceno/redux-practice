import { BrandIcon, siGithub, siWhatsapp } from "../brand-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-orange-700 text-orange-100 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-orange-200 text-center md:text-left">
          © {currentYear} Redux Shopping. Todos os direitos reservados.
        </p>

        <p className="text-sm">
          Feito por{" "}
          <span className="font-semibold text-white">Neto Damasceno</span>
        </p>

        <div className="flex items-center gap-5">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/neto-damasceno"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:text-white hover:scale-105"
          >
            LinkedIn
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/NetoDamasceno"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:text-white hover:scale-105"
          >
            <BrandIcon icon={siGithub} size={18} />
            GitHub
          </a>

          {/* WhatsApp 🔥 NOVO */}
          <a
            href="https://wa.me/5582991075550?text=Olá%20vim%20pelo%20Redux%20Shopping"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:text-white hover:scale-105"
          >
            <BrandIcon icon={siWhatsapp} size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
