import { Alert, Box, Button, Flex, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../../components/FormError";
import { Link as ReactLink } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import Icon from "../../components/Icon";
import { useState } from "react";
import { CloseOutline } from "styled-icons/evaicons-outline";
import PageBanner from "../../components/PageBanner";

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
    const [error, setError] = useState<string | null>(null);

    async function submit(fields: Fields) {
        const response = await auth.login(fields);
        if (!response.ok) {
            setError(response.status === 401 ? "Incorrect email or password" : "Something went wrong");
        }
    }

    return (
        <PageWrapper as="form" onSubmit={handleSubmit(submit)}>
            <PageBanner>
                <Text as="h2" textStyle="h2">
                    Login
                </Text>
            </PageBanner>
            <Box p={4}>
                {error && (
                    <Alert status="error" variant="border" mb={4}>
                        <Text>{error}</Text>
                        <Button variant="unstyled" ml="auto" onClick={() => setError(null)}>
                            <Icon icon={CloseOutline} color="danger" />
                        </Button>
                    </Alert>
                )}
                <Flex flexDir="column">
                    <FormControl isInvalid={Boolean(errors.email)} mb={6}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            placeholder="john.doe@example.com"
                            type="email"
                            {...register("email", { required: "Email is required" })}
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
                            {...register("password", { required: "Password is required" })}
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
            </Box>
        </PageWrapper>
    );
}
