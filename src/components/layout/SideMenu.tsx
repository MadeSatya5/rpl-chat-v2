import {
  Container,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import AvatarProfile from "../ui/AvatarProfile";
import {  FaHome, FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ShowProfileResponse } from "@/types/profile";
import MenuItem from "../ui/MenuItem";
import { MdOutlineArticle } from "react-icons/md";

interface SideMenuProps {
    profileData?: ShowProfileResponse | null;
  }

function SideMenu({profileData} : SideMenuProps) {

  return (
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
        <MenuItem icon={MdOutlineArticle} label="Your Posts" />
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
            mb={5}
          >
            <AvatarProfile
              username={profileData?.data.username}
              image_url={profileData?.data.image_url}
            />
            <Text fontWeight="bold">Hi, {profileData?.data.username}</Text>
          </HStack>
        </Link>
      </Stack>
    </Container>
  );
}

export default SideMenu;
