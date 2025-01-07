import { Box, Button, Heading, VStack, Image, Center } from 'native-base';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Box flex={1} safeArea bg="black" p={5}>
      {/* Logo no centro superior */}
      <Center mt={5}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          alt="Logo"
          size="lg" // Ajuste o tamanho conforme necessário
          resizeMode="contain" // Para ajustar a logo ao tamanho do espaço
        />
      </Center>

      {/* Conteúdo central */}
      <VStack space={5} alignItems="center" justifyContent="center" flex={1}>
        <Heading color="purple.400" fontSize="2xl" textAlign="center">
          Bem-vindo ao Sistema de Gestão
        </Heading>
        <Button
          size="lg"
          bg="purple.600"
          _pressed={{ bg: 'purple.700' }}
          onPress={() => router.push('/pessoas')}
          _text={{ color: 'white' }}
        >
          Gerenciar Pessoas
        </Button>
        <Button
          size="lg"
          bg="blue.600"
          _pressed={{ bg: 'blue.700' }}
          onPress={() => router.push('/pedidos')}
          _text={{ color: 'white' }}
        >
          Gerenciar Pedidos
        </Button>
      </VStack>
    </Box>
  );
}
