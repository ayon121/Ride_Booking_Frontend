
import { GrMapLocation } from "react-icons/gr";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto container space-y-8 px-4 py-16 lg:space-y-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 text-2xl md:text-4xl text-primary hover:text-primary/90">
              <GrMapLocation />
            </div>

            <p className="mt-4 max-w-xs text-muted-foreground">
              Book safe, reliable, and affordable rides anytime, anywhere. Our ride booking app connects you with trusted drivers in just a few taps—making your journey faster, easier, and more convenient. Whether it’s your daily commute or a late-night ride, we’re here to get you there with comfort and care.
            </p>

            
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-foreground/90">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    1on1 Coaching{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Company Review{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Accounts Review{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    HR Consulting{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    SEO Optimisation{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground/90">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Meet the Team{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Accounts Review{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground/90">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Live Chat{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground/90">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Accessibility{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Returns Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    {" "}
                    Refund Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-foreground/60"
                  >
                    Hiring-3 Statistics
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; 2025. RideMate By Ayon Saha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
