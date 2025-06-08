import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image
              src="/images/parlo-logo-boy.png"
              alt="Parlo Logo"
              width={40}
              height={40}
              style={{ borderRadius: '50%' }}
            />
            <span>Parlo</span>
          </Link>
          <p className="footer-tagline">The fun, easy, and interactive way to learn French.</p>
        </div>
        <div className="footer-links">
          <div className="footer-links-column">
            <h4>Company</h4>
            <ul>
              <li><a href="https://parloapp.io/about" target="_blank" rel="noopener noreferrer">About</a></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/signup">Get Started</Link></li>
            </ul>
          </div>
          <div className="footer-links-column">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/resources">Learning Resources</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Get the latest news and learning tips from Parlo.</p>
          <Link href="/signup" className="cta-button-small">Subscribe</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} Parlo. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 