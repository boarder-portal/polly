import { FC, memo } from 'react';

import Flex from 'client/components/Flex/Flex';

const Home: FC = () => {
  return (
    <Flex direction="column" alignItems="center" between={4}>
      <span>Welcome to Polly!</span>

      <span>polly</span>
    </Flex>
  );
};

export default memo(Home);
