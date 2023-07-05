import { StatusBar, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { color } from '../color';
import { auth } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from "firebase/auth";


const MenuScreen = ({ navigation }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("-");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      setEmail(user.email);
    } else {
      setLoggedIn(false);
      setEmail("-");
    }
  });
  

  const handleLogin = () => navigation.navigate("LoginScreen");

  const handleLogout = () => {
    Alert.alert('로그아웃', undefined, [
      {
        text: '확인',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);
          } catch (e) {
            console.error(e);
          }
        },
      },
      { text: '취소' },
    ]);
  }


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
        <MenuBox>
        <MenuLine>
          <MenuTextMain>이메일</MenuTextMain>
          <MenuTextSub c={color.darkgrey}>{email}</MenuTextSub>
          <MenuTextTouchable onPress={loggedIn ? handleLogout : handleLogin}>
            <MenuTextSub c={loggedIn ? color.red : color.blue}>{loggedIn ? "로그아웃" : "로그인"}</MenuTextSub>
          </MenuTextTouchable>
        </MenuLine>
        <MenuLine>
          <MenuTextMain>이메일 변경</MenuTextMain>
          <MenuTextTouchable>
            <MenuTextSub c={color.darkgrey}>{">"}</MenuTextSub>
          </MenuTextTouchable>
        </MenuLine>
        <MenuLine>
          <MenuTextMain>비밀번호 재설정</MenuTextMain>
          <MenuTextTouchable>
            <MenuTextSub c={color.darkgrey}>{">"}</MenuTextSub>
          </MenuTextTouchable>
        </MenuLine>
        <MenuLine>
          <MenuTextMain>백업</MenuTextMain>
          <MenuTextTouchable>
            <MenuTextSub c={color.darkgrey}>↔ 2023/06/22 19:12</MenuTextSub>
          </MenuTextTouchable>
        </MenuLine>
        </MenuBox>
      </MenuSection>

      <MenuSection>
        <MenuName>화면</MenuName>
        <MenuBox>
        <MenuLine>
          <MenuTextMain>테마</MenuTextMain>
          <MenuTextSub c={color.darkgrey}>밝게</MenuTextSub>
        </MenuLine>
        <MenuLine>
          <MenuTextMain>글꼴</MenuTextMain>
          <MenuTextSub c={color.darkgrey}>기본</MenuTextSub>
        </MenuLine>
        <MenuLine>
          <MenuTextMain>날짜 표기방식</MenuTextMain>
          <MenuTextSub c={color.darkgrey}>2023/06/22</MenuTextSub>
        </MenuLine>
        </MenuBox>
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
  margin-bottom: 25px;
`;

const MenuName = styled.Text`
  font-size: 28px;
  font-weight: 900;
  color: ${color.black};
  margin-bottom: 15px;
`;

const MenuBox = styled.View`
  background-color: ${color.lightgrey};
  border-radius: 7%;
  padding: 10px;
`;

const MenuLine = styled.View`
  margin-vertical: 10px;
  margin-left: 5px;
  flex-direction: row;
  align-items: center;
`;

const MenuTextMain = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-right: 10px;
`;

const MenuTextSub = styled.Text`
  font-size: 18px;
  color: ${props => props.c};
`;

const MenuTextTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
`

const Line = styled.View`
  border-top-width: 1px;
  border-top-color: ${color.lightgrey};
`;

export default MenuScreen;
