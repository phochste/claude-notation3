import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});

const n3file = process.argv[2];

if (!n3file) {
  console.error('usage: index.js n3file');
  process.exit(1);
}

async function main(path) {
  const n3 = fs.readFileSync(path, { encoding: "utf-8"} );
  
  const question = `What derivations are expected from the following Notation3 written below:\n` + n3;

  console.log(`-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
  console.log(`QUESTION`);
  console.log(`-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
  console.log(question);
  console.log(`-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
  console.log(`ANSWER`);

  const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: question }],
    model: 'claude-3-opus-20240229',
  });

  console.log(message.content);
  console.log(`-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
}

main(n3file);
