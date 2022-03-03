import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GuestRoute from "./components/GuestRoute";
import Navbar from "./components/Navbar";
import PageSpinner from "./components/PageSpinner";
import ProtectedRoute from "./components/ProtectedRoute";

const NotFoundError = lazy(() => import("./pages/404"));
const Guest = lazy(() => import("./pages/Guest"));
const Home = lazy(() => import("./pages/index"));
const Login = lazy(() => import("./pages/Login"));
const Program = lazy(() => import("./pages/Program"));
const Programs = lazy(() => import("./pages/Programs"));
const NewProgram = lazy(() => import("./pages/Programs/new"));
const Register = lazy(() => import("./pages/Register"));
const Schedule = lazy(() => import("./pages/Schedules"));
const Settings = lazy(() => import("./pages/Settings"));

export default function App() {
    return (
        <>
            <Suspense fallback={<PageSpinner />}>
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
            </Suspense>
            <Navbar />
        </>
    );
}
