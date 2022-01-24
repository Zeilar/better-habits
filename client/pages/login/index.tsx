import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../../components/FormError";
import Icon from "../../components/Icon";
import Fieldset from "../../components/Fieldset";

interface Fields {
    email: string;
    password: string;
}

export default function LoginForm() {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Fields>();

    return (
        <Box p="1.5rem" pt={0} as="form" onSubmit={handleSubmit(auth.login)}>
            <Flex mb="1rem">
                <Button
                    variant="unstyled"
                    ml="auto"
                    display="flex"
                    fontSize="1.25rem"
                    _hover={{ color: "primary.500" }}
                >
                    Register
                    <Icon icon="mdiChevronRight" w="1.25rem" h="1.25rem" />
                </Button>
            </Flex>
            <FormControl isInvalid={Boolean(errors.email)} mb="1.5rem">
                <Fieldset
                    isInvalid={Boolean(errors.email)}
                    label="Email"
                    placeholder="john.doe@example.com"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email?.message && (
                    <FormError message={errors.email.message} />
                )}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)} mb="1.5rem">
                <Fieldset
                    isInvalid={Boolean(errors.password)}
                    label="Password"
                    type="password"
                    placeholder="••••••••••"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password?.message && (
                    <FormError message={errors.password.message} />
                )}
            </FormControl>
            <Button isLoading={isSubmitting} type="submit" w="100%">
                Login
            </Button>
        </Box>
    );
}
