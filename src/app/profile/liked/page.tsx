"use client";

import Feeds from "@/components/layout/Feeds";
import PostInput from "@/components/layout/PostInput";
import SideMenu from "@/components/layout/SideMenu";
import FeedsTabs from "@/components/ui/FeedsTabs";
import LoaderPage from "@/components/ui/LoaderPage";
import PathInfo from "@/components/ui/PathInfo";
import { useGetPostUser } from "@/hooks/post";
import { useShowProfile } from "@/hooks/profile";
import { HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

function LikedPosts() {
  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useShowProfile();
  const { getPostUser } = useGetPostUser(true);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      return await showProfile({ username });
    },
    refetchOnWindowFocus: false,
  });

  return isLoading ? (
    <LoaderPage />
  ) : (
    <HStack maxW="1250px" mx="auto" align="start">
      <SideMenu profileData={profileData} />

      <Feeds
        queryKey={["posts", username]}
        queryFn={({ pageParam }) => getPostUser(username, pageParam)}
        isUserLiked={true}
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

      <PathInfo text="Liked Posts"/>
    </HStack>
  );
}

export default LikedPosts;
