import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
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
    console.log('memoList(before) - ', memoList);
    const key = Date.now();
    const newList = { ...memoList };
    newList[key] = {
      date: new Date(),
      title: '',
      content: '',
      pinned: false,
      locked: false,
    };
    saveMemoList(newList);
    console.log('newList - ', newList);
    navigation.navigate('MemoScreen', { memoKey: key });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="auto"></StatusBar>
        <View style={styles.header}>
          <Text style={styles.headerText}>대충메모</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
            <EvilIcons name="navicon" size={35} color={color.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <EvilIcons
            name="search"
            size={30}
            color={color.grey}
            style={styles.iconSearch}
          />
          <TextInput
            returnKeyType="search"
            onChangeText={onChangeText}
            value={textSearch}
            placeholder="메모 검색"
            clearButtonMode="while-editing"
            style={styles.inputSearch}
          />
        </View>
        <ScrollView>
          {Object.keys(memoList)
            .filter((key) => memoList[key].pinned)
            .filter((key) => memoList[key].title.includes(textSearch))
            .map((key) => (
              <MemoContainer
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
                k={key}
                memoList={memoList}
                setMemoList={setMemoList}
              />
            ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => createMemo()}>
          <EvilIcons
            name="pencil"
            size={50}
            color={color.white}
            style={styles.floatingBtnIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: 'Bold',
    fontSize: 30,
    color: color.black,
  },
  searchContainer: {
    height: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: color.grey,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSearch: {
    marginLeft: 3,
    marginRight: 1,
  },
  inputSearch: {
    color: color.black,
    flexGrow: 1,
    fontSize: 20,
    fontFamily: 'Regular'
  },
  floatingBtn: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 80,
    height: 80,
    backgroundColor: color.black,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBtnIcon: {
    color: color.white,
    top: -2.4,
    left: 2,
  },
});

export default MainScreen;
