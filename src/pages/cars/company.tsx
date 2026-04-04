import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import styles from './cars.module.scss';
import { toast } from 'react-hot-toast';

const companiesData = [
  { id: 1, name: 'Maruti Suzuki', logo: 'https://logo.clearbit.com/marutisuzuki.com', modelsCount: 15 },
  { id: 2, name: 'Hyundai', logo: 'https://logo.clearbit.com/hyundai.com', modelsCount: 12 },
  { id: 3, name: 'Tata Motors', logo: 'https://logo.clearbit.com/tatamotors.com', modelsCount: 10 },
  { id: 4, name: 'Mahindra', logo: 'https://logo.clearbit.com/mahindra.com', modelsCount: 8 },
  { id: 5, name: 'Toyota', logo: 'https://logo.clearbit.com/toyota.com', modelsCount: 9 },
  { id: 6, name: 'Kia', logo: 'https://logo.clearbit.com/kia.com', modelsCount: 6 },
];

const CarCompanyPage = () => {
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
    <Layout title="Car Companies">
      <div className={styles.header}>
        <h1>Car Companies</h1>
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
            <input type="text" placeholder="e.g. Maruti Suzuki" defaultValue={editingItem?.name} />
          </div>
          <div className={styles.form_group}>
            <label>Website URL</label>
            <input type="text" placeholder="https://..." />
          </div>
          <div className={styles.form_group}>
            <label>Company Logo</label>
            <div className={styles.logo_upload}>
              <ImageIcon size={32} />
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Upload PNG or WEBP with transparent background (Min 256x256).
            </p>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CarCompanyPage;
