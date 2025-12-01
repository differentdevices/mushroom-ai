import { persistImage } from '@/utils/image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

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
      <Pressable
        className="bg-blue-600 p-4 rounded-xl"
        onPress={() => router.push('/camera')}
      >
        <Text className="text-white text-lg">Open Camera</Text>
      </Pressable>

      <Pressable
        className="bg-blue-600 p-4 rounded-xl"
        onPress={pickImage}
      >
        <Text className="text-white text-lg">Pick from gallery</Text>
      </Pressable>
    </View>
  );
}