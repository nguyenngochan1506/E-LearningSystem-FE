import { useEffect, useState } from 'react';
import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';
import { getRolesAPI, getUserByIdAPI } from '../../components/common/apis/auth';

interface EditUserModalProps {
  id: string;
  user?: { id: string; email: string; name: string; createdAt: string };
}

const EditUserModal = ({ id, user }: EditUserModalProps) => {
  const [userData, setUserData] = useState<any>(null); // Sử dụng any tạm thời, bạn có thể định nghĩa interface cụ thể
  const [availableRoles, setAvailableRoles] = useState<any[]>([]); // Danh sách vai trò có sẵn
  const fetchUser = async () => {
    if (user?.id) {
      const response = await getUserByIdAPI(user.id);
      setUserData(response);
    }
  };
  const fetchAvailableRoles = async () => {
    // Giả sử bạn có một API để lấy danh sách vai trò
    const roles = await getRolesAPI();
    setAvailableRoles(roles);
  };

  useEffect(() => {
    fetchUser();
    fetchAvailableRoles();
  }, [user]);

  // Xử lý thay đổi vai trò
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoles = Array.from(e.target.selectedOptions).map(option => ({
      id: parseInt(option.value.split('|')[0]), // Giả sử value có dạng "id|name"
      name: option.value.split('|')[1],
    }));
    setUserData({ ...userData, roles: selectedRoles });
  };


  return (
    <Modal title={translate('EDIT_USER') + `#${user?.id}`} id={id}>
      <form method="dialog" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <Input
            key="email"
            title={'Email'}
            placeholder={translate('ENTER_EMAIL')}
            type="email"
            name="email"
            value={userData?.email || ''}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          {/* Tên người dùng */}
          <Input
            key="name"
            title={translate('USER_NAME')}
            placeholder={translate('ENTER_USER_NAME')}
            type="text"
            name="name"
            value={userData?.fullName || ''}
            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
          />
          {/* Mật khẩu */}
          <Input
            key="password"
            title={translate('PASSWORD')}
            placeholder={translate('ENTER_PASSWORD')}
            type="password"
            name="password"
            disabled
          />
          {/* Ngày sinh */}
          <Input
            key="dob"
            title={translate('DATE_OF_BIRTH')}
            placeholder={translate('DATE_OF_BIRTH')}
            type="date"
            name="dob"
            value={userData?.dateOfBirth || ''}
            onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
          />
          {/* Số điện thoại */}
          <Input
            key="phone"
            title={translate('PHONE')}
            placeholder={translate('ENTER_PHONE')}
            type="tel"
            name="phone"
            value={userData?.phoneNumber || ''}
            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
          />
          {/* Vai trò người dùng */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">{translate('USER_ROLE')}</span>
            </label>
            <select
              name="roles"
              id="roles"
              className="select select-bordered w-full"
              multiple // Cho phép chọn nhiều vai trò
              value={userData?.roles?.map((role: any) => `${role.id}|${role.name}`) || []}
              onChange={handleRoleChange}
            >
              {availableRoles.map((role) => (
                <option key={role.id} value={`${role.id}|${role.name}`}>
                  {translate(role.name.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Placeholder để cân bằng lưới (tùy chọn) */}
          <div className="hidden md:block"></div>
        </div>

        {/* Nút hành động */}
        <div className="modal-action">
          <button type="submit" className="btn btn-primary">
            {translate('EDIT_USER')}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => document.getElementById(id)?.close()}
          >
            {translate('CANCEL')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;