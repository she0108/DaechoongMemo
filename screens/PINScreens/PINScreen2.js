import { useTheme } from '@react-navigation/native';
import {Container, BackButton, BackIcon, PromptText, ErrorText, PinInput} from './PINScreenStyles';


const PINScreen2 = ({ navigation }) => {
  const { colors } = useTheme();

  const onChangeText = (event) => {
    if (event.length == 4) {
      navigation.replace('PINScreen3', { pin: event });
    }
  };

  
  return (
    <Container style={{backgroundColor: colors.white}}>
      <BackButton onPress={() => navigation.pop()}>
        <BackIcon name="arrowleft" style={{color: colors.black}}/>
      </BackButton>
      <PromptText style={{color: colors.black}}>새로운 비밀번호를 입력하세요</PromptText>
      <ErrorText style={{color: colors.white}}/>
      <PinInput 
        maxLength={4} 
        keyboardType="number-pad"
        secureTextEntry={true}
        autoFocus={true}
        onChangeText={onChangeText}
        style={{color: colors.black}}/>
    </Container>
  );
};

export default PINScreen2;