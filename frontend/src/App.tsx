import { useState } from "react";
import { Home } from "./pages/Home";
import { HowToPlay } from "./pages/HowToPlay";

function App() {
  const [page, setPage] = useState("home");

  return page === "home" ? (
    <Home onShowHowToPlay={() => setPage("howtoplay")} />
  ) : (
    <HowToPlay onBack={() => setPage("home")} />
  );
}

export default App;
