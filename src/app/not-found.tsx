import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-5 dot-grid">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted">404</p>
        <h1 className="font-display font-bold text-4xl mt-2">Page not found</h1>
        <Link href="/" className="inline-block mt-6 text-sm underline underline-offset-4">Back to home</Link>
      </div>
    </div>
  );
}
