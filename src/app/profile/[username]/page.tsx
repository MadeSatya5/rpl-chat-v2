"use client";

import AvatarProfile from "@/components/ui/AvatarProfile";
import LoaderPage from "@/components/ui/LoaderPage";
import { useShowProfile } from "@/hooks/profile";
import { Center, Text, VStack, Box, Stack, IconButton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoArrowBackSharp } from "react-icons/io5";

function ProfileDetail() {
  const router = useRouter();

  const { username } = useParams();

  const { showProfile, isLoadingShowProfile } = useShowProfile();

  const { data: profileData } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      if (!username || Array.isArray(username)) {
        toast.error("Cannot Find User!")
        return null;
      }
      return await showProfile({ username });
    },
    refetchOnWindowFocus: false,
  });

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
        _hover={{ bgColor: "gray.800" }}
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
            </>
          </VStack>
        </VStack>
      </Center>
    </>
  );
}

export default ProfileDetail;
