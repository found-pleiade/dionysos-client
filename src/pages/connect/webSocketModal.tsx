import useConnection from '../../hooks/connection';
import useInputStatusIcon from '../../hooks/inputStatusIcon';
import useMessages from '../../hooks/messages';

const webSocketModalFunctions = ({
  connection, messages, inputStatusIcon,
}: {
  connection: ReturnType<typeof useConnection>,
  messages: ReturnType<typeof useMessages>,
  inputStatusIcon: ReturnType<typeof useInputStatusIcon>,
}) => (modal: any) => ({
  save: () => {
    if (connection.currentUrl === connection.backupUrl && connection.isUp) {
      modal.toggle();
      return;
    }

    connection.setIsUp(false);
    inputStatusIcon.setCurrent(inputStatusIcon.icons.pending);

    try {
      const socket = new WebSocket(connection.currentUrl);

      socket.onopen = () => {
        connection.setWebSocket(socket);
        connection.setIsUp(true);
        inputStatusIcon.setCurrent(inputStatusIcon.icons.valid);
        messages.clear();
        connection.setBackupUrl(connection.currentUrl);
        modal.toggle();
      };

      socket.onclose = (event) => {
        inputStatusIcon.setCurrent(inputStatusIcon.icons.error);
        messages.add(`${event.code} : Maybe Wrong Web Socket address or server side mistake (wss://subdomain.domain.extension)`, 'error');
      };
    } catch (error) {
      const knownError = error as Error;
      inputStatusIcon.setCurrent(inputStatusIcon.icons.error);
      messages.add(knownError.message, 'error');
    }
  },
  cancel: () => {
    if (!connection.isUp && !connection.isUrlDifferent) { modal.toggle(); return; }

    messages.clear();
    connection.setIsUp(true);
    inputStatusIcon.setCurrent(inputStatusIcon.icons.valid);
    connection.setCurrentUrl(connection.backupUrl);
    modal.toggle();
  },
});

export default webSocketModalFunctions;
