import { addToCart, setLoading, setProducts } from '@app/providers/store/store';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mockProducts } from '../../data/mockProducts';
import ProductFilter from '../ProductsFilter/ProductsFilter';
import styles from './ProductsList.module.css';

export function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.app.products);
  const loading = useSelector(state => state.app.loading);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));

    const timerId = setTimeout(() => {
      dispatch(setProducts(mockProducts));
      dispatch(setLoading(false));
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [dispatch]);

  const filteredProducts = useMemo(
    () =>
      products
        .filter(product => {
          const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCategory =
            selectedCategory === 'all' || product.category === selectedCategory;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'price') return a.price - b.price;
          return 0;
        }),
    [products, searchTerm, sortBy, selectedCategory],
  );

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = e => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return <p className={styles.loading}>Загрузка товаров...</p>;
  }

  return (
    <div className={styles.product_list}>
      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />

      <div className={styles.products}>
        {filteredProducts.map(product => (
          <div key={product.id} className={styles.product_card}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className={styles.price}>${product.price}</div>
            <button
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
