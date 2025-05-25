import { use, useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';
import { Permission } from './PermissionManagement';
import { usePermissionManagementContext } from './PermissionManagementContext';

interface EditPermissionModalProps {
  id: string;
}

const EditPermissionModal = ({ id }: EditPermissionModalProps) => {
  const {selectedPermission, setSelectedPermission} = usePermissionManagementContext();
  const [module, setModule] = useState(selectedPermission.module);
  const [method, setMethod] = useState(selectedPermission.method);
  const [path, setPath] = useState(selectedPermission.path);
  const [description, setDescription] = useState(selectedPermission.description);

  const handleSubmit = async () => {
    if (!module || !method || !path) {
      alert(translate('PERMISSION_FIELDS_REQUIRED') || 'Module, method, and path are required');
      return;
    }
    const updatedPermission: Permission = {
      ...selectedPermission,
      module,
      method,
      path,
      description,
    };
    console.log('Updating selectedPermission:', updatedPermission);
    // TODO: Call API to update selectedPermission
    document.getElementById(id)?.close();
  };

  return (
    <Modal id={id} title={translate('EDIT_PERMISSION')}>
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
            {translate('EDIT_PERMISSION')}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              document.getElementById(id)?.close();
              setSelectedPermission(undefined)
            }}
          >
            {translate('CANCEL')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPermissionModal;