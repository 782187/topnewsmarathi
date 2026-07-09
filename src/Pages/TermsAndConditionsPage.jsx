import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import SEO from '../Components/SEO.jsx';

const TermsAndConditionsPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms & Conditions',
    url: 'https://www.topnewsmarathi.com/terms-and-conditions/',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Top News Marathi',
      url: 'https://www.topnewsmarathi.com',
    },
  };

  return (
    <div className="min-h-screen bg-white text-black w-full pb-16" lang="en">
      <SEO
        title="Terms & Conditions"
        description="Terms & Conditions governing the use of Top News Marathi's website, YouTube channel, and e-platform distribution network."
        canonical="https://www.topnewsmarathi.com/terms-and-conditions/"
        schema={schema}
      />

      <div className="w-full px-4 md:px-8 lg:px-12 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-brand-red transition-colors flex items-center gap-1">
            <Home size={12} /> होम
          </Link>
          <ChevronRight size={12} className="text-brand-red" />
          <span className="text-gray-900">Terms &amp; Conditions</span>
        </nav>

        {/* Header */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 mb-10">
          <span className="text-[10px] bg-brand-red/10 text-brand-red border border-brand-red/30 px-3 py-0.5 rounded-full font-black uppercase tracking-widest">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-black mt-3 mb-4 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm text-gray-600">
            <span><strong className="text-black">Effective Date:</strong> July 1, 2025</span>
            <span><strong className="text-black">Jurisdiction:</strong> Pune, Maharashtra, India</span>
            <span><strong className="text-black">Version:</strong> 1.0</span>
          </div>
        </div>

        <div className="article-content legal-content">

          <blockquote>
            <strong>IMPORTANT NOTICE</strong>
            <br />
            By accessing, reading, watching, sharing, or interacting with any content on Top News
            Marathi's platforms, you acknowledge that you have read, understood, and agree to be
            legally bound by these Terms &amp; Conditions. If you do not agree, please discontinue use
            of all our platforms immediately.
          </blockquote>

          <h2>1. About Top News Marathi</h2>
          <p>
            Top News Marathi (www.topnewsmarathi.com) is a Maharashtra-based authentic digital news
            agency dedicated to delivering pure, verified, and unbiased Marathi news to readers across
            all 36 districts of Maharashtra and the global Marathi-speaking community.
          </p>
          <p>
            We are a genuine news agency — not a rumor portal, entertainment aggregator, or paid
            content platform. Every news item published on our platforms is reviewed and verified by
            our editorial team before publication.
          </p>
          <p>Our platforms and operations:</p>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Address</th>
                <th>Coverage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Website</td>
                <td>www.topnewsmarathi.com</td>
                <td>Politics, sports, entertainment, business, local news — all Maharashtra</td>
              </tr>
              <tr>
                <td>YouTube Channel</td>
                <td>youtube.com/@topnewsmarathi</td>
                <td>Video news, live broadcasts, Marathi news analysis</td>
              </tr>
              <tr>
                <td>E-Platform Distribution</td>
                <td>Multi-channel digital</td>
                <td>Maharashtra-wide digital news distribution network</td>
              </tr>
              <tr>
                <td>Newsletters &amp; Notifications</td>
                <td>Email / Push</td>
                <td>Subscribed reader updates and breaking news alerts</td>
              </tr>
            </tbody>
          </table>

          <h2>2. Acceptance of Terms</h2>
          <p>By accessing or using any Top News Marathi platform, you confirm that:</p>
          <ul>
            <li>You are at least 13 years of age</li>
            <li>You have read and understood these Terms &amp; Conditions in full</li>
            <li>You agree to be legally bound by these Terms</li>
            <li>If you are using our platforms on behalf of an organisation, you have the authority to bind that organisation to these Terms</li>
          </ul>
          <p>
            These Terms apply to all visitors, readers, subscribers, news tip submitters, and any other
            users of our platforms.
          </p>

          <h2>3. Editorial Standards &amp; Authenticity Commitment</h2>
          <p>
            Top News Marathi is committed to authentic, pure, and independent journalism. Our
            editorial commitments to readers are as follows:
          </p>

          <h3>3.1 Verification First</h3>
          <p>
            Every news item undergoes editorial verification before publication. In fast-moving
            breaking news situations, content is clearly labelled as 'Developing Story' and updated as
            verified facts emerge.
          </p>

          <h3>3.2 No Paid News Policy</h3>
          <p>
            We strictly separate advertising from editorial content. Paid, sponsored, or promotional
            content is always clearly labelled as such. No payment is accepted in exchange for
            favourable news coverage.
          </p>

          <h3>3.3 Corrections Policy</h3>
          <p>
            When we publish an error, we issue a correction prominently and transparently, with
            acknowledgment of the mistake. Corrections are published on the same page as the original
            article wherever possible.
          </p>

          <h3>3.4 All-Maharashtra Coverage</h3>
          <p>
            We provide equal news coverage across all 36 districts of Maharashtra — including
            Vidarbha, Marathwada, Konkan, and Western Maharashtra — ensuring no region is
            underserved.
          </p>

          <h3>3.5 Editorial Independence</h3>
          <p>
            Our journalists and editors maintain full independence from political parties, government
            agencies, and corporate entities. Advertisers have no influence over our editorial decisions.
          </p>

          <h3>3.6 Zero Tolerance for Fake News</h3>
          <p>
            We do not publish unverified rumours, fabricated stories, misinformation, or communally
            sensitive content. Any news tip received is independently verified before publication.
          </p>

          <h2>4. Intellectual Property Rights</h2>
          <p>
            All content published on Top News Marathi platforms is our exclusive intellectual property
            unless otherwise credited. This includes, without limitation:
          </p>
          <ul>
            <li>All news articles, reports, analyses, and editorials</li>
            <li>Photographs, videos, infographics, and graphics produced by our team</li>
            <li>The Top News Marathi brand name, logo, and visual identity</li>
            <li>The domain name www.topnewsmarathi.com and all subdomains</li>
            <li>YouTube channel content, thumbnails, and channel identity @topnewsmarathi</li>
          </ul>

          <h3>4.1 Permitted Use</h3>
          <ul>
            <li>✓ Read and watch our content freely on our platforms</li>
            <li>✓ Share articles using our official social sharing buttons</li>
            <li>✓ Quote short excerpts (maximum 2–3 sentences) with clear attribution and a hyperlink to the original article at www.topnewsmarathi.com</li>
            <li>✓ Embed our YouTube videos using YouTube's official embed feature</li>
            <li>✓ Link to our articles from your website or social media profiles</li>
          </ul>

          <h3>4.2 Prohibited Use</h3>
          <ul>
            <li>✕ Republishing full articles, videos, or photo galleries on other websites, channels, or platforms without written permission</li>
            <li>✕ Scraping our website content using automated bots, crawlers, or scripts</li>
            <li>✕ Modifying, editing, or altering our content and republishing it as your own work</li>
            <li>✕ Using our logo, brand name, or visual identity without prior written authorisation</li>
            <li>✕ Claiming authorship or ownership of Top News Marathi content</li>
            <li>✕ Commercial use of our content without a signed licensing agreement</li>
          </ul>
          <blockquote>
            Violations of these intellectual property rights may result in legal action under the Indian
            Copyright Act, 1957, and the Information Technology Act, 2000. For content licensing
            enquiries, please contact us.
          </blockquote>

          <h2>5. User Conduct</h2>
          <p>
            All users of Top News Marathi platforms are expected to conduct themselves in a
            respectful and lawful manner.
          </p>

          <h3>5.1 Permitted Activities</h3>
          <ul>
            <li>✓ Reading, watching, and sharing our verified news content</li>
            <li>✓ Posting respectful, relevant, and constructive comments</li>
            <li>✓ Submitting genuine news tips and story leads</li>
            <li>✓ Subscribing to newsletters and push notifications</li>
            <li>✓ Contacting our editorial team with feedback or corrections</li>
          </ul>

          <h3>5.2 Prohibited Activities</h3>
          <ul>
            <li>✕ Posting defamatory, hateful, communally sensitive, or abusive content</li>
            <li>✕ Spreading misinformation, fake news, or propaganda in any form</li>
            <li>✕ Impersonating Top News Marathi journalists, editors, or official accounts</li>
            <li>✕ Attempting to hack, disrupt, or overload our website infrastructure</li>
            <li>✕ Creating fake or multiple accounts to circumvent moderation decisions</li>
            <li>✕ Harassing, threatening, or intimidating our journalists or other users</li>
            <li>✕ Posting content that violates any applicable Indian law</li>
          </ul>
          <p>
            Top News Marathi reserves the right to remove any violating content and to permanently
            ban users who repeatedly breach these guidelines, without prior notice.
          </p>

          <h2>6. Comments &amp; User-Generated Content</h2>
          <p>When you post a comment on our website or YouTube channel, the following terms apply:</p>
          <ul>
            <li>You grant Top News Marathi a non-exclusive, royalty-free licence to display, moderate, translate, and archive your comment across our platforms</li>
            <li>You confirm that your comment does not violate any law or third-party rights</li>
            <li>Comments represent the views of their authors only — not the editorial position of Top News Marathi</li>
            <li>Comments may be reviewed before publication and may be rejected or removed at our sole discretion</li>
            <li>Top News Marathi is not liable for user-submitted comments that may be defamatory, inaccurate, or harmful</li>
            <li>Repeat offenders may be permanently banned from commenting across all our platforms</li>
          </ul>
          <p>
            Comments on our YouTube channel are additionally governed by YouTube's Community
            Guidelines (youtube.com/t/community_guidelines).
          </p>

          <h2>7. News Tips &amp; Story Submissions</h2>
          <p>
            Top News Marathi welcomes news tips and story leads from citizens, whistleblowers, and
            eyewitnesses across Maharashtra. By submitting a tip, you agree to the following:
          </p>
          <ul>
            <li>Submitted tips are reviewed by our editorial team — publication is at our sole editorial discretion</li>
            <li>We do not pay for news tips unless a prior written payment agreement has been made</li>
            <li>The identity and confidentiality of sources will be protected upon explicit request, to the extent permitted by law</li>
            <li>You confirm that the information you submit is accurate to the best of your knowledge</li>
            <li>Submitting deliberately false or fabricated information may result in legal consequences</li>
          </ul>

          <h2>8. Advertising Policy</h2>
          <p>
            Top News Marathi is an independent, advertising-supported digital news platform. Our
            advertising commitments are as follows:
          </p>
          <ul>
            <li>All advertisements are clearly labelled as 'Advertisement', 'Ad', or 'Sponsored Content'</li>
            <li>Advertising content is strictly separated from editorial news content</li>
            <li>Advertisers cannot influence, direct, or alter our editorial decisions or news coverage</li>
            <li>We do not accept advertisements promoting illegal products, hate speech, gambling (unlicensed), or misleading financial claims</li>
            <li>Digital advertisements are served through Google AdSense and direct advertising agreements</li>
            <li>Readers may opt out of personalised advertising through their browser settings or Google Ads settings</li>
          </ul>

          <h2>9. YouTube Channel — Additional Terms</h2>
          <p>
            Our YouTube channel (youtube.com/@topnewsmarathi) is subject to both these Terms &amp;
            Conditions and YouTube's own Terms of Service and Community Guidelines. Key points:
          </p>
          <ul>
            <li>YouTube's Terms of Service apply to all interactions on the channel: youtube.com/t/terms</li>
            <li>In the event of conflict between our Terms and YouTube's Terms for YouTube-specific activities, YouTube's Terms shall prevail</li>
            <li>We reserve the right to disable comments on specific videos, remove abusive comments, block users, or apply any moderation action permitted by YouTube's platform tools</li>
            <li>All video content published on our YouTube channel remains the intellectual property of Top News Marathi</li>
            <li>Downloading, re-uploading, or redistributing our YouTube videos without written permission is strictly prohibited</li>
          </ul>

          <h2>10. E-Platform Distribution Channel</h2>
          <p>
            Top News Marathi operates a multi-channel digital distribution network to deliver
            Maharashtra news across partner platforms, news aggregators, and digital apps. The
            following terms apply to our distribution channel:
          </p>
          <ul>
            <li>Content distributed via our e-platform remains the intellectual property of Top News Marathi</li>
            <li>Partner platforms that syndicate our content must comply with our content attribution requirements</li>
            <li>Unauthorised redistribution or republishing of syndicated content by third parties is prohibited</li>
            <li>Distribution partnerships are governed by separate written agreements</li>
          </ul>

          <h2>11. Disclaimer of Warranties</h2>
          <p>Top News Marathi strives for the highest standards of accuracy and timeliness. However:</p>
          <ul>
            <li>All news content is provided 'as is' — while we verify all published items, absolute accuracy cannot be guaranteed in all circumstances, particularly in rapidly evolving breaking news situations</li>
            <li>Top News Marathi is not liable for any decisions made by users, businesses, or third parties based on our news content</li>
            <li>We are not responsible for any technical interruptions, errors, data loss, or unavailability of our website or platforms</li>
            <li>Third-party websites, apps, or platforms linked from our content are not under our control — we are not responsible for their content, accuracy, or privacy practices</li>
            <li>News and information provided on our platforms is for general informational purposes only and does not constitute legal, financial, medical, or professional advice</li>
          </ul>

          <h2>12. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms &amp; Conditions are governed by and construed in accordance with the laws
            of India. The following legislation is applicable:
          </p>
          <table>
            <thead>
              <tr>
                <th>Act / Law</th>
                <th>Relevance to Top News Marathi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Information Technology Act, 2000</td>
                <td>Digital content publishing, cyber offenses, intermediary liability</td>
              </tr>
              <tr>
                <td>Indian Copyright Act, 1957</td>
                <td>Protection of news articles, videos, photographs, and all original content</td>
              </tr>
              <tr>
                <td>Press Council of India Act, 1978</td>
                <td>Standards of journalistic practice and media ethics</td>
              </tr>
              <tr>
                <td>IT (Intermediary Guidelines) Rules, 2021</td>
                <td>Digital news publisher compliance obligations</td>
              </tr>
              <tr>
                <td>Bharatiya Nyaya Sanhita (BNS), 2023</td>
                <td>Defamation, communal harmony, and online speech provisions</td>
              </tr>
            </tbody>
          </table>
          <p>
            Any disputes, claims, or legal proceedings arising from or relating to these Terms shall be
            subject to the exclusive jurisdiction of the competent courts located in Pune, Maharashtra,
            India.
          </p>

          <h2>13. Changes to These Terms</h2>
          <p>
            Top News Marathi reserves the right to update, modify, or replace these Terms &amp;
            Conditions at any time. When material changes are made:
          </p>
          <ul>
            <li>The 'Effective Date' at the top of this document will be updated</li>
            <li>A prominent notice will be published on our website homepage</li>
            <li>Newsletter subscribers will be notified of material changes by email</li>
            <li>The updated Terms will be made available at www.topnewsmarathi.com/terms-and-conditions/</li>
          </ul>
          <p>
            Your continued use of any Top News Marathi platform after updated Terms are published
            constitutes your acceptance of the revised Terms.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            For any queries, complaints, content licensing requests, or legal notices related to these
            Terms &amp; Conditions, please contact:
          </p>
          <p><strong>Top News Marathi — Editorial &amp; Legal Office</strong></p>
          <ul>
            <li>Website: www.topnewsmarathi.com</li>
            <li>YouTube: youtube.com/@topnewsmarathi</li>
            <li>Contact Page: www.topnewsmarathi.com/contact/</li>
            <li>Location: Maharashtra, India</li>
          </ul>
          <p>We aim to respond to all legal and compliance queries within 7 working days.</p>

          <blockquote>
            © 2025 Top News Marathi. All Rights Reserved.
            <br />
            Authentic Marathi News | Maharashtra's Trusted Digital News Agency
          </blockquote>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
