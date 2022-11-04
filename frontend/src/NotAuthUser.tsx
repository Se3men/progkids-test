import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    connect: () => void
}

const UserNotAuth = (props: Props) => {

    const { username, setUsername, connect } = props

    return (
        <div className="center">
            <div className="form">
                <input
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    type="text"
                    placeholder="Введите ваше имя" />
                <button onClick={connect}>Войти</button>
            </div>
        </div>
    );
};

export default UserNotAuth;