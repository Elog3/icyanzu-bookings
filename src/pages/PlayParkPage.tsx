import { Baby, Shield, Cake, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlayParkBookingForm } from "@/components/PlayParkBookingForm";
import playPark from "@/assets/play-park.jpg";

const features = [
  {
    icon: Shield,
    title: "Safe & Supervised",
    description: "Trained staff ensure your children play safely in a secure environment.",
  },
  {
    icon: Baby,
    title: "Age-Appropriate Zones",
    description: "Dedicated areas for different age groups from toddlers to pre-teens.",
  },
  {
    icon: Cake,
    title: "Birthday Packages",
    description: "Complete party packages with decorations, food, and entertainment.",
  },
  {
    icon: Star,
    title: "Modern Equipment",
    description: "State-of-the-art play equipment meeting international safety standards.",
  },
];

export default function PlayParkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={playPark}
            alt="Icyanzu Play Park"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent backdrop-blur-sm text-sm font-medium mb-6">
              <Baby className="h-4 w-4" />
              Fun for All Ages
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Icyanzu Play Park
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              A magical playground where children explore, play, and make memories. 
              Safe, supervised, and full of adventure!
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Book Your Visit
              </h2>
              <p className="text-muted-foreground text-lg">
                Reserve a spot for your little ones and let the adventure begin!
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card">
              <PlayParkBookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
