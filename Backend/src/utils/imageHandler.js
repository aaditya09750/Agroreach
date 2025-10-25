const fs = require('fs');
const path = require('path');

// Get image URL from filename
exports.getImageUrl = (filename) => {
  return `/uploads/${filename}`;
};

// Get full image path
exports.getImagePath = (filename) => {
  return path.join(__dirname, '../../uploads', filename);
};

// Delete image from local storage
exports.deleteImage = async (imageUrl) => {
  try {
    // Extract filename from URL (e.g., /uploads/filename.jpg -> filename.jpg)
    const filename = imageUrl.split('/').pop();
    const filePath = path.join(__dirname, '../../uploads', filename);
    
    // Check if file exists and delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Image deletion failed:', error);
    return false;
  }
};

// Get filename from URL
exports.getFilenameFromUrl = (imageUrl) => {
  return imageUrl.split('/').pop();
};

// Delete multiple images
exports.deleteMultipleImages = async (imageUrls) => {
  try {
    const deletePromises = imageUrls.map(url => this.deleteImage(url));
    return await Promise.all(deletePromises);
  } catch (error) {
    console.error('Multiple image deletion failed:', error);
    return false;
  }
};

// Validate image file
exports.isValidImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.mimetype);
};
