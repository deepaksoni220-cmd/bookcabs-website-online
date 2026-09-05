import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        color: '#ffffff',
      }}
    >
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '48px',
          marginBottom: '16px',
        }}
      >
        404 - Page Not Found
      </h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          padding: '12px 28px',
          borderRadius: '999px',
          background: '#d4a359',
          color: '#080c14',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Return Home
      </Link>
    </main>
  );
}
