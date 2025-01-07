import { Box, Button, Heading, VStack, Image, Center } from 'native-base';
import { useRouter } from 'expo-router';
import AppLayout from '../../components/AppLayout'; // Caminho correto

export default function HomeScreen() {
  const router = useRouter();

  return (
    <AppLayout title="Bem-vindo ao Sistema de Gestão">
      <Center mt={5}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          alt="Logo"
          size="lg"
          resizeMode="contain"
        />
      </Center>

      <VStack space={5} alignItems="center" justifyContent="center" flex={1}>
        <Heading fontSize="2xl" textAlign="center">
          Bem-vindo ao Sistema de Gestão
        </Heading>
        <Button
          size="lg"
          onPress={() => router.push('/pessoas')}
          _text={{ color: 'white' }} // Texto do botão sempre branco
        >
          Gerenciar Pessoas
        </Button>
        <Button
          size="lg"
          onPress={() => router.push('/pedidos')}
          _text={{ color: 'white' }} // Texto do botão sempre branco
        >
          Gerenciar Pedidos
        </Button>
      </VStack>
    </AppLayout>
  );
}
