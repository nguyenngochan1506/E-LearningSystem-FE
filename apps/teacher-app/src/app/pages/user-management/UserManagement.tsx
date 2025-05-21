import { useState } from 'react';
import AddUserModal from './AddUserModal';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';

const initialUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nva@example.com',
    role: 'Admin',
    createdAt: '2023-10-01',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'ttb@example.com',
    role: 'User',
    createdAt: '2023-10-02',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'lvc@example.com',
    role: 'Editor',
    createdAt: '2023-10-03',
  },
];
const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const { language } = useGlobalContext();
  // Hàm xử lý xóa người dùng
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{translate('USER_MANAGEMENT')}</h2>
        <AddUserModal id={'add-user'} />
        <button
          className="btn btn-primary"
          onClick={() => {
            const modal = document.getElementById(
              'add-user'
            ) as HTMLDialogElement | null;
            if (modal) {
              modal.showModal();
            }
          }}
        >
          {translate('ADD_USER')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>ID</th>
              <th>{translate('USER_NAME')}</th>
              <th>Email</th>
              <th>{translate('USER_ROLE')}</th>
              <th>{translate('CREATED_AT')}</th>
              <th>{translate('ACTION')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
                <td>
                  <button className="btn btn-info btn-sm">
                    {translate('EDIT')}
                  </button>
                  <button
                    className="btn btn-error btn-sm ml-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    {translate('DELETE')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
