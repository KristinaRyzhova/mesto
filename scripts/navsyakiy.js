
function handleCardFormSubmit (evt) {
    //функция добавления новой карточки на страницу
    evt.preventDefault();
    const newCreateCard = {name:titleInput.value, link:linkInput.value};
    renderCard(newCreateCard, elementCard, 'prepend')
    closePopup(addCardPopup)
    formCard.reset()
  
  }
  
  