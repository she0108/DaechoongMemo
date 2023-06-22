import { Alert } from 'react-native';
import styled from 'styled-components/native';

import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { color } from '../color';

const STORAGE_KEY = '@memoList';

const MemoContainer = ({ k, memoList, setMemoList }) => {
  const navigation = useNavigation();

  const setPinned = (key) => {
    const newList = { ...memoList };
    newList[key].pinned = !newList[key].pinned;
    setMemoList(newList);
    saveMemoList(newList);
  };

  const saveMemoList = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const deleteMemo = async (key) => {
    Alert.alert('이 메모를 삭제하시겠습니까?', undefined, [
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          const newList = { ...memoList };
          delete newList[key];
          setMemoList(newList);
          saveMemoList(newList);
        },
      },
      { text: '취소' },
    ]);
  };

  const checkLocked = async () => {
    if (memoList[k].locked) {
      const PIN = await AsyncStorage.getItem('@PIN');
      if (PIN == null) {
        Alert.alert('설정된 비밀번호가 없습니다', undefined, [
          {
            text: '지금 설정',
            onPress: () => navigation.navigate('PINScreen2'),
          },
          { text: '다음에' },
        ]);
      } else {
        navigation.navigate('PINScreen4', { memoKey: k, memoList: memoList });
      }
    } else {
      navigation.navigate('MemoScreen', { memoKey: k, memoList: memoList });
    }
  }

  return (
    <Container
      onPress={() => checkLocked()}
      onLongPress={() => deleteMemo(k)}>
      <Title numberOfLines={1}>{memoList[k].title}</Title>
      <Content numberOfLines={3}>{memoList[k].locked ? null : memoList[k].content}</Content>
      <PinContainer onPress={() => setPinned(k)}>
        <PinIcon name="push-pin" pinned={memoList[k].pinned}/>
      </PinContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${color.lightgrey};
  border-radius: 7px;
  margin-bottom: 10px;
  padding: 12px;
`;

const Title = styled.Text`
  color: ${color.black};
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 4px;
  margin-right: 20px;
`;

const Content = styled.Text`
  color: ${color.darkgrey};
  font-size: 15px;
`;

const PinContainer = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 8px;
`;

const PinIcon = styled(MaterialIcons)`
  font-size: 22px;
  transform: rotate(15deg);
  color: ${props => props.pinned ? color.darkgrey : color.grey};
`;

export default MemoContainer;
