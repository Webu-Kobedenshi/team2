import { useState } from "react";
import { Home } from "./pages/Home";
import { SelectMembers } from "./pages/SelectMembers";

function App() {
  const [page, setPage] = useState<"home" | "select">("home");

  return page === "home" ? (
    <Home onStart={() => setPage("select")} />
  ) : (
    <SelectMembers onBack={() => setPage("home")} />
  );
}

export default App;
