import Modal from '../../components/layout/Modal';

const AddUserModal = ({ id }) => {
  return (
    <Modal title="Thêm Người Dùng" id={id}>
      <form method="dialog" className="space-y-4">
        <button type="submit" className="btn btn-primary">
          Thêm Người Dùng
        </button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
