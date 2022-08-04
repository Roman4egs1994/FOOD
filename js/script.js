'use strict'

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
});


