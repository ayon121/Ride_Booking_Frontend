export default function DeletedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">Account Deleted</h1>
      <p className="mt-4 text-gray-600">
        Your rider account has been deleted. Please contact support at 
        <a href="mailto:support@example.com" className="text-blue-500 underline">
          ridemate@example.com
        </a>
      </p>
    </div>
  );
}
