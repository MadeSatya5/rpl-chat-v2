"use client";

import {
  Button,
  Field,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { LoginProps } from "@/types/form";
import { useLogin } from "@/hooks/auth";
import NextLink from "next/link";
import LoaderButton from "@/components/ui/LoaderButton";
import { deleteCookie } from "cookies-next";
import { useEffect } from "react";
import Logo from "@/components/ui/Logo";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const { login, isLoadingLogin } = useLogin();

  const onSubmit = handleSubmit(async (data) => {
    login(data);
  });

  useEffect(() => {
    deleteCookie("accessToken");
    deleteCookie("username");
  }, [])

  return (
    <Center minH="100vh" gap={300}>
      <Logo />
      <form
        onSubmit={onSubmit}
        className="flex justify-center items-center min-h-screen "
      >
        <Stack
          gap="8"
          align="flex-start"
          maxW="fit"
          px="40px"
          py="20px"
          borderRadius="xl"
        >
          <Heading size="3xl">Login</Heading>
          <Field.Root invalid={!!errors.username} width="400px" required>
            <Field.Label>
              Username <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("username")} variant="subtle" color="black" />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password} width="400px" required>
            <Field.Label>
              Password <Field.RequiredIndicator />{" "}
            </Field.Label>
            <PasswordInput
              {...register("password")}
              variant="subtle"
              color="black"
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            <Text>
              Don&apos;t have an account? Register{" "}
              <ChakraLink color="blue.500" textDecoration="underline">
                <NextLink href="/register"><Text color="blue.500" textDecoration="underline">here</Text></NextLink>
              </ChakraLink>
            </Text>
          </Field.Root>
          <Button type="submit" width="full" backgroundColor="blue">
            {isLoadingLogin ? <LoaderButton /> : "Login"}
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

export default Login;
