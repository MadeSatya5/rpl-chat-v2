"use client";

import { getCookie } from "cookies-next";
import {
  Container,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import MenuItem from "@/components/ui/MenuItem";
import { useProfile } from "@/hooks/profile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShowProfileResponse } from "@/types/profile";
import { MoonLoader } from "react-spinners";
import AvatarProfile from "@/components/ui/AvatarProfile";
import SearchInput from "@/components/ui/SearchInput";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import MainFeeds from "@/components/layout/MainFeeds";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<
    ShowProfileResponse | null | undefined
  >(null);

  const queryClient = new QueryClient();

  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useProfile();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await showProfile({ username });
        setProfileData(result);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);
  

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isLoading ? (
          <HStack justify="center" align="center" minH="100vh">
            <MoonLoader color="white" />
          </HStack>
        ) : (
          // --------- Side Menu --------------
          <HStack maxW="1250px" mx="auto" align="start">
            <Container
              px="0"
              maxW="250px"
              h="100vh"
              position="sticky"
              top="0"
              overflowY="auto"
            >
              <Stack
                gap={3}
                borderRight="1px solid"
                borderColor="light"
                w="fit-content"
                pr="40px"
                minH="100vh"
              >
                <Heading size="4xl" py="14px" px="30px">
                  Bunshin
                </Heading>
                <MenuItem icon={FaHome} label="Home" />
                <MenuItem icon={FaHeart} label="Liked" />
                <MenuItem icon={FaSearch} label="Search" />
                <MenuItem
                  icon={IoMdNotificationsOutline}
                  label="Notification"
                />
                <Spacer flexBasis={10} />
                <Link href="/profile">
                  <HStack
                    gap={3}
                    _hover={{
                      bg: "light",
                      transition: "background-color 0.3s ease",
                    }}
                    py="14px"
                    px="30px"
                    borderRadius="2xl"
                    mb={5}
                  >
                    <AvatarProfile
                      username={profileData?.data.username}
                      image_url={profileData?.data.image_url}
                    />
                    <Text fontWeight="bold">
                      Hi, {profileData?.data.username}
                    </Text>
                  </HStack>
                </Link>
              </Stack>
            </Container>

            {/* -------- Main Feeds --------- */}
            <MainFeeds profileData={profileData} />

            {/* ---------- Search  ---------- */}
            <Container
              px="4"
              maxW="250px"
              h="100vh"
              position="sticky"
              top="0"
              overflowY="auto"
            >
              <SearchInput />
            </Container>
          </HStack>
        )}
      </QueryClientProvider>
    </>
  );
}

export default Home;
