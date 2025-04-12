"use client";

import { Button, Field, Heading, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { LoginProps } from "@/types/form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = handleSubmit((data) => console.log(data));
  
  return (
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
        <Field.Root invalid={!!errors.email} width="400px" required>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register("email", {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please Enter a Valid Email",
              },
            })}
            variant="subtle"
            color="black"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
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
        </Field.Root>

        <Button type="submit" width="full" backgroundColor="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default Login;
