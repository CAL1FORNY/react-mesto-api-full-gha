import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';
import { useLocation, useHistory } from 'react-router-dom';

function InfoTooltip (props) {
  const location = useLocation();
  const history = useHistory();
  function redirectPopup () {
    if (props.status) { props.onClose()
      if (location.pathname === '/sign-up') { history.push('/sign-in') }
    }
    props.onClose();
  }

  return (
    <div className={ `popup ${ props.isOpen ? 'popup_opened' : '' }` } id={ props.id }>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={ redirectPopup } aria-label="Закрыть форму" />
        <div className="auth__info">
          { props.status ? (
            <>
              <img src={ success } className="auth__status-icon" alt="Иконка успеха" />
              <p className="auth__status-text">Вы зарегистрировались!</p>
            </>
          ) : (
            <>
              <img src={ error } className="auth__status-icon" alt="Иконка ошибки" />
              <p className="auth__status-text">Ошибка! Попробуйте ещё раз.</p>
            </>
          ) }
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;




