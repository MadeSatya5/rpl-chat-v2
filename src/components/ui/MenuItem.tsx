import { HStack, Icon, Text } from "@chakra-ui/react";
import { MenuItemProps } from "@/types/menu";

function MenuItem({ icon, label, width }: MenuItemProps) {
  return (
    <HStack
      _hover={{ bg: "light", transition: "background-color 0.3s ease" }}
      py="14px"
      px="30px"
      borderRadius="2xl"
      width={width}
    >
      <Icon as={icon} fontSize="20px" />
      <Text fontWeight="bold" fontSize="20px">
        {label}
      </Text>
    </HStack>
  );
}

export default MenuItem;
