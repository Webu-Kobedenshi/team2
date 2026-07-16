import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { paths } from "./routes";
import { HowTo } from "./pages/HowTo";
import { Home } from "./pages/Home";
import { PlayerSelect } from "./pages/PlayerSelect";
import { QuestionFlow } from "./pages/QuestionFlow";
import { QuestionResults } from "./pages/QuestionResults";
import { Result } from "./pages/Result";
import { ResultSummary } from "./pages/ResultSummary";
import { ScrollToTop } from "./components/ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: paths.home, element: <Home /> },
      { path: paths.players, element: <PlayerSelect /> },
      { path: paths.questions, element: <QuestionFlow /> },
      { path: paths.result, element: <Result /> },
      { path: paths.questionResults, element: <QuestionResults /> },
      { path: paths.resultSummary, element: <ResultSummary /> },
      { path: paths.howTo, element: <HowTo /> },
      { path: "*", element: <Navigate to={paths.home} replace /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
