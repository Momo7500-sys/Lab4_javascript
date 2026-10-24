//  Ввод/вывод: prompt (имя), alert (приветствие)
const name = prompt("Здравствуйте! Как вас зовут?", "Историк") || "Историк";
alert(`Привет, ${name}! Сейчас проанализируем коллекцию артефактов.`);
console.log(`Пользователь: ${name}`);
console.log("Дата анализа:", new Date().toLocaleString());

// ДАННЫЕ 
// Возраст артефактов в годах (5–7 значений, от 100 до 5000)
const artifacts = [120, 450, 1200, 2500, 3200, 800, 150];
console.log("Возраст артефактов (лет):", artifacts);

//ФУНКЦИИ
// Максимум в массиве (самый старый артефакт)
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Фильтрация: элементы строго больше порога
function filterGreater(arr, threshold) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > threshold) result.push(arr[i]);
    }
    return result;
}

// Сумма элементов массива
function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

// Среднее арифметическое (на основе sumArray)
function average(arr) {
    return sumArray(arr) / arr.length;
}

//ЛОГИКА
const oldest = findMax(artifacts);                 // самый старый
const ancient = filterGreater(artifacts, 1000);     // старше 1000 лет
const ancientCount = ancient.length;
const totalAge = sumArray(artifacts);
const avgAge = average(artifacts);

console.log("Древние артефакты (> 1000 лет):", ancient);
console.log(`Самый старый артефакт: ${oldest} лет`);
console.log(`Суммарный возраст коллекции: ${totalAge} лет`);

// Основной вывод по заданию (alert)
alert(`Средний возраст – ${Math.round(avgAge)} лет, ${ancientCount} артефактов – древние`);

//ЦИКЛ: МОЛОДЫЕ АРТЕФАКТЫ (≤ 300 лет)
let youngCount = 0;
const youngAges = [];

for (let i = 0; i < artifacts.length; i++) {
    if (artifacts[i] <= 300) {
        youngCount++;
        youngAges.push(artifacts[i]);
    }
}

const youngShare = (youngCount / artifacts.length) * 100; // доля в %

console.log(`Молодых артефактов (≤ 300 лет): ${youngCount} шт.`);
console.log(`Их возраст: ${youngAges.join(", ")} лет`);
console.log(`Доля молодых артефактов: ${youngShare.toFixed(1)} %`);

// ДОПОЛНИТЕЛЬНОЕ УСЛОВИЕ 
if (oldest > 3000) {
    console.log("Среди находок есть по-настоящему древние артефакты!");
}

// УСЛОВНЫЙ ВЫВОД ПО КОЛЛЕКЦИИ
if (ancientCount === 0) {
    console.log("Древних артефактов (старше 1000 лет) не обнаружено.");
} else if (ancientCount >= artifacts.length / 2) {
    console.log("Больше половины коллекции — древние артефакты.");
} else {
    console.log("Древние артефакты составляют меньшую часть коллекции.");
}
