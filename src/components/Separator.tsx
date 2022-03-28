import React from 'react';

/**
 * Just a styled div to user as a separator for side menus like the panel.
 */
const Separator = ({ className }: { className?: string }) => <div className={`h-[1px] w-full bg-background-600  my-3 ${className}`} />;

export default Separator;
