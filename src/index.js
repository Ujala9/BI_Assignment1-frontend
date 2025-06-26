import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter,Routes,Route } from "react-router-dom"

import App from "./App";
import EventDetails from "./eventDetails";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
     <Routes>
       <Route path="/" element={<App/>}/>
       <Route path="/details/:eventId" element={<EventDetails/>}/>
     </Routes>
  </BrowserRouter>
);
