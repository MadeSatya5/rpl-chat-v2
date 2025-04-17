'use client';

import { ChakraProvider, defineConfig } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { createSystem, defaultConfig } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        light: { value: "#2F2F2F" },
      },
      fonts: {
        body: { value: `'Bricolage Grotesque', sans-serif` },
      },
    },
  },
})

const system = createSystem(defaultConfig, config)

export function Provider({ children }: Props) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider>
        {children} 
      </ThemeProvider>
    </ChakraProvider>
  );
}
