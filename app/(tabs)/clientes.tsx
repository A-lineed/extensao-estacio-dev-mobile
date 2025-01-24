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
  useToast,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { Masks } from 'react-native-mask-input';
import AppLayout from '../../components/AppLayout';
import { useNavigation } from '@react-navigation/native'; // Importando a navegação

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
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    cep: '',
    nomeEmpresa: '',
    endereco: '',
  });
  const [editando, setEditando] = useState(null);
  const toast = useToast();
  const navigation = useNavigation(); // Hook para navegação

  const salvarCliente = () => {
    const { nome, email, telefone, cnpj, cep, nomeEmpresa, endereco } = formData;

    // Resetando os erros
    setErrors({
      nome: nome ? '' : 'Nome é obrigatório.',
      email: email ? '' : 'Email é obrigatório.',
      telefone: telefone ? '' : 'Telefone é obrigatório.',
      cnpj: cnpj ? '' : 'CNPJ é obrigatório.',
      cep: cep ? '' : 'CEP é obrigatório.',
      nomeEmpresa: nomeEmpresa ? '' : 'Nome da Empresa é obrigatório.',
      endereco: endereco ? '' : 'Endereço é obrigatório.',
    });

    // Verificar se todos os campos estão preenchidos
    if (!nome || !email || !telefone || !cnpj || !cep || !nomeEmpresa || !endereco) {
      toast.show({
        title: 'Por favor, preencha todos os campos obrigatórios.',
        status: 'warning',
      });
      return;
    }

    // Se estiver editando, atualizar o cliente
    if (editando) {
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === editando.id ? { ...cliente, ...formData } : cliente
        )
      );
      setEditando(null);
    } else {
      // Se for novo cliente, adicionar
      const novoCliente = {
        id: Date.now().toString(),
        ...formData,
        dataCadastro: new Date().toLocaleString(),
      };
      setClientes([...clientes, novoCliente]);
    }

    // Limpar o formulário
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
      <VStack space={10} alignItems="center" flex={1} mt={5} px={4}>
        {/* Botão de Voltar para Home */}
        <HStack justifyContent="flex-start" width="100%" px={4} mt={4}>
          <Button
            onPress={() => navigation.navigate('home')} // Navega para a tela "Home"
            colorScheme="blue"
            width="30%"
            variant="ghost"
            leftIcon={<Ionicons name="arrow-back" size={24} color="blue" />}
          >
            Voltar
          </Button>
        </HStack>

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
              <Text fontSize="sm" color="gray.600" fontWeight="bold">Nome</Text>
              <Input
                placeholder="Nome"
                value={formData.nome}
                onChangeText={(value) => setFormData({ ...formData, nome: value })}
                isInvalid={errors.nome !== ''}
                errorMessage={errors.nome}
                style={styles.input}
                placeholderTextColor="#a0a0a0"
              />
              <Text fontSize="sm" color="gray.600" fontWeight="bold">Email</Text>
              <Input
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => setFormData({ ...formData, email: value })}
                keyboardType="email-address"
                isInvalid={errors.email !== ''}
                errorMessage={errors.email}
                style={styles.input}
                placeholderTextColor="#a0a0a0"
              />
              <Text fontSize="sm" color="gray.600" fontWeight="bold">Telefone</Text>
              <MaskInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#a0a0a0"
                value={formData.telefone}
                onChangeText={(masked, unmasked) => {
                  if (unmasked.length <= 11) {
                    setFormData({ ...formData, telefone: masked });
                  }
                }}
                mask={Masks.BRL_PHONE}
                isInvalid={errors.telefone !== ''}
                errorMessage={errors.telefone}
              />
              <Text fontSize="sm" color="gray.600" fontWeight="bold">CNPJ</Text>
              <MaskInput
                style={styles.input}
                placeholder="CNPJ"
                placeholderTextColor="#a0a0a0"
                value={formData.cnpj}
                onChangeText={(masked, unmasked) => {
                  if (unmasked.length <= 14) {
                    setFormData({ ...formData, cnpj: masked });
                  }
                }}
                mask={Masks.BRL_CNPJ}
                isInvalid={errors.cnpj !== ''}
                errorMessage={errors.cnpj}
              />
              <Text fontSize="sm" color="gray.600" fontWeight="bold">CEP</Text>
              <MaskInput
                style={styles.input}
                placeholder="CEP"
                placeholderTextColor="#a0a0a0"
                value={formData.cep}
                onChangeText={(masked, unmasked) => {
                  if (unmasked.length <= 8) {
                    setFormData({ ...formData, cep: masked });
                  }
                }}
                mask={Masks.ZIP_CODE}
                isInvalid={errors.cep !== ''}
                errorMessage={errors.cep}
              />
              <Text fontSize="sm" color="gray.600" fontWeight="bold">Nome da Empresa</Text>
              <Input
                placeholder="Nome da Empresa"
                value={formData.nomeEmpresa}
                onChangeText={(value) => setFormData({ ...formData, nomeEmpresa: value })}
                isInvalid={errors.nomeEmpresa !== ''}
                errorMessage={errors.nomeEmpresa}
                style={styles.input}
                placeholderTextColor="#a0a0a0"
              />
              <Text fontSize="sm" color="gray.600" fontWeight="bold">Endereço</Text>
              <Input
                placeholder="Endereço"
                value={formData.endereco}
                onChangeText={(value) => setFormData({ ...formData, endereco: value })}
                isInvalid={errors.endereco !== ''}
                errorMessage={errors.endereco}
                style={styles.input}
                placeholderTextColor="#a0a0a0"
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={salvarCliente} colorScheme="purple">
              {editando ? 'Salvar Alterações' : 'Adicionar Cliente'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </AppLayout>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 48,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
};
