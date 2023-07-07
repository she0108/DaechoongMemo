import { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { auth, database } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { color } from '../color';


const MenuScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [lastBackup, setLastBackup] = useState("-");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {setUser(auth.currentUser);}, []);

  useEffect(() => {
    if (user) {
      get(ref(database, `users/${user.uid}/last-backup`))
      .then((snapshot)=> {
      if (snapshot.exists()) {
        if (snapshot.val() == 0) {
          console.log("백업 기록이 존재하지 않습니다.");
          setLastBackup("기록 없음");
        } else {
          const date = new Date(snapshot.val());
          setLastBackup(date.toLocaleString());
        }
      } else {
        console.log("snapshot data doesn't exist");
      }})
      .catch((error) => {
        setLastBackup("백업 기록 불러오기 실패");
      })
    }
  }, [user]);

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

  const handleBackup = () => {
    if (!user) {
      Alert.alert('로그인 필요', "로그아웃 상태에서는 백업이 불가능합니다", [
        { text: '확인' },
      ]);
    } else {
      // 1. 로컬에 저장된 memoList를 database에 업로드
      const uploadMemoList = async () => {
        const s = await AsyncStorage.getItem('@memoList');
        if (s != null) {
          set(ref(database, 'backup-data/' + user.uid), JSON.parse(s));
        } else {
          set(ref(database, 'backup-data/' + user.uid), {});
        }
      };
      uploadMemoList();
      // 2. 마지막 백업 시각 업데이트
      const newDate = new Date();
      setLastBackup(newDate.toLocaleString());
      set(ref(database, `users/${user.uid}/last-backup`), newDate.getTime());
    }
  }

  const handleChangePin = async () => {
    const PIN = await AsyncStorage.getItem('@PIN');
    if (PIN == null) navigation.navigate('PINScreen2');
    else navigation.navigate('PINScreen1', { pin: PIN });
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
            <MenuTextSub c={color.gray500} numberOfLines={1} ellipsizeMode="tail">{user ? user.email : "-"}</MenuTextSub>
            <MenuTextTouchable onPress={user ? handleLogout : handleLogin}>
              <MenuTextSub c={user ? color.red : color.blue}>{user ? "로그아웃" : "로그인"}</MenuTextSub>
            </MenuTextTouchable>
          </MenuLine>
          {/* <MenuLine>
            <MenuTextMain>이메일 변경</MenuTextMain>
            <MenuTextTouchable>
              <MenuTextSub c={color.gray500}>{">"}</MenuTextSub>
            </MenuTextTouchable>
          </MenuLine>
          <MenuLine>
            <MenuTextMain>비밀번호 재설정</MenuTextMain>
            <MenuTextTouchable>
              <MenuTextSub c={color.gray500}>{">"}</MenuTextSub>
            </MenuTextTouchable>
          </MenuLine> */}
          <MenuLine>
            <MenuTextMain>백업</MenuTextMain>
            <MenuTextTouchable onPress={handleBackup}>
              {user && <Ionicons name="cloud-upload-outline" size={21} color={color.gray500} style={{marginRight: 8}}/>}
              <MenuTextSub c={color.gray500}>{user ? lastBackup : "로그인 필요"}</MenuTextSub>
            </MenuTextTouchable>
          </MenuLine>
        </MenuBox>
      </MenuSection>
      <MenuSection>
        <MenuName>설정</MenuName>
        <MenuBox>
          <MenuLine>
            <MenuTextMain>테마</MenuTextMain>
            <MenuTextTouchable>
              <MenuTextSub c={color.gray500}>밝게</MenuTextSub>
            </MenuTextTouchable>
          </MenuLine>
          <MenuLine>
            <MenuTextMain>글꼴</MenuTextMain>
            <MenuTextTouchable>
              <MenuTextSub c={color.gray500}>기본</MenuTextSub>
            </MenuTextTouchable>
          </MenuLine>
          <MenuLine>
            <MenuTextMain>메모 잠금</MenuTextMain>
            <MenuTextTouchable onPress={handleChangePin}>
              <MenuTextSub c={color.blue}>PIN 설정 →</MenuTextSub>
            </MenuTextTouchable>
          </MenuLine>
        </MenuBox>
      </MenuSection>
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
  background-color: ${color.gray50};
  border-radius: 7%;
  padding: 10px;
`;

const MenuLine = styled.View`
  margin-vertical: 10px;
  margin-horizontal: 5px;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
`;

const MenuTextMain = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-right: 10px;
  color: ${color.black};
`;

const MenuTextSub = styled.Text`
  flex-shrink: 1;
  font-size: 18px;
  color: ${props => props.c};
`;

const MenuTextTouchable = styled.TouchableOpacity`
  flex-grow: 1;
  flex-direction: row;
  justify-content: flex-end;
`

export default MenuScreen;