import { addHistoryItem } from '@/storage/history';
import { MushroomSchema } from '@/types/mushroom-schema';
import { File } from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

export default function ClassifyScreen() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;

    const classify = async () => {
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

        const res = await response.json();
        console.log('Client side OpenAI Response:', res);

        // Validate the response against MushroomSchema
        const validatedMushroom = MushroomSchema.parse(res);
        if (!isCancelled) {
          const historyItem = await addHistoryItem(photoUri as string, validatedMushroom);
          router.replace({
            pathname: '/result',
            params: {
              id: historyItem.id,
            },
          });
        }
      } catch (error) {
        console.error('Classification failed:', error);
        if (!isCancelled) {
          router.replace({
            pathname: '/result',
            params: {
              error: 'classification_failed'
            }
          });
        }
      }
    };

    classify();

    return () => {
      // prevent race condition on fast navigation
      isCancelled = true;
    };
  }, [photoUri]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Image
        source={{ uri: photoUri as string }}
        className="w-80 h-80 rounded-xl"
        resizeMode="cover"
      />

      <ActivityIndicator size="large" />
      <Text className="mt-4 text-gray-600">Analyzing your mushroom...</Text>
    </View>
  );;
}