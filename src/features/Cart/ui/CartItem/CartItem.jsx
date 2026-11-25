import styles from './CartItem.module.css';

export function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className={styles.cart_item}>
      <img src={item.image} alt={item.name} />
      <div className={styles.item_details}>
        <h4>{item.name}</h4>
        <p>${item.price}</p>
        <div className={styles.quantity_controls}>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
      </div>
      <button className={styles.remove_btn} onClick={() => onRemove(item.id)}>
        Удалить
      </button>
    </div>
  );
}
