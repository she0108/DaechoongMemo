import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import MenuLine from '../components/MenuLine';
import { color } from '../color';


const MenuScreen = ({ navigation }) => {
  //메뉴 - 계정, 테마(default/light/dark), 폰트, 언어, 백업, locked 비밀번호 설정, 날짜 표기

  return (
    <Container>
      <StatusBar/>
      <HeaderBar>
        <BackButton onPress={() => navigation.pop()}>
          <BackIcon name="arrowleft"/>
        </BackButton>
      </HeaderBar>
      <MenuLine icon="user" text="계정" />
      <Line/>
      <MenuLine icon="archive" text="백업" />
      <Line/>
      <MenuLine icon="lock" text="비밀번호" />
      <Line/>
      <MenuLine icon="gear" text="설정" />
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
  padding-top: 47px;
  padding-bottom: 34px; 
  padding-horizontal: 15px;
  background-color: ${color.white};
`;

const HeaderBar = styled.View`
  height: 40px;
  margin-top: 30px;
  margin-bottom: 20px;
  flexDirection: row;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity``;

const BackIcon = styled(AntDesign)`
  font-size: 25px;
  color: ${color.black};
`;

const Line = styled.View`
  border-top-width: 1px;
  border-top-color: ${color.lightgrey};
`;

export default MenuScreen;
