"use client";

import AvatarProfile from "@/components/ui/AvatarProfile";
import LoaderPage from "@/components/ui/LoaderPage";
import { useEditProfile, useShowProfile } from "@/hooks/profile";
import type { ShowProfileResponse } from "@/types/profile";
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
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

function Profile() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<
    ShowProfileResponse | null | undefined
  >(null);

  const [editedName, setEditedName] = useState(profileData?.data.name);
  const [editedBio, setEditedBio] = useState(profileData?.data.bio);
  const [editedImage, setEditedImage] = useState(profileData?.data.image_url);

  const { showProfile, isLoadingShowProfile } = useShowProfile();
  const { editProfile, isLoadingEditProfile } = useEditProfile();

  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  async function fetchProfile() {
    const res = await showProfile({ username });
    console.log(res);
    setProfileData(res);
  }

  async function handleEditProfile() {
    const res = await editProfile({
      name: editedName,
      bio: editedBio,
      image_url: editedImage,
    });
    console.log(res);
    setIsEditing(false);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return isLoadingShowProfile || isLoadingEditProfile? (
    <LoaderPage />
  ) : (
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
            <>
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight">
                {`@${profileData?.data.username}`}
              </Text>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input
                  value={editedName}
                  placeholder="name"
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Bio</Field.Label>
                <Input
                  value={editedBio}
                  placeholder="bio"
                  onChange={(e) => setEditedBio(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Image</Field.Label>
                <Input
                  value={editedImage}
                  placeholder="image"
                  onChange={(e) => setEditedImage(e.target.value)}
                />
              </Field.Root>
              {/* Action Button */}
              <HStack gap={20}>
                <Text
                  px={4}
                  py={2}
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{
                    bg: "light",
                    color: "green.500",
                  }}
                  onClick={handleEditProfile}
                >
                  Save
                </Text>
                <Text
                  px={4}
                  py={2}
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{
                    bg: "light",
                    color: "red.500",
                  }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Text>
              </HStack>
            </>
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
            </>
          )}
        </VStack>
      </VStack>
    </Center>
  );
}

export default Profile;
