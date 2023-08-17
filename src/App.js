import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublishPage from "./pages/PublishPage";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import { UserContext } from "./Context/Context";
import { useState } from "react";


export default function App() {

  const [user, setUser] = useState();

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ currentId: '', user, setUser }}>
          <Routes>
            <Route path="/timeline" element={<PublishPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/" element={<SignInPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}

