import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | Bookcabs Australia',
    };
  }

  const url = `https://bookcabs.com.au/blog/${post.slug}`;

  return {
    title: `${post.title} | Bookcabs Melbourne`,
    description: post.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: 'Bookcabs Australia',
      type: 'article',
      publishedTime: '2026-09-05T00:00:00+10:00',
      authors: ['Bookcabs Australia'],
      tags: post.tags,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  // Schema for Article, FAQPage, and BreadcrumbList
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://bookcabs.com.au/blog/${post.slug}#article`,
    isPartOf: {
      '@type': 'WebPage',
      '@id': `https://bookcabs.com.au/blog/${post.slug}`,
      url: `https://bookcabs.com.au/blog/${post.slug}`,
      name: post.title,
    },
    headline: post.title,
    description: post.metaDescription,
    image: `https://bookcabs.com.au${post.heroImage}`,
    datePublished: '2026-09-05T00:00:00+10:00',
    dateModified: '2026-09-05T00:00:00+10:00',
    author: {
      '@type': 'Organization',
      name: 'Bookcabs Australia',
      url: 'https://bookcabs.com.au',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bookcabs Australia',
      url: 'https://bookcabs.com.au',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bookcabs.com.au/assets/bookcabs%20logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bookcabs.com.au/blog/${post.slug}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bookcabs.com.au',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://bookcabs.com.au/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://bookcabs.com.au/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main style={{ minHeight: '100vh', background: '#080c14', color: '#fff', paddingTop: '105px', paddingBottom: '90px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article style={{ maxWidth: '920px', margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '28px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Blog</Link>
          <span>/</span>
          <span style={{ color: '#38BDF8', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{post.title}</span>
        </nav>

        {/* Category & Metadata Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <span
            style={{
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38BDF8',
              padding: '5px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
            }}
          >
            {post.category}
          </span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{post.readTime}</span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Published on {post.publishDate}</span>
        </div>

        {/* Main Article Title */}
        <h1
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            marginBottom: '20px',
          }}
        >
          {post.title}
        </h1>

        {/* Subtitle / Excerpt */}
        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.65,
            color: 'rgba(255, 255, 255, 0.75)',
            marginBottom: '32px',
          }}
        >
          {post.subtitle}
        </p>

        {/* Article Quick Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            background: 'rgba(15, 20, 32, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 10px #38BDF8' }} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Bookcabs Australia</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>Official Luxury Chauffeur Service • Melbourne, VIC</div>
            </div>
          </div>

          <Link
            href="/quote"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(15, 99, 189, 0.35)',
            }}
          >
            <span>Book Ride Now</span>
            <span>→</span>
          </Link>
        </div>

        {/* Hero Image */}
        <div
          style={{
            position: 'relative',
            height: '380px',
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '40px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#090d16',
          }}
        >
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* AEO Key Takeaways / Quick Answer Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(15, 99, 189, 0.15) 0%, rgba(15, 23, 42, 0.85) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '20px',
            padding: '28px 32px',
            marginBottom: '44px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 189, 248, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '22px' }}>⚡</span>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#38BDF8', letterSpacing: '-0.01em', margin: 0 }}>
              Key Takeaways & Quick Answer (AEO Summary)
            </h2>
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <div
          className="blog-content-body"
          style={{
            fontSize: '16.5px',
            lineHeight: 1.75,
            color: 'rgba(255, 255, 255, 0.82)',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', margin: '48px 0 36px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.8)',
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* FAQ Section (SEO & AEO Focused) */}
        {post.faqs.length > 0 && (
          <section style={{ marginTop: '50px', background: 'rgba(15, 20, 32, 0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '36px 32px', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>❓</span>
              <span>Frequently Asked Questions</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {post.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px 22px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#38BDF8', marginBottom: '8px' }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Booking CTA Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0F63BD 0%, #0284c7 100%)',
            borderRadius: '24px',
            padding: '40px 32px',
            textAlign: 'center',
            color: '#fff',
            boxShadow: '0 20px 50px rgba(15, 99, 189, 0.4)',
            marginBottom: '64px',
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '12px' }}>
            Reserve Your Melbourne Chauffeur Ride
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.5 }}>
            Pristine luxury fleet, professional vetted drivers, live flight tracking, and transparent fixed fares.
          </p>
          <Link
            href="/quote"
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#0F63BD',
              padding: '14px 36px',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s',
            }}
          >
            Get an Instant Quote Now
          </Link>
        </div>

        {/* Related Articles Section */}
        {otherPosts.length > 0 && (
          <section>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px' }}>
              More Melbourne Chauffeur Guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {otherPosts.map((op) => (
                <div
                  key={op.slug}
                  style={{
                    background: 'rgba(15, 20, 32, 0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase' }}>
                      {op.category}
                    </span>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginTop: '8px', marginBottom: '10px', lineHeight: 1.35 }}>
                      <Link href={`/blog/${op.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>
                        {op.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {op.subtitle}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${op.slug}`}
                    style={{ color: '#38BDF8', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
                  >
                    Read Guide →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
