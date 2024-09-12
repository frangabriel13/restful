import React, { useEffect, useState } from "react";
import s from "./Users.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/actions/userActions";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const authenticatedUser = useSelector((state) => state.auth.user);
  const stateAuth = useSelector((state) => state.auth);

  const isSuperAdmin = authenticatedUser && authenticatedUser.role === 'superAdmin';
  console.log('stateAuth:', stateAuth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setShowEdit(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className={s.container}>
      <div className={s.dashboard}>
        <h2>Funeral Homes</h2>
        <table className={s.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td className={s.btnCell}>
                  {/* <button onClick={() => handleEdit(user)}>Edit</button> */}
                  <button className={s.btnDelete} onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={s.btnCreateContainer}>
          <button className={s.btnCreate} onClick={handleCreate}>Create</button>
        </div>
      </div>
      {
        showEdit && (
          <EditUser
            funeralHome={selectedUser}
            handleCancel={handleCancel}
          />
        )
      }
      {
        showCreate && (
          <CreateUser handleCancel={() => setShowCreate(false)} />
        )
      }
    </div>
  )
};


export default Users;