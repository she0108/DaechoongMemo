import { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { auth, database } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import MainTextButton from '../components/Login/MainTextButton';
import SubTextButton from '../components/Login/SubTextButton';


const LoginScreen = ({navigation}) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => setEmail(event);
  const onChangePassword = (event) => setPassword(event);
    
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 백업 데이터가 존재한다면 동기화 여부 묻기
      const user = userCredential.user;
      get(ref(database, `users/${user.uid}/last-backup`)).then((snapshot)=> {
        console.log(snapshot.exists(), snapshot.val());
        if (snapshot.exists() && snapshot.val() != 0) {
          Alert.alert("백업 기록 존재", "백업된 데이터를 다운로드하시겠습니까?", [
            {
              text: '예',
              style: 'destructive',
              onPress: async () => {
                await downloadData(user);
              },
            },
            { 
              text: '아니오',
              onPress: () => navigation.pop() 
            },
          ]);
        }})})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      //로그인 에러 핸들링 (사용자 없음 등)
    });
  }

  const downloadData = async (user) => {
    console.log("downloadData");
    get(ref(database, `backup-data/${user.uid}`))
    .then((snapshot)=> {
      if (snapshot.exists()) {
        navigation.navigate("MainScreen", { newMemoList: snapshot.val()});
      }
    })
  }


  return (
    <Container style={{backgroundColor: colors.white}}>
      <HeaderBar>
        <BackButton onPress={() => navigation.pop()}>
          <BackIcon name="arrowleft" style={{color: colors.black}}/>
        </BackButton>
      </HeaderBar>
      <HeaderText style={{color: colors.black}}>로그인</HeaderText>
      <LoginInput
        autoFocus={true}
        autoComplete="email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="done"
        placeholder="이메일"
        value={email}
        onChangeText={onChangeEmail}
        style={{backgroundColor: colors.gray50, color: colors.black}}/>
      <LoginInput
        secureTextEntry={true}
        autoCapitalize="none"
        returnKeyType="done"
        placeholder="비밀번호"
        value={password}
        onChangeText={onChangePassword}
        style={{backgroundColor: colors.gray50, color: colors.black}}/>
      <MainTextButton text="로그인" onPress={login}/>
      <SubButtonContainer>
        <SubTextButton text="회원가입하기" onPress={() => navigation.navigate("SignupScreen")} />
        <SubTextButton text="비밀번호 찾기" onPress={() => console.log("비밀번호 찾기")} />    
      </SubButtonContainer>
    </Container>
  )
}


//styled
const Container = styled.View`
  height: 100%;
  padding-top: 47px;
  padding-bottom: 34px; 
  padding-horizontal: 15px;
  align-items: center;
`;

const HeaderBar = styled.View`
  width: 100%;
  height: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  flexDirection: row;
  justify-content: flex-start;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity``;

const BackIcon = styled(AntDesign)`
  font-size: 25px;
`;

const HeaderText = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-top: 25px;
  margin-bottom: 40px;
`;

const LoginInput = styled.TextInput`
  font-size: 16px;
  width: 80%;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 25px;
`;

const SubButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default LoginScreen;