import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-xl"
        onPress={() => router.push('/camera')}
      >
        <Text className="text-white text-lg">Open Camera</Text>
      </TouchableOpacity>
    </View>
  );
}