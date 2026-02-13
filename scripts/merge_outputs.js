const fs = require('fs');
const path = require('path');

// Helper to parse JSON safely
function parseJSON(content) {
  try {
    return JSON.parse(content);
  } catch (e) {
    // If it's a markdown code block, try to extract it
    const match = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (e2) {
        return null;
      }
    }
    return null;
  }
}

function mergeInputs(inputFiles, outputPath) {
  const finalOutput = {
    metadata: {},
    proposals: [],
    character_designs: []
  };

  inputFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const data = parseJSON(content);

    if (!data) {
      console.warn(`Warning: Could not parse JSON from ${file}`);
      return;
    }

    // Merge metadata (last one wins for simplicity, or we could merge keys)
    if (data.metadata) {
      Object.assign(finalOutput.metadata, data.metadata);
    }

    // Append proposals
    if (Array.isArray(data.proposals)) {
      finalOutput.proposals.push(...data.proposals);
    }

    // Append character designs
    if (Array.isArray(data.character_designs)) {
      finalOutput.character_designs.push(...data.character_designs);
    }
  });

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(finalOutput, null, 2));
  console.log(`Successfully merged ${inputFiles.length} files into ${outputPath}`);
}

// CLI usage
// node merge_outputs.js output.json input1.json input2.json ...
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node merge_outputs.js <output_file> <input_file1> [input_file2] ...");
  process.exit(1);
}

const outputFile = args[0];
const inputFiles = args.slice(1);

mergeInputs(inputFiles, outputFile);
