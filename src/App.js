import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublishPage from "./pages/PublishPage";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/timeline" element={<PublishPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

