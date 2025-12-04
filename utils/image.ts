import { File, Paths } from 'expo-file-system';

export const persistImage = async (originalUri: string) => {
  if (!originalUri) {
    console.error('Original URI is missing.');
    return null;
  }

  // Extract the file extension
  const extensionMatch = originalUri.match(/\.([0-9a-z]+)(?=[?#]|$)/i);
  const extension = extensionMatch ? `.${extensionMatch[1]}` : '.jpg'; // Default to .jpg

  // img_20251201_224554.jpg
  const date = new Date();
  const dateString = date.toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '').replace(/-/g, '').substring(0, 15);

  const newFileName = `img_${dateString}${extension}`;

  try {
    const originalFile = new File(originalUri);

    const copiedFile = new File(Paths.document, newFileName);
    originalFile.copy(copiedFile)
    
    console.log(`[INFO] Successfully copied and renamed to: ${copiedFile.uri}`);
    return copiedFile.uri;
  } catch (error) {
    console.error('[ERROR] Failed to copy and rename file:', error);
    return null;
  }
};