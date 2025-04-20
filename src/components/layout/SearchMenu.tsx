import { Container } from "@chakra-ui/react";
import SearchInput from "../ui/SearchInput";

interface SearchMenuProps {
  onSearch?: (keywords: string) => void;
};

function SearchMenu({onSearch} : SearchMenuProps) {
  return (
    <Container
      px="4"
      maxW="250px"
      h="100vh"
      position="sticky"
      top="0"
      overflowY="auto"
      bgColor="#000000"
    >
      <SearchInput onSearch={onSearch}/>
    </Container>
  );
}

export default SearchMenu;
