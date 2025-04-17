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
import FeedsTabs from "@/components/ui/FeedsTabs";
import PostInput from "@/components/layout/PostInput";
import PostItem from "@/components/layout/PostItem";
import { useGetPost } from "@/hooks/post";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<
    ShowProfileResponse | null | undefined
  >(null);

  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useProfile();
  const { getPost } = useGetPost();

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
    getPost();
  }, []);

  return (
    <>
      {isLoading ? (
        <HStack justify="center" align="center" minH="100vh">
          <MoonLoader color="white" />
        </HStack>
      ) : (
        // --------- Side Menu --------------
        <HStack maxW="1250px" mx="auto" py="20px" align="start">
          <Container px="0" maxW="250px">
            <Stack
              gap={3}
              borderRight="1px solid"
              borderColor="light"
              w="fit-content"
              pr="40px"
              minH="95vh"
            >
              <Heading size="4xl" py="14px" px="30px">
                Bunshin
              </Heading>
              <MenuItem icon={FaHome} label="Home" />
              <MenuItem icon={FaHeart} label="Liked" />
              <MenuItem icon={FaSearch} label="Search" />
              <MenuItem icon={IoMdNotificationsOutline} label="Notification" />
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
          <Container px="4" maxW="700px">
            <Stack
              gap={4}
              borderRight="1px solid"
              borderColor="light"
              pr="40px"
              minH="95vh"
            >
              <FeedsTabs />
              <PostInput
                username={profileData?.data.username}
                image_url={profileData?.data.image_url}
              />
              <PostItem
                username="John Doe"
                image_url="https://randomuser.me/api/portraits/men/75.jpg"
                text="Loving Chakra UI! It's so easy to work with. #chakra #react"
                timestamp="2025-04-17T12:34:56Z"
              />
              <PostItem
                username="Jane Smith"
                image_url="https://randomuser.me/api/portraits/women/50.jpg"
                text="Just finished a project with Next.js. Super excited! #nextjs #webdev"
                timestamp="2025-04-16T18:20:00Z"
              />
              <PostItem
                username="Alex Johnson"
                image_url="https://randomuser.me/api/portraits/men/30.jpg"
                text="Started learning TypeScript today. It's challenging but fun! #typescript #programming"
                timestamp="2025-04-15T08:15:25Z"
              />
            </Stack>
          </Container>

          {/* ---------- Search  ---------- */}
          <Container px="4" my="20px" maxW="250px">
            <SearchInput />
          </Container>
        </HStack>
      )}
    </>
  );
}

export default Home;
