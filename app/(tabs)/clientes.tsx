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
  Spinner,  // Importando Spinner do NativeBase
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { Masks } from 'react-native-mask-input';
import * as ImagePicker from 'expo-image-picker';
import AppLayout from '../../components/AppLayout';
import { useNavigation } from '@react-navigation/native';

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
    imagem: null,
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
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(null);
  const toast = useToast();
  const navigation = useNavigation();

  const salvarCliente = () => {
    const { nome, email, telefone, cnpj, cep, nomeEmpresa, endereco } = formData;

    setErrors({
      nome: nome ? '' : 'Nome é obrigatório.',
      email: email ? '' : 'Email é obrigatório.',
      telefone: telefone ? '' : 'Telefone é obrigatório.',
      cnpj: cnpj ? '' : 'CNPJ é obrigatório.',
      cep: cep ? '' : 'CEP é obrigatório.',
      nomeEmpresa: nomeEmpresa ? '' : 'Nome da Empresa é obrigatório.',
      endereco: endereco ? '' : 'Endereço é obrigatório.',
    });

    if (!nome || !email || !telefone || !cnpj || !cep || !nomeEmpresa || !endereco) {
      toast.show({
        title: 'Por favor, preencha todos os campos obrigatórios.',
        status: 'warning',
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
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
        imagem: null,
      });

      setShowModal(false);
      setLoading(false);
    }, 1000);
  };

  const excluirCliente = (id) => {
    setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));
  };

  const editarCliente = (cliente) => {
    setEditando(cliente);
    setFormData(cliente);
    setShowModal(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, imagem: result.assets[0].uri });
    }
  };

  return (
    <AppLayout title="Clientes">
      <VStack space={10} alignItems="center" flex={1} mt={-4} px={4}>
        <HStack justifyContent="flex-start" width="100%" px={4} mt={4}>
          <Button
            onPress={() => navigation.navigate('home')}
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
            width={150} // Defina a largura desejada
            height={150} // Defina a altura desejada
            resizeMode="contain"
          />
        </Center>

        <Heading color="purple.500" size="lg" mt={-2} mb={-5}>
          Administração de Clientes
        </Heading>

        <Button onPress={() => setShowModal(true)} colorScheme="purple" width="50%" mb={0}>
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
              {item.imagem && (
                <Image
                  source={{ uri: item.imagem }}
                  alt="Imagem do Cliente"
                  width={50}
                  height={50}
                  borderRadius="full"
                  mb={2}
                />
              )}
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
              <Button onPress={pickImage} colorScheme="blue" mt={2}>
                Selecionar Imagem
              </Button>
              {formData.imagem && (
                <Image
                  source={{ uri: formData.imagem }}
                  alt="Imagem Selecionada"
                  width={100}
                  height={100}
                  mt={2}
                />
              )}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Button onPress={salvarCliente} colorScheme="purple" mr={2}>
                  {editando ? 'Salvar Alterações' : 'Adicionar Cliente'}
                </Button>
                <Button variant="ghost" onPress={() => setShowModal(false)}>
                  Cancelar
                </Button>
              </>
            )}
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