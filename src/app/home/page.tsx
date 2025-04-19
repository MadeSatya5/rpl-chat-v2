"use client";

import { getCookie } from "cookies-next";
import {
  HStack,
} from "@chakra-ui/react";
import { useShowProfile } from "@/hooks/profile";
import { useEffect, useState } from "react";
import { ShowProfileResponse } from "@/types/profile";
import MainFeeds from "@/components/layout/MainFeeds";
import LoaderPage from "@/components/ui/LoaderPage";
import SideMenu from "@/components/layout/SideMenu";
import SearchMenu from "@/components/layout/SearchMenu";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<
    ShowProfileResponse | null | undefined
  >(null);


  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useShowProfile();

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
