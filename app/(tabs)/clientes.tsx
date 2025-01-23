import React, { useState } from 'react';
import {
  Button,
  Text,
  FlatList,
  VStack,
  Box,
  Center,
  Heading,
  IconButton,
  Icon,
  Modal,
  Input,
  HStack,
  Image,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { Masks } from 'react-native-mask-input';
import AppLayout from '../../components/AppLayout';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    cep: '',
    nomeEmpresa: '',
    endereco: '',
  });
  const [editando, setEditando] = useState(null);

  const salvarCliente = () => {
    const { nome, email, telefone, cnpj, cep, nomeEmpresa, endereco } = formData;
    if (nome.trim() && email.trim() && telefone.trim()) {
      if (editando) {
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === editando.id ? { ...cliente, ...formData } : cliente
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
        cep: '',
        nomeEmpresa: '',
        endereco: '',
      });
      setShowModal(false);
    }
  };

  const excluirCliente = (id) => {
    setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));
  };

  const editarCliente = (cliente) => {
    setEditando(cliente);
    setFormData(cliente);
    setShowModal(true);
  };

  return (
    <AppLayout title="Clientes">
      <VStack space={5} alignItems="center" flex={1} mt={5} px={4}>
        <Center mt={-10}>
          <Image
            source={require('../../assets/images/logo.jpeg')}
            alt="Logo"
            size="lg"
            resizeMode="contain"
          />
        </Center>

        <Heading color="purple.500" size="lg" mt={5} mb={5}>
          Administração de Clientes
        </Heading>

        <Button onPress={() => setShowModal(true)} colorScheme="purple" width="50%" mb={5}>
          Adicionar Cliente
        </Button>

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
              bg="#E6E6FA"
              width="100%"
            >
              <Text fontWeight="bold">Nome: {item.nome}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Telefone: {item.telefone}</Text>
              <Text>CNPJ: {item.cnpj}</Text>
              <Text>CEP: {item.cep}</Text>
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
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  padding: 12,
                  fontSize: 16,
                  height: 48,
                }}
                placeholderTextColor="#a0a0a0"
              />
              <Input
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => setFormData({ ...formData, email: value })}
                keyboardType="email-address"
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  padding: 12,
                  fontSize: 16,
                  height: 48,
                }}
                placeholderTextColor="#a0a0a0"
              />
              <MaskInput
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  padding: 12,
                  fontSize: 16,
                  height: 48,
                }}
                placeholder="Telefone"
                placeholderTextColor="#a0a0a0"
                value={formData.telefone}
                onChangeText={(masked, unmasked) => {
                  if (unmasked.length <= 11) {
                    setFormData({ ...formData, telefone: masked });
                  }
                }}
                mask={Masks.BRL_PHONE}
              />
              <MaskInput
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  padding: 12,
                  fontSize: 16,
                  height: 48,
                }}
                placeholder="CNPJ"
                placeholderTextColor="#a0a0a0"
                value={formData.cnpj}
                onChangeText={(masked, unmasked) => {
                  if (unmasked.length <= 14) {
                    setFormData({ ...formData, cnpj: masked });
                  }
                }}
                mask={Masks.BRL_CNPJ}
              />
              <MaskInput
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  padding: 12,
                  fontSize: 16,
                  height: 48,
                }}
                placeholder="CEP"
                placeholderTextColor="#a0a0a0"
                value={formData.cep}
                onChangeText={(masked, unmasked) => {
                  if (unmasked.length <= 8) {
                    setFormData({ ...formData, cep: masked });
                  }
                }}
                mask={Masks.ZIP_CODE}
              />
              <Input
                placeholder="Nome da Empresa"
                value={formData.nomeEmpresa}
                onChangeText={(value) => setFormData({ ...formData, nomeEmpresa: value })}
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  padding: 12,
                  fontSize: 16,
                  height: 48,
                }}
                placeholderTextColor="#a0a0a0"
              />
              <Input
                placeholder="Endereço"
                value={formData.endereco}
                onChangeText={(value) => setFormData({ ...formData, endereco: value })}
                style={{
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  borderRadius: 5,
                  padding: 12,
                  fontSize: 16,
                  height: 48,
                }}
                placeholderTextColor="#a0a0a0"
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
