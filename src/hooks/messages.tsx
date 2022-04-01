import { useState } from 'react';
import { MessageType } from '../utils/types';

const useMessages = () => {
  const [messages, setMessages] = useState<Array<MessageType>>([]);

  /**
   * Add a string as an error, optionnal duration.
   */
  const add = (text: string, type: string, duration?: number) => {
    setMessages(messages.concat({ text, type, duration }));
  };

  /**
   * Clear all errors. Optionnal error and duration if one is needed after the clean up.
   * Calling clean then add cause async problems, so you can add an error with the clean function.
   */
  const clear = (text?: string, type?: string, duration?: number) => {
    setMessages([{ text, type, duration }]);
  };

  return {
    get: messages,
    add,
    clear,
  };
};

export default useMessages;
