import { useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';
import { Permission } from './RoleManagement';

const availablePermissions: Permission[] = [
  {
    id: 1,
    method: 'GET',
    path: '/api/users',
    module: 'User',
    description: 'View all users',
  },
  {
    id: 2,
    method: 'POST',
    path: '/api/users',
    module: 'User',
    description: 'Create user',
  },
  {
    id: 3,
    method: 'POST',
    path: '/api/courses',
    module: 'Course',
    description: 'Create course',
  },
  {
    id: 4,
    method: 'GET',
    path: '/api/courses',
    module: 'Course',
    description: 'View courses',
  },
  {
    id: 5,
    method: 'DELETE',
    path: '/api/users',
    module: 'User',
    description: 'Delete user',
  },
  {
    id: 6,
    method: 'PUT',
    path: '/api/users',
    module: 'User',
    description: 'Update user',
  },
  {
    id: 7,
    method: 'GET',
    path: '/api/assignments',
    module: 'Assignment',
    description: 'View assignments',
  },
  {
    id: 8,
    method: 'POST',
    path: '/api/assignments',
    module: 'Assignment',
    description: 'Create assignment',
  },
  {
    id: 9,
    method: 'DELETE',
    path: '/api/assignments',
    module: 'Assignment',
    description: 'Delete assignment',
  },
  {
    id: 10,
    method: 'PUT',
    path: '/api/assignments',
    module: 'Assignment',
    description: 'Update assignment',
  },
];

// Group permissions by module for rendering
const groupPermissionsByModule = (permissions: Permission[]) => {
  return permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
};

const AddRoleModal = ({ id }: { id: string }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async () => {
    if (!name) {
      alert(translate('ROLE_NAME_REQUIRED') || 'Role name is required');
      return;
    }
    const newRole = {
      id: Math.floor(Math.random() * 1000),
      name,
      description,
      createdAt: new Date().toISOString().split('T')[0],
      permissions: availablePermissions.filter((p) =>
        selectedPermissions.includes(p.id)
      ),
    };
    console.log('Creating role:', newRole);
    // TODO: Call API to save role
    document.getElementById(id)?.close();
  };

  const groupedPermissions = groupPermissionsByModule(availablePermissions);

  return (
    <Modal id={id} title={translate('ADD_ROLE')}>
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
            {Object.entries(groupedPermissions).map(([module, permissions]) => (
              <div
                key={module}
                className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
              >
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  {module.toUpperCase()}
                </div>
                <div className="collapse-content">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">
                          {permission.description}{' '}
                          <span>
                            {permission.method}: {permission.path}
                          </span>
                        </span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionToggle(permission.id)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {translate('ADD_ROLE')}
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

export default AddRoleModal;