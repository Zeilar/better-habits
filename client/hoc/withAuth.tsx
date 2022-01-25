import { useRouter } from "next/router";
import { useAuth } from "../hooks";

export default function withAuth(WrappedComponent: React.FC) {
    return function Component(props: any) {
        const { authenticated } = useAuth();
        const router = useRouter();

        if (typeof window === "undefined") {
            return null;
        }

        if (!authenticated) {
            router.replace("/guest");
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}
