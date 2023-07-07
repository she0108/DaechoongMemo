import { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { auth, database } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { color } from '../color';


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState('');

  const onChangeEmail = (event) => setEmail(event);
  const onChangePassword = (event) => setPassword(event);
  const onChangePassword2 = (event) => setPassword2(event);

  const signup = () => {
    confirmPassword();
  };

  const confirmPassword = () => {
    if (password === password2) {
      createAccount();
    } else {
      setPassword2("");
      Alert.alert("비밀번호가 일치하지 않습니다", undefined, [
        {text: '확인'}
      ]);
    }
  };

  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, `users/${user.uid}/last-backup`), 0);
    })
    .then(() => {
      Alert.alert("회원가입 완료", undefined, [
        {
          text: '확인',
          onPress: navigation.pop()
        }
      ]);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      alertErrorMessage(errorCode);
      // ..
    });
  };

  const alertErrorMessage = (errorCode) => {
    let errorMessage = "";
    let subMessage = undefined;
    switch(errorCode) {
      case 'auth/invalid-email':
        errorMessage = "유효하지 않은 이메일입니다";
        break;
      case 'auth/email-already-in-use':
        errorMessage = "이미 가입된 이메일입니다";
        break;
      case 'auth/weak-password':
        errorMessage = "비밀번호는 8자리 이상의 영문, 숫자, 기호로 이루어져야 합니다";
        break;
      default: 
        errorMessage = errorCode;
    }
    Alert.alert(errorMessage, subMessage, [
      {text: '확인'}
    ]);
  };


  return (
    <Container>
      <HeaderBar>
        <BackButton onPress={() => navigation.pop()}>
          <BackIcon name="arrowleft"/>
        </BackButton>
      </HeaderBar>
      <HeaderText>회원가입</HeaderText>
      <LoginInput
        autoFocus={true}
        autoComplete="email"
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="done"
        placeholder="이메일"
        value={email}
        onChangeText={onChangeEmail}/>
      <LoginInput
        secureTextEntry={true}
        autoCapitalize="none"
        returnKeyType="done"
        placeholder="비밀번호"
        value={password}
        onChangeText={onChangePassword}/>
      <LoginInput
        secureTextEntry={true}
        autoCapitalize="none"
        returnKeyType="done"
        placeholder="비밀번호 확인"
        value={password2}
        onChangeText={onChangePassword2}/>
      <SignupButton 
        title="계정 생성하기" 
        onPress={signup} 
        disabled={!email || !password || !password2}/>
    </Container>
  );
};


//styled
const Container = styled.View`
  height: 100%;
  padding-top: 47px;
  padding-bottom: 34px; 
  padding-horizontal: 15px;
  background-color: ${color.white};
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
  color: ${color.black};
`;

const HeaderText = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const LoginInput = styled.TextInput`
  font-size: 16px;
  width: 80%;
  border-radius: 5px;
  background-color: ${color.lightgrey};
  padding: 12px;
  margin-bottom: 25px;
`;

const SignupButton = styled.Button`
    width: 80%;
    border-radius: 7%;
`;

export default SignupScreen;