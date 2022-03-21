import { Alert, Box, Button, Flex, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../../components/FormError";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import { useState } from "react";
import { CloseOutline } from "styled-icons/evaicons-outline";
import { hero } from "../../assets/images";
import { ArrowLeftShort } from "styled-icons/bootstrap";

interface Fields {
    email: string;
    password: string;
    passwordConfirm: string;
}

export default function Register() {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Fields>();
    const [error, setError] = useState<string | null>(null);

    return (
        <Flex
            as="form"
            onSubmit={handleSubmit(auth.register)}
            h="100vh"
            bgImg={hero}
            bgPos="center"
            pos="relative"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            zIndex={10}
            _after={{
                content: `""`,
                pos: "absolute",
                h: "100%",
                w: "100%",
                bgColor: "blackAlpha.800",
                inset: 0,
                zIndex: -1,
            }}
        >
            <Text as="h1" textStyle="h1" mb={4}>
                Register
            </Text>
            <Box
                p={8}
                w="calc(100% - var(--chakra-sizes-8))"
                backdropFilter="blur(5px)"
                bgColor="blackAlpha.500"
                boxShadow="card"
                rounded="md"
            >
                {error && (
                    <Alert status="error" variant="border" mb={4}>
                        <Text>{error}</Text>
                        <Button variant="unstyled" ml="auto" onClick={() => setError(null)}>
                            <Icon icon={CloseOutline} color="danger" />
                        </Button>
                    </Alert>
                )}
                <Flex flexDir="column" w="100%">
                    <FormControl isInvalid={Boolean(errors.email)} mb={8}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            type="email"
                            variant="flushed"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email?.message && <FormError message={errors.email.message} />}
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.password)} mb={8}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            isInvalid={Boolean(errors.password)}
                            type="password"
                            variant="flushed"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password?.message && <FormError message={errors.password.message} />}
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.passwordConfirm)} mb={8}>
                        <FormLabel htmlFor="passwordConfirm">PasswordConfirm</FormLabel>
                        <Input
                            id="passwordConfirm"
                            isInvalid={Boolean(errors.passwordConfirm)}
                            type="passwordConfirm"
                            variant="flushed"
                            {...register("passwordConfirm", { required: "Password confirmation is required" })}
                        />
                        {errors.passwordConfirm?.message && <FormError message={errors.passwordConfirm.message} />}
                    </FormControl>
                    <Text my={4}>
                        {`Already got an account? `}
                        <Link as={ReactLink} to="/login">
                            Login
                        </Link>
                    </Text>
                    <Button variant="secondary" rounded="pill" isLoading={isSubmitting} type="submit">
                        Login
                    </Button>
                </Flex>
            </Box>
            <Link as={ReactLink} to="/guest" pos="absolute" bottom={8}>
                <Flex justifyContent="center" alignItems="center">
                    <Icon size={8} icon={ArrowLeftShort} mr={2} />
                    <Text textStyle="h3" as="h3">
                        Back
                    </Text>
                </Flex>
            </Link>
        </Flex>
    );
}
