import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import SEO from '../Components/SEO.jsx';

const DIRECTOR_PHOTO = '/director.jpg';

const DirectorAvatar = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{ width: 160, height: 160, minWidth: 160 }}
      className="rounded-full overflow-hidden border-4 border-brand-yellow/40 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex-shrink-0"
    >
      {!imgError ? (
        <img
          src={DIRECTOR_PHOTO}
          alt="श्री. अजय कांबळे"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-brand-red-dark flex items-center justify-center">
          <span className="text-brand-yellow font-black text-5xl">AK</span>
        </div>
      )}
    </div>
  );
};

const stats = [
  { label: 'India TV सोबत अनुभव', value: '18+ वर्षे' },
  { label: 'YouTube सबस्क्रायबर्स', value: '386K+' },
  { label: 'एकूण व्ह्यूज', value: '650M+' },
];

const AboutPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ajay Kamble',
    jobTitle: 'Director, Deccan AV Media LLP | Editor-in-Chief, Top News Marathi',
    worksFor: {
      '@type': 'Organization',
      name: 'Top News Marathi',
    },
  };

  return (
    <div className="min-h-screen bg-brand-black w-full pb-16" lang="mr">
      <SEO
        title="आमच्याविषयी | संचालक - श्री. अजय कांबळे"
        description="टॉप न्यूज मराठीचे संचालक व मुख्य संपादक श्री. अजय कांबळे यांची संपूर्ण माहिती — India TV मधील १८ वर्षांचा अनुभव, Deccan AV Media LLP आणि टॉप न्यूज मराठीची वाटचाल."
        schema={schema}
      />

      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-brand-gray mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-1">
            <Home size={12} /> होम
          </Link>
          <ChevronRight size={12} className="text-brand-red" />
          <span className="text-brand-yellow/70">आमच्याविषयी</span>
        </nav>

        {/* Director Hero Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gradient-to-br from-brand-black-light to-brand-gray-dark border border-brand-gray-medium rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
          <DirectorAvatar />

          <div className="flex-1 text-center sm:text-left">
            <span className="text-[10px] bg-brand-red/20 text-brand-red border border-brand-red/30 px-3 py-0.5 rounded-full font-black uppercase tracking-widest">
              संचालक प्रोफाइल
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-brand-white mt-3 mb-1 tracking-tight">
              श्री. अजय कांबळे
            </h1>
            <p className="text-brand-yellow font-bold text-sm md:text-base">
              Director, Deccan AV Media LLP · Editor-in-Chief, Top News Marathi
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 mt-6">
              {stats.map(stat => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl font-black text-brand-yellow">{stat.value}</div>
                  <div className="text-xs text-brand-gray uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Bio - same document fashion as the source profile: real heading
            hierarchy, inline bold/italic emphasis, bold-led bullet items. */}
        <div className="article-content">
          <h2>Executive Summary</h2>
          <p>
            Mr. Ajay Kamble is a distinguished media maven, visionary entrepreneur, and senior journalist
            who serves as a Director of Deccan AV Media LLP and the Editor-in-Chief of Top News Marathi.
            With an illustrious career spanning nearly two decades at the highest levels of national
            television journalism, Mr. Kamble has successfully bridged the gap between traditional
            mainstream news broadcasting and cutting-edge digital media production. Today, he helms a
            multi-platform media conglomerate based in Pune, driving innovation across cinematic
            production, digital broadcasting, and investigative journalism.
          </p>

          <h2>Professional Background &amp; Editorial Leadership</h2>

          <h3>The India TV Legacy</h3>
          <p>
            Before establishing his independent media footprint, Mr. Kamble dedicated 18 years of
            transformative service to <strong>India TV</strong>, one of India's premier, top-ranking
            national news networks. During this tenure, he held the critical leadership position of{' '}
            <strong>Bureau Chief for the Western Maharashtra Region</strong>. His time at India TV
            sharpened his seasoned editorial judgment, investigative acumen, and capacity to handle
            high-stakes breaking news on a national stage.
          </p>

          <h3>Editor-in-Chief, Top News Marathi</h3>
          <p>
            Leveraging his vast network experience, Mr. Kamble launched and spearheads{' '}
            <strong>Top News Marathi</strong>, a 24/7 digital news broadcasting network built on
            uncompromising standards of high journalistic integrity and immense technical outreach.
            Under his strategic guidance, the channel has achieved unprecedented popularity in a short
            time frame, marked by several milestone achievements:
          </p>
          <ul>
            <li>
              <strong>Pioneering OTT Integration:</strong> Guided the network to become the first local
              news ecosystem in Maharashtra to stream live 24/7 on India's premier OTT platform, JioTV.
            </li>
            <li>
              <strong>Massive Digital Footprint:</strong> Built a loyal audience comprising over 386K+
              YouTube subscribers and more than 650 million cumulative views.
            </li>
            <li>
              <strong>Studio Eminence:</strong> Spearheaded the development of state-of-the-art studios
              in Pune that continuously attract an elite footfall of highly professional and VIP guests
              for live political debates and celebrity interviews.
            </li>
          </ul>

          <h3>Print Journalism Stewardship</h3>
          <p>
            Further expanding his editorial reach, Mr. Kamble oversees the print media division of the
            conglomerate as the authority behind the <strong>'Top News' Weekly Newspaper</strong>. Fully
            accredited by the Registrar of Newspapers for India (RNI), this publication delivers
            deep-dive socio-political analyses and regional investigative reporting across Maharashtra.
          </p>

          <h3>Entertainment &amp; Cinematic Production Strategy</h3>
          <p>
            As a Director of <strong>Deccan AV Media LLP</strong>, Mr. Kamble translates his corporate
            philosophy—<em>"Quality is Our Priority Because We Think Quality is the Best Business
            Plan"</em>—into elite visual storytelling. He commands a robust commercial and creative
            pipeline that spans full-scale theatrical cinema, premium OTT web series, and corporate
            filmmaking.
          </p>
          <p>Key intellectual properties and infrastructure developed under his directorial oversight include:</p>
          <ul>
            <li>
              <strong><em>Veer Savarkar: Secret Files</em> (Web Series):</strong> A massive, multi-season
              grand Hindi web series currently in its advanced post-production phase.
            </li>
            <li>
              <strong><em>Sarkhel Kanhoji Angre - Darya Sarang</em>:</strong> A mega-scale historical
              franchise engineered for a global audience, slated to be produced across 7 languages.
            </li>
            <li>
              <strong>World-Class Infrastructure:</strong> Driving operations inside Pune's only premier
              news facility to own an expansive 6-floor corporate complex strategically located right
              next to Deccan Gymkhana. This hub houses premium post-production virtual VFX floors and
              advanced 9.1 surround-sound audio engineering suites.
            </li>
          </ul>

          <h3>Core Competencies &amp; Philosophy</h3>
          <ul>
            <li>
              <strong>Media Strategy &amp; Convergence:</strong> Seamlessly merging print, regional cable
              networks, and high-penetration OTT distribution frameworks.
            </li>
            <li>
              <strong>B2B &amp; Corporate Communication:</strong> Directing high-end industrial
              documentaries, political profiles, and premium visual communication assets.
            </li>
            <li>
              <strong>Vast Institutional Network:</strong> Maintaining powerful relationships with
              national news leaders, regional stalwarts, and key public dignitaries.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
