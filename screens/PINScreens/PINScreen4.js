import { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container, BackButton, BackIcon, PromptText, ErrorText, PinInput} from './PINScreenStyles';


const PINScreen4 = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [PIN, setPIN] = useState();
  const [text, setText] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPIN = async () => {
      try {
        const pin = await AsyncStorage.getItem('@PIN');
        setPIN(pin);
      } catch (error) {
        console.error('Failed to load PIN:', error);
      }
    };
    loadPIN();
  }, []);

  const onChangeText = (event) => {
    console.log('event=', event, ' PIN=', PIN);
    setText(event);
    if (event.length == 4) {
      if (event == PIN) {
        navigation.replace('MemoScreen', { memoKey: route.params.memoKey, memoList: route.params.memoList });
      } else {
        setError(true);
        setText('');
      }
    }
  };


  return (
    <Container  style={{backgroundColor: colors.white}}>
      <BackButton onPress={() => navigation.pop()}>
        <BackIcon name="arrowleft" style={{color: colors.black}}/>
      </BackButton>
      <PromptText style={{color: colors.black}}>비밀번호를 입력하세요</PromptText>
      <ErrorText style={{color: error ? colors.red : colors.white}}>틀렸습니다</ErrorText>
      <PinInput 
        maxLength={4} 
        keyboardType="number-pad"
        secureTextEntry={true}
        autoFocus={true}
        value={text}
        onChangeText={onChangeText}
        style={{color: colors.black}}/>
    </Container>
  );
};

export default PINScreen4;