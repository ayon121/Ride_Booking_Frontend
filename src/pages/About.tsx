import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function About() {
  return (
    <section className="py-20 px-6 container mx-auto">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Heading */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          About <span className="text-primary">RideMate</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          RideMate is more than just a ride booking app—it’s a community built on
          trust, convenience, and innovation. We believe every journey should be
          safe, seamless, and accessible for everyone. Whether you’re heading to
          work, catching a flight, or exploring a new city, RideMate is your
          reliable travel partner.
        </p>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-10 text-left mt-12">
          <div className="p-8 rounded-2xl border bg-card shadow-sm space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide safe, affordable, and reliable rides for everyone,
              everywhere. We empower drivers with fair earnings and give riders
              transparent pricing with no hidden costs.
            </p>
          </div>
          <div className="p-8 rounded-2xl border bg-card shadow-sm space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To create a world where mobility is accessible and stress-free,
              connecting people and places with technology-driven solutions.
            </p>
          </div>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 rounded-2xl border bg-card shadow-sm">
            <h3 className="text-xl font-semibold text-primary">🚖 Safe Rides</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              All drivers are verified with background checks and real-time ride
              tracking for a secure travel experience.
            </p>
          </div>
          <div className="p-6 rounded-2xl border bg-card shadow-sm">
            <h3 className="text-xl font-semibold text-primary">💰 Affordable</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Transparent pricing, no hidden fees, and flexible ride options
              designed for every budget.
            </p>
          </div>
          <div className="p-6 rounded-2xl border bg-card shadow-sm">
            <h3 className="text-xl font-semibold text-primary">⚡ Easy to Use</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Book rides in just a few taps with real-time updates and
              user-friendly features.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Ready to ride with us?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={'/login'}>
              <Button size="lg" className="rounded-xl">
                Book a Ride
              </Button>
            </Link>
            <Link to={'/register'}> <Button size="lg" variant="outline" className="rounded-xl">
              Become a Driver
            </Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
