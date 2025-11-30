import { getHistoryItemById } from '@/storage/history';
import { HistoryItem } from '@/types/mushroom-schema';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';

export default function ResultScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [historyItem, setHistoryItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryItem = async () => {
      if (id) {
        const item = await getHistoryItemById(id as string);
        setHistoryItem(item);
      }
      setLoading(false);
    };

    fetchHistoryItem();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!historyItem) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text>History item not found</Text>
        <Button title="Back" onPress={() => router.replace('/')} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-4">Your Photo:</Text>
      <Image
        source={{ uri: historyItem.photoUri }}
        className="w-80 h-80 rounded-xl"
        resizeMode="cover"
      />

      <Text className="text-black text-lg">{JSON.stringify(historyItem.mushroom)}</Text>

      <Button title="Back" onPress={() => router.replace('/')} />
    </View>
  );
}

