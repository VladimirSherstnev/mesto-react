import hoverAvatar from "../images/Avatar.svg";

function Main(props){
    return (
      <main className="content">
        <section className="profile">
          <div 
          className="profile__avatar-container"
          onClick={props.onEditAvatar}>
            <img
              src={hoverAvatar}
              alt="изменить аватар"
              className="profile__avatar-hover"
            />
            <img alt="фотография профиля" className="profile__avatar" />
          </div>
        <div className="profile__info">
          <h1 className="profile__name" />
          <button 
          type="button" 
          className="profile__button-name-change"
          onClick={props.onEditProfile} 
          />
          <p className="profile__occupation" />
        </div>
        <button 
        type="button" 
        className="profile__button-add-place" 
        onClick={props.onAddPlace} 
        />
        </section>
        <section className="elements"></section>
      </main>
    )
}

export default Main;