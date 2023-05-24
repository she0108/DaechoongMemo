import { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { styles } from './PINScreenStyles';
import { color } from '../../color';

const PINScreen1 = ({ navigation, route }) => {
  const [text, setText] = useState();
  const [error, setError] = useState(false);
  const PIN = route.params.pin;

  const onChangeText = (event) => {
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
    <View style={styles.container}>
      <View style={styles.optionBar}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign name="arrowleft" size={25} color={color.black} />
        </TouchableOpacity>
      </View>
      <Text style={styles.promptPIN}>기존 비밀번호를 입력하세요</Text>
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

export default PINScreen1;
