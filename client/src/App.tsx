import { Route, Routes } from "react-router-dom";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundError from "./pages/404";
import Guest from "./pages/Guest";
import Home from "./pages/index";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/guest"
                element={
                    <GuestRoute>
                        <Guest />
                    </GuestRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                }
            />
            <Route path="*" element={<NotFoundError />} />
        </Routes>
    );
}
