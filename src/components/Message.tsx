import React, { useEffect, useRef, useState } from 'react';
import { notNil } from '../utils';
import { MessageType } from '../utils/types';
import useMessages from '../hooks/messages';

const roundDownToNearest10 = (num: number) => Math.floor(num / 10) * 10;

const Message = ({
  message,
  messages,
}: {
  messages: ReturnType<typeof useMessages>;
  message: MessageType,
}) => {
  const {
    text, type, duration: delay,
  } = message;
  const messageRef = useRef<any>();

  const transitionDuration = 300;
  const messageDuration = () => {
    if (notNil(delay)) return roundDownToNearest10(delay as number);
    return roundDownToNearest10((text.length / 7) * 1000);
  };

  const color = () => {
    if (type === 'error') return 'bg-error';
    if (type === 'info') return 'bg-pending';
    return 'bg-background-500';
  };

  const [time, setTime] = useState(0);
  const intervalDuration = 10;
  const showAnimation = intervalDuration;
  const hideAnimation = messageDuration() + transitionDuration;
  const removeMessage = messageDuration() + transitionDuration * 2;

  const animation = () => {
    setTime(time + intervalDuration);

    if (time === showAnimation) messageRef.current.classList.add('show');
    if (time === hideAnimation) messageRef.current.classList.remove('show');
    if (time === removeMessage) messages.remove(message.id);
  };

  useEffect(() => {
    const timeout = setTimeout(animation, intervalDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return (
    <p ref={messageRef} className={`first-letter:uppercase ${color()} font-medium p-2 last:rounded-b-md message w-full text-center`} style={{ transitionDuration: `${transitionDuration}ms` }}>
      {text}
    </p>
  );
};

export default Message;
