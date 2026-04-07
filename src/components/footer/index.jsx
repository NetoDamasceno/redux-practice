import { BrandIcon, siGithub } from "../brand-icons";

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
          <span className="font-semibold text-white">
            Neto Damasceno
          </span>
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/neto-damasceno"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:text-white hover:scale-105"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/NetoDamasceno"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-200 hover:text-white hover:scale-105"
          >
            <BrandIcon icon={siGithub} size={18} />
            GitHub
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
