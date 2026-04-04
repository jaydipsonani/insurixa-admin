import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { 
  Settings as SettingsIcon, 
  Save,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import styles from './settings.module.scss';
import { toast } from 'react-hot-toast';

const GeneralSettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    toast.success('General settings updated successfully!');
  };

  const handleLogoChange = () => {
    setIsModalOpen(true);
  };

  const handleUploadLogo = () => {
    toast.success('Logo uploaded successfully!');
    setIsModalOpen(false);
  };

  return (
    <Layout title="General Settings">
      <div className={styles.header}>
        <h1>General Settings</h1>
        <Button leftIcon={<Save size={18} />} onClick={handleSave}>Save Changes</Button>
      </div>

      <Card>
        <div className={styles.form_section}>
          <h3>App Information</h3>
          <div className={styles.form_grid}>
            <div className={styles.form_group}>
              <label>App Name</label>
              <input type="text" defaultValue="Insurixa Admin Panel" />
            </div>
            <div className={styles.form_group}>
              <label>Support Email</label>
              <input type="email" defaultValue="support@insurixa.com" />
            </div>
            <div className={styles.form_group}>
              <label>Timezone</label>
              <select>
                <option>India (GMT+5:30)</option>
                <option>USA (EST)</option>
                <option>UK (GMT)</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label>Currency Symbol</label>
              <input type="text" defaultValue="$ (USD)" />
            </div>
          </div>
          <div className={styles.logo_preview_group}>
            <label>App Logo</label>
            <div className={styles.logo_preview_content}>
              <div className={styles.logo_placeholder}>I</div>
              <Button variant="outline" size="sm" onClick={handleLogoChange}>Change Logo</Button>
            </div>
          </div>
        </div>
      </Card>

      <Modal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         title="Update Store Logo"
         size="sm"
         footer={
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
               <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
               <Button variant="primary" leftIcon={<Upload size={18} />} onClick={handleUploadLogo}>Upload & Save</Button>
            </div>
         }
      >
         <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ 
               width: '120px', 
               height: '120px', 
               backgroundColor: '#f1f1f1', 
               borderRadius: '10px', 
               margin: '0 auto 20px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               border: '2px dashed #ddd'
            }}>
               <ImageIcon size={48} color="#999" />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
               Click to upload or drag & drop PNG/SVG logo.<br />
               Recommended size: 512x512 pixels.
            </p>
         </div>
      </Modal>
    </Layout>
  );
};

export default GeneralSettingsPage;
