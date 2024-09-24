import React, { useEffect, useState } from 'react';
import api from '../../../services/interceptor';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    function getUsers() {
      api
        .get('/auth/users')
        .then((res) => {
          const { data } = res.data;
          setUsers(data);
        })
        .catch((err) => console.log(err));
    }

    getUsers();
  }, []);

  console.log(users);
  return (
    <>
      <h3>Users List</h3>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{++index}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.isAdmin ? 'Admin' : 'User'}</td>
                  <td>
                    <button disabled={user?.isAdmin}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className='text-center' colspan='5'>
                No Users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Users;
