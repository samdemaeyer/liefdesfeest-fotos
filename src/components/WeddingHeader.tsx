import Image from 'next/image';

interface WeddingHeaderProps {
  children?: React.ReactNode;
}

export default function WeddingHeader({ children }: WeddingHeaderProps) {
  return (
    <header className="text-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Decorative Hearts */}
        <div className="flex justify-center items-center mb-8">
          <div className="mr-4">
            <Image
              src="/hartjes2.png"
              alt="Decorative hearts"
              title="Decorative hearts"
              width={60}
              height={45}
              className="opacity-60"
            />
          </div>
          <div className="ml-4">
            <Image
              src="/ringen.png"
              alt="Wedding rings with diamonds"
              title="Wedding rings with diamonds"
              width={80}
              height={48}
              className="opacity-60"
            />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="wedding-title text-6xl md:text-8xl font-bold mb-6 decorative-border">
          Liefdesfeest
        </h1>

        {/* Date */}
        <p className="wedding-text text-2xl md:text-3xl font-semibold mb-4 italic">
          01.08.2025
        </p>

        {/* Names */}
        <p className="wedding-text text-3xl md:text-4xl font-bold">
          Ben & Dorina
        </p>

        {/* Additional Content */}
        {children}
      </div>
    </header>
  );
}
