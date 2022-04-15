import React from 'react';
import { visibility } from '../utils';

/**
 * Just a styled div to user as a separator for side menus like the panel.
 */
const Separator = ({ visible = true }: { visible?: boolean }) => <div className={`h-[1px] w-full dark:bg-dark-primary-600 my-3 ${visibility(visible)}`} />;

export default Separator;
