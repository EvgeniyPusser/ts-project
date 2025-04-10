

import './style.css';

function displayNumberOccurrences(numbers: number[]): void {
  const counts: Map<number, number> = new Map();

  for (const num of numbers) {
    counts.set(num, (counts.get(num) ?? 0) + 1);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => {
    const [numA, countA] = a;
    const [numB, countB] = b;

    if (countA !== countB) {
      return countB - countA;
    } else {
      return numA - numB;
    }
  });

  const outputLines: string[] = sorted.map(
    ([num, count]) => `${num} => ${count}`
  );

  const numberOutputEl = document.getElementById('number-output');
  if (numberOutputEl) {
    numberOutputEl.innerHTML = outputLines.join('<br>');
  }
}

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

    displayNumberOccurrences(numberArray);
  });
}

function isAnagram(word: string, anagram: string): boolean {
  const normalize = (str: string): string =>
    str.toLowerCase().split('').sort().join('');

  return normalize(word) === normalize(anagram);
}

const word = 'listen';
const test = 'silent';
const isAnagramResult = isAnagram(word, test) ? '✅ Yes' : '❌ No';

const anagramOutputEl = document.getElementById('anagram-output');
if (anagramOutputEl) {
  anagramOutputEl.innerHTML = `"${test}" is an anagram of "${word}"? → ${isAnagramResult}`;
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

