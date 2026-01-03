import { Link } from "react-router-dom";
import { Users, MapPin, ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  id: string;
  name: string;
  description: string;
  capacity: number;
  image: string;
  available: boolean;
  features: string[];
}

export function VenueCard({ id, name, description, capacity, image, available, features }: VenueCardProps) {
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Availability Badge */}
        <Badge
          className={cn(
            "absolute top-4 right-4 flex items-center gap-1.5",
            available
              ? "bg-success text-success-foreground"
              : "bg-destructive text-destructive-foreground"
          )}
        >
          {available ? (
            <>
              <Check className="h-3 w-3" />
              Available
            </>
          ) : (
            <>
              <X className="h-3 w-3" />
              Booked
            </>
          )}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-card-foreground mb-2">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span>Up to {capacity} guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Icyanzu Park</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button asChild className="w-full group/btn">
          <Link to={`/book/${id}`}>
            Book This Venue
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
