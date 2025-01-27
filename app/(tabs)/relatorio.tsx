import React, { useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Select,
  CheckIcon,
  FlatList,
  Text,
  Button,
} from 'native-base';
import { useRouter } from 'expo-router';
import AppLayout from '../../components/AppLayout';

const pedidosMock = [
  { id: 1, cliente: 'João Silva', valor: 150.0, status: 'Pendente' },
  { id: 2, cliente: 'Maria Oliveira', valor: 200.0, status: 'Em andamento' },
  { id: 3, cliente: 'Carlos Souza', valor: 300.0, status: 'Rota de entrega' },
  { id: 4, cliente: 'Ana Lima', valor: 400.0, status: 'Entregue' },
  { id: 5, cliente: 'Pedro Gomes', valor: 120.0, status: 'Pendente' },
  { id: 6, cliente: 'Juliana Costa', valor: 350.0, status: 'Em andamento' },
  { id: 7, cliente: 'Ricardo Almeida', valor: 500.0, status: 'Rota de entrega' },
  { id: 8, cliente: 'Fernanda Martins', valor: 250.0, status: 'Entregue' },
  { id: 9, cliente: 'Lucas Pereira', valor: 600.0, status: 'Pendente' },
  { id: 10, cliente: 'Patrícia Santos', valor: 450.0, status: 'Em andamento' },
  { id: 11, cliente: 'Rodrigo Fernandes', valor: 700.0, status: 'Rota de entrega' },
  { id: 12, cliente: 'Sofia Rocha', valor: 100.0, status: 'Entregue' },
  { id: 13, cliente: 'André Barbosa', valor: 80.0, status: 'Pendente' },
  { id: 14, cliente: 'Beatriz Silva', valor: 220.0, status: 'Em andamento' },
  { id: 15, cliente: 'Marcos Oliveira', valor: 550.0, status: 'Rota de entrega' },
  { id: 16, cliente: 'Cláudia Mendes', valor: 350.0, status: 'Entregue' },
  { id: 17, cliente: 'Fernando Costa', valor: 450.0, status: 'Pendente' },
  { id: 18, cliente: 'Isabela Torres', valor: 370.0, status: 'Em andamento' },
  { id: 19, cliente: 'Ricardo Santana', valor: 290.0, status: 'Rota de entrega' },
  { id: 20, cliente: 'Mônica Alves', valor: 330.0, status: 'Entregue' },
];

const PedidoItem = ({ pedido }) => {
  const statusColors = {
    Pendente: 'yellow.300',
    'Em andamento': 'blue.300',
    'Rota de entrega': 'orange.300',
    Entregue: 'green.300',
  };

  return (
    <Box
      borderBottomWidth={1}
      borderColor="gray.300"
      py={2}
      px={4}
      mb={2}
      bg={statusColors[pedido.status] || 'gray.100'}
      borderRadius="md"
    >
      <Text fontWeight="bold" fontSize="md">
        Cliente: {pedido.cliente}
      </Text>
      <Text>Valor: R$ {pedido.valor.toFixed(2)}</Text>
      <Text>Status: {pedido.status}</Text>
    </Box>
  );
};

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

          {/* Botão Limpar Filtro */}
          {statusFiltro && (
            <Button
              size="sm"
              variant="outline"
              onPress={() => setStatusFiltro('')}
              colorScheme="purple"
              mb={4}
            >
              Limpar Filtro
            </Button>
          )}

          {/* Lista de Pedidos com Barra de Rolagem */}
          <Box maxHeight="400" overflowY="auto" mb={4}>
            <FlatList
              data={pedidosFiltrados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <PedidoItem pedido={item} />}
              ListEmptyComponent={
                <Text textAlign="center" color="gray.800" mt={4}>
                  Nenhum pedido encontrado para{' '}
                  <Text fontWeight="bold">{statusFiltro || 'Todos'}</Text>.
                </Text>
              }
            />
          </Box>

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
