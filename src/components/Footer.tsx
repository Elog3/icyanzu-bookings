import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <span className="text-foreground font-display font-bold text-lg">I</span>
              </div>
              <span className="font-display text-xl font-semibold">
                Icyanzu Leisure Park
              </span>
            </div>
            <p className="text-primary-foreground/70 mb-6">
              Experience unforgettable moments at Rwanda's premier leisure destination, 
              nestled in the heart of the Virunga mountains.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/venues" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Event Venues
                </Link>
              </li>
              <li>
                <Link to="/play-park" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Play Park
                </Link>
              </li>
              <li>
                <Link to="/bar" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Bar & Lounge
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70">
                  Musanze District, Northern Province, Rwanda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+250780000000" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  +250 780 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:info@icyanzupark.rw" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  info@icyanzupark.rw
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <div className="text-primary-foreground/70">
                  <p>Mon - Fri: 9:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="text-primary-foreground/70 pl-8">
                Sat - Sun: 8:00 AM - 11:00 PM
              </li>
              <li className="text-primary-foreground/70 pl-8">
                Public Holidays: 8:00 AM - 11:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Icyanzu Leisure Park. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
