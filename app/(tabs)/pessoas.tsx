import React, { useState } from 'react';
import { Button, Input, Text, FlatList, VStack } from 'native-base';
import AppLayout from '../../components/AppLayout'; // Caminho correto

export default function PessoasScreen() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');

  const adicionarPessoa = () => {
    if (nome.trim()) {
      setPessoas([...pessoas, { id: Date.now().toString(), nome }]);
      setNome('');
    }
  };

  return (
    <AppLayout title="Gerenciar Clientes">
      <VStack space={5} alignItems="center" flex={1} mt={5}>
        {/* Input para adicionar pessoa */}
        <Input
          placeholder="Nome da Pessoa"
          value={nome}
          onChangeText={setNome}
          width="80%"
        />
        
        {/* Botão para adicionar pessoa */}
        <Button
          onPress={adicionarPessoa}
          width="80%"
        >
          Adicionar Pessoa
        </Button>
        
        {/* Lista de pessoas */}
        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.nome}</Text>}
        />
      </VStack>
    </AppLayout>
  );
}
