import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { color } from '../color';

const MenuLine = ({ icon, text }) => {
  const navigation = useNavigation();
  const nav = {
    계정: () => console.log('메뉴 - 계정'),
    백업: () => console.log('메뉴 - 백업'),
    비밀번호: async () => {
      const PIN = await AsyncStorage.getItem('@PIN');
      if (PIN == null) navigation.navigate('PINScreen2');
      else navigation.navigate('PINScreen1', { pin: PIN });
    },
    설정: () => console.log('메뉴 - 설정'),
  };

  return (
    <TouchableOpacity style={styles.menuLine} onPress={nav[text]}>
      <EvilIcons name={icon} size={32} style={styles.menuIcon} />
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  menuIcon: {
    color: color.black,
  },
  menuText: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default MenuLine;
