import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: LucideIcon;
  features: string[];
}

export function SectionCard({ title, description, image, href, icon: Icon, features }: SectionCardProps) {
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-transparent md:bg-gradient-to-l" />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-6">
            <Icon className="h-7 w-7 text-primary-foreground" />
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-semibold text-card-foreground mb-3">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {description}
          </p>

          <ul className="space-y-2 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>

          <Button asChild className="w-fit group/btn">
            <Link to={href}>
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
