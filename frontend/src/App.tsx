import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import TravelAndStay from "./pages/travelAndStay";
import FAQs from "./pages/faqs";
import WeddingPage from "./pages/weddingPage";
import WeddingInfo from "./pages/weddingInfo";
import OurStory from "./pages/ourStory";
import RSVP from "./pages/rsvp";
import Home from "./pages/home";
import { LanguageProvider } from "./context/languageContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <WeddingPage /> },
      { path: "ourstory", element: <OurStory /> },
      { path: "Weddinginfo", element: <WeddingInfo /> },
      { path: "travelstay", element: <TravelAndStay /> },
      { path: "rsvp", element: <RSVP /> },
      { path: "faqs", element: <FAQs /> },
    ],
  },
]);

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
