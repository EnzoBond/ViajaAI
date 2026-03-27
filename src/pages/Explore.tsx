import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationCard } from "@/components/DestinationCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import destRio from "@/assets/dest-rio.jpg";
import destNoronha from "@/assets/dest-noronha.jpg";
import destChapada from "@/assets/dest-chapada.jpg";
import destGramado from "@/assets/dest-gramado.jpg";
import destLencois from "@/assets/dest-lencois-new.webp";
import destSalvador from "@/assets/dest-salvador.jpg";

const allDestinations = [
  { name: "Rio de Janeiro", state: "RJ", rating: 4.8, image: destRio, categories: ["Praia", "Cultura", "Natureza"] },
  { name: "Fernando de Noronha", state: "PE", rating: 4.9, image: destNoronha, categories: ["Praia", "Mergulho", "Natureza"] },
  { name: "Chapada Diamantina", state: "BA", rating: 4.7, image: destChapada, categories: ["Aventura", "Trilha", "Natureza"] },
  { name: "Gramado", state: "RS", rating: 4.6, image: destGramado, categories: ["Gastronomia", "Inverno", "Família"] },
  { name: "Lençóis Maranhenses", state: "MA", rating: 4.8, image: destLencois, categories: ["Natureza", "Aventura", "Deserto"] },
  { name: "Salvador", state: "BA", rating: 4.5, image: destSalvador, categories: ["Cultura", "História", "Gastronomia"] },
];

const categoryFilters = ["Todos", "Praia", "Natureza", "Cultura", "Aventura", "Gastronomia", "História"];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = allDestinations.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.state.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || d.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground">
              Explorar destinos
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Descubra lugares incríveis para sua próxima viagem.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar destino ou estado..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-8">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <DestinationCard {...dest} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Nenhum destino encontrado.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;
