import React, { useState } from 'react';
import { Button, Text, FlatList, VStack, Box, Center, Heading, IconButton, Icon, Modal, Input, HStack, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import AppLayout from '../../components/AppLayout';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    nomeEmpresa: '',
    endereco: '',
  });
  const [editando, setEditando] = useState(null);

  // Função para salvar cliente
  const salvarCliente = () => {
    const { nome, email, telefone, cnpj, nomeEmpresa, endereco } = formData;
    if (nome.trim() && email.trim() && telefone.trim()) {
      if (editando) {
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === editando.id
              ? { ...cliente, ...formData }
              : cliente
          )
        );
        setEditando(null);
      } else {
        const novoCliente = {
          id: Date.now().toString(),
          ...formData,
          dataCadastro: new Date().toLocaleString(),
        };
        setClientes([...clientes, novoCliente]);
      }

      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cnpj: '',
        nomeEmpresa: '',
        endereco: '',
      });
      setShowModal(false);
    }
  };

  // Função para excluir cliente
  const excluirCliente = (id) => {
    setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));
  };

  // Função para editar cliente
  const editarCliente = (cliente) => {
    setEditando(cliente);
    setFormData(cliente);
    setShowModal(true);
  };

  return (
    <AppLayout title="Clientes">
      <VStack space={5} alignItems="center" flex={1} mt={5} px={4}>
        {/* Logo no topo */}
        <Center mt={-10}>
          <Image
            source={require('../../assets/images/logo.jpeg')}
            alt="Logo"
            size="lg"
            resizeMode="contain"
          />
        </Center>

        {/* Título */}
        <Heading color="primary.500" size="lg" mt={5} mb={5}>
          Administração de Clientes
        </Heading>

        {/* Botão para adicionar cliente */}
        <Button onPress={() => setShowModal(true)} width="50%" mb={5}>
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
              bg="#E6E6FA" // Cor roxa clarinha
              width="100%"
            >
              <Text fontWeight="bold">Nome: {item.nome}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>
              <Text>CNPJ: {item.cnpj}</Text>
              <Text>Nome da Empresa: {item.nomeEmpresa}</Text>
              <Text>Endereço: {item.endereco}</Text>
              <Text>Data de Cadastro: {item.dataCadastro}</Text>
              <HStack justifyContent="space-between" mt={2}>
                <IconButton
                  icon={<Icon as={Ionicons} name="create" size="sm" />}
                  onPress={() => editarCliente(item)}
                  colorScheme="blue"
                  borderRadius="full"
                />
                <IconButton
                  icon={<Icon as={Ionicons} name="trash" size="sm" />}
                  onPress={() => excluirCliente(item.id)}
                  colorScheme="red"
                  borderRadius="full"
                />
              </HStack>
            </Box>
          )}
          ListEmptyComponent={
            <Text color="gray.500" textAlign="center" mt={5}>
              Nenhum cliente cadastrado.
            </Text>
          }
        />
      </VStack>

      {/* Modal de cadastro */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{editando ? 'Editar Cliente' : 'Adicionar Cliente'}</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <Input
                placeholder="Nome"
                value={formData.nome}
                onChangeText={(value) => setFormData({ ...formData, nome: value })}
              />
              <Input
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => setFormData({ ...formData, email: value })}
                keyboardType="email-address"
              />
              <Input
                placeholder="Telefone"
                value={formData.telefone}
                onChangeText={(value) => setFormData({ ...formData, telefone: value })}
                keyboardType="phone-pad"
              />
              <Input
                placeholder="CNPJ"
                value={formData.cnpj}
                onChangeText={(value) => setFormData({ ...formData, cnpj: value })}
              />
              <Input
                placeholder="Nome da Empresa"
                value={formData.nomeEmpresa}
                onChangeText={(value) => setFormData({ ...formData, nomeEmpresa: value })}
              />
              <Input
                placeholder="Endereço"
                value={formData.endereco}
                onChangeText={(value) => setFormData({ ...formData, endereco: value })}
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={salvarCliente}>
              {editando ? 'Salvar Alterações' : 'Adicionar Cliente'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </AppLayout>
  );
}
