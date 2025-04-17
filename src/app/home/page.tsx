"use client";

import { getCookie } from "cookies-next";
import {
  Avatar,
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
import { FadeLoader } from "react-spinners";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<
    ShowProfileResponse | null | undefined
  >(null);

  const acessToken = getCookie("acessToken");
  console.log(acessToken);

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
        console.log(error)
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  return (
    <>
      {isLoading ? (
        <HStack justify="center" align="center" minH="100vh">
          <FadeLoader color="white" />
        </HStack>
      ) : (
        <HStack maxW="1250px" mx="auto" py="20px">
          <Container>
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
                <HStack gap={3}>
                  <Avatar.Root>
                    <Avatar.Fallback name={profileData?.data.username} />
                    <Avatar.Image src={profileData?.data.image_url} />
                  </Avatar.Root>
                  <Text fontWeight="bold">Hi, {profileData?.data.username}</Text>
                </HStack>
              </Link>
            </Stack>
          </Container>
        </HStack>
      )}
    </>
  );
  
}

export default Home;
