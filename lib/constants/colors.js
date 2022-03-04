import { CRUST_MAXWELL_NETWORK, CRUST_NETWORK } from './networks';

export const colortheme = {
  [CRUST_MAXWELL_NETWORK.value]: {
    button: {
      primary: {
        main: '#FF8D00',
        text: '#FFFFFF',
      },
      secondary: {
        main: '#FFFFFF',
        text: '#000000',
      },
      tertiary: {
        main: '#2C2B32',
        text: '#FFFFFF',
      },
    },
    background: '#1A1B24',
    card: 'rgba(255, 255, 255, 0.06)',
    cardActive: '#4F4D59',
    modalBackground: '#333333',
    icon: {
      primary: '#FFFFFF',
      secondary: '#4F4D59',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      tertiary: '#4F4D59',
      quaternary: '#4F4D59',
      fifth: '#CCCCCC',
      sixth: '#999999',
    },
    border: '#35333E',
    modal: '#444444',
  },
  [CRUST_NETWORK.value]: {
    button: {
      primary: {
        main: '#FF8D00',
        text: '#FFFFFF',
      },
      secondary: {
        main: '#2C2B32',
        text: '#FFFFFF',
      },
      tertiary: {
        main: '#FFFFFF',
        text: '#000000',
      },
    },
    background: '#F6F6F6',
    card: '#FFFFFF',
    cardActive: '#EEEEEE',
    modalBackground: '#333333',
    icon: {
      primary: '#4F4D59',
      secondary: '#4F4D59',
    },
    text: {
      primary: '#191919',
      secondary: '#191919',
      tertiary: '#CCCCCC',
      quaternary: '#999999',
      fifth: '#999999',
      sixth: '#666666',
    },
    border: '#CCCCCC',
    modal: '#FFFFFF',
  },
};
