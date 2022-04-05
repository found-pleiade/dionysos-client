import React from 'react';
import useMessages from '../hooks/messages';
import Message from './Message';

const Messages = ({ messages }: {
  messages: ReturnType<typeof useMessages>;
}) => (
  <div className="z-50 absolute left-[50%] translate-x-[-50%] flex flex-col items-center min-w-[300px]">
    {messages.get.map((message) => (
      <Message
        key={message.id}
        messages={messages}
        message={message}
      />
    ))}
  </div>
);

export default Messages;
