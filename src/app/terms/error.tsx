'use client';

export default function TermsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background-primary px-6 py-24">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold text-gray-700">Terms temporarily unavailable</h1>
        <p className="mt-4 text-gray-600">
          We could not load the current Terms and Conditions. Please try again before making a
          booking.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-[#1D4747] px-6 py-3 font-medium text-white hover:bg-[#0C2626]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
