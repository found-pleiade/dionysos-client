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
  const [wasHidden, setWasHidden] = useState(false);
  const intervalDuration = 10;
  const showAnimationStep = intervalDuration;
  const hideAnimationStep = messageDuration() + transitionDuration;
  const removeMessageStep = messageDuration() + transitionDuration * 2;

  const animation = () => {
    if (time >= showAnimationStep) messageRef.current.classList.add('show');
    if (time >= hideAnimationStep) {
      setTimeout(() => {
        setWasHidden(true);
      }, transitionDuration);
      messageRef.current.classList.remove('show');
    }
    if (time >= removeMessageStep && wasHidden) messages.remove(message.id);

    messageRef.current.style.setProperty('--progress', (time / hideAnimationStep));
    setTime(time + intervalDuration);
  };

  useEffect(() => {
    const timeout = setTimeout(animation, intervalDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  useEffect(() => {
    messageRef.current.style.transitionDuration = `${transitionDuration}ms`;
  }, []);

  return (
    <p ref={messageRef} className={`relative first-letter:uppercase ${color()} font-medium p-2 last:rounded-b-md message w-full text-center`}>
      {text}
    </p>
  );
};

export default Message;
