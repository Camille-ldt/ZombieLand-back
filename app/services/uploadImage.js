import cloudinary from './cloudinaryConfig.js';

export const uploadImage = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            use_filename: true,
            unique_filename: false,
          });
          return result.secure_url;
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
          throw new Error('Failed to upload image');
    }
};