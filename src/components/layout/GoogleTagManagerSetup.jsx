import { useEffect } from 'react';

const GoogleTagManagerSetup = ({ gtmId }) => {
  useEffect(() => {
    if (!gtmId || window.dataLayer) return;

    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',gtmId);

    const noScript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noScript.appendChild(iframe);
    document.body.insertBefore(noScript, document.body.firstChild);

  }, [gtmId]);

  return null;
};

export default GoogleTagManagerSetup;
