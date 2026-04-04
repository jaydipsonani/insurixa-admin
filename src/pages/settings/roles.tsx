import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import { 
  Shield, 
  Plus,
  Save
} from 'lucide-react';
import styles from './settings.module.scss';
import { toast } from 'react-hot-toast';

const RoleSettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    toast.success('Role permissions updated successfully!');
  };

  const handleCreateRole = () => {
    setIsModalOpen(true);
  };

  const handleSaveNewRole = () => {
    toast.success('New role created successfully!');
    setIsModalOpen(false);
  };

  return (
    <Layout title="Admin Roles (RBAC)">
      <div className={styles.header}>
        <h1>Admin Roles (RBAC)</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreateRole}>Create New Role</Button>
      </div>

      <Card>
        <div className={styles.form_section}>
          <h3>Role-Based Access Control</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Manage what different administrators can see and do.</p>
          
          <div className={styles.role_card}>
             <div className={styles.role_info}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <Shield size={20} color="#1A3C6E" />
                   <h4>Full Administrator</h4>
                </div>
                <p>Has all permissions. Can manage other admins.</p>
             </div>
             <Badge type="success">System Default</Badge>
          </div>

          <div className={styles.role_card}>
             <div className={styles.role_info}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <Shield size={20} color="#3B82F6" />
                   <h4>Claims Manager</h4>
                </div>
                <p>Can only manage claims and view policies.</p>
             </div>
             <div className={styles.actions}>
                <Button variant="ghost" size="sm">Edit Permissions</Button>
             </div>
          </div>

          <div className={styles.role_card}>
             <div className={styles.role_info}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <Shield size={20} color="#F59E0B" />
                   <h4>Content Editor</h4>
                </div>
                <p>Can only manage blogs, news and banners.</p>
             </div>
             <div className={styles.actions}>
                <Button variant="ghost" size="sm">Edit Permissions</Button>
             </div>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Role"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" leftIcon={<Save size={18} />} onClick={handleSaveNewRole}>Save Role</Button>
          </div>
        }
      >
        <div className={styles.form_grid}>
          <div className={styles.form_group}>
            <label>Role Name</label>
            <input type="text" placeholder="e.g. Sales Executive" />
          </div>
          <div className={styles.form_group}>
            <label>Description</label>
            <input type="text" placeholder="Brief role summary..." />
          </div>
          <div className={styles.form_group}>
            <label>Permissions Set</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="p1" /><label htmlFor="p1">Manage Policies</label>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="p2" /><label htmlFor="p2">Manage Claims</label>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="p3" /><label htmlFor="p3">Manage Blog Content</label>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="p4" /><label htmlFor="p4">Manage Users</label>
               </div>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default RoleSettingsPage;
