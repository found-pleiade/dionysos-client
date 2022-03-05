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
