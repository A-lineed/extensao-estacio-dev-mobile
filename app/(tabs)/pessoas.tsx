import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function PessoasScreen() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');

  const adicionarPessoa = () => {
    setPessoas([...pessoas, { id: Date.now().toString(), nome }]);
    setNome('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Pessoas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <Button title="Adicionar Pessoa" onPress={adicionarPessoa} />
      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.nome}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
