import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { paths } from "./routes";
import { HowTo } from "./pages/HowTo";
import { Home } from "./pages/Home";
import { PlayerSelect } from "./pages/PlayerSelect";
import { QuestionFlow } from "./pages/QuestionFlow";
import { Result } from "./pages/Result";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.players} element={<PlayerSelect />} />
        <Route path={paths.questions} element={<QuestionFlow />} />
        <Route path={paths.result} element={<Result />} />
        <Route path={paths.howTo} element={<HowTo />} />
        <Route path="*" element={<Navigate to={paths.home} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
