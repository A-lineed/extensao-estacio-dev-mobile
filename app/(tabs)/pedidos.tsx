import React, { useState } from 'react';
import { Button, Input, Text, FlatList, VStack, HStack, Box, Center, Heading, IconButton, Icon, Modal, Image, Select, FormControl, WarningOutlineIcon, Spinner } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'; // Importando o TextInputMask
import AppLayout from '../../components/AppLayout';
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [altura, setAltura] = useState('');
  const [cumprimento, setCumprimento] = useState('');
  const [editando, setEditando] = useState(null);
  const [filtroPrioridade, setFiltroPrioridade] = useState(''); // Estado para o filtro de prioridade
  const [loading, setLoading] = useState(false); // Estado para o carregamento
  const [errors, setErrors] = useState({}); // Estado para os erros

  const navigation = useNavigation(); // Hook para navegação

  const adicionarOuEditarPedido = () => {
    const valorTotalNumeric = parseFloat(valorTotal.replace('R$', '').replace(',', '.').trim());

    // Validação dos campos
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!quantidade.trim()) newErrors.quantidade = 'Quantidade é obrigatória';
    if (!prioridade.trim()) newErrors.prioridade = 'Prioridade é obrigatória';
    if (!dataEntrega.trim()) newErrors.dataEntrega = 'Data de entrega é obrigatória';
    if (!nomeCliente.trim()) newErrors.nomeCliente = 'Nome do cliente é obrigatório';
    if (isNaN(valorTotalNumeric)) newErrors.valorTotal = 'Valor total é obrigatório';
    if (!altura.trim()) newErrors.altura = 'Altura é obrigatória';
    if (!cumprimento.trim()) newErrors.cumprimento = 'Cumprimento é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const novoPedido = {
        id: editando ? editando.id : Date.now().toString(),
        nome,
        descricao,
        quantidade: parseInt(quantidade),
        prioridade,
        dataEntrega,
        nomeCliente,
        valorTotal: `R$ ${valorTotalNumeric.toFixed(2)}`,
        altura: parseFloat(altura),
        cumprimento: parseFloat(cumprimento),
        dataCriacao: new Date().toLocaleString(),
      };

      if (editando) {
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === editando.id ? novoPedido : pedido
          )
        );
        setEditando(null);
      } else {
        setPedidos([...pedidos, novoPedido]);
      }

      setNome('');
      setDescricao('');
      setQuantidade('');
      setPrioridade('');
      setDataEntrega('');
      setNomeCliente('');
      setValorTotal('');
      setAltura('');
      setCumprimento('');
      setShowModal(false);
      setLoading(false);
      setErrors({});
    }, 1000);
  };

  const excluirPedido = (id) => {
    setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
  };

  const editarPedido = (pedido) => {
    setEditando(pedido);
    setNome(pedido.nome);
    setDescricao(pedido.descricao);
    setQuantidade(pedido.quantidade.toString());
    setPrioridade(pedido.prioridade);
    setDataEntrega(pedido.dataEntrega);
    setNomeCliente(pedido.nomeCliente);
    setValorTotal(pedido.valorTotal.replace('R$ ', '').replace(',', '.'));
    setAltura(pedido.altura.toString());
    setCumprimento(pedido.cumprimento.toString());
    setShowModal(true);
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    height: 48,
    placeholderTextColor: "#a0a0a0",
  };

  // Filtra os pedidos com base na prioridade selecionada
  const pedidosFiltrados = pedidos.filter(pedido =>
    filtroPrioridade ? pedido.prioridade === filtroPrioridade : true
  );

  return (
    <AppLayout title="Cadastro de Pedidos">
      <VStack space={6} alignItems="center" flex={1} mt={-7} pb={0}>
        {/* Botão de Voltar para a tela Home */}
        <HStack justifyContent="flex-start" width="100%" px={4} mt={4}>
          <Button
            onPress={() => navigation.navigate('home')} // Navega para a tela Home
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

        <Heading color="purple.500" size="lg" mb={-3}>
          Cadastro de Pedidos
        </Heading>

        <VStack width="85%" mb={-5}>
          <Text fontSize="md" fontWeight="bold" mb={2}>
            Filtrar por Prioridade
          </Text>
          <Select
            selectedValue={filtroPrioridade}
            onValueChange={setFiltroPrioridade}
            placeholder="Selecione a Prioridade"
            style={inputStyle}
          >
            <Select.Item label="Todas" value="" />
            <Select.Item label="Alta" value="Alta" />
            <Select.Item label="Média" value="Média" />
            <Select.Item label="Baixa" value="Baixa" />
          </Select>
        </VStack>

        <Button
          onPress={() => setShowModal(true)}
          colorScheme="purple"
          width="40%"
        >
          Adicionar Pedido
        </Button>

        <FlatList
          data={pedidosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box
              borderWidth={1}
              borderRadius="md"
              p={3}
              m={2}
              borderColor="gray.300"
              width="100%" // Ajuste para garantir que os itens ocupem a largura total disponível
            >
              <Text fontWeight="bold">Nome: {item.nome}</Text>
              <Text>Descrição: {item.descricao}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
              <Text>Prioridade: {item.prioridade}</Text>
              <Text>Data de Entrega: {item.dataEntrega}</Text>
              <Text>Nome do Cliente: {item.nomeCliente}</Text>
              <Text>Valor Total: {item.valorTotal}</Text>
              <Text>Altura: {item.altura} m</Text>
              <Text>Cumprimento: {item.cumprimento} m</Text>
              <Text>Data de Criação: {item.dataCriacao}</Text>
              <HStack justifyContent="space-between" mt={2}>
                <IconButton
                  icon={<Icon as={Ionicons} name="create" size="sm" />}
                  onPress={() => editarPedido(item)}
                  colorScheme="blue"
                  borderRadius="full"
                />
                <IconButton
                  icon={<Icon as={Ionicons} name="trash" size="sm" />}
                  onPress={() => excluirPedido(item.id)}
                  colorScheme="red"
                  borderRadius="full"
                />
              </HStack>
            </Box>
          )}
          ListEmptyComponent={
            <Text color="gray.500" textAlign="center" mt={5}>
              Nenhum pedido cadastrado.
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }} // Adiciona padding no final da lista
        />
      </VStack>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{editando ? 'Editar Pedido' : 'Adicionar Pedido'}</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <FormControl isInvalid={'nome' in errors}>
                <FormControl.Label>Nome do Pedido</FormControl.Label>
                <Input
                  placeholder="Nome do Pedido"
                  value={nome}
                  onChangeText={setNome}
                  style={inputStyle}
                />
                {'nome' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.nome}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormControl.Label>Descrição do Pedido</FormControl.Label>
                <Input
                  placeholder="Descrição do Pedido"
                  value={descricao}
                  onChangeText={setDescricao}
                  style={inputStyle}
                />
              </FormControl>

              <FormControl isInvalid={'quantidade' in errors}>
                <FormControl.Label>Quantidade</FormControl.Label>
                <TextInputMask
                  placeholder="Quantidade"
                  value={quantidade}
                  onChangeText={setQuantidade}
                  keyboardType="numeric"
                  style={inputStyle}
                  type="only-numbers"
                />
                {'quantidade' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.quantidade}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={'prioridade' in errors}>
                <FormControl.Label>Prioridade</FormControl.Label>
                <Select
                  selectedValue={prioridade}
                  onValueChange={setPrioridade}
                  placeholder="Prioridade"
                  style={inputStyle}
                >
                  <Select.Item label="Alta" value="Alta" />
                  <Select.Item label="Média" value="Média" />
                  <Select.Item label="Baixa" value="Baixa" />
                </Select>
                {'prioridade' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.prioridade}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={'dataEntrega' in errors}>
                <FormControl.Label>Data de Entrega</FormControl.Label>
                <TextInputMask
                  placeholder="DD/MM/AAAA"
                  value={dataEntrega}
                  onChangeText={setDataEntrega}
                  style={inputStyle}
                  type="custom"
                  options={{ mask: '99/99/9999' }}
                />
                {'dataEntrega' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.dataEntrega}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={'nomeCliente' in errors}>
                <FormControl.Label>Nome do Cliente</FormControl.Label>
                <Input
                  placeholder="Nome do Cliente"
                  value={nomeCliente}
                  onChangeText={setNomeCliente}
                  style={inputStyle}
                />
                {'nomeCliente' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.nomeCliente}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={'valorTotal' in errors}>
                <FormControl.Label>Valor Total (R$)</FormControl.Label>
                <TextInputMask
                  placeholder="Valor Total (em R$)"
                  value={valorTotal}
                  onChangeText={setValorTotal}
                  keyboardType="numeric"
                  style={inputStyle}
                  type="money"
                />
                {'valorTotal' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.valorTotal}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={'altura' in errors}>
                <FormControl.Label>Altura (m)</FormControl.Label>
                <TextInputMask
                  placeholder="Altura (m)"
                  value={altura}
                  onChangeText={setAltura}
                  keyboardType="numeric"
                  style={inputStyle}
                  type="only-numbers"
                />
                {'altura' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.altura}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={'cumprimento' in errors}>
                <FormControl.Label>Cumprimento (m)</FormControl.Label>
                <TextInputMask
                  placeholder="Cumprimento (m)"
                  value={cumprimento}
                  onChangeText={setCumprimento}
                  keyboardType="numeric"
                  style={inputStyle}
                  type="only-numbers"
                />
                {'cumprimento' in errors && (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.cumprimento}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Button onPress={adicionarOuEditarPedido} colorScheme="purple" mr={2}>
                  {editando ? 'Salvar Alterações' : 'Adicionar Pedido'}
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