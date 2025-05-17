import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-red-950 to-red-800 text-white py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">About Formula 1</h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
        Formula 1 is the pinnacle of motorsport, combining cutting-edge technology, speed, and global passion.
      </p>
      <Link href="/" className="bg-white text-red-950 px-8 py-3 rounded-md hover:bg-red-200">
        Back to Home
      </Link>
    </section>
  );
}
