import { Button, Flex, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../../components/FormError";
import { Link as ReactLink } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

interface Fields {
    email: string;
    password: string;
}

export default function Login() {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Fields>();

    return (
        <PageWrapper as="form" onSubmit={handleSubmit(auth.login)}>
            <Text as="h2" textStyle="h2">
                Login
            </Text>
            <Flex px={8} my={4} flexDir="column">
                <FormControl isInvalid={Boolean(errors.email)} mb={6}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        placeholder="john.doe@example.com"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email?.message && <FormError message={errors.email.message} />}
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        isInvalid={Boolean(errors.password)}
                        type="password"
                        placeholder="••••••••••"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password?.message && <FormError message={errors.password.message} />}
                </FormControl>
                <Text my={4}>
                    {`Need an account? `}
                    <Link as={ReactLink} to="/register">
                        Create one
                    </Link>
                </Text>
                <Button isLoading={isSubmitting} type="submit" rounded="md">
                    Login
                </Button>
            </Flex>
        </PageWrapper>
    );
}
