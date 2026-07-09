import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import SEO from '../Components/SEO.jsx';

const PrivacyPolicyPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: 'https://www.topnewsmarathi.com/privacy-policy/',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Top News Marathi',
      url: 'https://www.topnewsmarathi.com',
    },
  };

  return (
    <div className="min-h-screen bg-white text-black w-full pb-16" lang="en">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy describing how Top News Marathi collects, uses, and protects the personal information of visitors across its website, YouTube channel, and e-platform distribution network."
        canonical="https://www.topnewsmarathi.com/privacy-policy/"
        schema={schema}
      />

      <div className="w-full px-4 md:px-8 lg:px-12 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-brand-red transition-colors flex items-center gap-1">
            <Home size={12} /> होम
          </Link>
          <ChevronRight size={12} className="text-brand-red" />
          <span className="text-gray-900">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 mb-10">
          <span className="text-[10px] bg-brand-red/10 text-brand-red border border-brand-red/30 px-3 py-0.5 rounded-full font-black uppercase tracking-widest">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-black mt-3 mb-1 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-brand-red font-bold text-sm md:text-base mb-4">
            गोपनीयता धोरण
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm text-gray-600">
            <span><strong className="text-black">Effective Date:</strong> July 1, 2025</span>
            <span><strong className="text-black">Website:</strong> www.topnewsmarathi.com</span>
            <span><strong className="text-black">YouTube:</strong> youtube.com/@topnewsmarathi</span>
          </div>
        </div>

        <div className="article-content legal-content">

          <h2>1. About Top News Marathi</h2>
          <p>
            Top News Marathi (www.topnewsmarathi.com) is a Maharashtra-based digital news agency
            committed to delivering pure, authentic, and verified news to Marathi-speaking audiences
            across Maharashtra and beyond. We operate across multiple platforms:
          </p>
          <ul>
            <li>
              <strong>Website Platform:</strong> www.topnewsmarathi.com — covering politics, sports,
              entertainment, business, and all-Maharashtra local news
            </li>
            <li>
              <strong>YouTube Channel:</strong> youtube.com/@topnewsmarathi — video news coverage and
              live broadcasts
            </li>
            <li>
              <strong>E-Platform Distribution:</strong> Multi-channel digital distribution for
              reaching Marathi readers statewide
            </li>
          </ul>
          <p>
            Our editorial policy is built on the principles of truth, accuracy, and accountability.
            Every news item published on our platforms goes through verification before publication.
            We are a genuine news agency — not a rumor portal or entertainment aggregator.
          </p>

          <h2>2. Scope of This Privacy Policy</h2>
          <p>This Privacy Policy governs all data collected and processed by Top News Marathi across:</p>
          <ul>
            <li>Our website at www.topnewsmarathi.com</li>
            <li>Our YouTube channel and associated Google/YouTube services</li>
            <li>Our email newsletter and subscription systems</li>
            <li>Any future digital platforms or apps under the Top News Marathi brand</li>
          </ul>
          <p>
            By accessing or using our services, you agree to the data practices described in this
            policy. If you do not agree, please discontinue use of our platforms.
          </p>

          <h2>3. Information We Collect</h2>

          <h3>3.1 Information You Provide Directly</h3>
          <ul>
            <li>Name, email address, and phone number when subscribing to our newsletter</li>
            <li>Name and email address when submitting comments or contacting us</li>
            <li>Details submitted via our 'Send a Tip / News Lead' form</li>
            <li>Feedback and survey responses</li>
          </ul>

          <h3>3.2 Automatically Collected Information</h3>
          <p>
            When you visit www.topnewsmarathi.com, our servers and analytics tools automatically
            collect:
          </p>
          <ul>
            <li>IP address and approximate geographic location</li>
            <li>Browser type, version, and operating system</li>
            <li>Pages visited, time spent, and navigation patterns</li>
            <li>Device type (desktop, mobile, tablet)</li>
            <li>Referring website or search engine</li>
            <li>Date, time, and duration of visit</li>
          </ul>

          <h3>3.3 Cookies and Tracking Technologies</h3>
          <p>
            We use cookies (small data files stored on your device) for the following purposes:
          </p>
          <ul>
            <li><strong>Session cookies:</strong> To maintain your session as you navigate our site</li>
            <li><strong>Analytics cookies:</strong> Google Analytics tracks aggregate visitor behavior to help us improve content</li>
            <li><strong>Advertising cookies:</strong> Google AdSense and other ad partners may set cookies to serve relevant ads</li>
            <li><strong>Preference cookies:</strong> To remember your language or display preferences</li>
          </ul>
          <p>
            You can control or disable cookies through your browser settings. Disabling cookies may
            affect the functionality of certain site features.
          </p>

          <h2>4. How We Use Your Information</h2>
          <p>Top News Marathi uses collected data for the following purposes:</p>
          <ul>
            <li>Delivering news content, updates, and newsletters you have subscribed to</li>
            <li>Improving website performance, content quality, and user experience</li>
            <li>Responding to your queries, tips, or feedback</li>
            <li>Displaying relevant advertisements to fund our journalism operations</li>
            <li>Analyzing traffic patterns to understand which topics resonate with our readers</li>
            <li>Complying with legal obligations applicable to digital news publishers in India</li>
            <li>Protecting the security and integrity of our platforms</li>
          </ul>
          <blockquote>
            We do NOT sell, rent, or trade your personal information to any third party for their
            marketing purposes.
          </blockquote>

          <h2>5. Third-Party Services</h2>
          <p>
            Top News Marathi uses the following third-party services that may collect data
            independently:
          </p>

          <h3>5.1 Google Services</h3>
          <ul>
            <li><strong>Google Analytics:</strong> Tracks visitor behavior in aggregate form. See: policies.google.com/privacy</li>
            <li><strong>Google AdSense:</strong> Serves contextual advertisements. Google may use DART cookies.</li>
            <li><strong>YouTube (Alphabet Inc.):</strong> Our YouTube channel is governed by YouTube's Terms of Service and Google Privacy Policy</li>
            <li><strong>Google Tag Manager:</strong> Used to manage analytics and tracking scripts</li>
          </ul>

          <h3>5.2 Social Media Platforms</h3>
          <p>
            When you share our content on Facebook, WhatsApp, X (Twitter), or Instagram, those
            platforms' privacy policies apply to data collected during that interaction. We are not
            responsible for third-party platforms' data practices.
          </p>

          <h2>6. YouTube Channel — Additional Terms</h2>
          <p>
            Our YouTube channel (youtube.com/@topnewsmarathi) is operated under YouTube's Terms of
            Service. By watching, liking, commenting, or subscribing on YouTube, you are interacting
            with a Google-owned platform. We encourage you to review:
          </p>
          <ul>
            <li>YouTube Terms of Service: youtube.com/t/terms</li>
            <li>Google Privacy Policy: policies.google.com/privacy</li>
          </ul>
          <p>
            Comments posted on our YouTube videos are public. We reserve the right to remove comments
            that are abusive, defamatory, or violate community guidelines.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary for the purposes outlined in this
            policy:
          </p>
          <ul>
            <li>Newsletter subscriber data: Retained until you unsubscribe</li>
            <li>Comment data: Retained for the lifetime of the article unless deleted by request</li>
            <li>Server logs and analytics: Retained for a maximum of 26 months</li>
            <li>Correspondence records: Retained for 3 years for legal and compliance purposes</li>
          </ul>

          <h2>8. Data Security</h2>
          <p>
            Top News Marathi takes the security of your data seriously. We implement reasonable
            technical and organizational safeguards including:
          </p>
          <ul>
            <li>HTTPS encryption across our website (SSL/TLS)</li>
            <li>Restricted access to personal data — only authorized team members can access subscriber lists</li>
            <li>Regular security reviews of our web hosting infrastructure</li>
          </ul>
          <p>
            However, no internet transmission is 100% secure. We cannot guarantee absolute security
            and are not liable for unauthorized access resulting from circumstances beyond our
            reasonable control.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Top News Marathi is a general news platform intended for audiences aged 13 and above. We
            do not knowingly collect personal information from children under the age of 13. If a
            parent or guardian believes their child has submitted personal information to us, please
            contact us immediately and we will delete such data.
          </p>

          <h2>10. Your Rights</h2>
          <p>As a user of Top News Marathi, you have the following rights:</p>
          <ul>
            <li><strong>Right to Access:</strong> Request a copy of personal data we hold about you</li>
            <li><strong>Right to Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Deletion:</strong> Request deletion of your data from our systems</li>
            <li><strong>Right to Opt-Out:</strong> Unsubscribe from newsletters at any time via the unsubscribe link</li>
            <li><strong>Right to Object:</strong> Object to processing of your data for advertising purposes</li>
          </ul>
          <p>To exercise any of these rights, contact us at the details provided in Section 12.</p>

          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            Top News Marathi reserves the right to update this Privacy Policy at any time. When we
            make significant changes, we will:
          </p>
          <ul>
            <li>Update the 'Effective Date' at the top of this document</li>
            <li>Publish a notice on our website homepage</li>
            <li>Notify newsletter subscribers via email if changes are material</li>
          </ul>
          <p>
            Your continued use of our platforms after changes are posted constitutes your acceptance
            of the revised policy.
          </p>

          <h2>12. Contact Information</h2>
          <p>For privacy-related queries, data requests, or concerns, please contact:</p>
          <p><strong>Top News Marathi — News Operations</strong></p>
          <ul>
            <li>Website: www.topnewsmarathi.com</li>
            <li>YouTube: youtube.com/@topnewsmarathi</li>
            <li>Maharashtra, India</li>
          </ul>
          <p>We aim to respond to all privacy-related queries within 7 working days.</p>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
