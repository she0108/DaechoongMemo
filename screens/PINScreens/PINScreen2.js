import {Container, BackButton, BackIcon, PromptText, ErrorText, PinInput} from './PINScreenStyles';


const PINScreen2 = ({ navigation }) => {
  const onChangeText = (event) => {
    if (event.length == 4) {
      navigation.replace('PINScreen3', { pin: event });
    }
  };

  return (
    <Container>
      <BackButton onPress={() => navigation.pop()}>
        <BackIcon name="arrowleft"/>
      </BackButton>
      <PromptText>새로운 비밀번호를 입력하세요</PromptText>
      <ErrorText error={false}/>
      <PinInput 
        maxLength={4} 
        keyboardType="number-pad"
        secureTextEntry={true}
        autoFocus={true}
        onChangeText={onChangeText}/>
    </Container>
  );
};

export default PINScreen2;
