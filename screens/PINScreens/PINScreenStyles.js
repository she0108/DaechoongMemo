import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../color';

//styled
const Container = styled.View`
  height: 100%;
  padding-top: 47px;
  padding-bottom: 34px; 
  padding-horizontal: 15px;
`;

const BackButton = styled.TouchableOpacity`
  margin-vertical: 50px;
`;

const BackIcon = styled(AntDesign)`
  font-size: 25px;
`;

const PromptText = styled.Text`
  font-size: 25px;
  text-align: center;
  margin-top: 0px;
`;

const ErrorText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-top: 15px;
`;

const PinInput = styled.TextInput`
  font-size: 40px;
  text-align: center;
  margin-top: 30px;
`;

export {Container, BackButton, BackIcon, PromptText, ErrorText, PinInput};