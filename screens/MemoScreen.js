import {
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EvilIcons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
      <OptionContainer>
            <OptionButton onPress={() => setPinned(!pinned)}>
              <PinIcon name={pinned ? "pin" : "pin-outline"}/>
            </OptionButton>
            <Line/>
            <OptionButton onPress={() => setLocked(!locked)}>
              <LockIcon name={locked ? "lock" : "unlock-alt"}/>
            </OptionButton>
            <Line/>
            <OptionButton onPress={() => deleteMemo()}>
              <DeleteIcon name="trash"/>
            </OptionButton>
          </OptionContainer>
        <StatusBar/>
        <HeaderBar>
          <BackButton onPress={() => navigation.pop()}>
            <BackIcon name="arrowleft"/>
          </BackButton>
        </HeaderBar>
        <ScrollView>
          <DateText>{date.toLocaleDateString()}</DateText>
          <TitleText
            multiline={true}
            scrollEnabled={false}
            returnKeyType="done"
            blurOnSubmit={true}
            placeholder="제목"
            value={title}
            onChangeText={onChangeTitle}/>
          <ContentText
            multiline={true}
            scrollEnabled={false}
            placeholder="내용"
            value={content}
            onChangeText={onChangeContent}/>
        </ScrollView>  
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
  position: relative;
`;

const HeaderBar = styled.View`
  height: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
  flexDirection: row;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity``;

const BackIcon = styled(AntDesign)`
  font-size: 25px;
  color: ${color.black};
`;

const OptionContainer = styled.View`
  padding: 2px;
  border-radius: 10px;
  background-color: ${color.lightgrey};
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  top: 55px;
  right: 15px;
`;

const OptionButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PinIcon = styled(MaterialCommunityIcons)`
  font-size: 23px;
  color: ${color.gray500};
`;

const LockIcon = styled(FontAwesome)`
  font-size: 20px;
  color: ${color.gray500};
  margin-top: 1px;
`;

const DeleteIcon = styled(FontAwesome5)`
  font-size: 17px;
  color: ${color.gray500};
`;

const Line = styled.View`
  width: 1px;
  height: 90%;
  background-color: ${color.gray200};
`;

const DateText = styled.Text`
  font-size: 15px;
  color: ${color.darkgrey};
  margin-top: 0px;
  text-align: left;

`;

const TitleText = styled.TextInput`
  font-size: 28px;
  font-weight: 600;
  color: ${color.black};
  margin-top: 5px;
`;

const ContentText = styled.TextInput`
  font-size: 20px;
  color: ${color.black};
  margin-top: 8px;
`;

export default MemoScreen;
