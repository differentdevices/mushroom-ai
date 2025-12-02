import { HistoryItem } from '@/types/mushroom-schema';
import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

function HistoryItemCard({ item }: { item: HistoryItem }) {
  const router = useRouter();

  return (
    <Pressable
      key={item.id}
      onPress={() => router.push({
        pathname: '/result',
        params: { id: item.id }
      })}
      className="mb-4 bg-white rounded-lg overflow-hidden shadow"
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.photoUri }}
          className="w-24 h-24"
          resizeMode="cover"
        />
        <View className="flex-1 p-3 justify-between">
          <View>
            <Text className="font-semibold text-lg">
              {item.mushroom.name.common_name}
            </Text>
            <Text className="text-gray-600 text-sm">
              {item.mushroom.name.scientific_name}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <Text className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {Math.round(item.mushroom.confidence * 100)}%
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default HistoryItemCard;