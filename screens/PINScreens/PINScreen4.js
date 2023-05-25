import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './PINScreenStyles';
import { color } from '../../color';

const PINScreen4 = ({ navigation, route }) => {
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
