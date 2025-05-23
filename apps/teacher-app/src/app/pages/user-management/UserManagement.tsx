import { useState } from 'react';
import AddUserModal from './AddUserModal';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';
import EditUserModal from './EditUserModal';
import { PencilSimple } from 'phosphor-react';

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
  const [selectedUser, setSelectedUser] = useState<any>(null); // Thêm trạng thái để lưu user được chọn
  const { language } = useGlobalContext();

  // Hàm xử lý xóa người dùng
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{translate('USER_MANAGEMENT')}</h2>
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
        <table className="table w-full">
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
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.createdAt}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => {
                      setSelectedUser(u); // Lưu user được chọn
                      const modal = document.getElementById(
                        'edit-user'
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal();
                      }
                    }}
                  >
                    {translate('EDIT')}
                  </button>
                  <button
                    className="btn btn-error btn-sm ml-2"
                    onClick={() => handleDelete(u.id)} // Sửa lỗi: dùng u.id thay vì user.id
                  >
                    {translate('DELETE')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chỉ render EditUserModal khi có user được chọn */}
      {selectedUser && <EditUserModal id="edit-user" user={selectedUser} />}
      <AddUserModal id="add-user" />
    </div>
  );
};

export default UserManagement;
