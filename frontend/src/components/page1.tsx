import React from 'react';

interface Props {
  visible: boolean;
  onStart: (cx: number, cy: number) => void;
  dimmed: boolean;
}

const Page1: React.FC<Props> = ({ visible, onStart, dimmed }) => {
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    onStart(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none',
      transition: 'opacity 0.5s ease', zIndex: 1,
    }}>
      <button
        ref={btnRef} onClick={handleClick}
        style={{
          fontSize: 26, fontWeight: 600, letterSpacing: '0.2em',
          padding: '16px 68px', borderRadius: 12,
          border: '1.5px solid rgba(255,255,255,0.4)',
          background: 'transparent', color: '#fff', cursor: 'pointer',
          transition: 'transform 0.15s, opacity 0.3s',
          opacity: dimmed ? 0.3 : 1,
          pointerEvents: dimmed ? 'none' : 'auto',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (!dimmed) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
        onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; }}
      >START</button>

      <div style={{
        marginTop: 32, textAlign: 'center',
        color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 2,
        border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 10,
        padding: '18px 36px', background: 'rgba(255,255,255,0.03)',
        transition: 'opacity 0.3s', opacity: dimmed ? 0 : 1,
      }}>
        <h3 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: 10, textTransform: 'uppercase' }}>遊び方説明</h3>
        <p style={{ margin: '2px 0' }}>① 背景の線はランダムな点をつないで動いています</p>
        <p style={{ margin: '2px 0' }}>② STARTを押すと、すべての線がボタンに集まります</p>
        <p style={{ margin: '2px 0' }}>③ 集まり終わったら光が四方に広がり次のページへ</p>
      </div>
    </div>
  );
};

export default Page1;