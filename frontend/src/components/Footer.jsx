import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <h3 className="footer-title">DAB Enterprise</h3>
            <p className="footer-description">
              Professional Store Management System for building materials distribution in Rwanda.
            </p>
            <div className="footer-social-links">
              <a href="#" className="social-link" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter" title="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.857 1.1 4.993 4.993 0 00-8.604 4.55A14.922 14.922 0 012.735 2.1a4.994 4.994 0 001.546 6.662 4.936 4.936 0 01-2.261-.556v.06a4.993 4.993 0 003.997 4.888 4.996 4.996 0 01-2.212.085 4.994 4.994 0 004.659 3.468A10.01 10.01 0 012 19.032a14.887 14.887 0 008.072 2.362c9.699 0 14.979-8.05 14.979-15.02 0-.228-.005-.456-.015-.68A10.691 10.691 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Email" title="Contact us">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#performance">Performance</a></li>
              <li><a href="#updates">Latest Updates</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#press">Press Kit</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#api">API Reference</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#gdpr">GDPR Compliance</a></li>
              <li><a href="#disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-divider" />
        <div className="footer-bottom">
          <div className="footer-credits">
            <p>
              &copy; {currentYear} <strong>DAB Enterprise Ltd.</strong> All rights reserved.
            </p>
            <p className="footer-tagline">
              Empowering businesses with intelligent inventory management solutions.
            </p>
          </div>

          <div className="footer-meta">
            <a href="#status" className="footer-meta-link">System Status</a>
            <span className="footer-meta-dot">•</span>
            <a href="#sitemap" className="footer-meta-link">Sitemap</a>
            <span className="footer-meta-dot">•</span>
            <span className="footer-version">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
