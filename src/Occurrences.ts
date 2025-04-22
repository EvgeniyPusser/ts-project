
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

    const output = getOutputResult(getOccurrencesObject(numberArray)); // Use the result of the occurrences function

    const numberOutputEl = document.getElementById('number-output');
    if (numberOutputEl) {
      numberOutputEl.innerHTML = output.join('<br>');
    }
  });
}




function getOccurrencesObject(numbers: number[]): { [key: number]: number } {
  const res: {[key: number]: number} = {};
  return numbers.reduce((acc, cur) => ({...acc, [cur]: acc[cur] ? acc[cur] + 1 : 1}), res);
}

function getOutputResult(occurrencesObj: { [key: number]: number; }): string[] {
  const entriesArr:[string, number][] = Object.entries(occurrencesObj).sort((e1, e2) =>
     e1[1] == e2[1] ? +e1[0] - +e2[0] : e2[1] - e1[1])
  return entriesArr.map(e => `${e[0]} => ${e[1]}`)
}
function displayResult(outputRes: string[]) {
  outputRes.forEach(r => console.log(r))
}
const occurrences = getOccurrencesObject([20, 3, 3, 20, 20, 1, 1]);

const outputResult = getOutputResult(occurrences);

displayResult(outputResult);

function isAnagram(word: string, anagram: string): boolean {
  let res: boolean = false;
  if (word.length === anagram.length && word !== anagram) {
    const countersObj: {[key: string]: number} = getCountersObj(word);
    res = anagramCheck(countersObj, anagram);
  }
  return res;
}
function getCountersObj(word: string): {[key: string]: number} {
  const res: { [key: string]: number } = getOccurrencesObject(word.split('').map(e => e.charCodeAt(0)));
  return Array.from(word).reduce<{ [key: string]: number }>((acc, cur) => ({...acc, [cur]: acc[cur] ? acc[cur] + 1 : 1}), res);
}
function anagramCheck(countersObj: { [key: string]: number }, anagram: string): boolean {
  return Array.from(anagram).every(c => --countersObj[c] >= 0)
}
const wordAnagram: [string, string, boolean][] = [
  ['hello', 'olleh', true],
  ['hello', 'oleh', false],
  ['hello', 'helll', false],
  ['ellectricity', 'ityrictelcel', true],
  ['ellectricity', 'ityrictelcal', false],
]
const anagramRes = wordAnagram.map(e => `word: ${e[0]}; anagram: ${e[1]}; expected: ${e[2]}; actual: ${isAnagram(e[0], e[1])}`)
displayResult(anagramRes);

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