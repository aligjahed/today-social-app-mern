import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Posts, Profile, NotFound } from "./views/views";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
