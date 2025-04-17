import { AvatarProfileProps } from "@/types/profile";
import { Avatar } from "@chakra-ui/react";

function AvatarProfile(data: AvatarProfileProps) {
  return (
    <Avatar.Root>
      <Avatar.Fallback name={data.username} />
      <Avatar.Image src={data?.image_url} />
    </Avatar.Root>
  );
}

export default AvatarProfile;
