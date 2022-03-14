import React from 'react';

export type User = {
  id: string,
  salt: string,
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

export type DataType = string | ArrayBufferLike | Blob | ArrayBufferView;

export type SendFunction = (data: DataType) => void;
