"use client";

import AvatarProfile from "@/components/ui/AvatarProfile";
import LoaderPage from "@/components/ui/LoaderPage";
import { useEditProfile, useShowProfile } from "@/hooks/profile";
import { EditProfileProps } from "@/types/profile";
import {
  Center,
  Text,
  VStack,
  Box,
  Stack,
  IconButton,
  Input,
  Field,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  FaEdit } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

function Profile() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { showProfile, isLoadingShowProfile } = useShowProfile();

  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileProps>();

  const { editProfile } = useEditProfile();

  const { data: profileData } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      return await showProfile({ username });
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: handleEditName } = useMutation({
    mutationFn: async ({ name, bio, image_url }: EditProfileProps) => {
      await editProfile({ name, bio, image_url });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!data.image_url) return;
    handleEditName({
      name: data.name,
      bio: data.bio,
      image_url: data.image_url,
    });
    setIsEditing(false);
  });

  useEffect(() => {
    if (profileData) {
      setValue("name", profileData.data.name);
      setValue("bio", profileData.data.bio);
    }
  }, [profileData, setValue]);

  return isLoadingShowProfile ? (
    <LoaderPage />
  ) : (
    <>
      <IconButton
        aria-label="Back"
        onClick={() => router.back()}
        position="absolute"
        top="22%"
        left="36%"
        zIndex="10"
        bgColor="transparent"
        size="xl"
        _hover={{bgColor: "gray.800"}}
        borderRadius={50}
      >
        <IoArrowBackSharp />
      </IconButton>

      <Center minH="100vh" px={4}>
        <VStack
          w="full"
          maxW="md"
          borderWidth="1px"
          borderRadius="xl"
          overflow="hidden"
          h="fit-content"
          gap={0}
        >
          <Box w="full" h="150px" position="relative" />

          <VStack
            w="full"
            mt="-75px"
            px={8}
            py={6}
            gap={6}
            flex={1}
            position="relative"
            textAlign="center"
          >
            <Box borderRadius="full" p="3px">
              <AvatarProfile
                username={profileData?.data.username}
                image_url={profileData?.data.image_url}
                size="2xl"
              />
            </Box>

            {isEditing ? (
              <form onSubmit={onSubmit}>
                <VStack gap={4} align="stretch">
                  <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight">
                    {`@${profileData?.data.username}`}
                  </Text>

                  <Field.Root invalid={!!errors.name} required>
                    <Field.Label>Name</Field.Label>
                    <Input
                      placeholder="name"
                      {...register("name", { required: true })}
                      autoComplete="off"
                    />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.bio} required>
                    <Field.Label>Bio</Field.Label>
                    <Input
                      placeholder="bio"
                      {...register("bio", { required: true })}
                      autoComplete="off"
                    />
                    <Field.ErrorText>{errors.bio?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.image_url} required>
                    <Field.Label>Image</Field.Label>
                    <Input
                      type="file"
                      {...register("image_url", { required: true })}
                      style={{
                        padding: "6px",
                      }}
                    />
                    <Field.ErrorText>
                      {errors.image_url?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* Action Button */}
                  <HStack gap={20}>
                    <Button
                      px={4}
                      py={2}
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{
                        color: "green.500",
                      }}
                      type="submit"
                    >
                      Save
                    </Button>

                    <Button
                      px={4}
                      py={2}
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{
                        color: "red.500",
                      }}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </VStack>
              </form>
            ) : (
              <>
                <Stack gap={1} pt={2}>
                  <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight">
                    {`@${profileData?.data.username}`}
                  </Text>
                  <Text fontSize="md" color="gray.500" fontWeight="medium">
                    {profileData?.data.name}
                  </Text>
                </Stack>

                <Box
                  bg="light"
                  p={4}
                  borderRadius="lg"
                  w="full"
                  maxH="150px"
                  overflowY="auto"
                >
                  <Text fontSize="sm" color="gray.300" lineHeight="tall">
                    {profileData?.data.bio || "No bio available"}
                  </Text>
                </Box>
                <IconButton
                  bgColor="transparent"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit />
                  Edit Profile
                </IconButton>
                <Button bgColor="red.800" onClick={() => router.push("/login")}>
                  Log Out
                </Button>
              </>
            )}
          </VStack>
        </VStack>
      </Center>
    </>
  );
}

export default Profile;
