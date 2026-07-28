import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import SEO from '../Components/SEO.jsx';

const DirectorAvatar = ({ photo, alt, fallback }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto rounded-2xl overflow-hidden border-4 border-brand-yellow/40 shadow-[0_0_30px_rgba(0,0,0,0.15)] flex-shrink-0">
      {!imgError ? (
        <img
          src={photo}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-brand-red-dark flex items-center justify-center">
          <span className="text-brand-yellow font-black text-5xl">{fallback}</span>
        </div>
      )}
    </div>
  );
};

const sarkarStats = [
  { label: 'उद्योग अनुभव', value: '25+ वर्षे' },
  { label: 'DWTPL स्थापना वर्ष', value: '1998' },
  { label: 'भाषा प्राविण्य', value: '8' },
];

const AnirbanSarkarPage = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Anirban Sarkar',
    jobTitle: 'Chairman & Managing Director, Deccan Group | Director, Deccan AV Media LLP',
    worksFor: {
      '@type': 'Organization',
      name: 'Top News Marathi',
    },
  };

  return (
    <div className="min-h-screen bg-white text-black w-full pb-16" lang="mr">
      <SEO
        title="डॉ. अनिरबन सरकार | संचालक प्रोफाइल"
        description="Deccan Group चे चेअरमन व व्यवस्थापकीय संचालक, 'Waterman of India' म्हणून ओळखले जाणारे डॉ. अनिरबन सरकार यांची संपूर्ण माहिती — जल तंत्रज्ञान, सामाजिक कार्य आणि माध्यम क्षेत्रातील योगदान."
        schema={schema}
      />

      <div className="w-full px-4 md:px-8 lg:px-12 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[10px] md:text-xs text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-brand-red transition-colors flex items-center gap-1">
            <Home size={12} /> होम
          </Link>
          <ChevronRight size={12} className="text-brand-red" />
          <Link to="/about" className="hover:text-brand-red transition-colors">
            आमच्याविषयी
          </Link>
          <ChevronRight size={12} className="text-brand-red" />
          <span className="text-gray-900">डॉ. अनिरबन सरकार</span>
        </nav>

        {/* Director Hero Card */}
        <div className="flex flex-col items-center text-center gap-6 bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 mb-10">
          <DirectorAvatar photo="/sarkar_sir.jpeg" alt="Dr. Anirban Sarkar" fallback="AS" />

          <div className="flex-1">
            <span className="text-[10px] bg-brand-red/10 text-brand-red border border-brand-red/30 px-3 py-0.5 rounded-full font-black uppercase tracking-widest">
              संचालक प्रोफाइल
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-black mt-3 mb-1 tracking-tight">
              Dr. Anirban Sarkar
            </h1>
            <p className="text-brand-red font-bold text-sm md:text-base">
              Chairman &amp; Managing Director, Deccan Group · Director, Deccan AV Media LLP
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              {sarkarStats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-brand-red">{stat.value}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="article-content legal-content">
          <h2>Executive Summary</h2>
          <p>
            Dr. Anirban Sarkar is a distinguished Indian entrepreneur, humanitarian, and leader in the
            water treatment and environmental technology sectors. Born in 1965, he has built a
            multifaceted career that spans industrial innovation, corporate leadership, social advocacy,
            and contributions to the arts. Widely recognized as the <strong>"Waterman of India,"</strong>{' '}
            Dr. Sarkar is dedicated to developing sustainable solutions for resource conservation and
            environmental safety.
          </p>

          <h2>Professional Leadership</h2>
          <p>
            Dr. Sarkar currently serves as the <strong>Chairman and Managing Director (MD)</strong> of
            the Deccan Group of companies, providing strategic leadership across his various business
            ventures. He is also the <strong>Chairman and Director of Deccan Water Treatment Pvt. Ltd.
            (DWTPL)</strong>, a position he has held since founding the organization in 1998. Under his
            leadership, DWTPL has become an ISO 9001:2008 certified entity with a significant workforce,
            specializing in reverse osmosis (RO) systems, desalination, and advanced wastewater
            treatment. Additionally, he holds the following prominent roles:
          </p>
          <ul>
            <li><strong>MD &amp; Chairman:</strong> Deccaleap Technologies.</li>
            <li><strong>MD &amp; Chairman:</strong> Deccan AV Media LLP.</li>
            <li><strong>President:</strong> India-Arab Chamber of Commerce and Agriculture (appointed 2017).</li>
            <li><strong>Technical Board Member:</strong> Confederation of Indian Industry (CII) Indo-Africa Project Partnership (Queensland State).</li>
          </ul>

          <h2>Technical Expertise &amp; Innovation</h2>
          <p>
            A mechanical engineering graduate from the <strong>College of Engineering Pune (COEP)</strong>{' '}
            and an MBA alumnus of the <strong>Jamnalal Bajaj Institute of Management Studies</strong>,
            Dr. Sarkar possesses deep technical expertise. He is recognized as a pioneer in utilizing
            membrane technology for the physical removal of fluoride and arsenic from groundwater. His
            work has been instrumental in providing potable drinking water to numerous villages across
            Karnataka and Uttar Pradesh. Beyond water treatment, he has led research into eco-friendly
            fire-extinguishing products and large-scale solar energy projects across Africa and the
            Middle East.
          </p>

          <h2>Social Impact &amp; Philanthropy</h2>
          <p>
            Dr. Sarkar is a dedicated philanthropist whose Corporate Social Responsibility (CSR)
            initiatives focus on community welfare and infrastructure development. His key social
            contributions include:
          </p>
          <ul>
            <li>
              <strong>Public Infrastructure:</strong> Partnering with the Maharashtra Police to upgrade
              station facilities and provide essential equipment, including vehicles and E-challan
              machines.
            </li>
            <li>
              <strong>Social Welfare:</strong> Organizing "dowry-free" mass marriage programs to support
              community cohesion.
            </li>
            <li>
              <strong>Sports Promotion:</strong> Sponsoring national-level sporting events, such as the
              Sub Junior National Hockey Championship, to encourage youth and female athletes.
            </li>
            <li>
              <strong>Healthcare:</strong> Facilitating the provision of dialysis machines for medical
              facilities.
            </li>
          </ul>

          <h2>Achievements, Media &amp; Arts</h2>
          <p>Dr. Sarkar's career is marked by numerous accolades and creative pursuits:</p>
          <ul>
            <li>
              <strong>Awards:</strong> He has received the Rashtriya Udyog Ratna Award, the Champion of
              Change Award, and the Sparsh Ganga Award for his environmental contributions.
            </li>
            <li>
              <strong>Academic Excellence:</strong> He holds a doctorate for his thesis on Gandhian
              philosophy and the socio-political status of India.
            </li>
            <li>
              <strong>Media &amp; Arts:</strong> As a film producer, he brought historical narratives to
              the screen, including the acclaimed Marathi period drama <em>Farzand</em>. Additionally,
              he serves as the producer for <em>Veer Savarkar – Secret Files</em>, a four-season Hindi
              web series dedicated to the life and struggles of the renowned freedom fighter. He has also
              been a frequent contributor to media discussions on economic, political, and environmental
              issues.
            </li>
          </ul>

          <p>
            A polyglot fluent in eight languages and an avid traveler, Dr. Sarkar continues to influence
            the industrial and social landscape through his commitment to sustainable development and
            community empowerment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnirbanSarkarPage;
