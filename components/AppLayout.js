// components/AppLayout.js
import React from 'react';
import { Box, Center, Heading, VStack } from 'native-base';

const AppLayout = ({ children }) => {
  return (
    <Box flex={1} bg="white" p={5}>
      <Center mt={5}>
        <Heading color="primary.500" size="lg">
        </Heading>
      </Center>
      <VStack space={5} alignItems="center" justifyContent="center" flex={1}>
        {children}
      </VStack>
    </Box>
  );
};

export default AppLayout;
