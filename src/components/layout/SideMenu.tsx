"use client"
import {
  Container,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import AvatarProfile from "../ui/AvatarProfile";
import { FaHeart, FaHome } from "react-icons/fa";
import { ShowProfileResponse } from "@/types/profile";
import MenuItem from "../ui/MenuItem";
import { MdOutlineArticle } from "react-icons/md";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";

interface SideMenuProps {
  profileData?: ShowProfileResponse | null;
}

const menuItems = [
  { icon: FaHome, label: "Home", href: "/home" },
  { icon: MdOutlineArticle, label: "Your Posts", href: "/profile/post" },
  { icon: FaHeart, label: "Liked", href: "/profile/liked" },
];

function SideMenu({ profileData }: SideMenuProps) {
  const pathname = usePathname();

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
        borderColor="gray.800"
        w="fit-content"
        pr="40px"
        minH="100vh"
      >
        <Link href="/home">
          <Logo />
        </Link>

        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link
              href={item.href}
              key={item.label}
              style={{ textDecoration: "none" }}
            >
              <MenuItem
                icon={item.icon}
                label={item.label}
                bgColor={isActive ? "gray.700" : ""}
              />
            </Link>
          );
        })}

        <Spacer flexBasis={10} />

        <Link href="/profile">
          <HStack
            gap={3}
            _hover={{
              bg: "gray.800",
              transition: "background-color 0.2s ease",
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
