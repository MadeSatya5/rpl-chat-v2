import { Avatar } from "@chakra-ui/react";

export interface AvatarProfileProps {
  username?: string;
  image_url?: string;
  size?: 'full' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', 
}

function AvatarProfile({ username, image_url, size = "md" }: AvatarProfileProps) {
  return (
    <Avatar.Root alignSelf="start" size={size}>
      <Avatar.Fallback name={username} />
      <Avatar.Image src={`https://tugas2-fe.labse.id/assets/${image_url}`} />
    </Avatar.Root>
  );
}

export default AvatarProfile;
