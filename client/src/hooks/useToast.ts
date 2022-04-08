import { UseToastOptions, useToast as useChakraToast } from "@chakra-ui/react";

export function useToast(options?: UseToastOptions) {
    return useChakraToast({ ...options, variant: "solid", position: "top", duration: 2500 });
}
