import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Image, Text, View } from 'react-native';

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-4">Your Photo:</Text>
      <Image
        source={{ uri: photoUri }}
        className="w-80 h-80 rounded-xl"
        resizeMode="cover"
      />
      <Button title="Back" onPress={() => router.push('/')} />
    </View>
  );
}

