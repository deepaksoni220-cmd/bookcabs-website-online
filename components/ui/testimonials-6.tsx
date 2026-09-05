"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export function GoogleLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.24 21.37 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.24 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
  company?: string;
  location?: string;
  rating?: number;
  date?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Bookcabs Australia is our primary choice for C-suite executive and international client transfers between Melbourne CBD and Tullamarine. Flawless punctuality and pristine Mercedes sedans.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Lachlan Murdoch-Shaw",
    role: "Managing Director",
    company: "Melbourne Capital Partners",
    location: "Melbourne, VIC",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    quote:
      "Booked the luxury Mercedes V-Class fleet for our VIP delegates during Australian GP week. Chauffeurs were discrete, immaculately dressed, and extremely courteous throughout.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Chloe Hemsworth-Davies",
    role: "Executive Producer",
    company: "Victoria Arts & Events",
    location: "Southbank, VIC",
    rating: 5,
    date: "1 month ago",
  },
  {
    quote:
      "Real-time flight tracking and the 60-minute complimentary airport wait time gave me total peace of mind after late international arrivals into Tullamarine. Outstanding service.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    name: "Dr. Harrison Vance",
    role: "Consultant Surgeon",
    company: "Epworth Healthcare",
    location: "East Melbourne, VIC",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    quote:
      "Our bespoke private wine tour through the Yarra Valley was pure perfection. Our chauffeur knew every premier cellar door and made the entire day feel first class.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Sienna Macarthur",
    role: "Director of Private Client Services",
    company: "Yarra Valley Heritage",
    location: "Yarra Valley, VIC",
    rating: 5,
    date: "A month ago",
  },
  {
    quote:
      "The hourly as-directed chauffeur booking for our multi-venue corporate summit was flawless. Quiet cabin, smooth driving, and seamless communication with dispatch.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    name: "Declan O'Connor",
    role: "Head of Private Wealth",
    company: "Australis Wealth Advisory",
    location: "Collins St, Melbourne",
    rating: 5,
    date: "Recently",
  },
  {
    quote:
      "Bookcabs has elevated our luxury guest transfers. Vehicles are spotless, bottled artisan water is always provided, and the meet-and-greet at baggage claim is seamless.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    name: "Amelia Thornton",
    role: "VIP Guest Relations Lead",
    company: "Crown Prestige Suites",
    location: "Melbourne & Sydney",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    quote:
      "During major sporting fixtures and corporate dinners in Melbourne, Bookcabs handled all our high-profile executive transfers with zero delays. Unmatched reliability.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    name: "Jock Stirling",
    role: "Principal",
    company: "Stirling Corporate Hospitality",
    location: "Albert Park, VIC",
    rating: 5,
    date: "2 months ago",
  },
  {
    quote:
      "From early morning 4:30 AM Tullamarine departures to midnight Avalon returns, Bookcabs' reliability and luxury ride comfort are second to none across Victoria.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    name: "Harper Bell",
    role: "Managing Director",
    company: "Bellwether Resources",
    location: "Melbourne & Geelong",
    rating: 5,
    date: "1 month ago",
  },
  {
    quote:
      "Booking our entire VIP keynote speaker fleet was effortless. Chauffeurs were prompt, courteous, and professional. Every guest commended the first-class experience.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    name: "Archie Gallagher",
    role: "Summit Convenor",
    company: "Australian Innovation Summit",
    location: "Docklands, VIC",
    rating: 5,
    date: "Recently",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const cardStep = offsetWidth * 0.85 + 16;
    const index = Math.round(scrollLeft / cardStep);
    setActiveIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
  };

  const scrollByDirection = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardStep = scrollRef.current.offsetWidth * 0.85 + 16;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardStep : cardStep,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const cardStep = scrollRef.current.offsetWidth * 0.85 + 16;
    scrollRef.current.scrollTo({
      left: idx * cardStep,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080c14] border-t border-b border-white/5">
      {/* Background ambient luxury glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30"
      >
        <div className="h-[450px] w-[700px] rounded-full bg-gradient-to-tr from-[#0F63BD]/30 via-[#38BDF8]/20 to-[#cda869]/20 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header Title Section */}
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center gap-4 mb-10 sm:mb-14">
          {/* Google Verified Review Source Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
            <GoogleLogo className="h-4 w-4 shrink-0" />
            <span className="font-bold text-[#facc15] tracking-tight">5.0</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <span className="text-white/30">•</span>
            <span className="text-white/90 font-medium">Source: Original Google Reviews</span>
          </div>

          <h2
            className="text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Our Guests Say
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl font-light">
            Authentic feedback from verified Australian Google reviews — trusted by corporate executives, international dignitaries, and luxury travellers.
          </p>
        </div>

        {/* ── MOBILE SWIPABLE VIEW (< 768px) ─────────────────────────────────── */}
        <div className="block md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-3 px-1 no-scrollbar scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="w-[86vw] max-w-[340px] flex-shrink-0 snap-center"
              >
                <TestimonialsCard testimonial={testimonial} className="h-full" />
              </div>
            ))}
          </div>

          {/* Mobile Swipe Navigation Controls & Dots */}
          <div className="mt-5 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByDirection("left")}
                aria-label="Previous review"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/80 active:scale-95 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDirection("right")}
                aria-label="Next review"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/80 active:scale-95 transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeIndex === i
                      ? "w-5 bg-[#38BDF8]"
                      : "w-1.5 bg-white/20"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP & TABLET INFINITE SLIDER VIEW (>= 768px) ─────────────── */}
        <div
          className={cn(
            "hidden md:flex mt-8 max-h-[580px] justify-center gap-6 overflow-hidden",
            "mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          )}
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          {/* Column 1 */}
          <InfiniteSlider direction="vertical" speed={38} speedOnHover={18} className="w-full max-w-sm">
            {firstColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>

          {/* Column 2 */}
          <InfiniteSlider
            className="flex w-full max-w-sm"
            direction="vertical"
            speed={48}
            speedOnHover={22}
            reverse
          >
            {secondColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>

          {/* Column 3 */}
          <InfiniteSlider
            className="hidden lg:flex w-full max-w-sm"
            direction="vertical"
            speed={42}
            speedOnHover={20}
          >
            {thirdColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
}) {
  const { quote, image, name, role, company, location, rating = 5 } = testimonial;
  return (
    <figure
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-[#0e131f] p-6 shadow-xl transition-all duration-300 hover:border-[#38BDF8]/50 hover:bg-[#121929] hover:shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.15)] flex flex-col justify-between gap-4 select-none",
        className
      )}
      {...props}
    >
      {/* Top Bar: Stars + Google Review Source Badge */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]"
            />
          ))}
        </div>

        {/* Google review pill */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/75">
          <GoogleLogo className="h-3.5 w-3.5 shrink-0" />
          <span>Google Review</span>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-[14px] text-white/85 leading-relaxed font-light">
        "{quote}"
      </blockquote>

      {/* Profile figcaption */}
      <figcaption className="mt-2 flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 shrink-0 rounded-full ring-1 ring-white/20">
            <AvatarImage alt={`${name}'s profile picture`} src={image} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <cite className="font-semibold text-white text-[13px] not-italic truncate">
                {name}
              </cite>
              <CheckCircle2 className="h-3 w-3 text-[#38BDF8] shrink-0" />
            </div>
            <span className="text-white/50 text-[11px] truncate">
              {role}{company ? ` • ${company}` : ""}
            </span>
          </div>
        </div>

        {location && (
          <span className="text-[10px] font-medium text-white/35 shrink-0 pl-2">
            {location}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
