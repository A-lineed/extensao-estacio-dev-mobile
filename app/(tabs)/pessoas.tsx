import React, { useState } from 'react';
import { Button, Input, Text, FlatList, VStack, HStack, Box, Center, Heading, Image } from 'native-base';
import AppLayout from '../../components/AppLayout'; // Caminho correto

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  // Função para adicionar um cliente
  const adicionarCliente = () => {
    if (nome.trim() && email.trim() && telefone.trim()) {
      const novoCliente = {
        id: Date.now().toString(),
        nome,
        email,
        telefone,
        endereco,
        dataCadastro: new Date().toLocaleString(), // Data de cadastro formatada
      };

      setClientes([...clientes, novoCliente]);
      // Resetando os campos após o envio
      setNome('');
      setEmail('');
      setTelefone('');
      setEndereco('');
    }
  };

  return (
    <AppLayout title="Cadastro de Clientes">
      <VStack space={5} alignItems="center" flex={1} mt={5}>
        {/* Logo no centro superior */}
        <Center mt={5}>
          <Image
            source={require('../../assets/images/logo.jpeg')} // Caminho correto da sua logo
            alt="Logo"
            size="lg"
            resizeMode="contain"
          />
        </Center>

        {/* Título "Cadastro de Clientes" */}
        <Heading color="primary.500" size="lg" mb={5}>
          Cadastro de Clientes
        </Heading>

        {/* Campos de Entrada */}
        <Input
          placeholder="Nome do Cliente"
          value={nome}
          onChangeText={setNome}
          width="80%"
        />
        <Input
          placeholder="Email do Cliente"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Teclado de email
          width="80%"
        />
        <Input
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad" // Teclado numérico
          width="80%"
        />
        <Input
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
          width="80%"
        />

        {/* Botão para adicionar cliente */}
        <Button
          onPress={adicionarCliente}
          width="80%"
        >
          Adicionar Cliente
        </Button>

        {/* Lista de clientes */}
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box
              borderWidth={1}
              borderRadius="md"
              p={3}
              m={2}
              borderColor="gray.300"
              width="80%"
            >
              <Text fontWeight="bold">Nome: {item.nome}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>
              <Text>Endereço: {item.endereco}</Text>
              <Text>Data de Cadastro: {item.dataCadastro}</Text>
            </Box>
          )}
        />
      </VStack>
    </AppLayout>
  );
}
