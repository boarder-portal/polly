import './styles/globals.scss';
import './styles/palette.scss';

import './plugins/atom';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from 'client/components/App/App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
