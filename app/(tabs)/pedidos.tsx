import { Box, Button, FlatList, Heading, Input, VStack, Text } from 'native-base';
import React, { useState } from 'react';

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [descricao, setDescricao] = useState('');

  const adicionarPedido = () => {
    setPedidos([...pedidos, { id: Date.now().toString(), descricao }]);
    setDescricao('');
  };

  return (
    <Box flex={1} safeArea bg="primary.50" p={5}>
      <Heading color="primary.500" fontSize="xl" mb={4}>
        Gestão de Pedidos
      </Heading>
      <VStack space={3}>
        <Input
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          variant="filled"
          bg="white"
          _focus={{ borderColor: 'primary.500' }}
        />
        <Button colorScheme="primary" onPress={adicionarPedido}>
          Adicionar Pedido
        </Button>
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box bg="white" p={3} rounded="md" shadow={1} mb={2}>
              <Text>{item.descricao}</Text>
            </Box>
          )}
        />
      </VStack>
    </Box>
  );
}
