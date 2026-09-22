import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-7">
      <span className="font-mono text-[0.8rem] text-accent">404</span>
      <h1 className="font-display font-semibold text-3xl">Page not found</h1>
      <p className="text-muted max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="mt-2 font-semibold hover:text-accent">
        Back to home
      </Link>
    </div>
  );
}
