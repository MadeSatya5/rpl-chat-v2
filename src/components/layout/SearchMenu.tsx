import { Container } from "@chakra-ui/react";
import SearchInput from "../ui/SearchInput";

function SearchMenu() {
  return (
    <Container
      px="4"
      maxW="250px"
      h="100vh"
      position="sticky"
      top="0"
      overflowY="auto"
    >
      <SearchInput />
    </Container>
  );
}

export default SearchMenu;
