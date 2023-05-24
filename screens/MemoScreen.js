import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EvilIcons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { color } from '../color';

const MemoScreen = ({ navigation, route }) => {
  const key = route.params.memoKey;
  const [memoList, setMemoList] = useState({});
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const loadMemoList = async () => {
      const s = await AsyncStorage.getItem('@memoList');
      if (s != null) {
        console.log('s != null');
        setMemoList(JSON.parse(s));
      }
      console.log('s from storage - ', s);
      console.log('memoList(after) - ', memoList);
      console.log('JSON.parse(s) - ', JSON.parse(s));
      //s에는 잘 저장되는데
      //setMemoList() 해도 memoList에 저장이 안됨
      loadMemo(key);
    };
    loadMemoList();
  }, []);

  const loadMemo = (key) => {
    console.log('loadMemo() - memoList[key] - ', memoList[key]);
    //여기서도 memoList[key]는 undefined
    setTitle(memoList[key].title);
    setDate(memoList[key].date);
    setContent(memoList[key].content);
    setPinned(memoList[key].pinned);
    setLocked(memoList[key].locked);
  };

  const saveMemoList = async (toSave) => {
    await AsyncStorage.setItem('@memoList', JSON.stringify(toSave));
  };

  const onChangeTitle = (event) => setTitle(event);
  const onChangeContent = (event) => setContent(event);

  const saveChange = () => {
    const newList = { ...memoList };
    newList[key].date = new Date(); //newList[key]가 undefined?
    newList[key].title = title;
    newList[key].content = content;
    newList[key].pinned = pinned;
    newList[key].locked = locked;
    saveMemoList(newList);
  };

  //useEffect(() => saveChange(), [title, content, pinned, locked]);

  const goBack = () => {
    if (
      title != memoList[key].title ||
      content != memoList[key].content ||
      pinned != memoList[key].pinned ||
      locked != memoList[key].locked
    ) {
      saveChange();
    }
    navigation.pop();
  };

  //deleteMemo - MainScreenMemoScreen parameter callback함수로 수정
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="auto"></StatusBar>
        <View style={styles.optionBar}>
          <TouchableOpacity onPress={() => goBack()}>
            <AntDesign name="arrowleft" size={20} color={color.black} />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setPinned(!pinned)}>
              {pinned ? (
                <MaterialCommunityIcons
                  name="pin"
                  size={23}
                  color={color.black}
                />
              ) : (
                <MaterialCommunityIcons
                  name="pin-outline"
                  size={23}
                  color="black"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLocked(!locked)}>
              {locked ? (
                <EvilIcons name="lock" size={30} color={color.black} />
              ) : (
                <EvilIcons name="unlock" size={30} color={color.black} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteMemo(key)}>
              <EvilIcons name="trash" size={30} color={color.black} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <Text style={styles.memoDate}>{date.toLocaleDateString()}</Text>
          <TextInput
            style={styles.memoTitle}
            multiline={true}
            scrollEnabled={false}
            returnKeyType="done"
            blurOnSubmit={true}
            placeholder="제목"
            value={title}
            onChangeText={onChangeTitle}
          />
          <TextInput
            style={styles.memoContent}
            multiline={true}
            scrollEnabled={false}
            placeholder="내용"
            value={content}
            onChangeText={onChangeContent}
          />
        </ScrollView>
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
  optionBar: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    backgroundColor: color.lightgrey,
  },
  memoDate: {
    color: color.darkgrey,
    fontSize: 15,
    marginTop: 7,
  },
  memoTitle: {
    color: color.black,
    fontSize: 30,
    marginTop: 5,
  },
  memoContent: {
    color: color.black,
    fontSize: 20,
    marginTop: 10,
  },
});

export default MemoScreen;
