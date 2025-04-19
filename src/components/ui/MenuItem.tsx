import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
interface MenuItemProps {
    icon: IconType,
    label: string,
    width?: string,
    bgColor?: string,
}

function MenuItem({ icon, label, width, bgColor }: MenuItemProps) {
  return (
    <HStack
      _hover={{ bg: "gray.800", transition: "background-color 0.2s ease" }}
      py="14px"
      px="30px"
      borderRadius="2xl"
      width={width}
      bgColor={bgColor}
    >
      <Icon as={icon} fontSize="20px" />
      <Text fontWeight="bold" fontSize="20px">
        {label}
      </Text>
    </HStack>
  );
}

export default MenuItem;
