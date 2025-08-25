export default function SuspendedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">Account Suspended</h1>
      <p className="mt-4 text-foreground text-lg">
        Your driver account has been suspended. Please contact support at 
        <a href="ridemate@example.com" className="text-orange-700 underline px-2">
          ridemate@example.com
        </a>
      </p>
    </div>
  );
}
