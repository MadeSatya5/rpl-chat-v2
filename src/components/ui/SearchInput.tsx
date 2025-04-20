import { Input, InputGroup } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface SearchInputProps {
  onSearch?: (keywords: string) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <InputGroup flex="1">
      <Input
        placeholder="Search..."
        variant="flushed"
        onChange={handleChange}
      />
    </InputGroup>
  );
}

export default SearchInput;
