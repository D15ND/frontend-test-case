import { Provider } from 'react-redux';
import { store } from './providers/store/store';

import './styles/index.css';
import AppLayout from './AppLayout';

function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export default App;
