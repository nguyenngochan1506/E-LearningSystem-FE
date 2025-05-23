import { translate } from '../../components/common/translate/translate';
import Modal from '../../components/layout/Modal';
import Input from '../../components/ui/Input';

interface EditUserModalProps {
  id: string;
  user?: { id: string; email: string; name: string; createdAt: string };
}

const EditUserModal = ({ id, user }: EditUserModalProps) => {
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
          />
          {/* Tên người dùng */}
          <Input
            key="name"
            title={translate('USER_NAME')}
            placeholder={translate('ENTER_USER_NAME')}
            type="text"
            name="name"
          />
          {/* Mật khẩu */}
          <Input
            key="password"
            title={translate('PASSWORD')}
            placeholder={translate('ENTER_PASSWORD')}
            type="password"
            name="password"
          />
          {/* Ngày sinh */}
          <Input
            key="dob"
            title={translate('DATE_OF_BIRTH')}
            placeholder={translate('DATE_OF_BIRTH')}
            type="date"
            name="dob"
          />
          {/* Số điện thoại */}
          <Input
            key="phone"
            title={translate('PHONE')}
            placeholder={translate('ENTER_PHONE')}
            type="tel"
            name="phone"
          />
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
