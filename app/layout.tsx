import { FC, ReactNode } from 'react';

export interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = (props) => {
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
