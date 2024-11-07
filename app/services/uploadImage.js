import cloudinary from './cloudinaryConfig.js';

// Upload image to Cloudinary
export const uploadImage = async (dataUrl, folder) => {
    try {
        const result = await cloudinary.uploader.upload(dataUrl, { folder }); // Upload image
        return result.secure_url; // Return image URL
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error); // Log error
        throw new Error('Failed to upload image'); // Throw error
    }
};

// Delete image from Cloudinary
export const deleteImage = async (imageUrl) => {
    const publicId = /([^\/]+)\.[a-z]+$/.exec(imageUrl)?.[1]; // Extract public ID

    if (publicId) {
        await cloudinary.uploader.destroy(publicId); // Delete image
    }
};
