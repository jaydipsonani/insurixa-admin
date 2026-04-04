import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import styles from './bikes.module.scss';
import { toast } from 'react-hot-toast';

const companiesData = [
  { id: 1, name: 'Hero MotoCorp', logo: 'https://logo.clearbit.com/heromotocorp.com', modelsCount: 15 },
  { id: 2, name: 'Honda', logo: 'https://logo.clearbit.com/honda.com', modelsCount: 20 },
  { id: 3, name: 'TVS Motor', logo: 'https://logo.clearbit.com/tvsmotor.com', modelsCount: 12 },
  { id: 4, name: 'Bajaj Auto', logo: 'https://logo.clearbit.com/bajajauto.com', modelsCount: 10 },
  { id: 5, name: 'Yamaha', logo: 'https://logo.clearbit.com/yamaha-motor-india.com', modelsCount: 8 },
  { id: 6, name: 'Royal Enfield', logo: 'https://logo.clearbit.com/royalenfield.com', modelsCount: 5 },
];

const BikeCompanyPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    toast.success('Successfully saved!');
    setIsDrawerOpen(false);
  };

  return (
    <Layout title="Bike Companies">
      <div className={styles.header}>
        <h1>Bike Companies</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>
          Add Company
        </Button>
      </div>

      <div className={styles.company_list}>
        {companiesData.map((company) => (
          <div key={company.id} className={styles.company_card} onClick={() => handleEdit(company)}>
            <div className={styles.logo}>
               <img src={company.logo} alt={company.name} onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/60')} />
            </div>
            <h3>{company.name}</h3>
            <p>{company.modelsCount} Models Managed</p>
            <div className={styles.card_divider}></div>
            <div className={styles.card_footer_icon}>
               <ChevronRight size={16} color="var(--text-muted)" />
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingItem ? 'Edit Company' : 'Add Company'}
        size="md"
        footer={
          <div className={styles.drawer_footer_actions}>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </div>
        }
      >
        <div className={styles.form_grid}>
          <div className={styles.form_group}>
            <label>Company Name</label>
            <input type="text" placeholder="e.g. Hero MotoCorp" defaultValue={editingItem?.name} />
          </div>
          <div className={styles.form_group}>
            <label>Company Logo</label>
            <div className={styles.logo_upload}>
              <ImageIcon size={32} />
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default BikeCompanyPage;
