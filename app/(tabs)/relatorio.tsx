import React, { useState } from 'react';
import { Box, Center, Heading, VStack, Select, CheckIcon, FlatList, Text, Button } from 'native-base';
import { useRouter } from 'expo-router';
import AppLayout from '../../components/AppLayout';

const pedidosMock = [
  { id: 1, cliente: 'João Silva', valor: 150.0, status: 'Pendente' },
  { id: 2, cliente: 'Maria Oliveira', valor: 200.0, status: 'Em andamento' },
  { id: 3, cliente: 'Carlos Souza', valor: 300.0, status: 'Rota de entrega' },
  { id: 4, cliente: 'Ana Lima', valor: 400.0, status: 'Entregue' },
];

export default function RelatorioScreen() {
  const router = useRouter();
  const [statusFiltro, setStatusFiltro] = useState('');
  const [pedidos, setPedidos] = useState(pedidosMock);

  const pedidosFiltrados = statusFiltro
    ? pedidos.filter((pedido) => pedido.status === statusFiltro)
    : pedidos;

  return (
    <AppLayout title="Relatório de Pedidos">
      <Center flex={1} bg="#E6E6FA">
        <Box
          borderWidth={1}
          borderColor="purple.800"
          bg="white"
          p={6}
          borderRadius="lg"
          shadow={4}
          width="90%"
          maxW="380"
        >
          {/* Cabeçalho */}
          <Heading size="lg" color="purple.800" mb={4} textAlign="center">
            Relatório de Pedidos
          </Heading>

          {/* Filtro por Status */}
          <Select
            selectedValue={statusFiltro}
            minWidth="300"
            accessibilityLabel="Filtrar por Status"
            placeholder="Filtrar por Status"
            _selectedItem={{
              bg: 'purple.200',
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(value) => setStatusFiltro(value)}
            mb={4}
          >
            <Select.Item label="Todos" value="" />
            <Select.Item label="Pendente" value="Pendente" />
            <Select.Item label="Em andamento" value="Em andamento" />
            <Select.Item label="Rota de entrega" value="Rota de entrega" />
            <Select.Item label="Entregue" value="Entregue" />
          </Select>

          {/* Lista de Pedidos */}
          <FlatList
            data={pedidosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth={1}
                borderColor="gray.300"
                py={2}
                px={4}
                mb={2}
                bg="gray.150"
                borderRadius="md"
              >
                <Text fontWeight="bold" fontSize="md">
                  Cliente: {item.cliente}
                </Text>
                <Text>Valor: R$ {item.valor.toFixed(2)}</Text>
                <Text>Status: {item.status}</Text>
              </Box>
            )}
            ListEmptyComponent={
              <Text textAlign="center" color="gray.800" mt={4}>
                Nenhum pedido encontrado.
              </Text>
            }
          />

          {/* Botão Voltar */}
          <Button
            mt={6}
            bg="purple.600"
            _pressed={{ bg: 'purple.700' }}
            onPress={() => router.push('/home')}
            _text={{ color: 'white', fontWeight: 'bold' }}
          >
            Voltar para o Início
          </Button>
        </Box>
      </Center>
    </AppLayout>
  );
}
