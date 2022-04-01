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

export type ModalType = {
  isShowing: boolean,
  toggle: () => void,
}

export type UrlType = {
  current: string,
  setCurrent: React.Dispatch<React.SetStateAction<string>>,
  backup: string,
  setBackup: React.Dispatch<React.SetStateAction<string>>,
}

export type ErrorType = { message: string | undefined, duration: number | undefined };

export type ErrorsType = {
  get: ErrorType[];
  add: (message: string | undefined, duration?: number | undefined) => void;
  clear: (message?: string | undefined, duration?: number | undefined) => void;
}

export type DataType = string | ArrayBufferLike | Blob | ArrayBufferView;

export type SendFunction = (data: DataType) => void;

export type JoinRequest = {
  requesterId: string,
  requesterUsername: string,
  roomId: string,
}
