

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


function find<T, K extends keyof T>(arr: T[], field: K, value: T[K]): T[] {
  return arr.filter(item => item[field] === value);
}
type Person = {
  id: number;
  name: string;
  age: number;
};

const people: Person[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Alice', age: 40 },
  { id: 4, name: 'Charlie', age: 35 },
  { id: 5, name: 'David', age: 28 },
  { id: 6, name: 'Eve', age: 22 },
  { id: 7, name: 'Frank', age: 45 },
  { id: 8, name: 'Grace', age: 29 },
];

const result = find(people, 'name', 'Alice');
console.log(result);
// Output:
// [
//   { id: 1, name: 'Alice', age: 30 },
//   { id: 3, name: 'Alice', age: 40 }
// ]
const result2 = find(people, 'age', 30);
console.log(result2);
// Output:
// [
//   { id: 1, name: 'Alice', age: 30 }
// ]


function update<T>(original: T, updates: Partial<T>): T {
  return { ...original, ...updates };
}
type PersonWithCity = {
  id: number;
  age: number;
  city: string;
};

const person: PersonWithCity = { id: 123, age: 25, city: "Lod" };
const updater = {city: "Rehovot" };

const updatedPerson = update(person, updater);

console.log(updatedPerson);

const person2: PersonWithCity = { id: 456, age: 30, city: "Tel Aviv" };
const updater2 = { age: 31, city: "Haifa" };
const updatedPerson2 = update(person2, updater2);
console.log(updatedPerson2);
// Output:
// { id: 456, age: 31, city: "Haifa" }

