// Product name translations
export const productTranslations = {
  // Vegetables
  "Fresh Kale": {
    mr: "ताजी केळ",
    hi: "ताज़ा केल",
    en: "Fresh Kale"
  },
  "Fresh Cauliflower": {
    mr: "ताजे फ्लॉवर",
    hi: "ताज़ा फूलगोभी",
    en: "Fresh Cauliflower"
  },
  "Green Capsicum": {
    mr: "हिरवी मिरची",
    hi: "हरी शिमला मिर्च",
    en: "Green Capsicum"
  },
  "Green Chili": {
    mr: "हिरवी मिरची",
    hi: "हरी मिर्च",
    en: "Green Chili"
  },
  "Green Cucumber": {
    mr: "हिरी काकडी",
    hi: "हरा खीरा",
    en: "Green Cucumber"
  },
  "Green Lettuce": {
    mr: "हिरवी कोशिंबिर",
    hi: "हरा लेट्यूस",
    en: "Green Lettuce"
  },
  "Eggplant": {
    mr: "वांगी",
    hi: "बैंगन",
    en: "Eggplant"
  },
  "Big Potatoes": {
    mr: "मोठे बटाटे",
    hi: "बड़े आलू",
    en: "Big Potatoes"
  },
  "Corn": {
    mr: "मका",
    hi: "मकई",
    en: "Corn"
  },
  "Red Capsicum": {
    mr: "लाल मिरची",
    hi: "लाल शिमला मिर्च",
    en: "Red Capsicum"
  },
  "Red Tomatos": {
    mr: "लाल टोमॅटो",
    hi: "लाल टमाटर",
    en: "Red Tomatos"
  },

  // Fruits
  "Fresh Indian Malta": {
    mr: "ताजे भारतीय संत्री",
    hi: "ताज़ा भारतीय माल्टा",
    en: "Fresh Indian Malta"
  },
  "Chinese cabbage": {
    mr: "चिनी कोबी",
    hi: "चीनी पत्तागोभी",
    en: "Chinese cabbage"
  },
  "Green Apple": {
    mr: "हिरवे सफरचंद",
    hi: "हरा सेब",
    en: "Green Apple"
  },
  "Red Apples": {
    mr: "लाल सफरचंद",
    hi: "लाल सेब",
    en: "Red Apples"
  },
  "Fresh Mango": {
    mr: "ताजे आंबा",
    hi: "ताज़ा आम",
    en: "Fresh Mango"
  },
  "Strawberry": {
    mr: "स्ट्रॉबेरी",
    hi: "स्ट्रॉबेरी",
    en: "Strawberry"
  },
  "Surjapur Mango": {
    mr: "सुरजपूर आंबा",
    hi: "सूरजपुर आम",
    en: "Surjapur Mango"
  },
  "Orange": {
    mr: "संत्रा",
    hi: "संतरा",
    en: "Orange"
  },

  // Snacks
  "Chanachur": {
    mr: "चणचूर",
    hi: "चनाचूर",
    en: "Chanachur"
  },
  "Best Almond": {
    mr: "उत्तम बदाम",
    hi: "बेस्ट बादाम",
    en: "Best Almond"
  },

  // Category translations
  "Vegetables": {
    mr: "भाजीपाला",
    hi: "सब्जियां",
    en: "Vegetables"
  },
  "Fruits": {
    mr: "फळे",
    hi: "फल",
    en: "Fruits"
  },
  "Fresh Fruit": {
    mr: "ताजी फळे",
    hi: "ताज़े फल",
    en: "Fresh Fruit"
  },
  "River Fish": {
    mr: "नदी मासे",
    hi: "नदी मछली",
    en: "River Fish"
  },
  "Meat": {
    mr: "मांस",
    hi: "मांस",
    en: "Meat"
  },
  "Water and Drinks": {
    mr: "पाणी आणि पेये",
    hi: "पानी और पेय",
    en: "Water and Drinks"
  },
  "Snacks": {
    mr: "स्नॅक्स",
    hi: "स्नैक्स",
    en: "Snacks"
  }
};

// Helper function to get translated product name
export const getTranslatedProductName = (productName: string, language: string): string => {
  const translation = productTranslations[productName as keyof typeof productTranslations];
  
  if (!translation) {
    return productName; // Return original if no translation found
  }

  const langCode = language === 'English' ? 'en' : language === 'Marathi' ? 'mr' : 'hi';
  return translation[langCode as 'en' | 'mr' | 'hi'] || productName;
};

// Helper function to get translated category name
export const getTranslatedCategory = (category: string, language: string): string => {
  return getTranslatedProductName(category, language);
};
