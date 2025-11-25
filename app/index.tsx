import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Picked:", result.assets[0].uri);
      router.push({
        pathname: '/result',
        params: {
          photoUri: encodeURIComponent(result.assets[0].uri),
        }
      });
    }
  };

  const callOpenAI = async () => {
    try {
      const response = await fetch('/(api)/(openai)/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      console.log('OpenAI Response:', data);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
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

      <Pressable
        className="bg-blue-600 p-4 rounded-xl"
        onPress={callOpenAI}
      >
        <Text className="text-white text-lg">Call OpenAI</Text>
      </Pressable>
    </View>
  );
}