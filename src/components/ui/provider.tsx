'use client';

import { ChakraProvider, defineConfig } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { createSystem, defaultConfig } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
const queryClient = new QueryClient();


export function Provider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>

    <ChakraProvider value={system}>
      <ThemeProvider>
        {children} 
      </ThemeProvider>
    </ChakraProvider>
    </QueryClientProvider>

  );
}
