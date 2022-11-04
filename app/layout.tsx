import { Layout } from '../types/next';

const RootLayout: Layout = (props) => {
  const { children } = props;

  return (
    <html lang="ru">
      <head>
        <title>Polly</title>
      </head>

      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
