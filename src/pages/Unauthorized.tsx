import { Link } from "react-router";


export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-red-500 mb-6">403</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          Unauthorized Access
        </h2>
        <p className="text-muted-foreground mb-8">
          Oops! 🚫 You don’t have permission to view this page.  
          Please check your account role or go back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-accent-foreground text-muted-foreground font-medium shadow hover:bg-accent-foreground transition"
          >
            Go to Homepage
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg border border-muted-foreground text-muted-foregroundfont-medium hover:text-muted hover:bg-muted-foreground transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
}
