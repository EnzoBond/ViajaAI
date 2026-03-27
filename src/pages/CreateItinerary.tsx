import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Users, Sparkles, Bike, Landmark, UtensilsCrossed, Waves, TreePine, Moon, Heart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ITINERARY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-itinerary`;

const interests = [
  { id: "praia", label: "Praia", icon: Waves },
  { id: "natureza", label: "Natureza", icon: TreePine },
  { id: "historia", label: "História", icon: Landmark },
  { id: "gastronomia", label: "Gastronomia", icon: UtensilsCrossed },
  { id: "ciclismo", label: "Ciclismo", icon: Bike },
  { id: "vida-noturna", label: "Vida Noturna", icon: Moon },
  { id: "aventura", label: "Aventura", icon: Heart },
];

const CreateItinerary = () => {
  const { toast } = useToast();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelClass, setTravelClass] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [pace, setPace] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !startDate || !endDate || !travelClass || selectedInterests.length === 0) {
      toast({
        title: "Preencha todos os campos",
        description: "Destino, datas, classe e pelo menos um interesse são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setItinerary("");
    abortRef.current = new AbortController();

    try {
      const resp = await fetch(ITINERARY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          travelClass,
          travelers: parseInt(travelers),
          pace,
          interests: selectedInterests,
        }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "Erro ao gerar roteiro");
      }

      if (!resp.body) throw new Error("Sem resposta do servidor");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setItinerary(fullText);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        toast({
          title: "Erro ao gerar roteiro",
          description: err.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-accent">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground">IA Personalizada</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground">
              Criar seu roteiro
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Preencha suas preferências e nossa IA criará o roteiro perfeito.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8 bg-card rounded-2xl p-6 sm:p-8 shadow-card border border-border"
          >
            <div className="space-y-2">
              <Label className="text-foreground font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Destino
              </Label>
              <Input
                placeholder="Ex: Rio de Janeiro, Gramado, Fernando de Noronha..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Data de ida
                </Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Data de volta
                </Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-12" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Classe de viagem</Label>
                <Select value={travelClass} onValueChange={setTravelClass}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Econômica</SelectItem>
                    <SelectItem value="mid-range">Intermediária</SelectItem>
                    <SelectItem value="luxury">Luxo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Viajantes
                </Label>
                <Input type="number" min="1" max="20" value={travelers} onChange={(e) => setTravelers(e.target.value)} className="h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Ritmo da viagem</Label>
              <Select value={pace} onValueChange={setPace}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecionar ritmo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relaxed">Relaxado — Poucas atividades por dia</SelectItem>
                  <SelectItem value="moderate">Moderado — Equilíbrio entre passeios e descanso</SelectItem>
                  <SelectItem value="packed">Intenso — Aproveitar cada minuto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground font-medium">Interesses</Label>
              <p className="text-sm text-muted-foreground">Selecione pelo menos um interesse para personalizar seu roteiro.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interests.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleInterest(id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedInterests.includes(id)
                        ? "border-primary bg-primary/10 text-primary shadow-soft"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground text-base h-14 shadow-soft"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Gerando roteiro...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Gerar roteiro com IA
                </>
              )}
            </Button>
          </motion.form>

          {itinerary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-card rounded-2xl p-6 sm:p-8 shadow-card border border-border"
            >
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Seu Roteiro Personalizado
              </h2>
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {itinerary}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateItinerary;
