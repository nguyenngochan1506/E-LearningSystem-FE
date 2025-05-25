import { useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';
import { Permission } from './PermissionManagement';
import { createPermissionAPI } from '../../components/common/apis/auth';
import { usePermissionManagementContext } from './PermissionManagementContext';

const AddPermissionModal = ({ id }: { id: string }) => {
  const [module, setModule] = useState('');
  const [method, setMethod] = useState('');
  const [path, setPath] = useState('');
  const [description, setDescription] = useState('');
  const {permissions, setPermissions} = usePermissionManagementContext();

  const handleSubmit = async () => {
    if (!module || !method || !path) {
      alert(translate('PERMISSION_FIELDS_REQUIRED') || 'Module, method, and path are required');
      return;
    }
    const newPermission: Omit<Permission, 'id' | 'createdAt'> = {
      module,
      method,
      path,
      description,
    };

    try {
      const response = await createPermissionAPI(newPermission);
      if(response){
        alert(translate('ADD_PERMISSION_SUCCESS') || 'Permission added successfully');
        setModule('');
        setMethod('');
        setPath('');
        setDescription('');
        //refresh permissions list
        const maxId = permissions.reduce((max, perm) => Math.max(max, perm.id), 0);
        const newPermission = {
          module,
          method,
          path,
          description,
          id: maxId + 1, 
          createdAt: new Date().toISOString(),
        }
        setPermissions([newPermission,...permissions])
        

      }
    } catch (error) {
      console.error('Error adding permission:', error);
      alert(translate('ADD_PERMISSION_ERROR') || 'Failed to add permission');
      return;
      
    }
    

    document.getElementById(id)?.close();
  };

  return (
    <Modal id={id} title={translate('ADD_PERMISSION')}>
      <div className="grid gap-4">
        <Input
          title={translate('MODULE')}
          placeholder="Nhập module (e.g., User, Course, Assignment)..."
          type="text"
          name="module"
          value={module}
          onChange={(e) => setModule(e.target.value)}
          required
        />
        <div>
          <label className="label">
            <span className="label-text">{translate('METHOD')}</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          >
            <option value="" disabled>
              Chọn method
            </option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <Input
          title={translate('PATH')}
          placeholder="Nhập path (e.g., /api/users)..."
          type="text"
          name="path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          required
        />
        <Input
          title={translate('DESCRIPTION')}
          placeholder="Nhập mô tả..."
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {translate('ADD_PERMISSION')}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById(id)?.close()}
          >
            {translate('CANCEL')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPermissionModal;