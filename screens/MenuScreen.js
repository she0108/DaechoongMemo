import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../color';


const MenuScreen = ({ navigation }) => {
  //메뉴 - 계정, 테마(default/light/dark), 폰트, 언어, 백업, locked 비밀번호 설정, 날짜 표기
  
  //계정
  //  이메일 | - 로그인하기 / she1018@yonsei.ac.kr 로그아웃
  //  백업 | 마지막 백업 2023/06/21

  //화면
  //  테마 | default/light/dark
  //  글꼴 | 
  //  시간 표기방식 | 날짜/날짜+시간, 0000/00/00, 0000년00월00일

  return (
    <Container>
      <StatusBar/>
      <HeaderBar>
        <BackButton onPress={() => navigation.pop()}>
          <BackIcon name="arrowleft"/>
        </BackButton>
      </HeaderBar>
      <MenuSection>
        <MenuName>계정</MenuName>
        <MenuLine>
          <MenuTextFirst>이메일</MenuTextFirst>
          <MenuTextNext>-</MenuTextNext>
          <MenuTextLast c={color.blue}>로그인</MenuTextLast>
        </MenuLine>
        <MenuLine>
          <MenuTextFirst>이메일</MenuTextFirst>
          <MenuTextNext>she1018@yonsei.ac.kr</MenuTextNext>
          <MenuTextLast c={color.red}>로그아웃</MenuTextLast>
        </MenuLine>
        <MenuLine>
          <MenuTextFirst>백업</MenuTextFirst>
          <MenuTextLast c={color.darkgrey}>↔ 2023/06/22 19:12</MenuTextLast>
        </MenuLine>
      </MenuSection>
      <MenuSection>
        <MenuName>화면</MenuName>
        <MenuLine>
          <MenuTextFirst>테마</MenuTextFirst>
          <MenuTextLast c={color.darkgrey}>밝게</MenuTextLast>
        </MenuLine>
        <MenuLine>
          <MenuTextFirst>글꼴</MenuTextFirst>
          <MenuTextLast c={color.darkgrey}>기본</MenuTextLast>
        </MenuLine>
        <MenuLine>
          <MenuTextFirst>날짜 표기방식</MenuTextFirst>
          <MenuTextLast c={color.darkgrey}>2023/06/22</MenuTextLast>
        </MenuLine>
      </MenuSection>
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

const MenuSection = styled.View`
  padding: 5px;
  margin-bottom: 20px;
`;

const MenuName = styled.Text`
  font-size: 28px;
  font-weight: 900;
  color: ${color.black};
  margin-bottom: 10px;
`;

const MenuLine = styled.View`
  margin-vertical: 10px;
  margin-left: 5px;
  flex-direction: row;
  align-items: center;
`;

const MenuTextFirst = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-right: 10px;
`;

const MenuTextNext = styled.Text`
  font-size: 18px;
  color: ${color.darkgrey};
`;

const MenuTextLast = styled.Text`
  font-size: 18px;
  color: ${props => props.c};
  position: absolute;
  right: 5px;
`;

const Line = styled.View`
  border-top-width: 1px;
  border-top-color: ${color.lightgrey};
`;

export default MenuScreen;
