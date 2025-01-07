import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [descricao, setDescricao] = useState('');

  const adicionarPedido = () => {
    setPedidos([...pedidos, { id: Date.now().toString(), descricao }]);
    setDescricao('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Pedidos</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Adicionar Pedido" onPress={adicionarPedido} />
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.descricao}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
