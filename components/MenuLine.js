import styled from 'styled-components/native';

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
    <Container onPress={nav[text]}>
      <MenuIcon name={icon}/>
      <MenuText>{text}</MenuText>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-vertical: 20px;
`;

const MenuIcon = styled(EvilIcons)`
  font-size: 28px;
  color: ${color.black};
  margin-left: 5px;
`;

const MenuText = styled.Text`
  font-size: 18px;
  margin-left: 8px;
`;

export default MenuLine;
