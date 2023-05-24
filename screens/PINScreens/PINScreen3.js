import { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './PINScreenStyles';
import { color } from '../../color';

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
    <View style={styles.container}>
      <View style={styles.optionBar}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign name="arrowleft" size={25} color={color.black} />
        </TouchableOpacity>
      </View>
      <Text style={styles.promptPIN}>새로운 비밀번호를 한번 더 입력하세요</Text>
      <Text
        style={{
          ...styles.errorMessage,
          color: error ? color.red : color.white,
        }}>
        틀렸습니다
      </Text>
      <TextInput
        style={styles.inputPIN}
        maxLength={4}
        keyboardType="number-pad"
        secureTextEntry={true}
        autoFocus={true}
        value={text}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default PINScreen3;
