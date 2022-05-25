import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import Tracker from '../../assests/images/Icon.png';
import SideImg from '../../assests/images/sideImg.png';
import Language from '../Translate/Language';
import { authActions } from '../../Reducer/auth';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post('https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/auth/login', {
        email: email,
        password: password
      })
      .then((response: any) => {
        console.log(response.data['userId']);
        localStorage.setItem('userId', response.data['userId']);
        window.location.href = '/dashboard';
        dispatch(authActions.login());
      })
      .catch((error: any) => {
        alert(error.response.data['error']);
        navigate('/');
      });
  };
  if (localStorage.getItem('isAuth') === 'true') {
    window.location.href = '/dashboard';
  }
  return (
    <div className="login">
      <div className="login_sidebar">
        <img src={Tracker} className="login_tracker" alt="" />
        <img src={SideImg} className="login_tracker" alt="" />
        <Language flag={true} />
      </div>
      <div className="login_section">
        <Form className="login_form" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('Email')}</Form.Label>
            <Form.Control type="email" placeholder={t('email')} onChange={emailHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('Password')}</Form.Label>
            <Form.Control type="password" placeholder="password" onChange={passwordHandler} />
          </Form.Group>
          <Button variant="dark" className="login_button" type="submit">
            {t('LOGIN')}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
