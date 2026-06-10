import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info & Branding */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <h3> DAB Enterprise</h3>
              <p className="brand-tagline">AI-Powered Store Management System</p>
            </div>
            <p className="footer-description">
              Advanced inventory management system with intelligent demand forecasting for building materials and retail operations across Rwanda.
            </p>
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={18} />
                <span>Kigali, Rwanda</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+250 (0) 788 000 000</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>info@dab-enterprise.rw</span>
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="footer-section">
            <h4> PRODUCT FEATURES</h4>
            <div className="footer-links">
              <div className="link-category">
                <h5>📊 Core Inventory Management</h5>
                <ul>
                  <li><a href="#inventory-management">Complete Inventory Management System</a></li>
                  <li><a href="#stock-tracking">Real-time Stock Tracking & Updates</a></li>
                  <li><a href="#multi-warehouse">Multi-Warehouse Support</a></li>
                  <li><a href="#supplier-management">Supplier & Vendor Management</a></li>
                  <li><a href="#user-management">Role-Based User Access Control</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>🤖 AI & Demand Forecasting</h5>
                <ul>
                  <li><a href="#demand-forecasting">30-Day Demand Forecasting (85-92% Accuracy)</a></li>
                  <li><a href="#trend-analysis">Advanced Trend Analysis (Daily/Weekly/Monthly/Seasonal)</a></li>
                  <li><a href="#reorder-recommendations">Smart Reorder Recommendations with Confidence Scoring</a></li>
                  <li><a href="#stock-optimization">Intelligent Stock Level Optimization</a></li>
                  <li><a href="#predictive-analytics">Prophet-Based Time-Series Analytics</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>📈 Advanced Analytics & Reporting</h5>
                <ul>
                  <li><a href="#volatility-metrics">Demand Volatility Analysis</a></li>
                  <li><a href="#confidence-intervals">95% Confidence Intervals on Predictions</a></li>
                  <li><a href="#historical-trends">Historical Pattern Detection</a></li>
                  <li><a href="#real-time-reporting">Real-time Executive Dashboard</a></li>
                  <li><a href="#accuracy-tracking">Model Accuracy Monitoring & Validation</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>🔧 Integration & API</h5>
                <ul>
                  <li><a href="#rest-api">RESTful API for Third-party Integration</a></li>
                  <li><a href="#system-integrations">Seamless System Integrations</a></li>
                  <li><a href="#data-sync">Real-time Data Synchronization</a></li>
                  <li><a href="#webhook-support">Webhook Support for Event Notifications</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="footer-section">
            <h4>🏛️ COMPANY</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog & News</a></li>
              <li><a href="#press">Press Kit</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#partners">Partners & Suppliers</a></li>
              <li><a href="#testimonials">Customer Testimonials</a></li>
            </ul>
          </div>

          {/* Resources & Documentation */}
          <div className="footer-section">
            <h4>📚 DOCUMENTATION & GUIDES</h4>
            <div className="footer-links">
              <div className="link-category">
                <h5>📖 Complete Documentation</h5>
                <ul>
                  <li><a href="#user-guide">User Guide & Getting Started</a></li>
                  <li><a href="#api-docs">REST API Documentation & Endpoints</a></li>
                  <li><a href="#forecasting-guide">AI Forecasting Technical Guide</a></li>
                  <li><a href="#implementation-summary">Implementation Summary & Architecture</a></li>
                  <li><a href="#installation">Installation & Setup Instructions</a></li>
                  <li><a href="#database-schema">Database Schema Documentation</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>🎓 Learning Resources</h5>
                <ul>
                  <li><a href="#tutorials">Video Tutorials & Demos</a></li>
                  <li><a href="#code-examples">Code Examples & Use Cases</a></li>
                  <li><a href="#best-practices">Best Practices Guide</a></li>
                  <li><a href="#faq">Frequently Asked Questions</a></li>
                  <li><a href="#community">Community Forum & Support</a></li>
                  <li><a href="#webinars">Live Webinars & Training Sessions</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>🔧 Technical Resources</h5>
                <ul>
                  <li><a href="#ml-algorithms">ML Algorithms & Prophet Implementation</a></li>
                  <li><a href="#performance-tuning">Performance Tuning Guide</a></li>
                  <li><a href="#data-quality">Data Quality & Validation Standards</a></li>
                  <li><a href="#troubleshooting">Troubleshooting & Common Issues</a></li>
                  <li><a href="#changelog">Changelog & Version History</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>💼 Business Resources</h5>
                <ul>
                  <li><a href="#roi-calculator">ROI Calculator</a></li>
                  <li><a href="#case-studies">Success Stories & Case Studies</a></li>
                  <li><a href="#white-papers">Technical White Papers</a></li>
                  <li><a href="#implementation-checklist">Implementation Checklist</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical & Legal */}
          <div className="footer-section">
            <h4>⚖️ LEGAL, COMPLIANCE & SECURITY</h4>
            <div className="footer-links">
              <div className="link-category">
                <h5>📋 Legal Policies</h5>
                <ul>
                  <li><a href="#privacy">Privacy Policy & Data Handling</a></li>
                  <li><a href="#terms">Terms of Service & Conditions</a></li>
                  <li><a href="#cookie">Cookie Policy & Tracking</a></li>
                  <li><a href="#disclaimer">Liability Disclaimer</a></li>
                  <li><a href="#acceptable-use">Acceptable Use Policy</a></li>
                  <li><a href="#sla">Service Level Agreement (SLA)</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>🔐 Data Protection & Compliance</h5>
                <ul>
                  <li><a href="#gdpr">GDPR Compliance & Data Rights</a></li>
                  <li><a href="#data-protection">Data Protection Standards</a></li>
                  <li><a href="#encryption">End-to-End Encryption & Security</a></li>
                  <li><a href="#audit-logs">Audit Logs & Compliance Tracking</a></li>
                  <li><a href="#iso-certified">ISO 27001 Certification</a></li>
                  <li><a href="#business-continuity">Business Continuity & Backup Plans</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>🛡️ Security & Accessibility</h5>
                <ul>
                  <li><a href="#security-standards">Security Standards & Certifications</a></li>
                  <li><a href="#penetration-testing">Regular Penetration Testing</a></li>
                  <li><a href="#vulnerability-disclosure">Vulnerability Disclosure Policy</a></li>
                  <li><a href="#accessibility">WCAG 2.1 Accessibility Standards</a></li>
                  <li><a href="#user-authentication">Multi-Factor Authentication (MFA)</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance & Security */}
          <div className="footer-section">
            <h4>⚡ PERFORMANCE, MONITORING & INFRASTRUCTURE</h4>
            <ul className="footer-links">
              <li><a href="#security-features">🔒 Advanced Security Features & Protocols</a></li>
              <li><a href="#system-status">📊 Real-time System Status & Monitoring</a></li>
              <li><a href="#uptime">⏱️ 99.9% Uptime Guarantee & SLA</a></li>
              <li><a href="#disaster-recovery">🔄 Disaster Recovery & Business Continuity</a></li>
              <li><a href="#performance">📈 Performance Metrics & Analytics</a></li>
              <li><a href="#load-balancing">⚙️ Load Balancing & Auto-Scaling</a></li>
              <li><a href="#api-rate-limit">🚀 API Rate Limiting & Optimization</a></li>
              <li><a href="#database-backup">💾 Automated Database Backups & Recovery</a></li>
              <li><a href="#certifications">✅ Industry Certifications & Compliance</a></li>
              <li><a href="#monitoring-alerts">🚨 Real-time Alerts & Notifications</a></li>
            </ul>
          </div>

          {/* Backend Technology Stack */}
          <div className="footer-section">
            <h4>⚙️ TECHNOLOGY STACK</h4>
            <div className="footer-links">
              <div className="link-category">
                <h5>🤖 AI & Machine Learning</h5>
                <ul>
                  <li><a href="#prophet-ml">Facebook Prophet Time-Series Forecasting</a></li>
                  <li><a href="#random-forest">Random Forest Regression Models</a></li>
                  <li><a href="#scikit-learn">Scikit-learn ML Framework</a></li>
                  <li><a href="#model-validation">Statistical Model Validation</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>💻 Backend Architecture</h5>
                <ul>
                  <li><a href="#node-js">Node.js Runtime Environment</a></li>
                  <li><a href="#flask-api">Flask REST API Framework</a></li>
                  <li><a href="#python">Python 3.8+ Backend Services</a></li>
                  <li><a href="#connection-pooling">Connection Pooling & Optimization</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>📦 Database & Storage</h5>
                <ul>
                  <li><a href="#mysql">MySQL 5.7+ Relational Database</a></li>
                  <li><a href="#data-persistence">Persistent Data Storage & Backups</a></li>
                  <li><a href="#query-optimization">Query Optimization & Indexing</a></li>
                  <li><a href="#data-integrity">Data Integrity & ACID Compliance</a></li>
                </ul>
              </div>
              <div className="link-category">
                <h5>🎨 Frontend Framework</h5>
                <ul>
                  <li><a href="#react">React.js Component Architecture</a></li>
                  <li><a href="#chart-js">Chart.js Data Visualization</a></li>
                  <li><a href="#html5">HTML5 & CSS3 Responsive Design</a></li>
                  <li><a href="#lucide-icons">Lucide Icons & UI Components</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Newsletter */}
      <div className="footer-middle">
        <div className="footer-container">
          <div className="newsletter-section">
            <div>
              <h4>📧 Stay Updated</h4>
              <p>Subscribe to get latest features, updates, and best practices</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className="social-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook" title="Facebook" aria-label="Follow us on Facebook">
                <Facebook size={24} />
              </a>
              <a href="#twitter" title="Twitter" aria-label="Follow us on Twitter">
                <Twitter size={24} />
              </a>
              <a href="#linkedin" title="LinkedIn" aria-label="Connect on LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="#instagram" title="Instagram" aria-label="Follow us on Instagram">
                <Instagram size={24} />
              </a>
              <a href="#email" title="Email" aria-label="Contact us via email">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} <strong>DAB Enterprise Ltd</strong>. All rights reserved.
            </p>
            <p className="footer-version">
              Store Management System v2.0 + AI Forecasting v1.0
            </p>
            <p className="footer-location">
              Based in Kigali, Rwanda 🇷🇼
            </p>
          </div>

          <div className="footer-credits">
            <p>
              Built with <span className="heart">❤️</span> for efficient inventory management
            </p>
            <p className="tech-stack">
              <strong>Tech Stack:</strong> React | Node.js | MySQL | Python | Prophet ML
            </p>
          </div>
        </div>
      </div>

      {/* Footer Utilities Bar */}
      <div className="footer-utilities">
        <div className="footer-container">
          <a href="#sitemap">Sitemap</a>
          <a href="#rss">RSS Feed</a>
          <a href="#changelog">Changelog</a>
          <a href="#status">Status Page</a>
          <a href="#feedback">Send Feedback</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
