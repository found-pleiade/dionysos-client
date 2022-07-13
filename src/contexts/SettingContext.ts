import { Context, createContext } from 'react';
import useSettings from '../hooks/settings';

const SettingsContext = createContext(null as any);

export default SettingsContext as Context<ReturnType<typeof useSettings>>;
