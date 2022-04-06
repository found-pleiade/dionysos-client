import React, { useEffect, useRef, useState } from 'react';
import { notNil } from '../utils';
import { MessageType } from '../utils/types';
import useMessages from '../hooks/messages';

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
  /**
   * Reference to the message DOM node to edit it's style property.
   */
  const messageRef = useRef<any>();

  /**
   * Duration of the css transition in ms.
   */
  const transitionDuration = 300;
  /**
   * If the delay was set, use it, otherwise get the duration based on the length
   * of the message.
   */
  const messageDuration = () => {
    if (notNil(delay)) return delay as number;
    return (text.length / 7) * 1000;
  };

  /**
   * Tailwind CSS class based on message type.
   */
  const color = () => {
    if (type === 'error') return 'bg-error';
    if (type === 'info') return 'bg-pending';
    return 'bg-background-500';
  };

  // State storing the time passed since the message was added.
  const [time, setTime] = useState(0);
  // If the message had done it's end transition, set to true.
  // Used to know if the message should be removed.
  const [wasHidden, setWasHidden] = useState(false);
  // Duration of an interval in ms.
  const intervalDuration = 10;

  /**
   * Steps in milliseconds for the lifespan of the message.
   */
  // At least 1ms otherwise the start transition will not play.
  const showAnimationStep = intervalDuration;
  // The message duration with the start transition.
  const hideAnimationStep = messageDuration() + transitionDuration;
  // The message duration with the start and end transitions.
  const removeMessageStep = messageDuration() + transitionDuration * 2;

  /**
   * Function executed every intervalDuration.
   * Execute different steps based on time passed since the message was added.
   */
  const animation = () => {
    if (time >= showAnimationStep) messageRef.current.classList.add('show');
    if (time >= hideAnimationStep) {
      setTimeout(() => setWasHidden(true), transitionDuration);
      messageRef.current.classList.remove('show');
    }
    if (time >= removeMessageStep && wasHidden) messages.remove(message.id);

    // Update the progress bar in the background of the message.
    messageRef.current.style.setProperty('--progress', (time / hideAnimationStep));
    // Update time.
    setTime(time + intervalDuration);
  };

  /**
   * When time change, execute animation avec intervalDuration,
   * changing the time, executing animation again, etc.
   */
  useEffect(() => {
    const timeout = setTimeout(animation, intervalDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  // Set transition duration for the message on component load.
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
