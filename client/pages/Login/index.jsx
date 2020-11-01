import { A, navigate } from 'hookrouter';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import api from '../../services/api';
import { actions } from '../../store';
import './index.scss';

export default function Login() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const sendForm = (e) => {
    e.preventDefault();
    api.Auth.login(formData)
      .then(({ data }) => {
        dispatch(actions.setUserInfo({ token: data }));
        addToast('Авторизация пройдена.', {
          appearance: 'success',
          autoDismiss: true,
        });
        document.getElementById('login-form').reset();
        setFormData({
          login: '',
          password: '',
        });
        navigate('/');
      })
      .catch(() => {
        addToast('Что-то пошло не так =(.', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  return (
    <div>
      <h3>Авторизация</h3>
      <Form id="login-form" onSubmit={(e) => sendForm(e)}>
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

        <Form.Group controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            required
          />
        </Form.Group>

        <div className="center">
          <Button variant="primary" type="submit" disabled={loading}>
            Отправить
          </Button>
        </div>
        <div align="center" justify="center">
          <p>
            Нет аккаунта?
            <A className="link" href="/signup">
              Зарегистрироваться
            </A>
            .
          </p>
        </div>
      </Form>
    </div>
  );
}
