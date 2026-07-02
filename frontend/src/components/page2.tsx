import React, { useState } from 'react';

interface Props { visible: boolean; onSelect: (n: number) => void; }

const Page2: React.FC<Props> = ({ visible, onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hiding, setHiding] = useState(false);

  const handleClick = (n: number) => {
    if (selected !== null) return;
    setSelected(n);
    setTimeout(() => setHiding(true), 320);
    setTimeout(() => onSelect(n), 720);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none',
      transition: 'opacity 0.5s ease', zIndex: 1,
    }}>
      <div style={{ fontSize: 13, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 36, opacity: visible && !hiding ? 1 : 0, transform: visible && !hiding ? 'translateY(0)' : 'translateY(10px)', transition: hiding ? 'opacity 0.3s' : 'opacity 0.5s 0.1s, transform 0.5s 0.1s' }}>Players</div>
      <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 48, opacity: visible && !hiding ? 1 : 0, transform: visible && !hiding ? 'translateY(0)' : 'translateY(14px)', transition: hiding ? 'opacity 0.3s' : 'opacity 0.5s 0.2s, transform 0.5s 0.2s' }}>参加人数を選んでください</div>
      <div style={{ display: 'flex', gap: 36, opacity: visible && !hiding ? 1 : 0, transform: hiding ? 'scale(0.85)' : visible ? 'scale(1)' : 'translateY(18px) scale(1)', transition: hiding ? 'opacity 0.4s, transform 0.4s' : 'opacity 0.5s 0.35s, transform 0.5s 0.35s' }}>
        {[2, 3, 4].map(n => <NumCircle key={n} n={n} isSelected={selected === n} onClick={() => handleClick(n)} />)}
      </div>
    </div>
  );
};

const NumCircle: React.FC<{ n: number; isSelected: boolean; onClick: () => void }> = ({ n, isSelected, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 90, height: 90, borderRadius: '50%',
        border: isSelected ? '1.5px solid #fff' : hover ? '1.5px solid rgba(255,255,255,0.9)' : '1.5px solid rgba(255,255,255,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32, fontWeight: 600, color: '#fff', cursor: 'pointer', position: 'relative',
        background: isSelected ? 'rgba(255,255,255,0.15)' : hover ? 'rgba(255,255,255,0.07)' : 'transparent',
        transform: hover && !isSelected ? 'scale(1.1)' : 'scale(1)',
        transition: 'border-color 0.2s, background 0.2s, transform 0.15s', userSelect: 'none',
      }}>
      {n}
      {isSelected && (
        <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.6)', animation: 'ripple 0.5s ease-out forwards', pointerEvents: 'none' }}>
          <style>{`@keyframes ripple { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }`}</style>
        </div>
      )}
    </div>
  );
};

export default Page2;