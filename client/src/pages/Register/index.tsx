import { Button, Flex, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../../components/FormError";
import { Link as ReactLink } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

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
        getValues,
    } = useForm<Fields>();

    return (
        <PageWrapper as="form" onSubmit={handleSubmit(auth.register)} p={4}>
            <Text as="h2" textStyle="h2">
                Sign up
            </Text>
            <Flex my={4} flexDir="column">
                <FormControl isInvalid={Boolean(errors.email)} mb={6}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        placeholder="john.doe@example.com"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            maxLength: {
                                value: 50,
                                message: "Maximum 50 characters",
                            },
                        })}
                    />
                    {errors.email?.message && <FormError message={errors.email.message} />}
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)} mb={6}>
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
                    {errors.password?.message && <FormError message={errors.password.message} />}
                </FormControl>
                <FormControl isInvalid={Boolean(errors.passwordConfirm)}>
                    <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
                    <Input
                        id="passwordConfirm"
                        isInvalid={Boolean(errors.passwordConfirm)}
                        type="password"
                        placeholder="••••••••••"
                        {...register("passwordConfirm", {
                            required: "Password confirmation is required",
                            validate: value => (value === getValues().password ? true : "Passwords do not match"),
                        })}
                    />
                    {errors.passwordConfirm?.message && <FormError message={errors.passwordConfirm.message} />}
                </FormControl>
                <Text my={4}>
                    {`Already have an account? `}
                    <Link as={ReactLink} to="/login">
                        Login
                    </Link>
                </Text>
                <Button isLoading={isSubmitting} type="submit" rounded="md">
                    Register
                </Button>
            </Flex>
        </PageWrapper>
    );
}
