import styles from './CartFooter.module.css';

export function CartFooter({ totalPrice, onCheckout, showCheckout, isEmpty }) {
  return (
    <div className={styles.cart_footer}>
      <div className={styles.total}>Итого: ${totalPrice}</div>
      <button
        className={styles.checkout_btn}
        onClick={onCheckout}
        disabled={isEmpty || showCheckout}
      >
        {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
      </button>
    </div>
  );
}
