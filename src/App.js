import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublishPage from "./pages/PublishPage";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";


export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/timeline" element={<PublishPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

