import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import { visibility } from '../utils';
import { ModalType } from '../utils/types';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const clickBackground = (event: ClickEvent, modal: ModalType) => {
  const el = event.target as HTMLDivElement;
  if (!el.classList.contains('modalWindow')) modal.toggle();
};

const Modal = ({ modal }: { modal: ModalType }) => (
  <div role="none" className={`${visibility(modal.isShowing)} absolute left-0 top-0 h-screen w-screen bg-neutral-900/60 z-10 flex justify-center items-center`} onClick={(event: ClickEvent) => clickBackground(event, modal)}>
    <div className="modalWindow w-[450px] space-y-6 bg-neutral-800 rounded-md relative">
      <XIcon className="h-6 w-6 absolute right-3 top-3 cursor-pointer hover:text-neutral-400" onClick={() => modal.toggle()} />
      {modal.content}
    </div>
  </div>
);

export default Modal;
