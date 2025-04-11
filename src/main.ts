

import './style.css';

// --- Hook up the button click event ---
const countBtn = document.getElementById('count-btn');
const numberInput = document.getElementById('number-input') as HTMLInputElement;



if (countBtn && numberInput) {
  countBtn.addEventListener('click', () => {
    const inputValue = numberInput.value;
    const numberArray: number[] = inputValue
      .split(',')
      .map(str => parseInt(str.trim()))
      .filter(num => !isNaN(num));

    const output = occurrences(numberArray); // Use the result of the occurrences function

    const numberOutputEl = document.getElementById('number-output');
    if (numberOutputEl) {
      numberOutputEl.innerHTML = output.join('<br>');
    }
  });
}




function occurrences(numbers: number[]): string[];
function occurrences(strings: string[]): string[];
function occurrences(input: number[] | string[]): string[] {
  const counts: { [key: string]: number } = {};

  input.forEach(item => {
    const key = String(item);
    counts[key] = (counts[key] || 0) + 1;
  });

  return Object.entries(counts)
    .sort(([aKey, aVal], [bKey, bVal]) => bVal - aVal || aKey.localeCompare(bKey))
    .map(([key, count]) => `${key} => ${count}`);
}


const checkAnagramBtn = document.getElementById('check-anagram-btn');
const wordInput = document.getElementById('word-input') as HTMLInputElement;
const anagramInput = document.getElementById('anagram-input') as HTMLInputElement;

if (checkAnagramBtn && wordInput && anagramInput) {
  checkAnagramBtn.addEventListener('click', () => {
    const word = wordInput.value.trim();
    const anagram = anagramInput.value.trim();

    const resultText = isAnagram(word, anagram)
      ? `✅ "${anagram}" is an anagram of "${word}"`
      : `❌ "${anagram}" is NOT an anagram of "${word}"`;

    const anagramOutputEl = document.getElementById('anagram-output');
    if (anagramOutputEl) {
      anagramOutputEl.innerHTML = resultText;
    }
  });
}



function isAnagram(word1: string, word2: string): boolean {
  const normalize = (str: string) => str.replace(/\W/g, '').toLowerCase();
  const normalizedWord1 = normalize(word1);
  const normalizedWord2 = normalize(word2);

  if (normalizedWord1.length !== normalizedWord2.length) {
    return false;
  }

  const count1 = occurrences(normalizedWord1.split(''));
  const count2 = occurrences(normalizedWord2.split(''));

  return count1.every((entry, index) => entry === count2[index]);
}



