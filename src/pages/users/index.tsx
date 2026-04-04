import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { 
  Eye, 
  UserPlus, 
  Ban,
  Save,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import styles from './users.module.scss';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  totalPolicies: number;
  status: 'Active' | 'Blocked';
  createdDate: string;
}

const initialUsers: User[] = [
  { id: 'USR-001', name: 'Alwyn D\'souza', mobile: '+91 9876543210', email: 'alwyn@gmail.com', totalPolicies: 3, status: 'Active', createdDate: '2023-09-12' },
  { id: 'USR-002', name: 'Sneha Kapadia', mobile: '+91 9822334455', email: 'sneha@yahoo.com', totalPolicies: 1, status: 'Active', createdDate: '2023-10-05' },
  { id: 'USR-003', name: 'Rajesh Kumar', mobile: '+91 9123456789', email: 'rajesh@outlook.com', totalPolicies: 0, status: 'Blocked', createdDate: '2023-08-20' },
  { id: 'USR-004', name: 'Priya Sharma', mobile: '+91 9654321098', email: 'priya@gmail.com', totalPolicies: 2, status: 'Active', createdDate: '2023-11-01' },
];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsCreateMode(false);
    setIsModalOpen(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsCreateMode(true);
    setIsModalOpen(true);
  };

  const handleBlockUser = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
    toast.success('Status updated');
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success('User deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSaveUser = () => {
    toast.success(isCreateMode ? 'User created successfully!' : 'User updated successfully!');
    setIsModalOpen(false);
  };

  const columns = [
    { 
      header: 'Name', 
      accessor: (user: User) => (
        <div className={styles.avatar_wrapper}>
          <div className={styles.avatar_placeholder}>{user.name.charAt(0)}</div>
          <div className={styles.name_group}>
            <p className={styles.user_name}>{user.name}</p>
            <p className={styles.user_id}>{user.id}</p>
          </div>
        </div>
      ),
      sortable: true
    },
    { header: 'Mobile', accessor: 'mobile' as any, sortable: true },
    { header: 'Email', accessor: 'email' as any, sortable: true },
    { header: 'Policies', accessor: 'totalPolicies' as any, sortable: true },
    { 
      header: 'Status', 
      accessor: (user: User) => (
        <Badge type={user.status === 'Active' ? 'success' : 'error'}>{user.status}</Badge>
      )
    },
    { 
      header: 'Actions', 
      accessor: (user: User) => (
        <div className={styles.actions_row}>
          <button onClick={() => handleViewUser(user)} className={styles.action_btn}><Eye size={18} /></button>
          <button onClick={(e) => handleBlockUser(user.id, e)} className={styles.action_btn}><Ban size={18} /></button>
          <button onClick={(e) => handleDeleteClick(user.id, e)} className={`${styles.action_btn} ${styles.delete}`}><Trash2 size={18} /></button>
        </div>
      )
    },
  ];

  return (
    <Layout title="Users">
      <div className={styles.header}>
        <h1>Users Management</h1>
        <Button leftIcon={<UserPlus size={18} />} onClick={handleCreateUser}>Add New User</Button>
      </div>

      <DataTable 
        columns={columns} 
        data={users} 
        searchPlaceholder="Search users..."
        onRowClick={handleViewUser}
      />

      {/* Add / View Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isCreateMode ? 'Add New User' : 'User Details'}
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
            {isCreateMode && (
              <Button variant="primary" leftIcon={<Save size={18} />} onClick={handleSaveUser}>Save User</Button>
            )}
          </div>
        }
      >
        {isCreateMode ? (
          <div className={styles.form_grid}>
            <div className={styles.form_group}>
              <label>Full Name</label>
              <input type="text" placeholder="e.g. John Doe" />
            </div>
            <div className={styles.form_group}>
              <label>Mobile Number</label>
              <input type="text" placeholder="+91 00000 00000" />
            </div>
            <div className={styles.form_group}>
              <label>Email Address</label>
              <input type="email" placeholder="example@email.com" />
            </div>
            <div className={styles.form_group}>
              <label>Initial Status</label>
              <select>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
        ) : (
          selectedUser && (
            <div className={styles.user_detail}>
               <h3>{selectedUser.name}</h3>
               <p>Email: {selectedUser.email}</p>
               <p>Mobile: {selectedUser.mobile}</p>
               <div style={{ marginTop: '20px' }}>
                  <Badge type={selectedUser.status === 'Active' ? 'success' : 'error'}>{selectedUser.status}</Badge>
               </div>
            </div>
          )
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Confirm Delete</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to delete this user? All their associated records will be permanently removed.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default UsersPage;
