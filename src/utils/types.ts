import React from 'react';

export type User = {
  id: string,
  uuid: string,
  name: string,
}

export type SetUser = React.Dispatch<React.SetStateAction<User>>

export type Room = {
  id: string,
  name: string,
  ownerId: string,
  isPrivate: boolean,
}

export type SetRoom = React.Dispatch<React.SetStateAction<Room>>

export type UrlType = {
  current: string,
  setCurrent: React.Dispatch<React.SetStateAction<string>>,
  backup: string,
  setBackup: React.Dispatch<React.SetStateAction<string>>,
}

export type MessageType = {
  id: string,
  text: string,
  type: string,
  duration: number | undefined
};

export type DataType = string | ArrayBufferLike | Blob | ArrayBufferView;

export type SendFunction = (data: DataType) => void;

export type JoinRequest = {
  requesterId: string,
  requesterUsername: string,
  roomId: string,
}
