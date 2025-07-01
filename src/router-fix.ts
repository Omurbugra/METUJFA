// GitHub Pages routing fix for single page applications
// This script should be included in index.html for proper routing

export const setupGitHubPagesRouting = () => {
  // Check if we're on GitHub Pages
  if (window.location.hostname.includes('.github.io')) {
    // Check if there's a redirect in the query string
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('p');
    
    if (redirect) {
      // Remove the redirect parameter and update the URL
      const newUrl = window.location.origin + window.location.pathname + redirect;
      window.history.replaceState(null, null, newUrl);
    }
  }
};