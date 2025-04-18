import { Avatar } from "@chakra-ui/react";

export interface AvatarProfileProps {
  username: string | undefined;
  image_url: string | undefined;
}

function AvatarProfile(data: AvatarProfileProps) {
  return (
    <Avatar.Root>
      <Avatar.Fallback name={data.username} />
      <Avatar.Image src={data?.image_url} />
    </Avatar.Root>
  );
}

export default AvatarProfile;
