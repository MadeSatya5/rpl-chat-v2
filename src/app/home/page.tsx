"use client"

import { getCookie } from "cookies-next";
import {
  HStack,
} from "@chakra-ui/react";
import { useShowProfile } from "@/hooks/profile";
import MainFeeds from "@/components/layout/MainFeeds";
import LoaderPage from "@/components/ui/LoaderPage";
import SideMenu from "@/components/layout/SideMenu";
import SearchMenu from "@/components/layout/SearchMenu";
import { useQuery } from "@tanstack/react-query";

function Home() {

  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useShowProfile();

  const { data: profileData, isLoading } = useQuery({
      queryKey: ["profileData"],
      queryFn: async () => {
        return await showProfile({ username });
      },
      refetchOnWindowFocus: false,
    });

  return (
    <>
        {isLoading ? (
          <LoaderPage />
        ) : (
          <HStack maxW="1250px" mx="auto" align="start">

            {/* -------- Side Menu ---------- */}
            <SideMenu profileData={profileData}/>

            {/* -------- Main Feeds --------- */}
            <MainFeeds profileData={profileData} />

            {/* ---------- Search  ---------- */}
            <SearchMenu />
          </HStack>
        )}
    </>
  );
}

export default Home;
