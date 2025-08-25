const fs = require('fs');
const path = require('path');

// Fix all JSON files with missing commas
const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
const locales = fs.readdirSync(localesDir);

locales.forEach(locale => {
  const filePath = path.join(localesDir, locale, 'translation.json');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Fix patterns where a closing brace is not followed by a comma before a new property
    // Pattern: "value"\n    "property" -> "value"\n    },\n    "property"
    content = content.replace(/(".*?")\n(\s*)\}(\s*)"(\w+)":/g, (match, p1, p2, p3, p4) => {
      modified = true;
      return `${p1}\n${p2}},${p3}"${p4}":`;
    });
    
    // Pattern: }\n    "property" -> },\n    "property"
    content = content.replace(/\}(\s*)"(\w+)":/g, (match, p1, p2) => {
      // Don't add comma if it's already there
      if (match.includes(',')) return match;
      modified = true;
      return `},${p1}"${p2}":`;
    });
    
    // Fix empty object pattern: "property": {\n    }, -> "property": "",
    content = content.replace(/"(\w+)":\s*\{\s*\},?/g, '"$1": "",');
    
    if (modified) {
      try {
        // Try to parse to validate
        JSON.parse(content);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✓ Fixed ${locale}/translation.json`);
      } catch (e) {
        console.log(`✗ Could not validate ${locale}/translation.json after fixes: ${e.message}`);
      }
    } else {
      try {
        JSON.parse(content);
        console.log(`✓ ${locale}/translation.json is already valid`);
      } catch (e) {
        console.log(`✗ ${locale}/translation.json has errors: ${e.message}`);
      }
    }
  }
});

console.log('\nDone fixing JSON files.');