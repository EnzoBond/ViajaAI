import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border hover:shadow-card hover:border-primary/20 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <h3 className="font-display font-semibold text-foreground text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
