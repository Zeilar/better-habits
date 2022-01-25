import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../../components/FormError";
import NextLink from "next/link";
import withGuest from "../../hoc/withGuest";

interface Fields {
    email: string;
    password: string;
}

function Login() {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Fields>();

    async function submit(fields: Fields) {
        // const {} = await auth.login(fields,)
    }

    return (
        <Box pt={0} as="form" onSubmit={handleSubmit(auth.login)}>
            <Text
                textStyle="h1"
                py="0.5rem"
                px="2rem"
                bgColor="primary.400"
                color="black"
            >
                Login
            </Text>
            <Flex
                m="1rem"
                p="1rem"
                flexDir="column"
                bgColor="gray.600"
                rounded="md"
            >
                <FormControl isInvalid={Boolean(errors.email)} mb="1.5rem">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
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
                    {errors.password?.message && (
                        <FormError message={errors.password.message} />
                    )}
                </FormControl>
                <Text my="1rem">
                    {`Need an account? `}
                    <NextLink href="/register" passHref>
                        <Link>Create one</Link>
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

export default withGuest(Login);
