"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { useCheckUsername, useRegister } from "@/hooks/auth";
import { RegisterProps } from "@/types/form";
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
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>();

  const { checkUsername, isLoadingCheckUsername } = useCheckUsername();

  const { registerAccount } = useRegister();

  const onSubmit = handleSubmit(async (data) => {
    const sucess = await checkUsername(data);

    if (sucess) {
      registerAccount(data);
    }
  });

  return (
    <Center minH="100vh">
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
          <Heading size="3xl">Register</Heading>
          <Field.Root invalid={!!errors.name} width="400px" required>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              {...register("name", {
                pattern: {
                  value: /^.{4,}$/,
                  message: "Name must be at least 4 characters",
                },
              })}
              variant="subtle"
              color="black"
            />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.username} width="400px" required>
            <Field.Label>
              Username <Field.RequiredIndicator />
            </Field.Label>
            <Input
              {...register("username", {
                pattern: {
                  value: /^.{6,}$/,
                  message: "Username must be at least 6 characters",
                },
              })}
              variant="subtle"
              color="black"
            />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password} width="400px" required>
            <Field.Label>
              Password <Field.RequiredIndicator />{" "}
            </Field.Label>
            <PasswordInput
              {...register("password", {
                pattern: {
                  value: /^.{8,}$/,
                  message: "Password must be at least 8 characters",
                },
              })}
              variant="subtle"
              color="black"
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            <Text>
              Already Have an Account? Log in{" "}
              <ChakraLink color="blue.500" textDecoration="underline" asChild>
                <NextLink href="/login">here</NextLink>
              </ChakraLink>
            </Text>
          </Field.Root>
          <Button type="submit" width="full" backgroundColor="blue">
            {isLoadingCheckUsername ? (
              <ClipLoader color="white" size={25} />
            ) : (
              "Register"
            )}
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

export default Register;
