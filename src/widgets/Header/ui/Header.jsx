import { setUser } from '@app/providers/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mockUser } from '../data/mockUser';
import styles from './Header.module.css';

export function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.app.user);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(setUser(mockUser));
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <h1>🛒 Интернет-магазин</h1>
      <div className={styles.user_info}>
        {user ? <span>Привет, {user.name}!</span> : <span>Загрузка...</span>}
      </div>
    </header>
  );
}
