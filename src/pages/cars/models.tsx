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
import styles from './cars.module.scss';
import { toast } from 'react-hot-toast';

const companiesData = [
  { id: 1, name: 'Maruti Suzuki' },
  { id: 2, name: 'Hyundai' },
  { id: 3, name: 'Tata Motors' },
  { id: 4, name: 'Mahindra' },
];

const carsModelsData = [
  { id: 1, name: 'Brezza', company: 'Maruti Suzuki', fuelType: 'Petrol', segment: 'Compact SUV', status: 'Active' },
  { id: 2, name: 'Creta', company: 'Hyundai', fuelType: 'Diesel/Petrol', segment: 'SUV', status: 'Active' },
  { id: 3, name: 'Nexon', company: 'Tata Motors', fuelType: 'EV/Petrol', segment: 'Compact SUV', status: 'Active' },
  { id: 4, name: 'XUV 700', company: 'Mahindra', fuelType: 'Diesel', segment: 'Premium SUV', status: 'Active' },
  { id: 5, name: 'Swift', company: 'Maruti Suzuki', fuelType: 'Petrol', segment: 'Hatchback', status: 'Active' },
];

const CarModelsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
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
    toast.success('Car Model deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    toast.success('Successfully saved!');
    setIsModalOpen(false);
  };

  const carColumns = [
    { header: 'Car Name', accessor: 'name' as any, sortable: true },
    { header: 'Company', accessor: 'company' as any, sortable: true },
    { 
      header: 'Fuel Type', 
      accessor: (car: any) => (
        <div className={styles.fuel_type_wrapper}>
          <Fuel size={14} color="var(--text-muted)" /> {car.fuelType}
        </div>
      )
    },
    { header: 'Segment', accessor: 'segment' as any, sortable: true },
    { 
      header: 'Status', 
      accessor: (car: any) => (
        <Badge type={car.status === 'Active' ? 'success' : 'neutral'}>
          {car.status}
        </Badge>
      )
    },
    { 
      header: 'Actions', 
      accessor: (car: any) => (
        <div className={styles.fuel_type_wrapper}>
          <button className={styles.action_btn} onClick={() => handleEdit(car)}><Edit3 size={16} /></button>
          <button className={`${styles.action_btn} ${styles.delete}`} onClick={(e) => handleDeleteClick(car.id, e)}><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <Layout title="Car Models">
      <div className={styles.header}>
        <h1>Car Models</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>
          Add New Model
        </Button>
      </div>

      <DataTable 
        columns={carColumns} 
        data={carsModelsData} 
        searchPlaceholder="Search by name, company or segment..." 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Car Model' : 'Add Car Model'}
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
            <input type="text" placeholder="e.g. Brezza" defaultValue={editingItem?.name} />
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
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric (EV)</option>
              <option value="Petrol/CNG">Petrol + CNG</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Segment</label>
            <select defaultValue={editingItem?.segment}>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="Compact SUV">Compact SUV</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
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
          <p>Are you sure you want to remove this car model? All associated listings will be impacted.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default CarModelsPage;
