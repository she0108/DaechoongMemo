import { useState } from 'react';
import {Container, BackButton, BackIcon, PromptText, ErrorText, PinInput} from './PINScreenStyles';


const PINScreen1 = ({ navigation, route }) => {
  const [text, setText] = useState();
  const [error, setError] = useState(false);
  const PIN = route.params.pin;

  const onChangeText = (event) => {
    console.log('event=', event, ' PIN=', PIN);
    setText(event);
    if (event.length == 4) {
      if (event == PIN) navigation.replace('PINScreen2');
      else {
        setError(true);
        setText('');
      }
    }
  };

  return (
    <Container>
      <BackButton onPress={() => navigation.pop()}>
        <BackIcon name="arrowleft"/>
      </BackButton>
      <PromptText>기존 비밀번호를 입력하세요</PromptText>
      <ErrorText error={error}>틀렸습니다</ErrorText>
      <PinInput 
        maxLength={4} 
        keyboardType="number-pad"
        secureTextEntry={true}
        autoFocus={true}
        value={text}
        onChangeText={onChangeText}/>
    </Container>
  );
};

export default PINScreen1;
