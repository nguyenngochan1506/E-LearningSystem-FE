import { useEffect, useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';
import { Permission } from './RoleManagement';
import { createRoleAPI, getPermissionsAPI } from '../../components/common/apis/auth';
import { useRoleManagementContext } from './RoleManagementContext';

// Định nghĩa kiểu dữ liệu cho permissions theo module
interface GroupedPermissions {
  [module: string]: Permission[];
}

const AddRoleModal = ({ id }: { id: string }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermissions>({});
  const {setRoles} = useRoleManagementContext();

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
    // TODO: Gọi API để lưu vai trò
    const data = await createRoleAPI({name, description, permissions: selectedPermissions});
    
    if(data){
      // Cập nhật danh sách vai trò trong context
      alert(translate('ROLE_ADDED_SUCCESSFULLY') || 'Vai trò đã được thêm thành công');
      //refresh page
      window.location.reload();
    }

    //set name và description về giá trị mặc định
    setName('');
    setDescription('');
    setSelectedPermissions([]);
    document.getElementById(id)?.close();
  };

  return (
    <Modal id={id} title={translate('ADD_ROLE')}>
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
                        <label className="label cursor-pointer flex items-center justify-start gap-2 ">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handlePermissionToggle(permission.id)}
                          />
                          <span className="label-text text-start">
                            {permission.description}{' '}
                            <span>
                              {permission.method}: {permission.path}
                            </span>
                          </span>
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