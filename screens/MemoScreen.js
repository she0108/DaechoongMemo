import { useState, useEffect } from 'react';
import { StatusBar, TouchableWithoutFeedback, ScrollView, Keyboard, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

/* light/dark 변경 시 Title, Content 텍스트 색상 안 바뀜 */

const MemoScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const key = route.params.memoKey;
  const memoList = route.params.memoList;
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);
  const [locked, setLocked] = useState(false);

  const onChangeTitle = (event) => setTitle(event);
  const onChangeContent = (event) => setContent(event);

  useEffect(() => loadMemo(), []);

  const loadMemo = () => {
    setTitle(memoList[key].title);
    setDate(new Date(key));   //Non-serializable values were found in the navigation state
    setContent(memoList[key].content);
    setPinned(memoList[key].pinned);
    setLocked(memoList[key].locked);
  };

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
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container style={{backgroundColor: colors.white}}>
        <OptionContainer style={{backgroundColor: colors.gray50}}>
          <OptionButton onPress={() => setPinned(!pinned)}>
            <PinIcon name={pinned ? "pin" : "pin-outline"} style={{color: colors.gray500}}/>
          </OptionButton>
          <Line style={{backgroundColor: colors.gray200}}/>
          <OptionButton onPress={() => setLocked(!locked)}>
            <LockIcon name={locked ? "lock" : "unlock-alt"} style={{color: colors.gray500}}/>
          </OptionButton>
          <Line style={{backgroundColor: colors.gray200}}/>
          <OptionButton onPress={() => deleteMemo()}>
            <DeleteIcon name="trash" style={{color: colors.gray500}}/>
          </OptionButton>
        </OptionContainer>
        <StatusBar/>
        <HeaderBar>
          <BackButton onPress={() => navigation.pop()}>
            <BackIcon name="arrowleft" style={{color: colors.black}}/>
          </BackButton>
        </HeaderBar>
        <ScrollView>
          <DateText style={{color: colors.gray500}}>{date.toLocaleDateString()}</DateText>
          <TitleText
            multiline={true}
            scrollEnabled={false}
            returnKeyType="done"
            blurOnSubmit={true}
            placeholder="제목"
            placeholderTextColor={colors.gray200}
            value={title}
            onChangeText={onChangeTitle}
            style={{color: colors.black}}/>
          <ContentText
            multiline={true}
            scrollEnabled={false}
            placeholder="내용"
            placeholderTextColor={colors.gray200}
            value={content}
            onChangeText={onChangeContent}
            style={{color: colors.black}}/>
        </ScrollView>  
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
`;

const OptionContainer = styled.View`
  padding: 2px;
  border-radius: 10px;
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
`;

const LockIcon = styled(FontAwesome)`
  font-size: 20px;
  margin-top: 1px;
`;

const DeleteIcon = styled(FontAwesome5)`
  font-size: 17px;
`;

const Line = styled.View`
  width: 1px;
  height: 90%;
`;

const DateText = styled.Text`
  font-size: 15px;
  margin-top: 0px;
  text-align: left;
`;

const TitleText = styled.TextInput`
  font-size: 28px;
  font-weight: 600;
  margin-top: 5px;
`;

const ContentText = styled.TextInput`
  font-size: 20px;
  margin-top: 8px;
`;

export default MemoScreen;