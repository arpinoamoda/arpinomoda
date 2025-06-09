import Image from 'next/image';
export default function Carousel() {
  return (
    <div className="w-full h-48 overflow-hidden border-black">
      {/* Ticker container */}
      <div className="flex animate-scroll h-full">
        {/* First instance of the ticker content */}
        <div className="flex-shrink-0 h-full flex items-center">
          <Image
            src="/images/ticker.jpg"
            alt="Arpinomoda Logo"
            width={27167}
            height={3358}
            className="max-h-full w-auto object-contain"
          />
        </div>
        <div className="flex-shrink-0 h-full flex items-center">
          <Image
            src="/images/ticker.jpg"
            alt="Arpinomoda Logo"
            width={27167}
            height={3358}
            className="max-h-full w-auto object-contain"
          />
        </div>
        <div className="flex-shrink-0 h-full flex items-center">
          <Image
            src="/images/ticker.jpg"
            alt="Arpinomoda Logo"
            width={27167}
            height={3358}
            className="max-h-full w-auto object-contain"
          />
        </div>
      </div>
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
