import HistoryItemCard from '@/components/ui/history-item-card';
import { getHistory } from '@/storage/history';
import { HistoryItem } from '@/types/mushroom-schema';
import { Ionicons } from '@expo/vector-icons';
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

  return (
    <View className="flex-1 items-center justify-center">

      {/* History */}
      <ScrollView className="w-full p-4">
        <Text className="text-xl font-bold mb-4 mt-4">Recently Added</Text>
        {history.length === 0 ? (
          <Text className="text-gray-500 text-center">No history yet</Text>
        ) : (
          history.map((item) => <HistoryItemCard key={item.id} item={item} />)
        )}
      </ScrollView>

      {/* Open Camera Button */}
      <View className="flex-row pb-8 pr-8 justify-end w-full">
        <Pressable
          className="bg-blue-600 p-4 rounded-full"
          onPress={() => router.push('/camera')}
        >
          <Ionicons name="camera-outline" size={40} color="white" />
        </Pressable>
      </View>
    </View>
  );
}