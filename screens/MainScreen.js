import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';
import MemoContainer from '../components/MemoContainer';
import { color } from '../color';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainScreen = ({ navigation }) => {
  const [memoList, setMemoList] = useState({});
  const [textSearch, setTextSearch] = useState('');
  const onChangeText = (event) => setTextSearch(event);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadMemoList = async () => {
      const s = await AsyncStorage.getItem('@memoList');
      if (s != null) setMemoList(JSON.parse(s));
    };
    loadMemoList();
  }, [isFocused]);

  const saveMemoList = async (toSave) => {
    await AsyncStorage.setItem('@memoList', JSON.stringify(toSave));
  };

  //title & content 둘 다 비어있는 메모는 삭제
  const trimMemoList = () => {
    if (isFocused) {
      const newList = { ...memoList };
      const blankKeys = Object.keys(memoList).filter(
        (key) => isBlank(memoList[key].title) && isBlank(memoList[key].content)
      );
      blankKeys.forEach((key) => delete newList[key]);
      setMemoList(newList);
    }
  };

  //useEffect(() => trimMemoList(), [isFocused, memoList]);

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
          <FloatingButtonIcon name="pencil"/>
        </FloatingButton>
      </Container>
    </TouchableWithoutFeedback>
  );
};

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
  font-weight: 600;
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
  border-color: ${color.grey};
  border-radius: 50%;
  margin-bottom: 13px;
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled(EvilIcons)`
  font-size: 30px;
  color: ${color.grey};
  margin-left: 3px;
  margin-right: 1px;
`;

const SearchInput = styled.TextInput`
  color: ${color.black};
  flex-grow: 1;
  font-size: 20px;
`;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  bottom: 40px;
  width: 80px;
  height: 80px;
  background-color: ${color.black};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

const FloatingButtonIcon = styled(EvilIcons)`
  font-size: 50px;
  color: ${color.white};
  top: -2.4px;
  left: 2px;
`;

export default MainScreen;
