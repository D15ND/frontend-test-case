import { setUser } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.app.user);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setUser({
          id: 1,
          name: 'Иван Иванов',
          email: 'ivan@example.com',
        }),
      );
    }, 500);
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

export default Header;
