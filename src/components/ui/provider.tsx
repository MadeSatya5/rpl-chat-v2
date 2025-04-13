'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { defaultSystem } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

export function Provider({ children }: Props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children} 
      </ThemeProvider>
    </ChakraProvider>
  );
}
