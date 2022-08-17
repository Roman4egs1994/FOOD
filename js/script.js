'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


        function hideTabContent() {
            tabsContent.forEach(item  => {
                item.classList.add('hide'); //Убираем все табы
                item.classList.remove('show' , 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');  //Удаляем класс активности
            });
        }
        

        function showTabContent(i = 0) {    //Присваиваем по умолчанию 0
                tabsContent[i].classList.add('show', 'fade');
                tabsContent[i].classList.remove('hide');
                tabs[i].classList.add('tabheader__item_active'); //активируем класс активности
        }     

    
        hideTabContent();
        showTabContent();  


        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item'))  { //Определяем, что мы точно кликнули в ТАБ
                tabs.forEach((item, i) => {
                    if (target == item) {   //Если targed будет совпадать с элементом , который перебераем
                        hideTabContent();   // Мы будем вызывать 2 функции
                        showTabContent(i);  // i = номер элемента
                    }
                });
            } 
        });

    // Timer
    

    const deadline = '2022-08-17';

    function getTimeRemaining(endtime) {  //задача функции получить разницу между датами
        const t = Date.parse(endtime) - Date.parse(new Date()),
         days =  Math.floor(t / (1000 * 60 * 60 * 24)),//Получить в сутках количество миллисекунд
         hours = Math.floor((t / (1000 * 60 * 60) % 24)), // Получаем кол-во времени, которого не хватает до полных суток
         minutes = Math.floor((t / 1000 / 60) % 60 ), //Получаем остаток от минут
         seconds = Math.floor((t / 1000 ) % 60); // получить остаток секунд внутри миллисекунд
    
        return {
            'total': t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
        
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);


        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }      
    }

    setClock('.timer', deadline);


    //MODAL
   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         modalCloseBtn = document.querySelector('[data-close]');


    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

         // 1) Функция перебора всех ('[data-modal]') и добавление класса show , удаление класса hide.
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);  
    });    

    


    // 4) Переносим  класс листы в функцию
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';  //Вставить по умолчанию overflove
    }


        // 2) Функция закрытия модального окна по нажатию на "крест"
         modalCloseBtn.addEventListener('click', closeModal);

       //3) Закрытие модального окна по нажатию на пустое место .  
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


        // 5) Закрытие модального окна по нажатию клавиши Escape
      document.addEventListener('keydown' , (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
      });


      //Modific MODAL WINDOW


      
    //   const modalTimerId = setTimeout (openModal, 10000); //Запуск модального окна по таймеру

      function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // После одного всплытия , модальное окно перестанет всплывать
        }
      }


      //Открытие модальног окна по скроллу сайта в самый низ
      window.addEventListener('scroll', showModalByScroll);

      //Класыс
      //Использовать классы для карточек

      class MenuCard {
        constructor(src, alt, title, desct, price, parentSelector) { //Cоздаем свойства для конструктора карточки
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desct = desct;
            this.price = price;
            this.parent = document.querySelector(parentSelector); // В данном свойстве лежит DOM элемент
            this.transfer = 60; //Курс доллара по соотношению к рублю
            this.changeToRyb(); //Вызов метода(Перевод доллара в рубли) прямо в конструкторе 
        }
        
        //Перевод из доллара в рубри 
        changeToRyb() { 
            this.price = this.price * this.transfer;
        }

        //Формирование верстки
        render() {
            const element = document.createElement('div'); // Создаем элемент "div"
            element.innerHTML = ` 
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desct}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            </div>
            `;  // Обращаемся к element и динамически формируем структуру
            this.parent.append(element); //append для помещение элемента 
        }
      }

     // Первый вариаент рендера новых карточек 
    //   const div = new MenuCard();
    //   div.render();

    //Второй вариант
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        7,
        '.menu .container'
    ).render();

});     


