import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isSignUp ? "Conta criada! 🎉" : "Bem-vindo de volta! 👋",
      description: isSignUp
        ? "Sua conta foi criada com sucesso."
        : "Login realizado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-24 flex items-center justify-center min-h-screen">
        <div className="container max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 sm:p-8 shadow-card border border-border space-y-6"
          >
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-display font-bold text-foreground">
                {isSignUp ? "Criar conta" : "Entrar"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isSignUp
                  ? "Crie sua conta para começar a planejar viagens."
                  : "Entre na sua conta para acessar seus roteiros."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Nome
                  </Label>
                  <Input
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-foreground font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Senha
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground h-12"
              >
                {isSignUp ? "Criar conta" : "Entrar"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp
                  ? "Já tem conta? Entre aqui"
                  : "Não tem conta? Cadastre-se"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
