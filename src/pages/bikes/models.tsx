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
  Fuel,
  AlertTriangle
} from 'lucide-react';
import styles from './bikes.module.scss';
import { toast } from 'react-hot-toast';

const companiesData = [
  { id: 1, name: 'Hero MotoCorp' },
  { id: 2, name: 'Honda' },
  { id: 3, name: 'TVS Motor' },
  { id: 4, name: 'Bajaj Auto' },
];

const bikeModelsData = [
  { id: 1, name: 'Splendor Plus', company: 'Hero MotoCorp', fuelType: 'Petrol', segment: 'Commuter', status: 'Active' },
  { id: 2, name: 'Activa 6G', company: 'Honda', fuelType: 'Petrol', segment: 'Scooter', status: 'Active' },
  { id: 3, name: 'Classic 350', company: 'Royal Enfield', fuelType: 'Petrol', segment: 'Cruiser', status: 'Active' },
  { id: 4, name: 'Pulsar 150', company: 'Bajaj Auto', fuelType: 'Petrol', segment: 'Sports Commuter', status: 'Active' },
  { id: 5, name: 'Jupiter', company: 'TVS Motor', fuelType: 'Petrol', segment: 'Scooter', status: 'Active' },
];

const BikeModelsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    toast.success('Bike Model deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    toast.success('Successfully saved!');
    setIsModalOpen(false);
  };

  const bikeColumns = [
    { header: 'Bike Name', accessor: 'name' as any, sortable: true },
    { header: 'Company', accessor: 'company' as any, sortable: true },
    { 
      header: 'Fuel Type', 
      accessor: (bike: any) => (
        <div className={styles.fuel_type_wrapper}>
          <Fuel size={14} color="var(--text-muted)" /> {bike.fuelType}
        </div>
      )
    },
    { header: 'Segment', accessor: 'segment' as any, sortable: true },
    { 
      header: 'Status', 
      accessor: (bike: any) => (
        <Badge type={bike.status === 'Active' ? 'success' : 'neutral'}>
          {bike.status}
        </Badge>
      )
    },
    { 
      header: 'Actions', 
      accessor: (bike: any) => (
        <div className={styles.fuel_type_wrapper}>
          <button className={styles.action_btn} onClick={() => handleEdit(bike)}><Edit3 size={16} /></button>
          <button className={`${styles.action_btn} ${styles.delete}`} onClick={(e) => handleDeleteClick(bike.id, e)}><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <Layout title="Bike Models">
      <div className={styles.header}>
        <h1>Bike Models</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>
          Add New Model
        </Button>
      </div>

      <DataTable 
        columns={bikeColumns} 
        data={bikeModelsData} 
        searchPlaceholder="Search by name, company or segment..." 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Bike Model' : 'Add Bike Model'}
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
            <label>Model Name</label>
            <input type="text" placeholder="e.g. Splendor Plus" defaultValue={editingItem?.name} />
          </div>
          <div className={styles.form_group}>
            <label>Company</label>
            <select defaultValue={editingItem?.company}>
              {companiesData.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Fuel Type</label>
            <select defaultValue={editingItem?.fuelType}>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric (EV)</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Segment</label>
            <select defaultValue={editingItem?.segment}>
              <option value="Commuter">Commuter</option>
              <option value="Scooter">Scooter</option>
              <option value="Sports">Sports</option>
              <option value="Cruiser">Cruiser</option>
            </select>
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
            <Button variant="danger" onClick={confirmDelete}>Remove Model</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to remove this bike model? This will affect current insurance variants.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default BikeModelsPage;
