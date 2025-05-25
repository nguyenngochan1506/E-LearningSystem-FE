import { useEffect, useState } from 'react';
import AddUserModal from './AddUserModal';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';
import EditUserModal from './EditUserModal';
import { PencilSimple, Trash } from 'phosphor-react';
import { getListUserAPI } from '../../components/common/apis/auth';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { language } = useGlobalContext();

  const fetchUsers = async () => {
    const data = await getListUserAPI();
    if(data){
      setUsers(data.map((user: any) => ({
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: new Date(user.createdAt).toLocaleDateString(language, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      })));
    }
  }
  useEffect(() => {
    fetchUsers();
  }, [language]);
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
                    className="btn btn-ghost btn-sm"
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
                     <PencilSimple size={20} />
                    {translate('EDIT')}
                  </button>
                  <button
                    className="btn btn-ghost btn-sm ml-2"
                    onClick={() => handleDelete(u.id)} // Sửa lỗi: dùng u.id thay vì user.id
                  >
                    <Trash size={20} />
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
