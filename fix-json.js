const fs = require('fs');
const path = require('path');

// Fix JSON syntax errors in translation files
const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
const locales = fs.readdirSync(localesDir);

locales.forEach(locale => {
  const filePath = path.join(localesDir, locale, 'translation.json');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Fix missing commas after closing braces
    // Pattern: }[whitespace]"property": should be },[whitespace]"property":
    content = content.replace(/\}(\s*)"(testimonials|buttons|worldcup|egen|romance|titanQuiz|resultOptions|copySuccess|shareLinks)":\s*\{/g, '},$1"$2": {');
    
    // Ensure proper JSON structure for features, testimonials, buttons sections
    content = content.replace(/\}(\s*)\}/g, function(match, p1) {
      // Don't add comma to the very last closing brace
      if (content.indexOf(match) === content.lastIndexOf('}}')) {
        return match;
      }
      return '}' + p1 + '}';
    });
    
    try {
      // Try to parse the JSON to validate it
      JSON.parse(content);
      // If successful, write it back
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ Fixed ${locale}/translation.json`);
    } catch (e) {
      console.log(`✗ Could not automatically fix ${locale}/translation.json: ${e.message}`);
      
      // Try more aggressive fixes for common patterns
      // Fix missing commas between sections
      content = content.replace(/\}(\s*)"(features|testimonials|buttons|worldcup|egen|romance|titanQuiz)":/g, '},$1"$2":');
      
      try {
        JSON.parse(content);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✓ Fixed ${locale}/translation.json (second pass)`);
      } catch (e2) {
        console.log(`✗ Still could not fix ${locale}/translation.json: ${e2.message}`);
      }
    }
  }
});

console.log('\nDone fixing JSON files.');