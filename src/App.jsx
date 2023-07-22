import { useRef, useEffect, useState } from 'react';

import './App.css';

import { XTerm } from 'xterm-for-react';
import Swal from 'sweetalert2';

export default function App() {
  // This is to store the command in buffer. It will be sent to the server
  // if the user presses Enter
  const [bufferedCommand, setBufferedCommand] = useState('');

  const xTerminalRef = useRef();

  const onKeyPressed = (event) => {
    const printable =
      !event.domEvent.altKey &&
      !event.domEvent.ctrlKey &&
      !event.domEvent.metaKey;

    if (event.domEvent.keyCode === 13) {
      if (bufferedCommand) {
        if (bufferedCommand === 'hello') {
          xTerminalRef.current.terminal.write('\r\n  ...');
          setTimeout(() => {
            xTerminalRef.current.terminal.write(
              ' i deed not heet her i deed nooooot\r\n     oh hi mark'
            );
            xTerminalRef.current.terminal.prompt();
          }, 700);
        } else {
          xTerminalRef.current.terminal.prompt();
        }
        // ! Here i'm sending the command to the server via socket.
        // To make things simple, i'm just using Swal2 to display
        // a success message whenever this is triggered. Image,
        // every trigger will be sent to the server instead :)
        Swal.fire({
          icon: 'success',
          title: bufferedCommand,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        setBufferedCommand(undefined);
      }
    } else if (event.domEvent.keyCode === 8) {
      // Do not delete the prompt

      if (xTerminalRef.current.terminal._core.buffer.x > 2) {
        xTerminalRef.current.terminal.write('\b \b');
        setBufferedCommand(
          bufferedCommand.substring(0, bufferedCommand.length - 1)
        );
      }
    } else if (printable) {
      xTerminalRef.current.terminal.write(event.domEvent.key);
      setBufferedCommand(
        bufferedCommand
          ? bufferedCommand + event.domEvent.key
          : event.domEvent.key
      );
    }
  };

  useEffect(() => {
    // Create a new function "prompt" which
    // requests a prompt from the user

    // Only do this, when reference has changes and is not undefined
    if (xTerminalRef.current) {
      xTerminalRef.current.terminal.prompt = () => {
        xTerminalRef.current.terminal.write('\r\n$ ');
      };

      xTerminalRef.current.terminal.prompt();
    }
  }, [xTerminalRef]);

  return (
    <div>
      <XTerm
        options={{
          cursorBlink: true,
          disableStdin: false,
        }}
        onKey={(event) => onKeyPressed(event)}
        ref={xTerminalRef}
      />
    </div>
  );
}
