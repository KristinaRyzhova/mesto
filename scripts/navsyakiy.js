плавное открытие закрытие:
.popup{
    opacity: 0;
    pointer-events: none;
    transition: opacity .5s;
    background: rgba(16, 15, 13, .8);
    ...
  }
  .popup_opened {
    opacity: 1;
    pointer-events: all;
    z-index: 5;
  }



  fullImageClose.addEventListener('click', function() {
    closePopup(popupFullImages);
  });




  