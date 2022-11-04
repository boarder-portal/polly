import { FC, ReactElement, ReactNode } from 'react';

import { MaybePromise } from './common';

export type Layout = FC<{ children: ReactNode }>;

export type Page = () => MaybePromise<ReactElement>;
