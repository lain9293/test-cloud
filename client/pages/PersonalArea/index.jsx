import { navigate } from 'hookrouter';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Guard } from '../../components';
import { actions } from '../../store';

export default function PersonalArea() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.logout());
    navigate('/login');
  };

  return (
    <Guard>
      <>
        <h3>Личный кабинет</h3>
        <Button variant="primary" type="button" onClick={logout}>
          Выйти из аккаунта
        </Button>
      </>
    </Guard>
  );
}
