"use client";

import { getCookie } from "cookies-next";
import { HStack } from "@chakra-ui/react";
import { useShowProfile } from "@/hooks/profile";
import LoaderPage from "@/components/ui/LoaderPage";
import SideMenu from "@/components/layout/SideMenu";
import SearchMenu from "@/components/layout/SearchMenu";
import { useQuery } from "@tanstack/react-query";
import Feeds from "@/components/layout/Feeds";
import { useGetPost } from "@/hooks/post";
import FeedsTabs from "@/components/ui/FeedsTabs";
import PostInput from "@/components/layout/PostInput";

function Home() {
  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useShowProfile();
  const { getPost } = useGetPost();

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
          <SideMenu profileData={profileData} />

          {/* -------- Main Feeds --------- */}
          <Feeds
            queryKey={["posts", username]}
            queryFn={({ pageParam }) => getPost(pageParam)}
            renderInput={
              <>
                <FeedsTabs />
                <PostInput
                  username={profileData?.data.username}
                  image_url={profileData?.data.image_url}
                />
              </>
            }
          />

          {/* ---------- Search  ---------- */}
          <SearchMenu />
        </HStack>
      )}
    </>
  );
}

export default Home;
