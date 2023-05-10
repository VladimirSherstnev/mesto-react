import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from "react";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

const App = () => {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAddPlacePopupOpen, setIsEditAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setNewCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        const results = data.map((element) => ({
          _id: element._id,
          name: element.name,
          link: element.link,
          likes: element.likes,
          owner: element.owner 
        }));
        setNewCards(results);
      })
      .catch((err) => console.error(err));
  }, []);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getInitialUser()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => console.error(err));
  }, []);

  const [isSelectedCard, setIsSelectedCard] = useState({name: '', link: ''});

  function handleCardClick(card) {
    setIsSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
     setNewCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((err) => console.error(err));

} 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsEditAddPlacePopupOpen(!isEditAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSelectedCard({name: '', link: ''});
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onCardLike = {handleCardLike}
        cards={cards}
        card={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={'Сохранить'}
      >
        <div className="popup__input-wrap">
          <input
            required=""
            minLength={2}
            maxLength={40}
            type="text"
            className="popup__input popup__content popup__content_type_name"
            name="popup__content_type_name"
            id="name-input"
          />
          <span className="popup__message-error name-input-error" />
        </div>
        <div className="popup__input-wrap">
          <input
            required=""
            minLength={2}
            maxLength={200}
            type="text"
            className="popup__input popup__content popup__content_type_occupation"
            name="popup__content_type_occupation"
            id="occupation-input"
          />
          <span className="popup__message-error occupation-input-error" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        isOpen={isEditAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText={'Создать'}
      >
        <div className="popup__input-wrap">
          <input
            required=""
            minLength={2}
            maxLength={30}
            type="text"
            className="popup__input popup__content popup__content_type_name-place"
            name="popupPlaceName"
            placeholder="Название"
            id="name-place-input"
          />
          <span className="popup__message-error name-place-input-error" />
        </div>
        <div className="popup__input-wrap">
          <input
            required=""
            type="url"
            className="popup__input popup__content popup__content_type_link"
            name="popupPlaceLink"
            placeholder="Ссылка на картинку"
            id="link-input"
          />
          <span className="popup__message-error link-input-error" />
        </div>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={'Сохранить'}
      >
        <div className="popup__input-wrap">
          <input
            required=""
            type="url"
            className="popup__input popup__content popup__content_type_avatar-link"
            placeholder="Ссылка на аватар"
            name="popupAvatarLink"
            id="avatar-link-input"
          />
          <span className="popup__message-error avatar-link-input-error" />
        </div>
      </PopupWithForm>
      <ImagePopup card={isSelectedCard} onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
