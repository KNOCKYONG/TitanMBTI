const fs = require('fs');
const path = require('path');

// Specific fixes for each locale based on the error patterns identified
const fixes = {
  'ar': [
    { find: '"scientific": "تحليل علمي"\n    }\n  },', replace: '"scientific": "تحليل علمي"\n    }\n  },' },
  ],
  'de': [
    { find: '"learnMore": "Mehr erfahren"\n    "features":', replace: '"learnMore": "Mehr erfahren"\n    },\n    "features":' },
  ],
  'es': [
    { find: '"learnMore": "Saber Más"\n    "features":', replace: '"learnMore": "Saber Más"\n    },\n    "features":' },
  ],
  'fr': [
    { find: '"learnMore": "En Savoir Plus"\n    "features":', replace: '"learnMore": "En Savoir Plus"\n    },\n    "features":' },
  ],
  'hi': [
    { find: '"mainDescription": {\n    },', replace: '"mainDescription": "",' },
  ],
  'id': [
    { find: '"scientific": "Analisis Ilmiah"\n    }\n  },', replace: '"scientific": "Analisis Ilmiah"\n    }\n  },' },
  ],
  'it': [
    { find: '"scientific": "Analisi Scientifica"\n    }\n  },', replace: '"scientific": "Analisi Scientifica"\n    }\n  },' },
  ],
  'ja': [
    { find: '"learnMore": "詳しく見る"\n    "trustIndicators":', replace: '"learnMore": "詳しく見る"\n    },\n    "trustIndicators":' },
    { find: '"scientific": "科学的分析"\n    "howItWorks":', replace: '"scientific": "科学的分析"\n    },\n    "howItWorks":' },
  ],
  'pt': [
    { find: '"learnMore": "Saiba Mais"\n    "trustIndicators":', replace: '"learnMore": "Saiba Mais"\n    },\n    "trustIndicators":' },
  ],
  'ru': [
    { find: '"scientific": "Научный Анализ"\n    }\n  },', replace: '"scientific": "Научный Анализ"\n    }\n  },' },
  ],
  'th': [
    { find: '"mainDescription": {\n    },', replace: '"mainDescription": "",' },
  ],
  'vi': [
    { find: '"scientific": "Phân tích Khoa học"\n    }\n  },', replace: '"scientific": "Phân tích Khoa học"\n    }\n  },' },
  ],
  'zh': [
    { find: '"learnMore": "了解更多"\n    "trustIndicators":', replace: '"learnMore": "了解更多"\n    },\n    "trustIndicators":' },
    { find: '"scientific": "科学分析"\n    "howItWorks":', replace: '"scientific": "科学分析"\n    },\n    "howItWorks":' },
  ],
};

// Apply fixes
Object.entries(fixes).forEach(([locale, localeFixes]) => {
  const filePath = path.join(__dirname, 'src', 'i18n', 'locales', locale, 'translation.json');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Apply specific fixes for this locale
    localeFixes.forEach(fix => {
      content = content.replace(fix.find, fix.replace);
    });
    
    // Common fixes for all locales
    // Fix missing commas between sections
    content = content.replace(/\}(\s*)"(features|testimonials|buttons|worldcup|egen|romance|titanQuiz|trustIndicators|howItWorks|stats)":/g, '},$1"$2":');
    
    // Fix empty objects that should be empty strings
    content = content.replace(/"mainDescription":\s*\{\s*\}/g, '"mainDescription": ""');
    
    try {
      // Try to parse the JSON to validate it
      const parsed = JSON.parse(content);
      // If successful, write it back formatted
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
      console.log(`✓ Fixed ${locale}/translation.json`);
    } catch (e) {
      console.log(`✗ Could not fix ${locale}/translation.json: ${e.message}`);
    }
  }
});

console.log('\nDone fixing JSON files.');