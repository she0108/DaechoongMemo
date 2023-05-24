import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import MenuLine from '../components/MenuLine';

import { color } from '../color';

const MenuScreen = ({ navigation }) => {
  //메뉴 - 계정, 테마(default/light/dark), 폰트, 언어, 백업, locked 비밀번호 설정, 날짜 표기

  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.headerText}>메뉴</Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <AntDesign name="right" size={27} color={'black'} />
        </TouchableOpacity>
      </View>
      <MenuLine icon="user" text="계정" />
      <MenuLine icon="archive" text="백업" />
      <MenuLine icon="lock" text="비밀번호" />
      <MenuLine icon="gear" text="설정" />
    </View>
  );
};

const styles = StyleSheet.create({
  //All
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: color.white,
    flexDirection: 'column',
  },
  header: {
    height: 50,
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 600,
    color: color.black,
  },
});

export default MenuScreen;
