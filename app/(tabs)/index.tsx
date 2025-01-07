import { Box, Button, Heading, VStack } from 'native-base';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Box flex={1} safeArea bg="primary.50" p={5} justifyContent="center">
      <VStack space={5} alignItems="center">
        <Heading color="primary.500" fontSize="2xl">
          Bem-vindo ao Sistema de Gestão
        </Heading>
        <Button size="lg" colorScheme="primary" onPress={() => router.push('/pessoas')}>
          Gerenciar Pessoas
        </Button>
        <Button size="lg" colorScheme="primary" onPress={() => router.push('/pedidos')}>
          Gerenciar Pedidos
        </Button>
      </VStack>
    </Box>
  );
}
