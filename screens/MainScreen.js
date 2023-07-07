import { useState, useEffect } from 'react';
import { StatusBar, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { color } from '../color';
import MemoContainer from '../components/MemoContainer';


const MainScreen = ({ navigation, route }) => {
  const [memoList, setMemoList] = useState({});
  const [textSearch, setTextSearch] = useState('');
  const onChangeText = (event) => setTextSearch(event);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (route.params && route.params.newMemoList) {
        setMemoList(route.params.newMemoList);
        Alert.alert(undefined, "다운로드 완료", [
          { 
            text: '확인',
            onPress: () => navigation.navigate("MainScreen")
          },
        ]);
      } else {
        const loadMemoList = async () => {
          const s = await AsyncStorage.getItem('@memoList');
          if (s != null) setMemoList(JSON.parse(s));
        };
        loadMemoList();
      }
    }
  }, [isFocused]);

  const createMemo = () => {
    const key = Date.now();
    const newList = { ...memoList };
    newList[key] = {
      date: new Date(),
      title: '',
      content: '',
      pinned: false,
      locked: false,
    };
    navigation.navigate('MemoScreen', { memoKey: key, memoList: newList });
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <StatusBar/>
        <Header>
          <HeaderText>대충메모</HeaderText>
          <MenuButton onPress={() => navigation.navigate('MenuScreen')}>
            <MenuIcon name="navicon"/>
          </MenuButton>
        </Header>
        <SearchContainer>
          <SearchIcon name="search"/>
          <SearchInput 
            returnKeyType="search"
            onChangeText={onChangeText}
            value={textSearch}
            placeholder="메모 검색"
            placeholderTextColor={color.gray200}
            clearButtonMode="while-editing"/>
        </SearchContainer>
        <ScrollView>
          {Object.keys(memoList)
             .filter((key) => memoList[key].pinned)
             .filter((key) => memoList[key].title.includes(textSearch))
             .map((key) => (
               <MemoContainer
                 key={key}
                 k={key}
                 memoList={memoList}
                 setMemoList={setMemoList}
               />
             ))}
           {Object.keys(memoList)
             .filter((key) => memoList[key].pinned)
             .filter(
               (key) =>
                 !memoList[key].title.includes(textSearch) &&
                 memoList[key].content.includes(textSearch)
             )
             .map((key) => (
               <MemoContainer
                 key={key}
                 k={key}
                 memoList={memoList}
                 setMemoList={setMemoList}
               />
             ))}
           {Object.keys(memoList)
             .filter((key) => !memoList[key].pinned)
             .filter((key) => memoList[key].title.includes(textSearch))
             .map((key) => (
               <MemoContainer
                 key={key}
                 k={key}
                 memoList={memoList}
                 setMemoList={setMemoList}
               />
             ))}
           {Object.keys(memoList)
             .filter((key) => !memoList[key].pinned)
             .filter(
               (key) =>
                 !memoList[key].title.includes(textSearch) &&
                 memoList[key].content.includes(textSearch)
             )
             .map((key) => (
               <MemoContainer
                 key={key}
                 k={key}
                 memoList={memoList}
                 setMemoList={setMemoList}
               />
             ))}
        </ScrollView>
        <FloatingButton onPress={createMemo}>
          <FloatingButtonIcon name="pen"/>
        </FloatingButton>
      </Container>
    </TouchableWithoutFeedback>
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

const Header = styled.View`
  height: 40px;
  margin-top: 30px;
  margin-bottom: 10px;
  flexDirection: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 30px;
  font-weight: 900;
  color: ${color.black};
`;

const MenuButton = styled.TouchableOpacity``;

const MenuIcon = styled(EvilIcons)`
  font-size: 35px;
  color: ${color.black};
`;

const SearchContainer = styled.View`
  height: 40px;
  border-width: 2px;
  border-color: ${color.gray100};
  border-radius: 50%;
  margin-bottom: 13px;
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled(Feather)`
  font-size: 20px;
  color: ${color.gray200};
  margin-left: 8px;
  margin-right: 5px;
`;

const SearchInput = styled.TextInput`
  color: ${color.black};
  flex-grow: 1;
  font-size: 18px;
`;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  bottom: 40px;
  width: 80px;
  height: 80px;
  background-color: ${color.gray900};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

const FloatingButtonIcon = styled(FontAwesome5)`
  font-size: 25px;
  color: ${color.white};
  top: -1px;
  left: 1px;
`;

export default MainScreen;