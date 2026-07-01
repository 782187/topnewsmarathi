// Single source of truth for all social/platform links.
// Used by Navbar, Footer, and FollowUsPage.

export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    handle: '@TopNewsMarathi',
    href: 'https://www.facebook.com/people/Top-News-Marathi/61560392199389/',
    color: '#1877F2',
    hoverClass: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2]',
    iconColor: 'text-[#1877F2]',
    description: 'फेसबुकवर आमचे पेज लाईक करा',
    svg: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>`,
  },
  {
    name: 'X (Twitter)',
    handle: '@Topnewsmarathi',
    href: 'https://x.com/Topnewsmarathi',
    color: '#000000',
    hoverClass: 'hover:bg-white/10 hover:border-white hover:text-white',
    iconColor: 'text-white',
    description: 'X वर आम्हाला फॉलो करा',
    svg: `<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>`,
  },
  {
    name: 'Instagram',
    handle: '@topnewsmarathiofficial',
    href: 'https://www.instagram.com/topnewsmarathiofficial?igsh=MWRqa2ZqNTJ5YzdueQ==',
    color: '#E1306C',
    hoverClass: 'hover:bg-[#E1306C]/10 hover:border-[#E1306C] hover:text-[#E1306C]',
    iconColor: 'text-[#E1306C]',
    description: 'इन्स्टाग्रामवर आम्हाला फॉलो करा',
    svg: `<path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>`,
  },
  {
    name: 'YouTube',
    handle: '@topnewsmarathi',
    href: 'https://www.youtube.com/@topnewsmarathi',
    color: '#FF0000',
    hoverClass: 'hover:bg-[#FF0000]/10 hover:border-[#FF0000] hover:text-[#FF0000]',
    iconColor: 'text-[#FF0000]',
    description: 'यूट्यूब चॅनल सबस्क्राइब करा',
    svg: `<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>`,
  },
  {
    name: 'Threads',
    handle: '@topnewsmarathi',
    href: 'https://www.threads.com/@topnewsmarathi',
    color: '#000000',
    hoverClass: 'hover:bg-white/10 hover:border-white hover:text-white',
    iconColor: 'text-gray-300',
    description: 'थ्रेड्सवर आम्हाला फॉलो करा',
    svg: `<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>`,
  },
  {
    name: 'Reddit',
    handle: 'u/Top_News_Marathi',
    href: 'https://www.reddit.com/user/Top_News_Marathi/?screen_view_count=2',
    color: '#FF4500',
    hoverClass: 'hover:bg-[#FF4500]/10 hover:border-[#FF4500] hover:text-[#FF4500]',
    iconColor: 'text-[#FF4500]',
    description: 'रेडिटवर आमचे प्रोफाइल फॉलो करा',
    svg: `<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>`,
  },
  {
    name: 'Quora',
    handle: 'TOP-NEWS-MARATHI',
    href: 'https://www.quora.com/profile/TOP-NEWS-MARATHI',
    color: '#B92B27',
    hoverClass: 'hover:bg-[#B92B27]/10 hover:border-[#B92B27] hover:text-[#B92B27]',
    iconColor: 'text-[#B92B27]',
    description: 'क्वोरावर आमचे प्रोफाइल फॉलो करा',
    svg: `<path d="M12.555 20.265c-.624-1.399-1.397-2.699-2.97-2.699-.301 0-.603.049-.879.176l-.468-.936c.516-.479 1.367-.805 2.459-.805 1.867 0 3.022.986 3.813 2.293.667-1.133.986-2.643.986-4.234 0-4.478-2.176-7.398-5.497-7.398-3.322 0-5.459 2.92-5.459 7.398 0 4.479 2.137 7.369 5.459 7.369.927 0 1.75-.205 2.556-.164zm1.791 1.322c-1.188 1.025-2.706 1.413-4.347 1.413C5.439 23 2 19.077 2 12c0-7.077 3.439-11 8-11s8 3.923 8 11c0 3.071-.762 5.473-2.117 7.072.449.674 1.011 1.156 1.866 1.156.762 0 1.332-.342 1.797-.732l.454 1.037c-.649.611-1.462 1.067-2.476 1.067-1.261 0-2.244-.625-3.178-1.013z"/>`,
  },
];

// Compact list for Navbar sidebar
export const SIDEBAR_SOCIAL_LINKS = SOCIAL_LINKS;

// Icon-only list for Footer
export const FOOTER_SOCIAL_LINKS = SOCIAL_LINKS;
