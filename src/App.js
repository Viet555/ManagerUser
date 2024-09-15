import Header from './component/Header';
import './App.scss';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import AppRoute from './Routes/AppRoute';
function App() {

  const { user, loginContext } = useContext(UserContext)
  console.log('>> users :', user)
  ////capnhat lai khi refesh 
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))//lay lai tt
    }
  }, [])
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <AppRoute />
        </Container>


      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
