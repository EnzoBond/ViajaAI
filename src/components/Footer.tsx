import { Link } from "react-router-dom";
import { MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-dark text-muted py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-display font-bold text-muted">
                ViajaAi
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Roteiros personalizados com inteligência artificial para viajantes que buscam experiências únicas.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-muted mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">Destinos</Link></li>
              <li><Link to="/create" className="text-muted-foreground hover:text-primary transition-colors">Criar Roteiro</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Avaliações</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-muted mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contato</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-muted mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted/10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ViajaAi. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
