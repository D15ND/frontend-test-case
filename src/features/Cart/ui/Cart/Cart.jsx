import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from '@app/providers/store/store';
import { CartFooter } from '../CartFooter/CartFooter';
import { CartItem } from '../CartItem/CartItem';
import styles from './Cart.module.css';

export function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.app.cart);
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );
  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleRemoveItem = id => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      alert('Заказ оформлен!');
      dispatch(clearCart());
      setShowCheckout(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className={styles.cart}>
      <button className={styles.cart_toggle} onClick={() => setIsOpen(!isOpen)}>
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div className={styles.cart_dropdown}>
          <div className={styles.cart_header}>
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className={styles.cart_items}>
            {cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))
            )}
          </div>
          <CartFooter
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
            showCheckout={showCheckout}
            isEmpty={cart.length === 0}
          />
        </div>
      )}
    </div>
  );
}
