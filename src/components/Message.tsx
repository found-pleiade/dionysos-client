import React from 'react';
import * as R from 'ramda';
import { notNil } from '../utils';
import { MessageType } from '../utils/types';

const getColor = (type: string | undefined) => {
  if (type === 'error') return 'bg-error';
  if (type === 'info') return 'bg-pending';
  return 'bg-background-500';
};

const Message = ({
  message,
}: { message: MessageType, }) => {
  const { text, type, duration } = message;

  if (R.isNil(text)) return <div />;

  const animationDuration = notNil(duration) ? duration : (text.length / 5);

  return (
    <p className={`first-letter:uppercase ${getColor(type)} font-medium p-2 last:rounded-b-md message w-full text-center`} style={{ animationDuration: `${animationDuration}s` }}>
      {text}
    </p>
  );
};

export default Message;
