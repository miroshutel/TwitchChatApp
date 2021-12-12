import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'
import UserList from './UserList'
import { FaUsers, FaArrowAltCircleLeft } from 'react-icons/fa'
const MessagingContainer = ({ users }) => {
    const [cookies, setcookies, removeCookie] = useCookies(['user'])
    const [userLiseVisble, setUserListVisble] = useState(false)
    const logout = () => {
        removeCookie('Name', cookies.Name)
        removeCookie('HashedPassword', cookies.HashedPassword)
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
    }
    return (
        <div className="messaging-container">
            {!userLiseVisble && (
                <Window>
                    <FaUsers className='icon' onClick={() => setUserListVisble(true)} />
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                    <button className='standard-button' onClick={logout}>LogOut</button>
                </Window>
            )}
            {userLiseVisble && (
                <Window>
                    <div className='chat-container'>
                        <FaArrowAltCircleLeft className='icon' onClick={() => setUserListVisble(false)} />
                        <ChannelHeader title='Users' />
                        <UserList users={users} />
                    </div>
                </Window>
            )}

            <Thread />
        </div>
    )
}

export default MessagingContainer
