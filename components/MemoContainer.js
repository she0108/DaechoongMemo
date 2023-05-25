import { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

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
    <TouchableOpacity
      onPress={() => checkLocked()}
      onLongPress={() => deleteMemo(k)}>
      <View style={styles.memoItemContainer}>
        <Text style={styles.memoItemTitle}>
          {memoList[k].title}
          {memoList[k].locked ? (
            <View>
              <View style={styles.spaceBetween} />
              <FontAwesome
                name="lock"
                size={20}
                color={color.darkgrey}
                style={styles.iconLocked}
              />
            </View>
          ) : null}
        </Text>
        <Text style={styles.memoItemContent}>
          {memoList[k].locked ? null : memoList[k].content}
        </Text>
        <TouchableOpacity
          onPress={() => setPinned(k)}
          style={styles.pinContainer}>
          <MaterialIcons
            name="push-pin"
            size={22}
            style={
              memoList[k].pinned
                ? styles.iconPinnedTrue
                : styles.iconPinnedFalse
            }
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  memoItemContainer: {
    backgroundColor: color.lightgrey,
    borderRadius: 7,
    marginBottom: 10,
    padding: 10,
  },
  memoItemTitle: {
    color: color.black,
    fontSize: 20,
    marginBottom: 2,
  },
  spaceBetween: {
    backgroundColor: color.black,
    width: 1,
  },
  iconLocked: {
    paddingLeft: 10,
  },
  memoItemContent: {
    color: color.darkgrey,
    fontSize: 15,
  },
  pinContainer: {
    position: 'absolute',
    top: 8,
    right: 5,
  },
  iconPinnedTrue: {
    color: color.darkgrey,
    transform: [{ rotate: '15deg' }],
  },
  iconPinnedFalse: {
    color: color.grey,
    transform: [{ rotate: '15deg' }],
  },
});

export default MemoContainer;
