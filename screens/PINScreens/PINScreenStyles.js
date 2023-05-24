import { StyleSheet } from 'react-native';
import { color } from '../../color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: color.white,
    flexDirection: 'column',
    paddingTop: 50,
  },
  promptPIN: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 25,
    color: color.black,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
  },
  inputPIN: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 40,
    color: color.black,
  },
});
