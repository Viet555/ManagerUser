
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchaAllUser } from '../Services/UserServices'
import ReactPaginate from 'react-paginate';
import ModaladdUsers from './ModaladdUsers'
import ModalEditUsers from './ModalEditUsers';
import ModalConfirm from './ModalConfirm';
import _, { debounce } from "lodash"
import './TableUsers.scss';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse"
import { toast } from 'react-toastify';
const TableUsers = (props) => {

    const [isShowAddNew, setisShowAddNew] = useState(false)

    const handleClose = () => {
        setisShowAddNew(false)
        setShowModalEdit(false)
        setisShowModalConfirm(false)
    }

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUSers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalEdit, setShowModalEdit] = useState(false)
    const [isShowModalConfirm, setisShowModalConfirm] = useState(false)
    const [dataUserEdit, setdataUserEdit] = useState({})///nhờ reac giữ biến data
    const [dataUserDelete, setdataUserDelete] = useState({})///nhờ reac giữ biến data
    const [sortBy, setsortBy] = useState('asc')
    const [sortField, setsortField] = useState('id')
    const [exportdata, setExportdata] = useState("");

    useEffect(() => {
        //call APi
        getUsers();
    }, [])

    const getUsers = async (page) => {
        let res = await fetchaAllUser(page);
        if (res && res.data) {

            setListUsers(res.page)
            setTotalPages(res.total_pages)
            setListUsers(res.data)
        }
    }
    const usersUpdate = (users) => {
        setListUsers([users, ...listUsers])
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }
    ///editUsers
    ////truyen Users muon edit vao
    const handleEditUsers = (users) => {
        setdataUserEdit(users)///setdataUserEdit bằng chính cái users truyên vào
        setShowModalEdit(true)

    }
    const handleDeleteUser = (users) => {
        setisShowModalConfirm(true)
        setdataUserDelete(users);// luu lai thong tin ng dung muon xoa

    }
    const handleEditModalusers = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name
        setListUsers(cloneListUsers);
    }
    const DeleteUsersfromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = listUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers)
    }
    const handleSort = (sortBy, sortField) => {
        setsortBy(sortBy)
        setsortField(sortField)
        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        setListUsers(cloneListUsers)
        console.log(cloneListUsers)
    }
    const handlefind = debounce((event) => {

        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers)
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUsers(cloneListUsers)
        } else {
            getUsers(); // goi lai ham khi ""
        }
        console.log('', term)
    }, 300)

    // const getUsersExport = (event, done) => {
    //     let result = [];

    //     if (listUsers && listUsers.length > 0) {
    //         result.push("ID", "Email", "Frist Name", "Last Name")
    //         listUsers.map((item, index) => {
    //             let arr = [];
    //             arr[0] = item.id;
    //             arr[1] = item.email;
    //             arr[2] = item.first_name;
    //             arr[3] = item.last_name;
    //             result.push(arr)
    //         })

    //         setExportdata(result);
    //         done();
    //     }
    // }
    const handleImportCSV = (event) => {

        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            console.log('cckekek', file)
            if (file.type !== "text/csv") {
                toast.error('import err ')
                return;
            }
            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawcCSV = results.data;
                    if (rawcCSV.length > 0) {
                        if (rawcCSV[0] && rawcCSV[0].length === 3) {
                            if (rawcCSV[0][0] !== "email"
                                || rawcCSV[0][1] !== "first_name"
                                || rawcCSV[0][2] !== "last_name"
                            ) {
                                toast.error("wrongs form CSV files email or name")
                            }
                            else {
                                toast.success('TT')
                                let result = [];
                                rawcCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0]
                                        obj.first_nam = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj);
                                    }

                                })
                                // setListUsers(result)
                            }
                        } else {
                            toast.error("wrongs form CSV files")
                        }
                    } else
                        toast.error("not found data on csv")
                    console.log("finish", results.data)
                }
            })
        }


    }
    return (


        <>
            <div className='my-3 add-new d-sm-flex'>

                <span><b>ListUsers</b></span>
                <div className='btn-container'>
                    <label htmlFor='import' className='btn btn-warning'>
                        <i className="fa-solid fa-file-import"></i>
                        import
                    </label>
                    <input
                        id='import' type='file' hidden
                        onChange={(event) => handleImportCSV(event)}
                    />

                    <CSVLink

                        filename={"my-file.csv"}
                        className="btn btn-primary"
                        data={listUsers}

                    // asyncOnClick={true}
                    // onClick={getUsersExport}
                    >

                        <i className="fa-solid fa-download"></i>  Export </CSVLink>

                    <button className='btn btn-success '
                        onClick={() => setisShowAddNew(true)}>
                        <i className="fa-solid fa-plus "></i> Add new

                    </button>

                </div>

            </div>
            <div className='col-3 my-3'>

                <input className='form-control'
                    placeholder='Enter your email'
                    onChange={(event) => handlefind(event)}
                />

            </div>
            <div className='Customize-scroll'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th >
                                <div className='header-sort'>
                                    <span>
                                        ID
                                    </span>
                                    <span>

                                        <i className="fa-solid fa-arrow-down mx-2"
                                            onClick={() => handleSort('desc', 'id')}
                                        > </i>
                                        <i className="fa-solid fa-arrow-up"
                                            onClick={() => handleSort('asc', 'id')}
                                        ></i>
                                    </span>

                                </div>

                            </th >
                            <th >
                                <div className='header-sort'>
                                    <span>
                                        Email
                                    </span>
                                    <span>

                                        <i className="fa-solid fa-arrow-down mx-2"
                                            onClick={() => handleSort('desc', 'email')}
                                        > </i>
                                        <i className="fa-solid fa-arrow-up"
                                            onClick={() => handleSort('asc', 'email')}
                                        ></i>
                                    </span>
                                </div>

                            </th >
                            <th >
                                <div className='header-sort'>
                                    <span>
                                        First Name

                                    </span>
                                    <span>

                                        <i className="fa-solid fa-arrow-down mx-2"
                                            onClick={() => handleSort('desc', 'first_name')}
                                        > </i>
                                        <i className="fa-solid fa-arrow-up"
                                            onClick={() => handleSort('asc', 'first_name')}
                                        ></i>
                                    </span>

                                </div>

                            </th>
                            <th>Last Name</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button className='btn btn-warning mx-3 '

                                                onClick={() => handleEditUsers(item)}

                                            >Edit</button>
                                            <button className='btn btn-danger'
                                                onClick={() => handleDeleteUser(item)}
                                            >Delete</button>


                                        </td>

                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'

            />
            <ModaladdUsers
                show={isShowAddNew}
                handleClose={handleClose}
                usersUpdate={usersUpdate}

            />
            < ModalEditUsers
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditModalusers={handleEditModalusers}
            />
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                DeleteUsersfromModal={DeleteUsersfromModal}
            />
        </>
    )
}
export default TableUsers;