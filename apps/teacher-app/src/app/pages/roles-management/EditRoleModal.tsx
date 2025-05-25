import { useEffect, useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';
import { Permission } from './RoleManagement';
import { getPermissionsAPI } from '../../components/common/apis/auth';

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

// Định nghĩa kiểu dữ liệu cho permissions theo module
interface GroupedPermissions {
  [module: string]: Permission[];
}

const EditRoleModal = ({ id, role }: EditRoleModalProps) => {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
    role.permissions.map((p) => p.id)
  );
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermissions>({});

  useEffect(() => {
    // Fetch permissions khi component mount
    getAllPermissions();
  }, []);

  const getAllPermissions = async () => {
    try {
      const permissions = await getPermissionsAPI();
      console.log('Permissions:', permissions);

      // Gom nhóm permissions theo module
      const grouped = permissions.reduce((acc: GroupedPermissions, permission: Permission) => {
        const module = permission.module || 'Other';
        if (!acc[module]) {
          acc[module] = [];
        }
        acc[module].push(permission);
        return acc;
      }, {});

      setGroupedPermissions(grouped);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async () => {
    if (!name) {
      alert(translate('ROLE_NAME_REQUIRED') || 'Tên vai trò là bắt buộc');
      return;
    }
    const updatedRole = {
      ...role,
      name,
      description,
      permissions: Object.values(groupedPermissions)
        .flat()
        .filter((p) => selectedPermissions.includes(p.id)),
    };
    console.log('Updating role:', updatedRole);
    // TODO: Gọi API để cập nhật vai trò
    document.getElementById(id)?.close();
  };

  return (
    <Modal id={id} title={translate('EDIT_ROLE')}>
      <div className="grid gap-4">
        <Input
          title={translate('ROLE_NAME')}
          placeholder="Nhập tên vai trò..."
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
                  <div className="grid grid-cols-2 gap-4">
                    {permissions.map((permission: Permission) => (
                      <div key={permission.id} className="form-control">
                        <label className="label cursor-pointer flex items-start justify-start gap-1 p-0">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary mt-4"
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handlePermissionToggle(permission.id)}
                          />
                          <div className="flex flex-col gap-1">
                            <span>{permission.description}</span>
                            <div className="flex items-center gap-1">
                              <span
                                className={`badge font-mono text-white ${
                                  permission.method === 'GET'
                                    ? 'bg-blue-500'
                                    : permission.method === 'POST'
                                    ? 'bg-green-500'
                                    : permission.method === 'PUT'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                              >
                                {permission.method}
                              </span>
                              <span className="font-mono">{permission.path}</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {translate('EDIT_ROLE')}
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

export default EditRoleModal;