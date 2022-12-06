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
    
});