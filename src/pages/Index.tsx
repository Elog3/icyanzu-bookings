import { Link } from "react-router-dom";
import { ArrowRight, Calendar, PartyPopper, Wine, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionCard } from "@/components/SectionCard";
import heroBg from "@/assets/hero-bg.jpg";
import venueEvent from "@/assets/venue-event.jpg";
import playPark from "@/assets/play-park.jpg";
import barTerrace from "@/assets/bar-terrace.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Icyanzu Leisure Park"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Now Taking Bookings
            </span>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Experience Magic at{" "}
              <span className="bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
                Icyanzu
              </span>{" "}
              Leisure Park
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Nestled in the heart of Rwanda's majestic Virunga mountains, create unforgettable 
              moments at our world-class event venues, kids play park, and scenic bar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" asChild>
                <Link to="/venues">
                  <Calendar className="h-5 w-5" />
                  Book a Venue
                </Link>
              </Button>
              <Button variant="heroOutline" asChild>
                <Link to="/contact">
                  Explore Our Park
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary-foreground/60" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
              Welcome to Paradise
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-card-foreground mb-6">
              Where Every Moment Becomes a Memory
            </h2>
            <p className="text-muted-foreground text-lg">
              Icyanzu Leisure Park offers a unique blend of nature, luxury, and entertainment. 
              From grand weddings to intimate gatherings, family fun to sunset cocktails—we've 
              got the perfect space for every occasion.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: "4", label: "Event Venues" },
              { value: "500+", label: "Events Hosted" },
              { value: "5★", label: "Average Rating" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider mb-4 block">
              Our Spaces
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Find Your Perfect Spot
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you're planning a grand celebration, a fun day with the kids, or a relaxing 
              evening with friends—we have the ideal space waiting for you.
            </p>
          </div>

          <div className="space-y-8">
            <SectionCard
              title="Event Venues"
              description="Four stunning venues named after Rwanda's legendary Virunga volcanoes—Sabyinyo, Muhabura, Kalisimbi, and Bisoke. Perfect for weddings, corporate events, and celebrations."
              image={venueEvent}
              href="/venues"
              icon={PartyPopper}
              features={[
                "Capacity up to 500 guests",
                "Indoor & outdoor options",
                "Stunning mountain views",
                "Full catering available",
              ]}
            />

            <SectionCard
              title="Icyanzu Play Park"
              description="A safe and exciting haven for children to explore, play, and make new friends. Modern equipment, trained staff, and endless fun await your little ones."
              image={playPark}
              href="/play-park"
              icon={Baby}
              features={[
                "Safe, modern equipment",
                "Supervised play areas",
                "Snack bar available",
                "Birthday party packages",
              ]}
            />

            <SectionCard
              title="Icyanzu Bar & Lounge"
              description="Unwind with panoramic mountain views, craft cocktails, and delicious bites. The perfect spot for after-work drinks, date nights, or weekend relaxation."
              image={barTerrace}
              href="/bar"
              icon={Wine}
              features={[
                "Premium drinks selection",
                "Indoor & terrace seating",
                "Live music weekends",
                "Full food menu",
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Create Unforgettable Moments?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Book your venue today and let us help you create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" asChild>
              <Link to="/venues">
                <Calendar className="h-5 w-5" />
                Start Booking Now
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:+250780000000">
                Call Us: +250 780 000 000
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
