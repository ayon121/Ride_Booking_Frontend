import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-6">
          Your Ride, <span className="text-primary">On Demand</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Book rides quickly, track drivers in real-time, and enjoy seamless payments — all in one app.
        </p>
        <Button size="lg" className="rounded-full">
          Book a Ride Now
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 container mx-auto grid md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Easy Booking</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Book a ride with just a few taps and get matched with nearby drivers instantly.
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Live Tracking</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Track your ride in real-time just with your ride id..
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Multiple Payments</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Choose cash, card, or wallet payments — whatever works best for you.
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">1. Request</h3>
            <p className="text-muted-foreground">Set pickup & drop-off locations and request a ride instantly.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">2. Match</h3>
            <p className="text-muted-foreground">We’ll connect you with the nearest available driver.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">3. Ride</h3>
            <p className="text-muted-foreground">Enjoy your ride, make payment, and rate your experience.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Book Your Next Ride?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join thousands of happy riders today and enjoy a faster, safer, and more affordable travel experience.
        </p>
        <Button size="lg" className="rounded-full">
          Get Started
        </Button>
      </section>
    </div>
  );
};

export default Home;
