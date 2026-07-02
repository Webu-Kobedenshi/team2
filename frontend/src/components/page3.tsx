import React, { useState } from 'react';

interface Props { visible: boolean; playerCount: number; }

const Page3: React.FC<Props> = ({ visible, playerCount }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none',
      transition: 'opacity 0.5s ease', zIndex: 1,
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 24, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.5s 0.1s, transform 0.5s 0.1s' }}>
        {playerCount} Players · Question 1 / 5
      </div>
      <div style={{ fontSize: 22, fontWeight: 500, color: '#fff', maxWidth: 520, textAlign: 'center', lineHeight: 1.7, marginBottom: 40, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 0.5s 0.2s, transform 0.5s 0.2s' }}>
        日本で一番高い山はどれですか？
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 360, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.5s 0.32s, transform 0.5s 0.32s' }}>
        {['A. 富士山', 'B. 槍ヶ岳', 'C. 北岳', 'D. 奥穂高岳'].map((ans, i) => (
          <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{
              width: '100%', padding: '14px 24px', borderRadius: 10,
              border: hovered === i ? '1px solid rgba(255,255,255,0.7)' : '1px solid rgba(255,255,255,0.2)',
              background: hovered === i ? 'rgba(255,255,255,0.07)' : 'transparent',
              color: hovered === i ? '#fff' : 'rgba(255,255,255,0.8)',
              fontSize: 15, cursor: 'pointer', textAlign: 'left',
              transition: 'border-color 0.18s, background 0.18s, color 0.18s', fontFamily: 'inherit',
            }}>{ans}</button>
        ))}
      </div>
    </div>
  );
};

export default Page3;