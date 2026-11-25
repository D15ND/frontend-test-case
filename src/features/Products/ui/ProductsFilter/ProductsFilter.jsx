import styles from './ProductsFilter.module.css';

function ProductsFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onToggleFilters,
  showFilters,
}) {
  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <input
          type='text'
          placeholder='Поиск товаров...'
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className={styles.filter_controls}>
        <select value={selectedCategory} onChange={onCategoryChange}>
          <option value='all'>Все категории</option>
          <option value='phones'>Телефоны</option>
          <option value='laptops'>Ноутбуки</option>
          <option value='tablets'>Планшеты</option>
        </select>

        <select value={sortBy} onChange={onSortChange}>
          <option value='name'>По названию</option>
          <option value='price'>По цене</option>
        </select>

        <button onClick={onToggleFilters}>
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>
      </div>
    </div>
  );
}

export default ProductsFilter;
