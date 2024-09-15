import { Route, Routes, Link } from 'react-router-dom';
import TableUsers from '../component/TableUsers';
import Home from '../component/Home';
import Login from '../component/Login';
import PrivateRoute from './PrivateRoute';
import NotFoul from '../component/NotFoul';
const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoul />} />

            </Routes>
            {/* <PrivateRoute path="/users" >
                < TableUsers />
            </PrivateRoute> */}
        </>
    )
}
export default AppRoute;