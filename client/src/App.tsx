import { Route, Routes } from "react-router-dom";
import GuestRoute from "./components/GuestRoute";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundError from "./pages/404";
import Guest from "./pages/Guest";
import Home from "./pages/index";
import Login from "./pages/Login";
import Program from "./pages/Program";
import Programs from "./pages/Programs";
import NewProgram from "./pages/Programs/new";
import Register from "./pages/Register";
import Schedule from "./pages/Schedules";
import Settings from "./pages/Settings";

export default function App() {
    return (
        <>
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
                <Route
                    path="/programs"
                    element={
                        <ProtectedRoute>
                            <Programs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/program/:id"
                    element={
                        <ProtectedRoute>
                            <Program />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/programs/new"
                    element={
                        <ProtectedRoute>
                            <NewProgram />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/schedule"
                    element={
                        <ProtectedRoute>
                            <Schedule />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundError />} />
            </Routes>
            <Navbar />
        </>
    );
}
