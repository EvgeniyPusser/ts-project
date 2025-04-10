

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

    displayNumberOccurrences(numberArray);
  });
}

function displayNumberOccurrences(numbers: number[]): void {
  const counts: { [key: number]: number } = {};

  // Count occurrences
  for (const num of numbers) {
    if (counts[num] === undefined) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  }

  // Extract unique numbers to sort manually
  const uniqueNumbers: number[] = [];
  for (const key in counts) {
    uniqueNumbers.push(Number(key));
  }

  // Manual sort: first by count DESC, then by number ASC
  for (let i = 0; i < uniqueNumbers.length - 1; i++) {
    for (let j = i + 1; j < uniqueNumbers.length; j++) {
      const a = uniqueNumbers[i];
      const b = uniqueNumbers[j];
      const countA = counts[a];
      const countB = counts[b];

      const shouldSwap =
        countA < countB || (countA === countB && a > b);
      if (shouldSwap) {
        const temp = uniqueNumbers[i];
        uniqueNumbers[i] = uniqueNumbers[j];
        uniqueNumbers[j] = temp;
      }
    }
  }

  // Display
  const output: string[] = [];
  for (const num of uniqueNumbers) {
    output.push(`${num} => ${counts[num]}`);
  }

  const numberOutputEl = document.getElementById('number-output');
  if (numberOutputEl) {
    numberOutputEl.innerHTML = output.join('<br>');
  }
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



function isAnagram(word: string, anagram: string): boolean {
  const wordCount: { [char: string]: number } = {};
  const anagramCount: { [char: string]: number } = {};
  let result = true;

  if (word.length !== anagram.length) {
    result = false;
  } else {
    for (const char of word) {
      wordCount[char] = (wordCount[char] ?? 0) + 1;
    }

    for (const char of anagram) {
      anagramCount[char] = (anagramCount[char] ?? 0) + 1;
    }

    for (const char in wordCount) {
      if (wordCount[char] !== anagramCount[char]) {
        result = false;
        break;
      }
    }
  }

  return result;
}


