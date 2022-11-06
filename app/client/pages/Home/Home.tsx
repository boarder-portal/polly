import { FC, memo } from 'react';
import { FaPlus } from 'react-icons/all';

import roomHttpClient from 'client/utilities/HttpClient/RoomHttpClient';

import useFetchedData from 'client/hooks/useFetchedData';

import Flex from 'client/components/Flex/Flex';
import Heading from 'client/components/Heading/Heading';

import * as styles from './Home.module.scss';

const Home: FC = () => {
  const { value: roomsResponse } = useFetchedData((signal) => roomHttpClient.getAll(signal));

  console.log(roomsResponse?.rooms);

  return (
    <Flex className={styles.root} direction="column">
      <Flex alignItems="baseline" between={2}>
        <Heading level={1}>Мои комнаты</Heading>

        <FaPlus className={styles.plusIcon} />
      </Flex>
    </Flex>
  );
};

export default memo(Home);
