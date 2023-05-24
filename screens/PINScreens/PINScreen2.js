import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { styles } from './PINScreenStyles';
import { color } from '../../color';

const PINScreen2 = ({ navigation }) => {
  const onChangeText = (event) => {
    if (event.length == 4) {
      navigation.replace('PINScreen3', { pin: event });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionBar}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign name="arrowleft" size={25} color={color.black} />
        </TouchableOpacity>
      </View>
      <Text style={styles.promptPIN}>새로운 비밀번호를 입력하세요</Text>
      <Text
        style={{
          ...styles.errorMessage,
          color: color.white,
        }}>
        틀렸습니다
      </Text>
      <TextInput
        style={styles.inputPIN}
        maxLength={4}
        keyboardType="number-pad"
        secureTextEntry={true}
        autoFocus={true}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default PINScreen2;
