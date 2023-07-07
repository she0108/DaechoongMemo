import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../../color';

//styled
const Container = styled.View`
  height: 100%;
  padding-top: 47px;
  padding-bottom: 34px; 
  padding-horizontal: 15px;
  background-color: ${color.white};
`;

const BackButton = styled.TouchableOpacity`
  margin-vertical: 50px;
`;

const BackIcon = styled(AntDesign)`
  font-size: 25px;
  color: ${color.black};
`;

const PromptText = styled.Text`
  font-size: 25px;
  color: ${color.black};
  text-align: center;
  margin-top: 0px;
`;

const ErrorText = styled.Text`
  font-size: 20px;
  color: ${props => props.error ? color.red : color.white};
  text-align: center;
  margin-top: 15px;
`;

const PinInput = styled.TextInput`
  font-size: 40px;
  color: ${color.black};
  text-align: center;
  margin-top: 30px;
`;

export {Container, BackButton, BackIcon, PromptText, ErrorText, PinInput};