const fs = require('fs');
const path = require('path');

// Base translation structure for new test types
const newTestTranslations = {
  pt: {
    buttons: {
      romance: "Estilo Romântico",
      egen: "Teste Egen/Teto",
      worldcup: "Copa Mundial Ideal"
    }
  },
  ru: {
    buttons: {
      romance: "Романтический стиль",
      egen: "Тест Эген/Тето",
      worldcup: "Идеальный чемпионат"
    }
  },
  ar: {
    buttons: {
      romance: "أسلوب الرومانسية",
      egen: "اختبار إيجن/تيتو",
      worldcup: "كأس العالم المثالي"
    }
  },
  hi: {
    buttons: {
      romance: "रोमांटिक शैली",
      egen: "एगेन/टेटो टेस्ट",
      worldcup: "आदर्श विश्व कप"
    }
  },
  it: {
    buttons: {
      romance: "Stile Romantico",
      egen: "Test Egen/Teto",
      worldcup: "Coppa del Mondo Ideale"
    }
  },
  id: {
    buttons: {
      romance: "Gaya Romantis",
      egen: "Tes Egen/Teto",
      worldcup: "Piala Dunia Ideal"
    }
  },
  th: {
    buttons: {
      romance: "สไตล์โรแมนติก",
      egen: "ทดสอบ Egen/Teto",
      worldcup: "เวิลด์คัพในอุดมคติ"
    }
  },
  vi: {
    buttons: {
      romance: "Phong Cách Lãng Mạn",
      egen: "Kiểm Tra Egen/Teto",
      worldcup: "World Cup Lý Tưởng"
    }
  }
};

// Update each language file
Object.keys(newTestTranslations).forEach(lang => {
  const filePath = path.join('src', 'i18n', 'locales', lang, 'translation.json');
  
  try {
    // Read existing file
    let translations = {};
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      translations = JSON.parse(content);
    }
    
    // Add new button translations
    if (\!translations.startScreen) {
      translations.startScreen = {};
    }
    if (\!translations.startScreen.buttons) {
      translations.startScreen.buttons = {};
    }
    
    // Merge new translations
    Object.assign(translations.startScreen.buttons, newTestTranslations[lang].buttons);
    
    // Ensure basic structure exists
    if (\!translations.startScreen.buttons.start) {
      const startButtonText = {
        pt: 'Teste MBTI',
        ru: 'MBTI Тест',
        ar: 'اختبار MBTI',
        hi: 'MBTI परीक्षण',
        it: 'Test MBTI',
        id: 'Tes MBTI',
        th: 'ทดสอบ MBTI',
        vi: 'Kiểm Tra MBTI'
      };
      translations.startScreen.buttons.start = startButtonText[lang] || 'MBTI Test';
    }
    
    // Write updated file
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), 'utf8');
    console.log(`Updated ${lang} translations`);
  } catch (error) {
    console.error(`Error updating ${lang}:`, error.message);
  }
});

console.log('Translation update complete\!');
