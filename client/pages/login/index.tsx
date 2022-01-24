import { Box, Button, Flex, FormControl, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../../components/FormError";
import Fieldset from "../../components/Fieldset";
import NextLink from "next/link";

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
        getValues,
    } = useForm<Fields>();

    return (
        <Box pt={0} as="form" onSubmit={handleSubmit(auth.login)}>
            <Text
                textStyle="h1"
                py="1rem"
                px="1.5rem"
                bgColor="primary.400"
                color="black"
            >
                Login
            </Text>
            <Flex px="1.5rem" py="1rem" flexDir="column">
                <FormControl isInvalid={Boolean(errors.email)} mb="1.5rem">
                    <Fieldset
                        isInvalid={Boolean(errors.email)}
                        label="Email"
                        placeholder="john.doe@example.com"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email?.message && (
                        <FormError message={errors.email.message} />
                    )}
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
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
                <Text my="1rem">
                    {`Need an account? `}
                    <NextLink href="/register" passHref>
                        <Link>Create one here</Link>
                    </NextLink>
                </Text>
                <Button
                    isLoading={isSubmitting}
                    type="submit"
                    w="100%"
                    rounded="md"
                >
                    Login
                </Button>
            </Flex>
        </Box>
    );
}
