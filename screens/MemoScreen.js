import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Alert,
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
  const memoList = route.params.memoList;
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => loadMemo(), []);

  const loadMemo = () => {
    setTitle(memoList[key].title);
    setDate(new Date(key));   //Non-serializable values were found in the navigation state
    setContent(memoList[key].content);
    setPinned(memoList[key].pinned);
    setLocked(memoList[key].locked);
  };

  const onChangeTitle = (event) => setTitle(event);
  const onChangeContent = (event) => setContent(event);

  useEffect(() => {
    const newDate = new Date();
    setDate(newDate);
    saveChange();
  }, [title, content, pinned, locked]);

  const saveChange = () => {
    const newList = { ...memoList };
    newList[key] = {};
    newList[key].date = date;
    newList[key].title = title;
    newList[key].content = content;
    newList[key].pinned = pinned;
    newList[key].locked = locked;
    saveMemoList(newList);
  };

  const saveMemoList = async (toSave) => {
    await AsyncStorage.setItem('@memoList', JSON.stringify(toSave));
  };

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

  const deleteMemo = () => {
    Alert.alert('이 메모를 삭제하시겠습니까?', undefined, [
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          const newList = { ...memoList };
          delete newList[key];
          saveMemoList(newList);
          navigation.pop();
        },
      },
      { text: '취소' },
    ]);
  }

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
            <TouchableOpacity onPress={() => deleteMemo()}>
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