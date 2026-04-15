const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/people/Top-News-Marathi/61560392199389/', color: 'hover:text-blue-500' },
    { name: 'X', href: 'https://x.com/Topnewsmarathi', color: 'hover:text-white' },
    { name: 'Threads', href: 'https://www.threads.com/@topnewsmarathi', color: 'hover:text-gray-400' },
    { name: 'Instagram', href: 'https://www.instagram.com/topnewsmarathi/', color: 'hover:text-pink-500' },
    { name: 'YouTube', href: 'https://www.youtube.com/@topnewsmarathi', color: 'hover:text-red-500' },
  ];

  return (
    <footer className="bg-brand-secondary text-brand-white border-t-4 border-brand-red-dark">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-8 mb-8 text-center lg:text-left">

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
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              आम्हाला फॉलो करा
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.name === 'Facebook' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  )}
                  {social.name === 'X' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                  )}
                  {social.name === 'Threads' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.42 12.01c-.01 0-.02 0-.02 0 .01-.01.02-.01.02-.01l-.01.01h.01zm3.7-4.32a.1.1 0 0 1 .01.01s.01.01 0 0l-.01-.01zm-1.89-1.92s-.01.01 0 0c.01-.01.01-.01.01-.01h-.01zm-.7 8.52h.01c-.01 0-.01 0-.01 0s0 0 0 0zm2.71-3.61l.01.01s.01 0 .01-.01h-.02zm-1.07 1.83l.01.01s.01 0 0-.01h-.01zm-.15-4.47l.01.01s.01 0 .01-.01h-.02zm.12 5.06s.01 0 .01-.01h-.01s-.01.01 0 .01zm1.03-3.08h.01c-.01 0-.01 0-.01 0s0 0 0 0zm-1.03-2.61h.01c-.01 0-.01 0-.01 0s0 0 0 0zm-2.01 7.24h.01c-.01 0-.01 0-.01 0s0 0 0 0zm3.01-4.72h.01c-.01 0-.01 0-.01 0s0 0 0 0zm.01 2.3h.01c-.01 0-.01 0-.01 0s0 0 0 0z" /><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm6.2 13.5c-.2.4-.4.7-.7 1-.3.3-.7.5-1.2.7-.4.2-1 .3-1.6.3-.6 0-1.2-.1-1.7-.3-.5-.2-1-.5-1.4-.8-.4-.3-.7-.7-.9-1.1-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4.2-.4.5-.8.9-1.1.4-.3.9-.6 1.4-.8.5-.2 1.1-.3 1.7-.3.6 0 1.2.1 1.7.3.5.2 1 .5 1.4.8.4.3.7.7.9 1.1.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4zm-2.2-4.1c-.2-.2-.4-.3-.7-.4-.3-.1-.6-.2-.9-.2-.3 0-.6.1-.9.2-.3.1-.5.3-.7.5-.2.2-.3.4-.4.7-.1.3-.2.6-.2.9s.1.6.2.9c.1.3.2.5.4.7.2.2.4.3.7.4.3.1.6.2.9.2.3 0 .6-.1.9-.2.3-.1.5-.3.7-.5.2-.2.3-.4.4-.7.1-.3.2-.6.2-.9s-.1-.6-.2-.9c-.1-.3-.2-.5-.4-.7z" />
                    </svg>
                  )}
                  {social.name === 'Instagram' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                    </svg>
                  )}
                  {social.name === 'YouTube' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-brand-gray-medium mb-4"></div>

        <div className="text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2026 सर्व हक्क राखीव
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;