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

export type ModalType = {
  isShowing: boolean,
  toggle: () => void,
  content: any,
  setContent: React.Dispatch<React.SetStateAction<any>>
}

export type SetRoom = React.Dispatch<React.SetStateAction<Room>>

export type dataType = string | ArrayBufferLike | Blob | ArrayBufferView;

export type sendFunction = (data: dataType) => void;
