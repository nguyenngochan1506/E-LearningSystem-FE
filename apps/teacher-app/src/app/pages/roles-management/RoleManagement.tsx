import { useEffect, useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';
import AddRoleModal from './AddRoleModal';
import EditRoleModal from './EditRoleModal';
import { PencilSimple, Trash } from 'phosphor-react';
import { useRoleManagementContext } from './RoleManagementContext';
import { getRolesAPI } from '../../components/common/apis/auth';

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


const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { language } = useGlobalContext();
  const {roles, setRoles} = useRoleManagementContext();

 

  const handleDelete = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const fetchRoles = async () => {
      // Simulate fetching roles
      const fetchedRoles: Role[] = await getRolesAPI();
      setRoles(fetchedRoles);
    };

  useEffect(() => {
    // Fetch roles from API or context
    fetchRoles();
    
  }, [setRoles]);



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