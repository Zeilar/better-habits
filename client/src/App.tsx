import { Route, Routes } from "react-router-dom";
import NotFoundError from "./pages/404";
import Guest from "./pages/Guest";
import Home from "./pages/index";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="*" element={<NotFoundError />} />
        </Routes>
    );
}
