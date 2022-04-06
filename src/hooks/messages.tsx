import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '../utils/types';

const useMessages = () => {
  const [messages, setMessages] = useState<Array<MessageType>>([]);

  /**
   * Add a string as a message, optionnal duration.
   */
  const add = (text: string, type: string, duration?: number) => {
    setMessages(messages.concat({
      id: uuidv4(), text, type, duration,
    }));
  };

  /**
   * Clear all messages. Optionnal text and duration if one is needed after the clean up.
   * Calling clean then add cause async problems, so you can add a message with the clean function.
   */
  const clear = (text?: string, type?: string, duration?: number) => {
    const messagesWithNoDuration = messages.map((message) => ({
      ...message,
      duration: 0,
    })) as Array<MessageType>;

    if (!text || !type) {
      setMessages(messagesWithNoDuration);
    } else {
      setMessages(messagesWithNoDuration.concat({
        id: uuidv4(), text, type, duration,
      }));
    }
  };

  /**
   * Remove a message by id.
   */
  const remove = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return {
    get: messages,
    add,
    clear,
    remove,
  };
};

export default useMessages;
