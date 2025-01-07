import React, { useState } from 'react';
import { Button, Input, Text, FlatList, VStack, HStack, Box, Center, Heading, Image } from 'native-base';
import AppLayout from '../../components/AppLayout'; // Caminho correto

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para adicionar um pedido
  const adicionarPedido = () => {
    if (nome.trim() && quantidade.trim() && prioridade.trim()) {
      const novoPedido = {
        id: Date.now().toString(),
        nome,
        descricao,
        quantidade: parseInt(quantidade), // Convertendo para número
        prioridade,
        dataCriacao: new Date().toLocaleString(), // Data de criação formatada
      };

      setPedidos([...pedidos, novoPedido]);
      // Resetando os campos após o envio
      setNome('');
      setDescricao('');
      setQuantidade('');
      setPrioridade('');
    }
  };

  return (
    <AppLayout title="Cadastro de Pedidos">
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

        {/* Título "Cadastro de Pedidos" */}
        <Heading color="primary.500" size="lg" mb={5}>
          Cadastro de Pedidos
        </Heading>

        {/* Campos de Entrada */}
        <Input
          placeholder="Nome do Pedido"
          value={nome}
          onChangeText={setNome}
          width="80%"
        />
        <Input
          placeholder="Descrição do Pedido"
          value={descricao}
          onChangeText={setDescricao}
          width="80%"
        />
        <Input
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric" // Permitindo apenas números
          width="80%"
        />
        <Input
          placeholder="Prioridade"
          value={prioridade}
          onChangeText={setPrioridade}
          width="80%"
        />
        
        {/* Botão para adicionar pedido */}
        <Button
          onPress={adicionarPedido}
          width="80%"
        >
          Adicionar Pedido
        </Button>

        {/* Lista de pedidos */}
        <FlatList
          data={pedidos}
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
              <Text>Descrição: {item.descricao}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
              <Text>Prioridade: {item.prioridade}</Text>
              <Text>Data de Criação: {item.dataCriacao}</Text>
            </Box>
          )}
        />
      </VStack>
    </AppLayout>
  );
}
