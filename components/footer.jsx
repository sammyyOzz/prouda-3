// import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; All rights reserved.</p>
          </div>
          {/* <div className="footer-right">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/sitemap">Sitemap</Link>
            <a
              href="https://templatemo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Provided by TemplateMo
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}