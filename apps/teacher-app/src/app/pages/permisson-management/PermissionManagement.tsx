import { useEffect, useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import { useGlobalContext } from '../../components/common/GlobalContext';
import AddPermissionModal from './AddPermissionModal';
import EditPermissionModal from './EditPermissionModal';
import { PencilSimple, Trash } from 'phosphor-react';
import { getPermissionsAPI } from '../../components/common/apis/auth';
import { usePermissionManagementContext } from './PermissionManagementContext';

export interface Permission {
  id: number;
  method: string;
  path: string;
  module: string;
  description: string;
  createdAt: string;
}


const PermissionManagement = () => {
  const { language } = useGlobalContext();
  const { isOpenAddPermissionModal, isOpenEditPermissionModal, setIsOpenAddPermissionModal, setIsOpenEditPermissionModal, permissions, setPermissions, selectedPermission, setSelectedPermission } = usePermissionManagementContext();

  const handleDelete = (id: number) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };
  const fetchPermissions  = async () => {
      try {
        const data = await getPermissionsAPI();
        setPermissions(data as Permission[]);
      } catch (error) {
        alert(error)
      }
    }
  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{translate('PERMISSION_MANAGEMENT')}</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            const modal = document.getElementById('add-permission') as HTMLDialogElement | null;
            if (modal) modal.showModal();
          }}
        >
          {translate('ADD_PERMISSION')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>{translate('MODULE')}</th>
              <th>{translate('METHOD')}</th>
              <th>{translate('PATH')}</th>
              <th>{translate('DESCRIPTION')}</th>
              <th>{translate('CREATED_AT')}</th>
              <th>{translate('ACTION')}</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td>{permission.id}</td>
                <td>{permission.module}</td>
                <td>{permission.method}</td>
                <td>{permission.path}</td>
                <td>{permission.description}</td>
                <td>{permission.createdAt}</td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      if (setSelectedPermission) {
                        setSelectedPermission(permission);
                      }
                      const modal = document.getElementById('edit-permission') as HTMLDialogElement | null;
                      if (modal) modal.showModal();
                    }}
                  >
                    <PencilSimple size={20} />
                    {translate('EDIT')}
                  </button>
                  <button
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => handleDelete(permission.id)}
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

      {    <AddPermissionModal id="add-permission" />}
      {selectedPermission && <EditPermissionModal id="edit-permission" permission={selectedPermission} />}
    </div>
  );
};

export default PermissionManagement;