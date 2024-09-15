import { useEffect, useState, useContext } from 'react';
import './log.scss'
import { PostLogin } from '../Services/UserServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [isshowpassword, setisshowpassword] = useState(false)
    const [loadingLogin, setloadingLogin] = useState(false)
    const { loginContext } = useContext(UserContext)
    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if (token) {

    //     }
    // }, [])
    const handleLogin = async () => {
        if (!email && !Password) {
            toast.error('not foud email or Password')
            return;
        }
        /////loading login
        setloadingLogin(true)
        let res = await PostLogin(email.trim(), Password)
        //  'eve.holt@reqres.in'
        if (res && res.token) {
            loginContext(email, res.token);
            navigate('/')
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setloadingLogin(false)

    }
    const handleGoback = () => {
        navigate('/')
    }
    const handleKeypassWord = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }
    return (
        <div className="login-container col-12 col-sm-4 ">
            <div className="header-login" >Login </div>

            <input
                type="text"
                placeholder='Email or Username'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className='input-2'>
                <input
                    type={isshowpassword === true ? "text" : "password"}
                    placeholder='Password'
                    value={Password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handleKeypassWord(event)}
                />
                <i className={isshowpassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setisshowpassword(!isshowpassword)}
                ></i>
            </div>

            <button
                onClick={() => handleLogin()}
                disabled={email && Password ? false : true}
                className={email && Password ? "active" : ""}>
                {loadingLogin && <i className="fa-solid fa-sync fa-spin"></i>}
                Login</button>

            <div className='back'>
                <i className="fa-solid fa-arrow-rotate-left"></i><span onClick={() => handleGoback()}> &nbsp;Go back</span>
            </div>
        </div>

    )
}
export default Login;   