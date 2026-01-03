import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Users, MapPin, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VenueCard } from "@/components/VenueCard";
import { BookingForm } from "@/components/BookingForm";
import venueEvent from "@/assets/venue-event.jpg";

const venues = [
  {
    id: "sabyinyo",
    name: "Sabyinyo",
    description: "Our flagship venue, perfect for grand weddings and large corporate events. Named after Rwanda's majestic Sabyinyo volcano.",
    capacity: 500,
    image: venueEvent,
    available: true,
    features: ["Grand Ballroom", "Outdoor Garden", "Bridal Suite", "Stage & Sound System"],
  },
  {
    id: "muhabura",
    name: "Muhabura",
    description: "An elegant space with stunning mountain views, ideal for medium-sized celebrations and conferences.",
    capacity: 250,
    image: venueEvent,
    available: true,
    features: ["Conference Setup", "Mountain Views", "Private Bar", "AV Equipment"],
  },
  {
    id: "kalisimbi",
    name: "Kalisimbi",
    description: "A versatile venue blending indoor comfort with outdoor beauty. Perfect for intimate gatherings.",
    capacity: 150,
    image: venueEvent,
    available: false,
    features: ["Terrace Access", "Flexible Layout", "Catering Kitchen", "Parking"],
  },
  {
    id: "bisoke",
    name: "Bisoke",
    description: "Our most intimate setting, ideal for exclusive meetings, small parties, and VIP events.",
    capacity: 80,
    image: venueEvent,
    available: true,
    features: ["Executive Setup", "Private Entrance", "Wine Cellar Access", "Concierge"],
  },
];

export default function VenuesPage() {
  const { venueId } = useParams();

  // If we have a venueId, show the booking form for that venue
  if (venueId) {
    const venue = venues.find((v) => v.id === venueId);
    
    if (!venue) {
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Venue Not Found</h1>
            <p className="text-muted-foreground mb-8">The venue you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/venues">View All Venues</Link>
            </Button>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-16">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/venues">
                <ArrowLeft className="h-4 w-4" />
                Back to Venues
              </Link>
            </Button>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Venue Info */}
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h1 className="font-display text-4xl font-bold text-primary-foreground mb-2">
                      {venue.name}
                    </h1>
                    <div className="flex items-center gap-4 text-primary-foreground/80">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        Up to {venue.capacity} guests
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        Icyanzu Park
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg mb-6">
                  {venue.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {venue.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="bg-secondary/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mountain className="h-6 w-6 text-primary" />
                    <h3 className="font-display text-xl font-semibold">About {venue.name}</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Named after one of Rwanda's legendary Virunga volcanoes, {venue.name} venue 
                    captures the majesty and grandeur of our natural heritage. Experience 
                    world-class hospitality amidst breathtaking scenery.
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <h2 className="font-display text-2xl font-semibold mb-2">Book {venue.name}</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <BookingForm venueName={venue.name} venueId={venue.id} />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Otherwise show all venues
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
            <Mountain className="h-4 w-4" />
            Named After Virunga Volcanoes
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Our Event Venues
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Four unique spaces, each capturing the majesty of Rwanda's legendary mountains. 
            From grand celebrations to intimate gatherings—find your perfect venue.
          </p>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {venues.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
