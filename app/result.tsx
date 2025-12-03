import { deleteHistoryItem, getHistoryItemById } from '@/storage/history';
import { HistoryItem } from '@/types/mushroom-schema';
import { File } from 'expo-file-system';
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

  function deleteHistoryItemHandler() {
    // Delete the image file from disk
    if (historyItem) {
      try {
        const photoFile = new File(historyItem.photoUri);
        photoFile.delete();
      } catch (error) {
        console.warn('Failed to delete image file:', error);
      }
    }

    // Delete the history item from storage
    if (id) {
      deleteHistoryItem(id as string).then(() => {
        router.replace('/');
      });
    }
  }

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

      <Button title="Delete" onPress={deleteHistoryItemHandler} />
      <Button title="Back" onPress={() => router.replace('/')} />
    </View>
  );
}

