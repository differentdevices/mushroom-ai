import { File } from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Image, Pressable, Text, View } from 'react-native';

export default function ResultScreen() {
  const { photoUri } = useLocalSearchParams();
  const [ mushroomName, setMushroomName ] = useState<string | null>(null);
  const [ mushroomType, setMushroomType ] = useState<string | null>(null);
  const router = useRouter();

  const callOpenAI = async () => {
    try {
      const file = new File(photoUri as string);
      const base64Image = await file.base64();

      // Get file extension and determine MIME type
      const extension = file.extension.toLowerCase();
      const mimeTypes: { [key: string]: string } = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
      };
      const mimeType = mimeTypes[extension] || 'image/jpeg';

      // Create data URI with proper prefix
      const dataUri = `data:${mimeType};base64,${base64Image}`;

      const response = await fetch('/(api)/(openai)/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: dataUri }),
      });

      const mushroom = await response.json();
      console.log('Client side OpenAI Response:', mushroom);

      setMushroomType(mushroom.type || 'Unknown');
      setMushroomName(mushroom.name || 'Unknown');
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-4">Your Photo:</Text>
      <Image
        source={{ uri: photoUri as string }}
        className="w-80 h-80 rounded-xl"
        resizeMode="cover"
      />
      
      <Pressable
        className="bg-blue-600 p-4 rounded-xl"
        onPress={callOpenAI}
      >
        <Text className="text-white text-lg">Call OpenAI</Text>
      </Pressable>

      <Text className="text-black text-lg">Name: {mushroomName}</Text>
      <Text className="text-black text-lg">Type: {mushroomType}</Text>

      <Button title="Back" onPress={() => router.push('/')} />
    </View>
  );
}

