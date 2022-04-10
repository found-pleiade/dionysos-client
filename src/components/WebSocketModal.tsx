import React from 'react';
import useConnection from '../hooks/connection';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import RowGroup from './RowGroup';
import SpaceBetween from './SpaceBetween';

const WebSocketModal = ({ connection }: {
  connection: ReturnType<typeof useConnection>
}) => (
  <Modal modal={connection.modal}>
    <div>
      <h3 className="mb-2 font-medium">WebSocket server</h3>
      <RowGroup>
        <Input id="connection" noHelper className="rounded-r-none" value={connection.url.current} setValue={connection.url.setCurrent} />
        {connection.currentStatusIcon}
      </RowGroup>
    </div>

    <SpaceBetween>
      <Button onClick={connection.modal.cancel} colorless>Cancel</Button>
      <Button onClick={connection.modal.save}>Save</Button>
    </SpaceBetween>
  </Modal>
);

export default WebSocketModal;
