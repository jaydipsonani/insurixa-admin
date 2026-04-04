import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Trash2, 
  Edit3,
  AlertTriangle
} from 'lucide-react';
import styles from './locations/locations.module.scss';
import { toast } from 'react-hot-toast';

const citiesData = [
  { id: 'CT-01', name: 'Ahmedabad', state: 'Gujarat', pincode: '380001', status: 'Active' },
  { id: 'CT-02', name: 'Mumbai', state: 'Maharashtra', pincode: '400001', status: 'Active' },
  { id: 'CT-03', name: 'Pune', state: 'Maharashtra', pincode: '411001', status: 'Active' },
  { id: 'CT-04', name: 'Jaipur', state: 'Rajasthan', pincode: '302001', status: 'Active' },
];

const CitiesPage = () => {
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success('City deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    toast.success('Successfully saved!');
    setIsModalOpen(false);
  };

  const cityColumns = [
    { header: 'City Name', accessor: 'name' as any, sortable: true },
    { header: 'State', accessor: 'state' as any, sortable: true },
    { header: 'Pincode', accessor: 'pincode' as any, sortable: true },
    { 
      header: 'Status', 
      accessor: (c: any) => (
        <Badge type={c.status === 'Active' ? 'success' : 'neutral'}>{c.status}</Badge>
      )
    },
    { 
      header: 'Actions', 
      accessor: (item: any) => (
        <div className={styles.table_actions}>
          <button className={styles.action_btn} onClick={() => handleEdit(item)}><Edit3 size={16} /></button>
          <button className={`${styles.action_btn} ${styles.delete}`} onClick={(e) => handleDeleteClick(item.id, e)}><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <Layout title="Cities Management">
      <div className={styles.header}>
        <h1>Cities Management</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>Add City</Button>
      </div>

      <DataTable columns={cityColumns} data={citiesData} searchPlaceholder="Search city by name or pincode..." />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit City' : 'Add New City'}
        size="md"
        footer={
          <div className={styles.drawer_footer_actions}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </div>
        }
      >
        <div className={styles.form_grid}>
          <div className={styles.form_group}>
            <label>City Name</label>
            <input type="text" placeholder="e.g. Ahmedabad" defaultValue={editingItem?.name} />
          </div>
          <div className={styles.form_group}>
            <label>State</label>
            <select>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Pincode</label>
            <input type="text" placeholder="e.g. 380001" defaultValue={editingItem?.pincode} />
          </div>
        </div>
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
            <Button variant="danger" onClick={confirmDelete}>Delete City</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to delete this city? This action cannot be undone.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default CitiesPage;
