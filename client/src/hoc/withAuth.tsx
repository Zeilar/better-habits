import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

export default function withAuth(WrappedComponent: React.FC) {
    return function Component(props: Record<string, any>) {
        const { authenticated } = useAuth();

        if (!authenticated) {
            return <Navigate to="/" />;
        }

        return <WrappedComponent {...props} />;
    };
}
