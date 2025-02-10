import Link from "next/link";

export default function Hero() {
  return (
    <div className="container text-center">
      <h1 className="font-[family-name:var(--font-jersey10)] text-6xl"><span className="block text-4xl">Your Business</span> Deserves the Spotlight.</h1>
      <p>Affordable, creative, and effective solutions for small businesses.</p>
      <Link 
        className="bg-rose-red px-10 py-3 mt-4 font-[family-name:var(--font-jersey10)] text-off-white text-4xl rounded-xs inline-block shadow-md shadow-dark-purple"  
        href="#">Let’s Create Together.</Link>
    </div>
  );
}
