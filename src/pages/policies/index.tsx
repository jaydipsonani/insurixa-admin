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
  FileText,
  ShieldCheck,
  User,
  Calendar
} from 'lucide-react';
import styles from './policies.module.scss';
import { toast } from 'react-hot-toast';

const policiesData = [
  { id: 'POL-8821', customer: 'Jaydip Patola', type: 'Comprehensive Car', insurer: 'HDFC Ergo', premium: '$450', expiry: '2024-12-10', status: 'Active' },
  { id: 'POL-7732', customer: 'Rahul Sharma', type: 'Third Party Bike', insurer: 'ICICI Lombard', premium: '$120', expiry: '2024-11-05', status: 'Expiring Soon' },
  { id: 'POL-9921', customer: 'Amit Shah', type: 'Zero Dep Car', insurer: 'Tata AIG', premium: '$580', expiry: '2025-01-20', status: 'Active' },
  { id: 'POL-4412', customer: 'Suresh Raina', type: 'Basic Bike', insurer: 'Reliance General', premium: '$95', expiry: '2023-10-15', status: 'Expired' },
];

const PoliciesPage = () => {
  const [isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<any>(null);

  const handleEdit = (policy: any) => {
    setEditingPolicy(policy);
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setEditingPolicy(null);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    toast.success(editingPolicy ? 'Policy updated successfully!' : 'Policy created successfully!');
    setIsDrawerOpen(false);
  };

  const columns = [
    { header: 'Policy ID', accessor: 'id' as any, sortable: true },
    { 
      header: 'Customer', 
      accessor: (p: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={14} color="var(--text-muted)" /> {p.customer}
        </div>
      )
    },
    { header: 'Type', accessor: 'type' as any },
    { header: 'Insurer', accessor: 'insurer' as any },
    { header: 'Premium', accessor: 'premium' as any },
    { 
      header: 'Status', 
      accessor: (p: any) => (
        <Badge type={p.status === 'Active' ? 'success' : p.status === 'Expired' ? 'error' : 'warning'}>
          {p.status}
        </Badge>
      )
    },
    { 
      header: 'Actions', 
      accessor: (p: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={styles.action_btn} onClick={() => handleEdit(p)}><Edit3 size={16} /></button>
          <button className={`${styles.action_btn} ${styles.delete}`}><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <Layout title="Insurance Policies">
      <div className={styles.header}>
        <h1>Policies Management</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>Add New Policy</Button>
      </div>

      <DataTable columns={columns} data={policiesData} searchPlaceholder="Search by ID, customer or insurer..." />

      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingPolicy ? 'Edit Policy' : 'Create New Policy'}
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Policy</Button>
          </div>
        }
      >
        <div className={styles.form_grid}>
          <div className={styles.form_group}>
            <label>Policy ID</label>
            <input type="text" placeholder="POL-XXXX" defaultValue={editingPolicy?.id} />
          </div>
          <div className={styles.form_group}>
            <label>Customer Name</label>
            <input type="text" placeholder="Full Name" defaultValue={editingPolicy?.customer} />
          </div>
          <div className={styles.form_group}>
            <label>Insurance Type</label>
            <select defaultValue={editingPolicy?.type}>
              <option value="Comprehensive Car">Comprehensive Car</option>
              <option value="Third Party Bike">Third Party Bike</option>
              <option value="Health Insurance">Health Insurance</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Insurer</label>
            <input type="text" placeholder="e.g. HDFC Ergo" defaultValue={editingPolicy?.insurer} />
          </div>
          <div className={styles.form_group}>
            <label>Premium Amount</label>
            <input type="text" placeholder="$0.00" defaultValue={editingPolicy?.premium} />
          </div>
          <div className={styles.form_group}>
            <label>Expiry Date</label>
            <input type="date" defaultValue={editingPolicy?.expiry} />
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default PoliciesPage;
