import { useState } from 'react';
import { Alert } from 'react-native';
import {Container, BackButton, BackIcon, PromptText, ErrorText, PinInput} from './PINScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PINScreen3 = ({ navigation, route }) => {
  const [text, setText] = useState();
  const [error, setError] = useState(route.params.error);
  const PIN = route.params.pin;

  const savePIN = async (pin) => {
    await AsyncStorage.setItem('@PIN', pin);
  };

  const onChangeText = (event) => {
    setText(event);
    if (event.length == 4) {
      if (event == PIN) {
        savePIN(PIN);
        Alert.alert('비밀번호 설정이 완료됐습니다', undefined, [
          {
            text: '확인',
            onPress: () => {
              navigation.pop();
            },
          },
        ]);
      } else {
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
      <PromptText>새로운 비밀번호를 한번 더 입력하세요</PromptText>
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

export default PINScreen3;
