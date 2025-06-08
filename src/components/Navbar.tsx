import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          <Image
            src="/images/parlo-logo-boy.png"
            alt="Parlo Logo"
            width={48}
            height={48}
            priority
            style={{ marginRight: '0.5rem' }}
          />
          <span>Parlo</span>
        </Link>
        
        <div className="navbar-links">
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/faq" className="nav-link">
            FAQ
          </Link>
          <Link href="/signup" className="cta-button">
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
} 