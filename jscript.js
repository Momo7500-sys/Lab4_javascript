// ЛАБОРАТОРНАЯ РАБОТА №5
// ВАРИАНТ 19
// ТЕМА: ИСТОРИК И РЕКОНСТРУКТОР



// 1. ПОИСК ЭЛЕМЕНТОВ DOM

const addEventBtn = document.getElementById("addEventBtn");

const toggleTimelineBtn = document.getElementById("toggleTimelineBtn");

const themeBtn = document.getElementById("themeBtn");

const timelineContainer = document.querySelector("#timelineContainer");


// 2. ПРОВЕРКА НАЛИЧИЯ ЭЛЕМЕНТОВ

if (!addEventBtn || !toggleTimelineBtn ||
    !themeBtn || !timelineContainer) {

    console.error("Ошибка: необходимый HTML-элемент не найден.");

} else {


    // 3. ПОЛУЧЕНИЕ НАЧАЛЬНЫХ СОБЫТИЙ ИЗ HTML

    const initialCards = document.querySelectorAll(".event-card");

    let events = [];

    // 4. ВОССТАНОВЛЕНИЕ СОБЫТИЙ ИЗ LOCALSTORAGE

    const savedEvents = localStorage.getItem("historicalEvents");

    if (savedEvents !== null) {

        try {

            const parsedEvents = JSON.parse(savedEvents);

            if (Array.isArray(parsedEvents)) {

                events = parsedEvents.filter(function(event) {

                    return event &&
                        typeof event.date === "string" &&
                        typeof event.title === "string";

                });

            } else {

                console.error("Ошибка: неверный формат сохранённых событий.");

            }

        } catch (error) {

            console.error("Ошибка при чтении событий:", error);

        }

    } else {

        // Если сохранённых данных нет, используем события из HTML

        initialCards.forEach(function(card) {

            const date = card.querySelector(".event-date");

            const title = card.querySelector("h3");

            if (date && title) {

                events.push({
                    date: date.textContent.trim(),
                    title: title.textContent.trim()
                });

            }

        });

    }


    // 5. ФУНКЦИЯ СОХРАНЕНИЯ СОБЫТИЙ

    function saveEvents() {

        localStorage.setItem(
            "historicalEvents",
            JSON.stringify(events)
        );

    }


    // 6. ФУНКЦИЯ ОТОБРАЖЕНИЯ СОБЫТИЙ

    function displayEvents() {

        // Очищаем контейнер перед добавлением карточек

        timelineContainer.innerHTML = "";

        // Перебираем все исторические события

        events.forEach(function(event, index) {

            // Создаём карточку события

            const card = document.createElement("article");

            card.className = "event-card";


            // Создаём дату события

            const date = document.createElement("p");

            date.className = "event-date";

            date.textContent = event.date;


            // Создаём название события

            const title = document.createElement("h3");

            title.textContent = event.title;


            // Создаём кнопку удаления

            const deleteBtn = document.createElement("button");

            deleteBtn.textContent = "Удалить";

            deleteBtn.className = "delete-event-btn";

            deleteBtn.type = "button";


            // Добавляем обработчик удаления

            deleteBtn.addEventListener("click", function() {

                deleteEvent(index, card);

            });


            // Добавляем элементы в карточку

            card.appendChild(date);

            card.appendChild(title);

            card.appendChild(deleteBtn);


            // Добавляем карточку в контейнер

            timelineContainer.appendChild(card);

        });

    }


    // 7. ДОБАВЛЕНИЕ НОВОГО СОБЫТИЯ

    addEventBtn.addEventListener("click", function() {

        // Запрашиваем дату события

        const date = prompt("Введите дату исторического события:");

        if (date === null || date.trim() === "") {

            alert("Дата события не введена!");

            return;

        }


        // Запрашиваем название события

        const title = prompt("Введите название исторического события:");

        if (title === null || title.trim() === "") {

            alert("Название события не введено!");

            return;

        }


        // Создаём новый объект события

        const newEvent = {

            date: date.trim(),

            title: title.trim()

        };


        // Добавляем событие в массив

        events.push(newEvent);


        // Сохраняем изменения

        saveEvents();


        // Обновляем отображение страницы

        displayEvents();


        alert("Историческое событие успешно добавлено!");

    });


    // 8. УДАЛЕНИЕ ИСТОРИЧЕСКОГО СОБЫТИЯ

    function deleteEvent(index, card) {

        // Проверяем существование события

        if (!events[index]) {

            console.error("Ошибка: событие не найдено!");

            return;

        }


        // Добавляем класс анимации удаления

        card.classList.add("fade-out");


        // Удаляем событие после завершения анимации

        setTimeout(function() {

            events.splice(index, 1);

            saveEvents();

            displayEvents();

            console.log("Историческое событие удалено.");

        }, 300);

    }


    // 9. СКРЫТИЕ И ОТОБРАЖЕНИЕ ХРОНОЛОГИИ

    toggleTimelineBtn.addEventListener("click", function() {

        // Проверяем наличие контейнера

        if (!timelineContainer) {

            console.error("Ошибка: контейнер хронологии не найден!");

            return;

        }


        // Переключаем класс скрытия

        timelineContainer.classList.toggle("hidden");


        // Изменяем текст кнопки

        if (timelineContainer.classList.contains("hidden")) {

            toggleTimelineBtn.textContent = "Показать хронологию";

        } else {

            toggleTimelineBtn.textContent = "Свернуть хронологию";

        }

    });


    // 10. ВОССТАНОВЛЕНИЕ СОХРАНЁННОЙ ТЕМЫ

    const savedTheme = localStorage.getItem("pageTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("theme-dark");

    } else {

        document.body.classList.remove("theme-dark");

    }


    // 11. ПЕРЕКЛЮЧЕНИЕ СВЕТЛОЙ И ТЁМНОЙ ТЕМЫ

    themeBtn.addEventListener("click", function() {

        // Меняем класс темы у элемента body

        document.body.classList.toggle("theme-dark");


        // Определяем текущую тему

        let currentTheme;

        if (document.body.classList.contains("theme-dark")) {

            currentTheme = "dark";

        } else {

            currentTheme = "light";

        }


        // Сохраняем выбранную тему

        localStorage.setItem("pageTheme", currentTheme);

        console.log("Тема страницы изменена:", currentTheme);

    });


    // 12. ПОИСК ВСЕХ КНОПОК УДАЛЕНИЯ

    const allDeleteButtons =
        document.querySelectorAll(".delete-event-btn");

    console.log(
        "Количество кнопок удаления:",
        allDeleteButtons.length
    );


    // 13. ПЕРВОНАЧАЛЬНОЕ ОТОБРАЖЕНИЕ ХРОНОЛОГИИ

    displayEvents();


    // 14. СОХРАНЕНИЕ НАЧАЛЬНЫХ СОБЫТИЙ

    if (savedEvents === null) {

        saveEvents();

    }


    console.log("Лабораторная работа №5 успешно загружена!");

}