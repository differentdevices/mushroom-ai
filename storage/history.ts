import { HistoryItem, MushroomType } from '@/types/mushroom-schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export async function getHistory() {
  const data = await AsyncStorage.getItem('mushroom-history');
  return data ? JSON.parse(data) : [];
}

export const addHistoryItem = async (photoUri: string, mushroom: MushroomType) => {
  const history = await getHistory();

  const newItem: HistoryItem = {
    id: uuid.v4() as string,
    createdAt: Date.now(),
    photoUri,
    mushroom,
  };

  const updated = [newItem, ...history];
  await AsyncStorage.setItem('mushroom-history', JSON.stringify(updated));

  return newItem;
};

export const deleteHistoryItem = async (id: string) => {
  const history = await getHistory();
  const updated = history.filter((item: HistoryItem) => item.id !== id);
  await AsyncStorage.setItem('mushroom-history', JSON.stringify(updated));
};

export const getHistoryItemById = async (id: string) => {
  const history = await getHistory();
  return history.find((item: HistoryItem) => item.id === id);;
};