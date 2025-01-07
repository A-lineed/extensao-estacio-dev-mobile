import { Box, Button, FlatList, Heading, Input, VStack, Text } from 'native-base';
import React, { useState } from 'react';

export default function PessoasScreen() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');

  const adicionarPessoa = () => {
    setPessoas([...pessoas, { id: Date.now().toString(), nome }]);
    setNome('');
  };

  return (
    <Box flex={1} safeArea bg="primary.50" p={5}>
      <Heading color="primary.500" fontSize="xl" mb={4}>
        Gestão de Pessoas
      </Heading>
      <VStack space={3}>
        <Input
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          variant="filled"
          bg="white"
          _focus={{ borderColor: 'primary.500' }}
        />
        <Button colorScheme="primary" onPress={adicionarPessoa}>
          Adicionar Pessoa
        </Button>
        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box bg="white" p={3} rounded="md" shadow={1} mb={2}>
              <Text>{item.nome}</Text>
            </Box>
          )}
        />
      </VStack>
    </Box>
  );
}
