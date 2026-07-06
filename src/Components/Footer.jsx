import { Link } from 'react-router-dom';

const SocialIcon = ({ name }) => {
  const icons = {
    Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
    'X (Twitter)': <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>,
    Instagram: <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>,
    YouTube: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>,
    Threads: <><path d="M15.42 12.01c-.01 0-.02 0-.02 0 .01-.01.02-.01.02-.01l-.01.01h.01z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm6.2 13.5c-.2.4-.4.7-.7 1-.3.3-.7.5-1.2.7-.4.2-1 .3-1.6.3-.6 0-1.2-.1-1.7-.3-.5-.2-1-.5-1.4-.8-.4-.3-.7-.7-.9-1.1-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4.2-.4.5-.8.9-1.1.4-.3.9-.6 1.4-.8.5-.2 1.1-.3 1.7-.3.6 0 1.2.1 1.7.3.5.2 1 .5 1.4.8.4.3.7.7.9 1.1.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4zm-2.2-4.1c-.2-.2-.4-.3-.7-.4-.3-.1-.6-.2-.9-.2-.3 0-.6.1-.9.2-.3.1-.5.3-.7.5-.2.2-.3.4-.4.7-.1.3-.2.6-.2.9s.1.6.2.9c.1.3.2.5.4.7.2.2.4.3.7.4.3.1.6.2.9.2.3 0 .6-.1.9-.2.3-.1.5-.3.7-.5.2-.2.3-.4.4-.7.1-.3.2-.6.2-.9s-.1-.6-.2-.9c-.1-.3-.2-.5-.4-.7z"/></>,
    Reddit: <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>,
    Quora: <path d="M12.555 20.265c-.624-1.399-1.397-2.699-2.97-2.699-.301 0-.603.049-.879.176l-.468-.936c.516-.479 1.367-.805 2.459-.805 1.867 0 3.022.986 3.813 2.293.667-1.133.986-2.643.986-4.234 0-4.478-2.176-7.398-5.497-7.398-3.322 0-5.459 2.92-5.459 7.398 0 4.479 2.137 7.369 5.459 7.369.927 0 1.75-.205 2.556-.164zm1.791 1.322c-1.188 1.025-2.706 1.413-4.347 1.413C5.439 23 2 19.077 2 12c0-7.077 3.439-11 8-11s8 3.923 8 11c0 3.071-.762 5.473-2.117 7.072.449.674 1.011 1.156 1.866 1.156.762 0 1.332-.342 1.797-.732l.454 1.037c-.649.611-1.462 1.067-2.476 1.067-1.261 0-2.244-.625-3.178-1.013z"/>,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      {icons[name]}
    </svg>
  );
};

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook',    href: 'https://www.facebook.com/people/Top-News-Marathi/61560392199389/',             color: 'hover:text-blue-500' },
    { name: 'X (Twitter)', href: 'https://x.com/Topnewsmarathi',                                                color: 'hover:text-white' },
    { name: 'Instagram',   href: 'https://www.instagram.com/topnewsmarathiofficial?igsh=MWRqa2ZqNTJ5YzdueQ==',  color: 'hover:text-pink-500' },
    { name: 'YouTube',     href: 'https://www.youtube.com/@topnewsmarathi',                                      color: 'hover:text-red-500' },
    { name: 'Threads',     href: 'https://www.threads.com/@topnewsmarathi',                                      color: 'hover:text-gray-400' },
    { name: 'Reddit',      href: 'https://www.reddit.com/user/Top_News_Marathi/?screen_view_count=2',            color: 'hover:text-orange-500' },
    { name: 'Quora',       href: 'https://www.quora.com/profile/TOP-NEWS-MARATHI',  color: 'hover:text-red-400' },
  ];

  return (
    <footer className="bg-brand-secondary text-brand-white border-t-4 border-brand-red-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between gap-8 mb-8 text-center lg:text-left">

          <div className="flex justify-center lg:justify-start w-full lg:w-auto">
            <a href="/" className="flex items-center" aria-label="टॉप न्यूज मराठी होम पेज">
              <video
                src="/logo.mp4"
                poster="/logo.png"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label="टॉप न्यूज मराठी लोगो"
                title="टॉप न्यूज मराठी"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </a>
          </div>

          <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                आम्हाला फॉलो करा
              </h3>
              <Link
                to="/follow"
                className="text-[10px] bg-brand-red/20 text-brand-red border border-brand-red/40 px-2 py-0.5 rounded-full font-bold hover:bg-brand-red/30 transition-colors"
              >
                सर्व पहा →
              </Link>
              <Link
                to="/about"
                className="text-[10px] bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40 px-2 py-0.5 rounded-full font-bold hover:bg-brand-yellow/30 transition-colors"
              >
                आमच्याविषयी →
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end max-w-xs lg:max-w-sm">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all duration-200 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                  title={social.name}
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-brand-gray-medium mb-4"></div>

        <div className="text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            संपादक: <Link to="/about" className="text-brand-yellow hover:underline">श्री. अजय कांबळे</Link>
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            © 2026 सर्व हक्क राखीव
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
