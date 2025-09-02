import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assegura't que la ruta és correcta

const GoogleAnalyticsDataFetcher = ({ clientId, apiKey, ga4PropertyId }) => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = () => setGapiLoaded(true);
    document.body.appendChild(gapiScript);

    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => setGisLoaded(true);
    document.body.appendChild(gisScript);
  }, []);

  useEffect(() => {
    if (gapiLoaded && gisLoaded && clientId && apiKey && !clientId.startsWith("EL_TEU")) {
      window.gapi.load('client', () => {
        window.gapi.client.init({ apiKey: apiKey })
          .then(() => {
            window.gapi.client.load('https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta');
          });
      });

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        callback: (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            setIsLoggedIn(true);
            fetchAnalyticsData();
          }
        },
      });
      setTokenClient(client);
    }
  }, [gapiLoaded, gisLoaded, clientId, apiKey]);

  const handleAuthClick = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    }
  };

  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token) {
      window.google.accounts.oauth2.revoke(token.access_token, () => {
        window.gapi.client.setToken('');
        setIsLoggedIn(false);
        setAnalyticsData(null);
      });
    }
  };

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    setError(null);
    if (!ga4PropertyId || ga4PropertyId.startsWith("EL_TEU")) {
        setError("L'ID de la propietat de GA4 no està configurat.");
        setIsLoading(false);
        return;
    }
    try {
      const response = await window.gapi.client.analyticsdata.properties.runReport({
        property: `properties/${ga4PropertyId}`,
        resource: {
          dateRanges: [{ "startDate": "7daysAgo", "endDate": "today" }],
          metrics: [{ "name": "activeUsers" }],
        },
      });
      const activeUsers = response.result.rows?.[0]?.metricValues?.[0]?.value || '0';
      setAnalyticsData({ activeUsers });
    } catch (err) {
      console.error("Error en obtenir dades d'Analytics:", err);
      setError("No s'ha pogut obtenir les dades. Assegura't que tens permisos per a aquesta propietat de GA4.");
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Panell de Control d'Analytics</h2>
      <p className="text-muted-foreground mb-8">Connecta't amb el teu compte de Google per veure dades en temps real de la teva propietat de GA4.</p>
      
      {!isLoggedIn ? (
        <Button onClick={handleAuthClick} disabled={!tokenClient || !clientId || clientId.startsWith("EL_TEU")} size="lg">
          <svg className="w-4 h-4 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 174 58.9l-65.2 64.2C335.5 99.4 295.6 80 248 80c-82.8 0-150.5 67.7-150.5 150.5S165.2 406.5 248 406.5c97.2 0 130.2-72.2 132.9-110.5H248V261.8h239.2c.8 12.2 1.2 24.2 1.2 36.8z"></path></svg>
          Connectar amb Google
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="p-6 border rounded-lg max-w-sm mx-auto">
            {isLoading && <p>Carregant dades...</p>}
            {error && <p className="text-destructive">{error}</p>}
            {analyticsData && (
              <div className="flex items-center justify-center space-x-4">
                <Users className="h-10 w-10 text-primary" />
                <div>
                  <div className="text-4xl font-bold gradient-text">{analyticsData.activeUsers}</div>
                  <div className="text-sm text-muted-foreground">Usuaris actius (últims 7 dies)</div>
                </div>
              </div>
            )}
          </div>
          <Button onClick={handleSignoutClick} variant="outline">Desconnectar</Button>
        </div>
      )}
    </div>
  );
};

export default GoogleAnalyticsDataFetcher;
