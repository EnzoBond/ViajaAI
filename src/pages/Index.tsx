import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationCard } from "@/components/DestinationCard";
import { FeatureCard } from "@/components/FeatureCard";
import heroBg from "@/assets/hero-bg.jpg";
import destRio from "@/assets/dest-rio.jpg";
import destNoronha from "@/assets/dest-noronha.jpg";
import destChapada from "@/assets/dest-chapada.jpg";
import destGramado from "@/assets/dest-gramado.jpg";
import destLencois from "@/assets/dest-lencois-new.webp";
import destSalvador from "@/assets/dest-salvador.jpg";
import {
  Sparkles,
  MapPin,
  Star,
  Navigation,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

const destinations = [
  { name: "Rio de Janeiro", state: "RJ", rating: 4.8, image: destRio, categories: ["Praia", "Cultura", "Natureza"] },
  { name: "Fernando de Noronha", state: "PE", rating: 4.9, image: destNoronha, categories: ["Praia", "Mergulho", "Natureza"] },
  { name: "Chapada Diamantina", state: "BA", rating: 4.7, image: destChapada, categories: ["Aventura", "Trilha", "Natureza"] },
  { name: "Gramado", state: "RS", rating: 4.6, image: destGramado, categories: ["Gastronomia", "Inverno", "Família"] },
  { name: "Lençóis Maranhenses", state: "MA", rating: 4.8, image: destLencois, categories: ["Natureza", "Aventura", "Deserto"] },
  { name: "Salvador", state: "BA", rating: 4.5, image: destSalvador, categories: ["Cultura", "História", "Gastronomia"] },
];

const features = [
  {
    icon: Sparkles,
    title: "Roteiros com IA",
    description: "Inteligência artificial cria roteiros personalizados baseados nos seus interesses e estilo de viagem.",
  },
  {
    icon: MapPin,
    title: "Dados Atualizados",
    description: "Informações sempre atualizadas sobre locais, horários e preços de pontos turísticos.",
  },
  {
    icon: Star,
    title: "Avaliações Reais",
    description: "Opiniões e dicas de viajantes reais para você tomar as melhores decisões.",
  },
  {
    icon: Navigation,
    title: "GPS Integrado",
    description: "Navegação integrada com mapas interativos para seguir seu roteiro sem se perder.",
  },
  {
    icon: Clock,
    title: "Histórico Completo",
    description: "Todas as suas viagens salvas para revisitar memórias e planejar novas aventuras.",
  },
  {
    icon: Users,
    title: "Para Todos",
    description: "Opções para viajantes solo, casais, famílias e grupos de qualquer orçamento.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Paisagem tropical brasileira"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/90 via-neutral-dark/60 to-transparent" />
        </div>

        <div className="container relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-primary-foreground">
              Descubra o Brasil com roteiros{" "}
              <span className="text-gradient-hero">personalizados</span>
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              ViajaAi usa inteligência artificial para criar roteiros únicos baseados nos seus interesses, orçamento e estilo de viagem — com dados sempre atualizados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="bg-gradient-hero hover:opacity-90 text-primary-foreground text-base px-8 shadow-soft"
                asChild
              >
                <Link to="/create">
                  Criar meu roteiro
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base"
                asChild
              >
                <Link to="/explore" className="text-sidebar-primary">Explorar destinos</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Por que usar o ViajaAi?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Combinamos tecnologia e dados de viajantes reais para oferecer a melhor experiência de planejamento.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Destinos populares
              </h2>
              <p className="text-muted-foreground text-lg">
                Os destinos mais bem avaliados pelos nossos viajantes.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary" asChild>
              <Link to="/explore">
                Ver todos
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <DestinationCard {...dest} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/explore">Ver todos os destinos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground">
              Pronto para sua próxima aventura?
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Crie seu primeiro roteiro personalizado em menos de 2 minutos. É gratuito!
            </p>
            <Button
              size="lg"
              className="bg-gradient-hero hover:opacity-90 text-primary-foreground text-base px-10 shadow-soft"
              asChild
            >
              <Link to="/create">
                Começar agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
