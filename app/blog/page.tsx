import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Luxury Chauffeur Travel Insights & Guides | Bookcabs Melbourne',
  description:
    'Expert guides, airport transfer tips, corporate travel advice, and luxury day tour itineraries across Melbourne and Victoria from the Bookcabs Australia team.',
  alternates: {
    canonical: 'https://bookcabs.com.au/blog',
  },
  openGraph: {
    title: 'Bookcabs Blog | Luxury Chauffeur Travel Guides Melbourne',
    description:
      'Expert advice on Melbourne Airport transfers, corporate executive transport, winery day tours, and luxury fleet guides.',
    url: 'https://bookcabs.com.au/blog',
    siteName: 'Bookcabs Australia',
    images: [
      {
        url: '/assets/big-banner-only.png',
        width: 1200,
        height: 630,
        alt: 'Bookcabs Luxury Travel Guides Melbourne',
      },
    ],
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://bookcabs.com.au/blog#blog',
    url: 'https://bookcabs.com.au/blog',
    name: 'Bookcabs Australia Chauffeur & Travel Insights',
    description:
      'Discover expert guides on Melbourne airport transfers, executive car hire, winery tours in Yarra Valley, and luxury chauffeured travel.',
    publisher: {
      '@type': 'Organization',
      name: 'Bookcabs Australia',
      url: 'https://bookcabs.com.au',
      logo: 'https://bookcabs.com.au/assets/bookcabs%20logo.png',
    },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      url: `https://bookcabs.com.au/blog/${post.slug}`,
      datePublished: '2026-09-05T00:00:00+10:00',
      publisher: {
        '@type': 'Organization',
        name: 'Bookcabs Australia',
      },
    })),
  };

  const [featuredPost, ...otherPosts] = BLOG_POSTS;

  return (
    <main style={{ minHeight: '100vh', background: '#080c14', color: '#fff', paddingTop: '110px', paddingBottom: '80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 50px' }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38BDF8',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '20px',
            }}
          >
            <span>✨</span>
            <span>Chauffeur & Travel Insights</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            Luxury Chauffeur Guides &{' '}
            <span className="gradient-text">Melbourne Travel Insights</span>
          </h1>

          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.72)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Authoritative advice on Melbourne Airport transfers, executive corporate mobility, winery day tours across Victoria, and five-star chauffeur travel standards.
          </p>
        </div>
      </section>

      {/* Blog Cards Container */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Featured Article Card */}
        {featuredPost && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 99, 189, 0.15) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '48px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(56, 189, 248, 0.1)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', minHeight: '260px', background: '#0c121d', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image
                src={featuredPost.heroImage}
                alt={featuredPost.title}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(8, 12, 20, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38BDF8',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                Featured Guide
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ color: '#38BDF8', fontWeight: 600 }}>{featuredPost.category}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
                <span>•</span>
                <span>{featuredPost.publishDate}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                <Link href={`/blog/${featuredPost.slug}`} style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>
                {featuredPost.subtitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '8px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                    Bookcabs Editorial
                  </span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 22px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(15, 99, 189, 0.4)',
                  }}
                >
                  <span>Read Guide</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Other Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          {otherPosts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: 'rgba(15, 20, 32, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
              }}
            >
              <div>
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '200px', marginBottom: '20px', background: '#0b101b' }}>
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(8, 12, 20, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#38BDF8',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>

                <h3 style={{ fontSize: '19px', fontWeight: 700, lineHeight: 1.35, marginBottom: '12px' }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.68)', marginBottom: '20px' }}>
                  {post.subtitle}
                </p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Bookcabs Australia</span>

                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    color: '#38BDF8',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Read Article</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Chauffeur Booking CTA */}
        <div
          style={{
            marginTop: '64px',
            background: 'linear-gradient(135deg, rgba(15, 99, 189, 0.25) 0%, rgba(8, 12, 20, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '24px',
            padding: '44px 36px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 800, marginBottom: '14px' }}>
            Ready to Experience Premium Melbourne Chauffeuring?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', maxWidth: '620px', margin: '0 auto 28px' }}>
            Lock in guaranteed upfront pricing, live flight tracking, and pristine executive European sedans or vans.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/quote"
              style={{
                background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(15, 99, 189, 0.45)',
              }}
            >
              Book a Chauffeur Now
            </Link>
            <Link
              href="/cars-fleet"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Explore Our Fleet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
