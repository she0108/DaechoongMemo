import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './PINScreenStyles';
import { color } from '../../color';

const PINScreen4 = ({ navigation, route }) => {
  let PIN;  //숫자 하나 입력할 때마다 PIN이 undefined로 초기화됨...
  const [text, setText] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPIN() {
      PIN = await AsyncStorage.getItem('@PIN');
    }
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
    <View style={styles.container}>
      <View style={styles.optionBar}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign name="arrowleft" size={25} color={color.black} />
        </TouchableOpacity>
      </View>
      <Text style={styles.promptPIN}>비밀번호를 입력하세요</Text>
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

export default PINScreen4;
