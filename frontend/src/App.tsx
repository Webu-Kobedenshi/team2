import React, { useRef, useState } from 'react';
import type { NetworkCanvasHandle } from './NetworkCanvas';
import Page1 from './components/page1';
import Page2 from './components/page2';
import Page3 from './components/page3';

type AppPage = 'page1' | 'page2' | 'page3';

const App: React.FC = () => {
  const canvasRef = useRef<NetworkCanvasHandle>(null);
  const [currentPage, setCurrentPage] = useState<AppPage>('page1');
  const [gathering, setGathering] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);

  const handleStart = (cx: number, cy: number) => {
    setGathering(true);
    canvasRef.current?.startGather(cx, cy, () => {
      setCurrentPage('page2');
    });
  };

  const handlePlayerSelect = (n: number) => {
    setPlayerCount(n);
    setTimeout(() => setCurrentPage('page3'), 100);
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    }}>
      <NetworkCanvas ref={canvasRef} />
      <Page1 visible={currentPage === 'page1'} onStart={handleStart} dimmed={gathering} />
      <Page2 visible={currentPage === 'page2'} onSelect={handlePlayerSelect} />
      <Page3 visible={currentPage === 'page3'} playerCount={playerCount} />
    </div>
  );
};

export default App;