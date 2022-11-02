import { useRef, useState } from 'react';

interface Messages {
   id: number,
   event: string,
   username: string,
   message: string,
}

const Main = () => {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [value, setValue] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('')
    const socket = useRef<any>()

    function connect() {
        socket.current = new WebSocket('ws://localhost:8080')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event: any) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }

        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {
        const message: Messages = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }


    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя" />
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }


    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(message =>
                        <div key={message.id}>
                            {message.event === 'connection'
                                ? <div className="connection_message">
                                    Пользователь {message.username} подключился
                                </div>
                                : <div className="message">
                                    {message.username}. {message.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;