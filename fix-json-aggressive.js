const fs = require('fs');
const path = require('path');

// More aggressive JSON fixing
const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
const locales = fs.readdirSync(localesDir);

locales.forEach(locale => {
  const filePath = path.join(localesDir, locale, 'translation.json');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Fix missing commas between object properties
    // Look for pattern: }\n    "property"
    content = content.replace(/\}\n(\s*)"(\w+)":/g, '},\n$1"$2":');
    
    // Fix missing commas after string values before new property
    // Look for pattern: "value"\n    "property"
    content = content.replace(/(".*?")\n(\s*)"(\w+)":/g, '$1,\n$2"$3":');
    
    // Fix missing commas after numbers before new property
    content = content.replace(/(\d+)\n(\s*)"(\w+)":/g, '$1,\n$2"$3":');
    
    // Fix missing commas after booleans before new property
    content = content.replace(/(true|false)\n(\s*)"(\w+)":/g, '$1,\n$2"$3":');
    
    // Fix missing commas after arrays before new property
    content = content.replace(/(\])\n(\s*)"(\w+)":/g, '$1,\n$2"$3":');
    
    try {
      // Try to parse the JSON to validate it
      const parsed = JSON.parse(content);
      // If successful, write it back formatted
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
      console.log(`✓ Fixed and formatted ${locale}/translation.json`);
    } catch (e) {
      console.log(`✗ Could not fix ${locale}/translation.json: ${e.message}`);
      
      // Output the problematic area
      const match = e.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1]);
        const snippet = content.substring(Math.max(0, pos - 100), Math.min(content.length, pos + 100));
        console.log(`  Problem area: ...${snippet}...`);
      }
    }
  }
});

console.log('\nDone fixing JSON files.');