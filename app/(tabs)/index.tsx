import React, { useState } from 'react';
import { Box, Button, Heading, VStack, Input, Center, Icon, FormControl, WarningOutlineIcon, Image, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Verificação simples de usuário e senha
    if (username === 'solucoes' && password === 'facas') {
      setError('');
      router.push('/home'); // Redirecionar para a página inicial após login bem sucedido
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <Center flex={1} bg="#E6E6FA"> {/* Fundo roxo clarinho */}
      <Box
        safeArea
        p="4"
        py="8"
        w="90%"
        maxW="400"
        bg="white"
        borderRadius="lg"
        shadow={4}
      >
        <Center mb={6}>
          <Image
            source={require('../../assets/images/logo.jpeg')}
            alt="Logo do Sistema"
            size="xl"
            resizeMode="contain"
          />
          <Heading size="lg" color="purple.800" fontWeight="semibold" mt={4}>
            Bem-vindo(a)
          </Heading>
          <Heading mt="1" color="purple.600" fontWeight="medium" size="xs">
            Faça login para acessar o sistema!
          </Heading>
        </Center>

        <VStack space={5} mt="5">
          <FormControl isInvalid={error !== ''}>
            <FormControl.Label _text={{ color: 'purple.600' }}>Nome de usuário</FormControl.Label>
            <Input
              value={username}
              onChangeText={setUsername}
              placeholder="Nome de Usuário"
              bg="gray.100"
              InputLeftElement={
                <Icon as={<Ionicons name="person" />} size="sm" ml="2" color="muted.400" />
              }
            />
          </FormControl>
          <FormControl isInvalid={error !== ''}>
            <FormControl.Label _text={{ color: 'purple.600' }}>Senha</FormControl.Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              bg="gray.100"
              InputRightElement={
                <Icon
                  as={<Ionicons name={showPassword ? "eye-off" : "eye"} />}
                  size="sm"
                  mr="2"
                  color="muted.400"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          </FormControl>
          <Button mt="2" colorScheme="purple" onPress={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
      <Box mt={20} alignItems="center">
        <Text fontSize="xs" color="gray.500" textAlign="center">
          &copy; {new Date().getFullYear()} Sistema de Gestão Empresarial Soluções Facas. Todos os direitos reservados.
        </Text>
      </Box>
    </Center>
  );
}