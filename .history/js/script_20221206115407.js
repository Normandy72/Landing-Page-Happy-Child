window.addEventListener('DOMContentLoaded', function(){

    // ------------------------ MODAL WINDOW -----------------------

    const modalTrigger = document.querySelectorAll('[data-modal]'),     // variable for trigger (data-modal)
          modalWindow = document.querySelector('.modal__window'),       // variable for modal window
          close = document.querySelector('.modal__close');              // variable for close button   

    // openWindow function
    function openWindow()
    {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    // closeWindow function
    function closeWindow()
    {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(button => {
        button.addEventListener('click', openWindow);
    });

    close.addEventListener('click', closeWindow);

    // close window ater submission
    modalWindow.addEventListener('click', (e) =>
    {
        if(e.target === modalWindow || e.target.getAttribute('data-close') == '')
        {
            closeWindow();
        }
    });

    // close window after press Esc
    document.addEventListener('keydown', (e) =>{
        if(e.code === 'Escape' && modalWindow.classList.contains('show'))
        {
            closeWindow();
        }
    });

    // close window after press on modal window area
    modalWindow.addEventListener('click', (e) =>{
        if(e.target === modalWindow)
        {
            closeWindow();
        }
    });


    // ------------------------ SECTION CARDS -----------------------
    class ServiceCard
    {
        constructor(img, alt, h4, parentSelector, ...classes)
        {
            this.img = img;
            this.alt = alt;
            this.h4 = h4;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render()
        {
            const element = document.createElement('div');
            if(this.classes.length === 0)
            {
                this.classes = 'services__card';
                element.classList.add(this.classes);
            }
            else
            {
                this.classes.forEach(className => element.classList.add(className));
            }            

            element.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h4>${this.h4}</h4>`;
            this.parentSelector.append(element);
        }
    }

    const getResource = async (url) => {
        let result = await fetch(url);
        if(!result.ok)
        {
            throw new Error(`Error ${url}, status: ${result.status}`);
        }
        return await result.json();
    };

    getResource('http://localhost:3000/service').then(data => {
        data.forEach(({img, alt, h4}) => {
            new ServiceCard(img, alt, h4, '.section__services .services__cards').render();
        });
    });


    // ------------------------ SECTION DOCTORS -----------------------
    class DoctorsCard
    {
        constructor(img, alt, h5, h6, parentSelector, ...classes)
        {
            this.img = img;
            this.alt = alt;
            this.h5 = h5;
            this.h6 = h6;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render()
        {
            const element = document.createElement('div');
            if(this.classes.length === 0)
            {
                this.classes = 'doctors__card';
                element.classList.add(this.classes);
            }
            else
            {
                this.classes.forEach(className => element.classList.add(className));
            }            

            element.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h5>${this.h5}</h5>
                <h6>${this.h6}</h6>`;
            this.parentSelector.append(element);
        }
    }

    getResource('http://localhost:3000/doctors').then(data => {
        data.forEach(({img, alt, h5, h6}) => {
            new DoctorsCard(img, alt, h5, h6, '.section__doctors .doctors__cards').render();
        });
    });


    // ------------------------ SECTION NEWS -----------------------
    class NewsCard
    {
        constructor(date, h4, h6, a, img, alt, parentSelector, ...classes)
        {
            this.date_time= date;
            this.h4 = h4;
            this.h6 = h6;
            this.a = a;
            this.img = img;
            this.alt = alt;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render()
        {
            const element = document.createElement('div');
            if(this.classes.length === 0)
            {
                this.classes = 'news__cards';
                element.classList.add(this.classes);
            }
            else
            {
                this.classes.forEach(className => element.classList.add(className));
            }            

            element.innerHTML = `
                <div class="news__card layout-2-columns">
                    <div class="news-card__info">
                        <h6>${this.date}</h6>
                        <h4>${this.h4}</h4>
                        <h6>${this.h6}</h6>
                        <a href="#">${this.a}</a>
                    </div>
                    <img src="${this.img}" alt="${this.alt}">
                </div>`;
            this.parentSelector.append(element);
        }
    }

    getResource('http://localhost:3000/news').then(data => {
        data.forEach(({date, h4, h6, a, img, alt}) => {
            new NewsCard(date, h4, h6, a, img, alt, '.section__news').render();
        });
    });


    // ------------------------ SUBSCRIBE -----------------------
    const inputSubscribe = document.querySelector('.addition__input'),
          emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
          buttonSubscribe = document.querySelector('.button_subscribe'),
          formSubscribe = document.querySelector('.subscribe__form');
    let email;
    
    inputSubscribe.addEventListener('input', checkValidation);

    function checkValidation(){
        if (isEmailValid(inputSubscribe.value)) 
        {
            inputSubscribe.style.borderColor = 'green';
        }
        else
        {
            inputSubscribe.style.borderColor = 'red';
        }           
    };

    function isEmailValid(value) {
        return emailRegExp.test(value);
    }

    buttonSubscribe.addEventListener('click', function(e){
        e.preventDefault();
        const element = document.createElement('p');
        element.style.cssText = 'padding-bottom: 15px; font-size: 20px; width: 100%; text-align:center;';
        if(isEmailValid(inputSubscribe.value))
        {
            localStorage.setItem('email', inputSubscribe.value);
            if(element.classList.contains('invalid')){
                element.classList.remove('invalid');
                element.style.display = 'none';
            };
            element.classList.add('valid');
            element.innerHTML = 'Подписка оформлена';
        }
        else
        {
            element.classList.add('invalid');
            element.innerHTML = 'Неверный формат ввода';
        }
        formSubscribe.append(element);
    });
});