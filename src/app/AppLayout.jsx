import { Cart } from '@features/Cart';
import { ProductsList } from '@features/Products';
import { Header } from '@widgets/Header';

function AppLayout() {
  return (
    <div className='app'>
      <Header />
      <div className='main-content'>
        <ProductsList />
        <Cart />
      </div>
    </div>
  );
}

export default AppLayout;
