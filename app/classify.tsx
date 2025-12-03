import { addHistoryItem } from '@/storage/history';
import { MushroomSchema } from '@/types/mushroom-schema';
import * as ImageManipulator from 'expo-image-manipulator';
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
        // Resize and compress image before sending to LLM
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          photoUri as string,
          [{ resize: { width: 1024 } }], // Max width 1024, preserve aspect ratio
          { format: ImageManipulator.SaveFormat.JPEG, compress: 0.7, base64: true } // Compress to 70% quality
        );

        // Prepare base64 URI format for LLM
        const mimeType = 'image/jpeg';
        const base64forLLM = `data:${mimeType};base64,${manipulatedImage.base64}`;

        const response = await fetch('/(api)/(openai)/classify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageData: base64forLLM }),
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