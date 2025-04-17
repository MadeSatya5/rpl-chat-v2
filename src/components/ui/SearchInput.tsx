import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

function SearchInput() {
  return (
    <InputGroup flex="1" startElement={<LuSearch />} >
      <Input placeholder="Search..." variant="flushed"/>
    </InputGroup>
  );
}

export default SearchInput;
