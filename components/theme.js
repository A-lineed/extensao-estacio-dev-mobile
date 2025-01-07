import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      500: '#6B46C1', // Roxo (para botões)
    },
    secondary: {
      500: '#3182CE', // Azul (para textos gerais)
      600: '#2B6CB0', // Azul mais escuro (para efeito de pressionado no botão)
    },
  },
  components: {
    Button: {
      baseStyle: {
        _text: {
          color: 'white', // Texto do botão será sempre branco
        },
        _pressed: {
          bg: 'primary.500', // Cor do botão ao ser pressionado (roxo)
        },
      },
      defaultProps: {
        bg: 'primary.500', // Cor de fundo do botão (roxo)
      },
    },
    Heading: {
      baseStyle: {
        color: 'secondary.500', // Cor dos textos do Heading será azul
        fontWeight: 'bold', // Títulos em negrito
      },
    },
    Text: {
      baseStyle: {
 
