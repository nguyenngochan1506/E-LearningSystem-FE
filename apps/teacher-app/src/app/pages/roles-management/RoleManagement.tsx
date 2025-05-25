import { useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';
import AddRoleModal from './AddRoleModal';
import EditRoleModal from './EditRoleModal';
import { PencilSimple, Trash } from 'phosphor-react';

export interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  method: string;
  path: string;
  module: string;
  description: string;
}

const initialRoles: Role[] = [
  {
    id: 1, name: 'Admin', description: 'Full access to all modules', createdAt: '2023-10-01',
    permissions: [
      { id: 1, method: 'GET', path: '/api/users', module: 'User', description: 'View all users' },
      { id: 2, method: 'POST', path: '/api/users', module: 'User', description: 'Create user' },
        { id: 3, method: 'POST', path: '/api/courses', module: 'Course', description: 'Create course' },
        { id: 4, method: 'GET', path: '/api/courses', module: 'Course', description: 'View courses' },
        // Add more permissions as needed
        { id: 5, method: 'DELETE', path: '/api/users', module: 'User', description: 'Delete user' },
        { id: 6, method: 'PUT', path: '/api/users', module: 'User', description: 'Update user' },
        { id: 7, method: 'GET', path: '/api/assignments', module: 'Assignment', description: 'View assignments' },
        { id: 8, method: 'POST', path: '/api/assignments', module: 'Assignment', description: 'Create assignment' },
    ],
  },
  {
    id: 2, name: 'Teacher', description: 'Manage courses and assignments', createdAt: '2023-10-02',
    permissions: [
      { id: 3, method: 'POST', path: '/api/courses', module: 'Course Management', description: 'Create course' },
    ],
  },
  {
    id: 3, name: 'Student', description: 'Access courses and submit assignments', createdAt: '2023-10-03',
    permissions: [
      { id: 4, method: 'GET', path: '/api/courses', module: 'Course Management', description: 'View courses' },
    ],
  },
];

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { language } = useGlobalContext();

  const handleDelete = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{translate('ROLE_MANAGEMENT')}</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            const modal = document.getElementById('add-role') as HTMLDialogElement | null;
            if (modal) modal.showModal();
          }}
        >
          {translate('ADD_ROLE')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>{translate('ROLE_NAME')}</th>
              <th>{translate('DESCRIPTION')}</th>
              <th>{translate('CREATED_AT')}</th>
              <th>{translate('ACTION')}</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>{role.createdAt}</td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setSelectedRole(role);
                      const modal = document.getElementById('edit-role') as HTMLDialogElement | null;
                      if (modal) modal.showModal();
                    }}
                  >
                    <PencilSimple size={20} />
                    {translate('EDIT')}
                  </button>
                  <button
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => handleDelete(role.id)}
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

      <AddRoleModal id="add-role" />
      {selectedRole && <EditRoleModal id="edit-role" role={selectedRole} />}
    </div>
  );
};

export default RoleManagement;