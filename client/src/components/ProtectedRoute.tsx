import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface Props {
    children: JSX.Element | null;
}

export default function ProtectedRoute({ children }: Props) {
    const { authenticated } = useAuth();
    return authenticated ? children : <Navigate to="/guest" />;
}
