import { useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';
import { Permission } from './RoleManagement';

interface EditRoleModalProps {
  id: string;
  role: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    permissions: Permission[];
  };
}

const availablePermissions: Permission[] = [
  { id: 1, method: 'GET', path: '/api/users', module: 'User Management', description: 'View all users' },
  { id: 2, method: 'POST', path: '/api/users', module: 'User Management', description: 'Create user' },
  { id: 3, method: 'POST', path: '/api/courses', module: 'Course Management', description: 'Create course' },
  { id: 4, method: 'GET', path: '/api/courses', module: 'Course Management', description: 'View courses' },
];

const EditRoleModal = ({ id, role }: EditRoleModalProps) => {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
    role.permissions.map((p) => p.id)
  );

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const  handleSubmit = async () => {
    if (!name) {
      alert(translate('ROLE_NAME_REQUIRED') || 'Role name is required');
      return;
    }
    const updatedRole = {
      ...role,
      name,
      description,
      permissions: availablePermissions.filter((p) => selectedPermissions.includes(p.id)),
    };
    console.log('Updating role:', updatedRole);
    // TODO: Call API to update role
    document.getElementById(id)?.close();
  };

  return (
    <Modal id={id} title={translate('EDIT_ROLE')}>
      <div className="grid gap-4">
        <Input
          title={translate('ROLE_NAME')}
          placeholder="Enter role name..."
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          title={translate('DESCRIPTION')}
          placeholder="Enter description..."
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <label className="label">
            <span className="label-text">{translate('PERMISSIONS')}</span>
          </label>
          <div className="grid gap-2">
            {availablePermissions.map((permission) => (
              <label key={permission.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selectedPermissions.includes(permission.id)}
                  onChange={() => handlePermissionToggle(permission.id)}
                />
                <span>{`${permission.module}: ${permission.method} ${permission.path} (${permission.description})`}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {translate('EDIT_ROLE')}
          </button>
          <button className="btn btn-ghost" onClick={() => document.getElementById(id)?.close()}>
            {translate('CANCEL')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditRoleModal;