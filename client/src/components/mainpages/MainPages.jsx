import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./index/Index";
import UserAccess from "./users/UserAccess";
function MainPages(props) {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Index />}></Route>

        <Route path="/login" element={<UserAccess />}></Route>
        <Route path="/register" element={<UserAccess />}></Route>
      </Routes>
    </main>
  );
}

export default MainPages;
