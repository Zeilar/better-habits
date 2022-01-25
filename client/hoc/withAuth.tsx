import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks";

export default function withAuth(WrappedComponent: React.FC) {
    return function Component(props: any) {
        const { authenticated } = useAuth();
        const router = useRouter();
        const toast = useToast();

        if (typeof window === "undefined") {
            return null;
        }

        if (!authenticated) {
            toast({
                position: "top",
                status: "info",
                title: "Please log in first",
                isClosable: true,
            });
            router.replace("/guest");
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}
