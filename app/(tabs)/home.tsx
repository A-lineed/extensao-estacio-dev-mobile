import React, { useState } from 'react';
import { Box, Button, Heading, VStack, Image, Center, Text, Icon, Modal, CloseIcon } from 'native-base';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native'; // Importando Dimensions do React Native
import AppLayout from '../../components/AppLayout';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const { width, height } = Dimensions.get('window'); // Obtendo a largura e altura da tela
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

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
          width="0%" // Configurando a largura para ocupar 90% da tela
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
              onPress={() => setShowModal(true)} // Exibir o modal ao clicar no botão
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
              onPress={() => router.push('/pedidos')}
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
              onPress={() => router.push('/relatorios')}
              width="80%"
              borderRadius="md"
              shadow={4}
              _text={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}
              leftIcon={<Icon as={Ionicons} name="document-text" size="md" color="white" />}
            >
              Relatórios
            </Button>
          </VStack>

          {/* Modal */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full">
            <Modal.Content maxWidth="100%" height="100%" bg="white"> {/* Modal com fundo branco */}
              <Modal.CloseButton />
              <Center flex={1} p={4}>
                <Box
                  w="90%"
                  maxW="400"
                  bg="white"
                  borderRadius="lg"
                  shadow={4}
                  alignItems="center"
                  p={6}
                >
                  <Center mb={6}>
                    <Image
                      source={require('../../assets/images/logo.jpeg')}
                      alt="Logo do Sistema"
                      size="xl"
                      resizeMode="contain"
                    />
                    <Heading color="purple.800" size="xl" mt={4} fontWeight="bold">
                      Gerenciar Pessoas
                    </Heading>
                    <Text fontSize="md" color="purple.600" textAlign="center" mt={2}>
                      Adicione, edite ou remova pessoas do sistema.
                    </Text>
                  </Center>

                  {/* Conteúdo do Modal */}
                  <VStack space={5} mt="5" w="100%" alignItems="center">
                    <Button
                      size="lg"
                      bg="purple.600"
                      _pressed={{ bg: 'purple.700' }}
                      onPress={() => router.push('/adicionarPessoa')}
                      width="80%"
                      borderRadius="md"
                      shadow={4}
                      _text={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}
                      leftIcon={<Icon as={Ionicons} name="add" size="md" color="white" />}
                    >
                      Adicionar Pessoa
                    </Button>
                    <Button
                      size="lg"
                      bg="purple.600"
                      _pressed={{ bg: 'purple.700' }}
                      onPress={() => router.push('/editarPessoa')}
                      width="80%"
                      borderRadius="md"
                      shadow={4}
                      _text={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}
                      leftIcon={<Icon as={Ionicons} name="create" size="md" color="white" />}
                    >
                      Editar Pessoa
                    </Button>
                    <Button
                      size="lg"
                      bg="purple.600"
                      _pressed={{ bg: 'purple.700' }}
                      onPress={() => router.push('/removerPessoa')}
                      width="80%"
                      borderRadius="md"
                      shadow={4}
                      _text={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}
                      leftIcon={<Icon as={Ionicons} name="trash" size="md" color="white" />}
                    >
                      Remover Pessoa
                    </Button>
                  </VStack>
                </Box>
              </Center>
            </Modal.Content>
          </Modal>

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