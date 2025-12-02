import { createContext } from 'react';
import { Network } from './Network';

export const NetworkContext = createContext<Network>(new Network());