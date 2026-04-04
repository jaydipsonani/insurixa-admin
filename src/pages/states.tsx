import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Trash2, 
  Edit3,
  AlertTriangle
} from 'lucide-react';
import styles from './locations/locations.module.scss';
import { toast } from 'react-hot-toast';

const statesData = [
  { id: 'ST-01', name: 'Gujarat', code: 'GJ', citiesCount: 45 },
  { id: 'ST-02', name: 'Maharashtra', code: 'MH', citiesCount: 62 },
  { id: 'ST-03', name: 'Delhi', code: 'DL', citiesCount: 12 },
  { id: 'ST-04', name: 'Rajasthan', code: 'RJ', citiesCount: 38 },
];

const StatesPage = () => {
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
    toast.success('State deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    toast.success('Successfully saved!');
    setIsModalOpen(false);
  };

  const stateColumns = [
    { header: 'State Name', accessor: 'name' as any, sortable: true },
    { header: 'Code', accessor: 'code' as any, sortable: true },
    { header: 'Total Cities', accessor: 'citiesCount' as any, sortable: true },
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
    <Layout title="States Management">
      <div className={styles.header}>
        <h1>States Management</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>Add State</Button>
      </div>

      <DataTable columns={stateColumns} data={statesData} searchPlaceholder="Search state by name or code..." />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit State' : 'Add New State'}
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
            <label>State Name</label>
            <input type="text" placeholder="e.g. Gujarat" defaultValue={editingItem?.name} />
          </div>
          <div className={styles.form_group}>
            <label>State Code</label>
            <input type="text" placeholder="e.g. GJ" defaultValue={editingItem?.code} />
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
            <Button variant="danger" onClick={confirmDelete}>Delete State</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to delete this state? This will remove all cities associated with it.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default StatesPage;
