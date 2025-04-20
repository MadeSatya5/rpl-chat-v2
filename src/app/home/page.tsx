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
import { useState } from "react";

function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useShowProfile();
  const { getPost } = useGetPost({keywords: searchKeyword});

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
            queryKey={["posts", username, searchKeyword]}
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
          <SearchMenu onSearch={setSearchKeyword}/>
        </HStack>
      )}
    </>
  );
}

export default Home;
