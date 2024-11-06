import cloudinary from './cloudinaryConfig.js';

export const uploadImage = async (dataUrl) => {
    try {

      const result = await cloudinary.uploader.upload(dataUrl);

      return result.secure_url;
      
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
};

export const deleteImage = async (imageUrl) => {
  const publicId = /([^\/]+)\.[a-z]+$/.exec(imageUrl)?.[1];

  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};