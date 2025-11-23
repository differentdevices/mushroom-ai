import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Image, View } from 'react-native';

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: photoUri }}
        style={{ flex: 1 }}
        resizeMode="cover"
      />

      <Button title="Back" onPress={() => router.push('/')} />
    </View>
  );
}

