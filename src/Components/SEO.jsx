import React, { useEffect } from 'react';

/**
 * SEO Component to manage document head tags dynamically
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.image - Social share image URL
 * @param {string} props.type - Page type (article, website, etc.)
 * @param {string} props.canonical - Canonical URL
 * @param {Object} props.schema - JSON-LD Schema object
 */
const SEO = ({ title, description, image, type = 'website', canonical, schema }) => {
  const siteName = 'टॉप न्यूज मराठी';
  const fullTitle = title ? `${title} - ${siteName}` : siteName;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (property, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${property}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attr, property);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Standard Meta Tags
    updateMetaTag('description', description);

    // Open Graph / Facebook
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);
    if (image) updateMetaTag('og:image', image, true);

    // Twitter
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    if (image) updateMetaTag('twitter:image', image);

    // Canonical Link
    const canonUrl = canonical || window.location.href;
    let linkElement = document.querySelector('link[rel="canonical"]');
    if (linkElement) {
      linkElement.setAttribute('href', canonUrl);
    } else {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      linkElement.setAttribute('href', canonUrl);
      document.head.appendChild(linkElement);
    }

    // JSON-LD Schema
    const scriptId = 'json-ld-schema';
    let scriptElement = document.getElementById(scriptId);
    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.text = JSON.stringify(schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }

  }, [fullTitle, description, image, type, canonical, schema]);

  return null; // This component doesn't render anything to the DOM
};

export default SEO;
