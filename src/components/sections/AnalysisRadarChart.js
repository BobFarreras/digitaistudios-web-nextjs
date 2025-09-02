// src/components/AnalysisRadarChart.js
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

const AnalysisRadarChart = ({ stats }) => {
  // Transformem les dades de l'API al format que necessita Recharts
  const data = [
    { subject: 'SEO', value: stats.seo_score, fullMark: 100 },
    { subject: 'Rendiment', value: stats.performance_score, fullMark: 100 },
    { subject: 'Accessibilitat', value: stats.accessibility_score, fullMark: 100 },
    { subject: 'Automatització', value: stats.automation_potential, fullMark: 100 },
    // Pots afegir més mètriques aquí si en tens, per exemple UX/UI
    // { subject: 'UX/UI', value: stats.ux_ui_score, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#374151', fontSize: 14 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar 
          name="Puntuació" 
          dataKey="value" 
          stroke="#4f46e5" 
          fill="#4f46e5" 
          fillOpacity={0.6} 
        />
        {/* Opcional: pots afegir una llegenda si vols */}
        {/* <Legend /> */}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default AnalysisRadarChart;