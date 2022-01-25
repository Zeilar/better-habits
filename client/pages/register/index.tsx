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
    passwordConfirm: string;
}

function Register() {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<Fields>();

    async function submit(fields: Fields) {
        // const {} = await auth.login(fields,)
    }

    return (
        <Box pt={0} as="form" onSubmit={handleSubmit(auth.register)}>
            <Text
                textStyle="h1"
                py="0.5rem"
                px="2rem"
                bgColor="primary.400"
                color="black"
            >
                Sign up
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
                <FormControl isInvalid={Boolean(errors.password)} mb="1.5rem">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        isInvalid={Boolean(errors.password)}
                        label="Password"
                        type="password"
                        placeholder="••••••••••"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                            },
                            maxLength: {
                                value: 50,
                                message: "Maximum 50 characters",
                            },
                        })}
                    />
                    {errors.password?.message && (
                        <FormError message={errors.password.message} />
                    )}
                </FormControl>
                <FormControl isInvalid={Boolean(errors.passwordConfirm)}>
                    <FormLabel htmlFor="passwordConfirm">
                        Confirm Password
                    </FormLabel>
                    <Input
                        id="passwordConfirm"
                        isInvalid={Boolean(errors.passwordConfirm)}
                        type="password"
                        placeholder="••••••••••"
                        {...register("passwordConfirm", {
                            required: "Password confirmation is required",
                            validate: value =>
                                value === getValues().password
                                    ? true
                                    : "Passwords do not match",
                        })}
                    />
                    {errors.passwordConfirm?.message && (
                        <FormError message={errors.passwordConfirm.message} />
                    )}
                </FormControl>
                <Text my="1rem">
                    {`Already have an account? `}
                    <NextLink href="/login" passHref>
                        <Link>Login</Link>
                    </NextLink>
                </Text>
                <Button
                    isLoading={isSubmitting}
                    type="submit"
                    w="100%"
                    rounded="md"
                >
                    Register
                </Button>
            </Flex>
        </Box>
    );
}

export default withGuest(Register);
