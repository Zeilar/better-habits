import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks";

export default function withGuest(WrappedComponent: React.FC) {
    return function Component(props: any) {
        const { authenticated } = useAuth();
        const router = useRouter();
        const toast = useToast();

        if (typeof window === "undefined") {
            return null;
        }

        if (authenticated) {
            toast({
                position: "top",
                status: "info",
                title: "You are already logged in",
                isClosable: true,
            });
            router.replace("/");
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}
