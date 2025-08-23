import React from "react";

const Features = () => {
    const riderFeatures = [
        {
            title: "Ride Request Form",
            desc: "Pickup and destination fields, fare estimation, and payment method selection.",
        },
        {
            title: "Live Ride Tracking",
            desc: "Get real-time updates with driver details and optional live map tracking.",
        },
        {
            title: "Ride History",
            desc: "Paginated list with search and filters by date, fare range, and status.",
        },
        {
            title: "Ride Details Page",
            desc: "Includes map route (optional), timestamps, driver info, and ride timeline.",
        },
        {
            title: "Profile Management",
            desc: "Edit your name, phone number, and reset password securely.",
        },
    ];

    const driverFeatures = [
        {
            title: "Availability Control",
            desc: "Toggle your status online or offline anytime.",
        },
        {
            title: "Incoming Requests",
            desc: "Accept or reject rider offers instantly.",
        },
        {
            title: "Active Ride Management",
            desc: "Update ride status: Accepted → Picked Up → In Transit → Completed (or Cancelled).",
        },
        {
            title: "Earnings Dashboard",
            desc: "Track daily, weekly, and monthly earnings with charts and insights.",
        },
        {
            title: "Ride History",
            desc: "Filterable ride records for better tracking and management.",
        },
        {
            title: "Profile Management",
            desc: "Update vehicle details, contact info, and change password easily.",
        },
    ];

   

    interface FeatureCardProps {
        title: string;
        desc: string;
    }

    const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc }) => (
        <div className="bg-card text-card-foreground shadow-md rounded-2xl p-5 hover:shadow-lg transition-all border border-border">
            <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-6 lg:px-20">
            <h1 className="text-3xl font-bold text-center text-primary mb-12 uppercase">
                Ridemate Features
            </h1>

            {/* Rider Features */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold  mb-6 text-center text-orange-600">
                    Rider Features
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {riderFeatures.map((f, i) => (
                        <FeatureCard key={i} title={f.title} desc={f.desc} />
                    ))}
                </div>
            </section>

            {/* Driver Features */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-orange-600 mb-6 text-center">
                    Driver Features
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {driverFeatures.map((f, i) => (
                        <FeatureCard key={i} title={f.title} desc={f.desc} />
                    ))}
                </div>
            </section>

           
        </div>
    );
};

export default Features;
