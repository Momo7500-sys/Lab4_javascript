// ==========================================
// 1. Entrées / Sorties (Input/Output)
// ==========================================

// Demande le nom de l'utilisateur via prompt
let userName = prompt("Введите ваше имя (Historian/Reconstructor):", "Иван");

// Affichage d'un message de bienvenue personnalisé via alert
if (userName) {
    alert("Приветствуем вас, " + userName + ", в системе анализа артефактов!");
} else {
    alert("Приветствуем вас, уважаемый историк, в системе анализа артефактов!");
}

// Log initial dans la console
console.log("--- Начало анализа находок ---");


// ==========================================
// 2. Données (Массив возрастов артефактов)
// ==========================================
// Remplacement par un tableau valide de 7 nombres (exemples de 100 à 5000 ans)
const artifactAges =[];
console.log("Исходный массив возрастов артефактов:", artifactAges);


// ==========================================
// 3. Fonctions de traitement (Функции)
// ==========================================

// Функция поиска максимума (самый старый артефакт)
function findMaxAge(agesArray) {
    let max = agesArray[0];
    for (let i = 1; i < agesArray.length; i++) {
        if (agesArray[i] > max) {
            max = agesArray[i];
        }
    }
    return max;
}

// Функция фильтрации (артефакты старше 1000 лет - древние)
function filterAncientArtifacts(agesArray) {
    let ancient = [];
    for (let i = 0; i < agesArray.length; i++) {
        if (agesArray[i] > 1000) {
            ancient.push(agesArray[i]);
        }
    }
    return ancient;
}

// Функция подсчета суммы всех возрастов
function calculateSum(agesArray) {
    let sum = 0;
    for (let i = 0; i < agesArray.length; i++) {
        sum += agesArray[i];
    }
    return sum;
}


// ==========================================
// 4. Logique métier et boucles (Циклы и условия)
// ==========================================

// Appel des fonctions
const maxAge = findMaxAge(artifactAges);
const ancientArtifacts = filterAncientArtifacts(artifactAges);
const totalSum = calculateSum(artifactAges);

// Calcul de l'âge moyen (Средний возраст)
const averageAge = totalSum / artifactAges.length;

// Compte et calcul de la part des jeunes artefacts (≤ 300 лет) à l'aide d'une boucle
let youngCount = 0;
for (let i = 0; i < artifactAges.length; i++) {
    if (artifactAges[i] <= 300) {
        youngCount++;
    }
}
// Calcul de la part (доля)
let youngShare = (youngCount / artifactAges.length) * 100;


// ==========================================
// 5. Affichage des résultats (Вывод результатов)
// ==========================================

// Вывод: alert – «Средний возраст – X лет, Y артефактов – древние»
alert("Средний возраст – " + averageAge.toFixed(1) + " лет, " + ancientArtifacts.length + " артефактов – древние.");

// Console – доля молодых артефактов и их количество
console.log("Количество молодых артефактов (≤ 300 лет): " + youngCount);
console.log("Доля молодых артефактов: " + youngShare.toFixed(2) + "%");

// Доп. условие: если максимум > 3000 лет
if (maxAge > 3000) {
    console.log("Среди находок есть по-настоящему древние артефакты! (Максимальный возраст: " + maxAge + " лет)");
}

console.log("--- Анализ успешно завершен ---");
