import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';

const Auth = () => {
    const [cookies, setcookies, removeCookie] = useCookies(['user'])
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmedPassword, setConfirmedPassword] = useState(null)
    const [error, setError] = useState(false)
    const handleSubmit = async (endpoint) => {
        console.log(endpoint)
        if (!isLogin && password !== confirmedPassword) {
            setError(true)
            return
        }
        const response = await axios.post(`http://localhost:8000/${endpoint}`, {
            username,
            password,
        })
        console.log(response)
        setcookies('Name', response.data.username)
        setcookies('HashedPassword', response.data.hashedPassword)
        setcookies('UserId', response.data.userId)
        setcookies('AuthToken', response.data.token)
        window.location.reload()
    }

    console.log(username)
    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <div className="auth-container-form">
                    <input type="text" id="username" name="username" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
                    <input type="password" id="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    {!isLogin && <input type="password" id="password-check"
                        name="password-check" placeholder="confirm password" onChange={(e) => setConfirmedPassword(e.target.value)} />
                    }
                    {error && <p>Make sure passwords match</p>}
                    <button className='standard-button' onClick={() => handleSubmit(isLogin ? 'login' : 'signup')}>GO!</button>
                </div>
                <div className='auth-options'>
                    <button onClick={() => setIsLogin(false)} style={{ backgroundColor: !isLogin ? "#151a1f" : "#070a0d" }}>
                        Sign up
                    </button>
                    <button onClick={() => setIsLogin(true)} style={{ backgroundColor: isLogin ? "#151a1f" : "#070a0d" }}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth
