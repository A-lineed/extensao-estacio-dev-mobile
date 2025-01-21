import React from 'react';
import { Box, Button, Heading, VStack, Image, Center, Text, Icon } from 'native-base';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import AppLayout from '../../components/AppLayout';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const { height } = Dimensions.get('window'); // Obtendo altura da tela

  return (
    <AppLayout title="Sistema de Gestão Empresarial Soluções Facas">
      <Center flex={1} bg="#E6E6FA"> {/* Fundo roxo clarinho */}
        <Box
          borderWidth={1}
          borderColor="purple.800"
          bg="white"
          p={6}
          borderRadius="lg"
          shadow={4}
          width="90%" // Configurando a largura para ocupar 90% da tela
          maxW="380" // Configurando a largura máxima
          height={height} // Configurando a altura para ocupar toda a tela
        >
          {/* Cabeçalho */}
          <Center mt={18}>
            <Image
              source={require('../../assets/images/logo.jpeg')}
              alt="Logo do Sistema"
              size="lg"
              resizeMode="contain"
            />
            <Heading color="purple.800" size="xl" mt={20} fontWeight="bold">
              Soluções Facas
            </Heading>
            <Text fontSize="md" color="purple.600" textAlign="center" mt={5}>
              Otimize a gestão de clientes, pedidos e relatórios de forma integrada e eficiente.
            </Text>
          </Center>

          {/* Opções principais */}
          <VStack space={5} alignItems="center" justifyContent="center" mt={49}>
            <Button
              size="lg"
              bg="purple.600"
              _pressed={{ bg: 'purple.700' }}
              onPress={() => router.push('..//tabs/clientes')}
              width="80%"
              borderRadius="md"
              shadow={4}
              _text={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}
              leftIcon={<Icon as={Ionicons} name="person" size="md" color="white" />}
            >
              Gerenciar Clientes
            </Button>
            <Button
              size="lg"
              bg="purple.600" 
              _pressed={{ bg: 'purple.700' }}
              onPress={() => router.push('..//tabs/pedidos')}
              width="80%"
              borderRadius="md"
              shadow={4}
              _text={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}
              leftIcon={<Icon as={Ionicons} name="cart" size="md" color="white" />}
            >
              Gerenciar Pedidos
            </Button>
            <Button
              size="lg"
              bg="purple.600"
              _pressed={{ bg: 'purple.700' }}
              onPress={() => router.push('/tabs/relatorios')}
              width="80%"
              borderRadius="md"
              shadow={4}
              _text={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}
              leftIcon={<Icon as={Ionicons} name="document-text" size="md" color="white" />}
            >
              Relatórios
            </Button>
          </VStack>

          {/* Rodapé */}
          <Box mt={85} alignItems="center">
            <Text fontSize="xs" color="gray.500" textAlign="center">
              &copy; {new Date().getFullYear()} Sistema de Gestão Empresarial Soluções Facas. Todos os direitos reservados.
            </Text>
          </Box>
        </Box>
      </Center>
    </AppLayout>
  );
}
