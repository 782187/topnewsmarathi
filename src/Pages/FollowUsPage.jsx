import { Link } from 'react-router-dom';
import { Home, ChevronRight, Share2 } from 'lucide-react';
import SEO from '../Components/SEO.jsx';
import { SOCIAL_LINKS } from '../utils/socialLinks.js';

// Inline SVG renderer using the path data from socialLinks
const PlatformIcon = ({ svg, size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

const PlatformCard = ({ platform }) => (
  <a
    href={platform.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center gap-4 p-6 rounded-2xl border border-brand-gray-medium bg-brand-black-light
               hover:border-opacity-80 hover:shadow-2xl hover:-translate-y-1
               transition-all duration-300 cursor-pointer text-center"
    style={{ '--platform-color': platform.color }}
  >
    {/* Icon Circle */}
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
      style={{ backgroundColor: `${platform.color}1a`, border: `2px solid ${platform.color}40` }}
    >
      <span style={{ color: platform.color }}>
        <PlatformIcon svg={platform.svg} size={30} />
      </span>
    </div>

    {/* Name & Handle */}
    <div>
      <h3 className="text-brand-white font-black text-lg group-hover:text-brand-yellow transition-colors">
        {platform.name}
      </h3>
      <p className="text-brand-gray text-xs mt-0.5">{platform.handle}</p>
    </div>

    {/* Description */}
    <p className="text-brand-gray text-sm leading-relaxed">{platform.description}</p>

    {/* CTA */}
    <span
      className="mt-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 group-hover:gap-2.5"
      style={{
        backgroundColor: `${platform.color}22`,
        color: platform.color,
        border: `1px solid ${platform.color}50`,
      }}
    >
      फॉलो करा <ChevronRight size={12} />
    </span>
  </a>
);

// Group platforms for display
const sectionOrder = [
  { title: 'सोशल मीडिया', subtitle: 'आमच्या पेजेस फॉलो करा', names: ['Facebook', 'Instagram'] },
  { title: 'व्हिडिओ बातम्या', subtitle: 'आमचे व्हिडिओ रिपोर्ट्स पहा', names: ['YouTube'] },
  { title: 'मायक्रो ब्लॉगिंग', subtitle: 'छोट्या अपडेट्स आणि थ्रेड्स', names: ['X (Twitter)', 'Threads'] },
  { title: 'चर्चा आणि समुदाय', subtitle: 'आमच्या कम्युनिटीत सहभागी व्हा', names: ['Reddit', 'Quora'] },
];

const FollowUsPage = () => {
  const byName = Object.fromEntries(SOCIAL_LINKS.map(s => [s.name, s]));

  return (
    <div className="min-h-screen bg-brand-black pb-20" lang="mr">
      <SEO
        title="आम्हाला फॉलो करा | टॉप न्यूज मराठी"
        description="टॉप न्यूज मराठीला सोशल मीडियावर फॉलो करा — WhatsApp, Telegram, Facebook, Instagram, YouTube, Reddit, Quora, LinkedIn, Google News आणि बरेच काही."
      />

      <div className="w-full px-4 md:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-brand-gray mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-1">
            <Home size={12} /> होम
          </Link>
          <ChevronRight size={12} className="text-brand-red" />
          <span className="text-brand-yellow/70">आम्हाला फॉलो करा</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/30 mb-5">
            <Share2 size={28} className="text-brand-red" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-white tracking-tight mb-3">
            आम्हाला फॉलो करा
          </h1>
          <p className="text-brand-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            तुमच्या आवडत्या प्लॅटफॉर्मवर <span className="text-brand-yellow font-bold">टॉप न्यूज मराठी</span> फॉलो करा
            आणि ताज्या मराठी बातम्या सर्वात आधी मिळवा.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { label: 'प्लॅटफॉर्म्स', value: `${SOCIAL_LINKS.length}+` },
              { label: 'दैनिक अपडेट्स', value: '50+' },
              { label: 'भाषा', value: 'मराठी' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-brand-yellow">{stat.value}</div>
                <div className="text-xs text-brand-gray uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {sectionOrder.map(section => {
            const platforms = section.names.map(n => byName[n]).filter(Boolean);
            if (!platforms.length) return null;
            return (
              <section key={section.title}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-7 bg-brand-red rounded-full shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-brand-white">{section.title}</h2>
                    <p className="text-brand-gray text-xs mt-0.5">{section.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {platforms.map(platform => (
                    <PlatformCard key={platform.name} platform={platform} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-brand-black-light to-brand-gray-dark border border-brand-yellow/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black text-brand-white mb-3">
            बातम्या शेअर करा
          </h2>
          <p className="text-brand-gray mb-6 max-w-md mx-auto">
            तुम्हाला एखादी बातमी आवडली का? ती तुमच्या मित्रांसोबत शेअर करा आणि मराठी बातम्यांचा प्रसार वाढवा.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-black rounded-full hover:bg-brand-red-dark transition-all shadow-lg hover:shadow-brand-red/30"
          >
            बातम्या वाचा
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FollowUsPage;
