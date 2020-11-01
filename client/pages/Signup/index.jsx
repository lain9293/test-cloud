import { A, navigate } from 'hookrouter';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import api from '../../services/api';
import { actions } from '../../store';
import './index.scss';

export default function Signup() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
  });

  const sendForm = (e) => {
    e.preventDefault();
    api.Auth.register(formData)
      .then(({ data }) => {
        dispatch(actions.setUserInfo({ token: data }));
        addToast('Аккаунт создан.', {
          appearance: 'success',
          autoDismiss: true,
        });
        document.getElementById('signup-form').reset();
        setFormData({
          login: '',
          email: '',
          password: '',
        });
        navigate('/');
      })
      .catch(() => {
        addToast('Аккаунт не создан.', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const validatePassword = () => {
    const pass2 = document.getElementById('password').value;
    const pass1 = document.getElementById('passwordRepeat').value;
    if (pass1 !== pass2) {
      document
        .getElementById('passwordRepeat')
        .setCustomValidity('Пароли не совпадают');
    } else document.getElementById('passwordRepeat').setCustomValidity('');
  };

  return (
    <div>
      <h3>Регистрация</h3>
      <h4>Пожалуйста, заполните эту форму, чтобы создать учетную запись.</h4>
      <Form id="signup-form" onSubmit={(e) => sendForm(e)}>
        <Form.Group controlId="login">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите логин"
            required
            onChange={(e) => setFormData({
              ...formData,
              login: e.target.value,
            })}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value,
            })}
            required
          />
          <Form.Text className="text-muted">
            Мы никогда никому не передадим вашу электронную почту.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            onChange={(e) => {
              validatePassword();
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            required
          />
        </Form.Group>

        <Form.Group controlId="passwordRepeat">
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Повторите пароль"
            onChange={() => validatePassword()}
            required
          />
        </Form.Group>
        <p>
          Создавая учетную запись, вы соглашаетесь с нашими
          <A className="link" href="/terms-and-privacy">
            Условиями
          </A>
          .
        </p>
        <div className="center">
          <Button variant="primary" type="submit" disabled={loading}>
            Отправить
          </Button>
        </div>
        <div align="center" justify="center">
          <p>
            Уже есть аккаунт?
            <A className="link" href="/login">
              Войти в систему
            </A>
            .
          </p>
        </div>
      </Form>
    </div>
  );
}
