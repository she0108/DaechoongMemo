import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: '#ffffff',
    gray50: '#f4f4f4',
    gray100: '#e8e8e8',
    gray200: '#d1d1d1',
    gray300: '#bababa',
    gray400: '#a3a3a3',
    gray500: '#8c8c8c',
    gray600: '#757575',
    gray700: '#5e5e5e',
    gray800: '#474747',
    gray900: '#303030',
    gray1000: '#1a1a1a',
    black: '#000000',
    red: 'rgb(255, 59, 48)',
    blue: 'rgb(0, 122, 255)',
  },
};

const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    white: '#000000',
    gray50: '#1a1a1a',
    gray100: '#303030',
    gray200: '#474747',
    gray300: '#5e5e5e',
    gray400: '#757575',
    gray500: '#8c8c8c',
    gray600: '#a3a3a3',
    gray700: '#bababa',
    gray800: '#d1d1d1',
    gray900: '#e8e8e8',
    gray1000: '#f4f4f4',
    black: '#ffffff',
    red: 'rgb(255, 69, 58)',
    blue: 'rgb(10, 132, 255)',
  },
};

export { Light, Dark };