import HistoryItemCard from '@/components/ui/history-item-card';
import { getHistory } from '@/storage/history';
import { HistoryItem } from '@/types/mushroom-schema';
import { persistImage } from '@/utils/image';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        const items = await getHistory();
        setHistory(items);
      };
      loadHistory();
    }, [])
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      console.log("Picked:", result.assets[0].uri);

      const copiedImageUri = await persistImage(result.assets[0].uri);
      // TODO resize image
      router.push({
        pathname: '/classify',
        params: {
          photoUri: encodeURIComponent(copiedImageUri as string),
        }
      });
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <ScrollView className="w-full p-4">
        <Text className="text-xl font-bold mb-4 mt-4">Recently Added</Text>
        {history.length === 0 ? (
          <Text className="text-gray-500 text-center">No history yet</Text>
        ) : (
          history.map((item) => <HistoryItemCard key={item.id} item={item} />)
        )}
      </ScrollView>

      <View className="flex-row gap-2 pb-4">
        <Pressable
          className="bg-blue-600 p-4 rounded-xl flex-1"
          onPress={() => router.push('/camera')}
        >
          <Text className="text-white text-lg text-center">Open Camera</Text>
        </Pressable>

        <Pressable
          className="bg-blue-600 p-4 rounded-xl flex-1"
          onPress={pickImage}
        >
          <Text className="text-white text-lg text-center">Pick from gallery</Text>
        </Pressable>
      </View>
    </View>
  );
}