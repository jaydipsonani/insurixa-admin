import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Trash2, 
  Edit3,
  AlertTriangle
} from 'lucide-react';
import styles from './products.module.scss';
import { toast } from 'react-hot-toast';

const insuranceProducts = [
  { id: 1, name: 'Comprehensive Car Insurance', category: 'Car', insurer: 'HDFC Ergo', price: '$450/yr', ratio: '98.5%', status: 'Active' },
  { id: 2, name: 'Third Party Bike Insurance', category: 'Bike', insurer: 'ICICI Lombard', price: '$120/yr', ratio: '96.2%', status: 'Active' },
  { id: 3, name: 'Zero Dep Cover (Add-on)', category: 'Add-on', insurer: 'Tata AIG', price: '$80/yr', ratio: 'N/A', status: 'Active' },
  { id: 4, name: 'Accidental Cover', category: 'Health/Accident', insurer: 'Reliance General', price: '$150/yr', ratio: '95.0%', status: 'Active' },
];

const ProductListingsPage = () => {
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success('Product deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    toast.success('Successfully saved!');
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Product Name', accessor: 'name' as any, sortable: true },
    { header: 'Category', accessor: 'category' as any },
    { header: 'Insurer', accessor: 'insurer' as any, sortable: true },
    { header: 'Base Price', accessor: 'price' as any, sortable: true },
    { header: 'Claim Ratio', accessor: 'ratio' as any },
    { 
      header: 'Status', 
      accessor: (p: any) => (
        <Badge type={p.status === 'Active' ? 'success' : 'neutral'}>{p.status}</Badge>
      )
    },
    { 
      header: 'Actions', 
      accessor: (p: any) => (
        <div className={styles.table_actions}>
          <button className={styles.action_btn} onClick={() => handleEdit(p)}><Edit3 size={16} /></button>
          <button className={`${styles.action_btn} ${styles.delete}`} onClick={(e) => handleDeleteClick(p.id, e)}><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <Layout title="Insurance Product Listings">
      <div className={styles.header}>
        <h1>Insurance Product Listings</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>Add New Product</Button>
      </div>

      <DataTable columns={columns} data={insuranceProducts} searchPlaceholder="Search by product, insurer..." />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Product' : 'Add New Product'}
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
            <label>Product Name</label>
            <input type="text" placeholder="e.g. Comprehensive Car Insurance" defaultValue={editingItem?.name} />
          </div>
          <div className={styles.form_group}>
            <label>Category</label>
            <select defaultValue={editingItem?.category}>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Insurer</label>
            <input type="text" placeholder="e.g. HDFC Ergo" defaultValue={editingItem?.insurer} />
          </div>
          <div className={styles.form_group}>
            <label>Base Price</label>
            <input type="text" placeholder="e.g. $450/yr" defaultValue={editingItem?.price} />
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
            <Button variant="danger" onClick={confirmDelete}>Remove Product</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to remove this insurance product? This action will disable it for new policies.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default ProductListingsPage;
