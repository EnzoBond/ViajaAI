import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  name: string;
  state: string;
  rating: number;
  image: string;
  categories: string[];
}

export function DestinationCard({ name, state, rating, image, categories }: DestinationCardProps) {
  return (
    <Link to="/explore" className="group block">
      <div className="relative rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 bg-card">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            width={640}
            height={640}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{state}</span>
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
