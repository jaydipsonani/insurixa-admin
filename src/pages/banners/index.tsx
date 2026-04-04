import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Link as LinkIcon,
  Navigation,
  AlertTriangle
} from 'lucide-react';
import styles from './banners.module.scss';
import { toast } from 'react-hot-toast';

const bannersData = [
  { id: 1, title: 'Winter Insurance Sale', image: 'https://images.unsplash.com/photo-1610332858348-18c7bc991afc?auto=format&fit=crop&q=80&w=800', url: '/offers/winter', placement: 'Home Top', status: 'Active' },
  { id: 2, title: 'New Car Policy Launch', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800', url: '/products/car', placement: 'Home Center', status: 'Active' },
  { id: 3, title: 'Claim Guide Banner', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800', url: '/blogs/claim-guide', placement: 'Blog Sidebar', status: 'Inactive' },
];

const BannersPage = () => {
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleEdit = (banner: any) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    toast.success('Banner updated successfully!');
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success('Banner removed successfully!');
    setIsDeleteModalOpen(false);
  };

  return (
    <Layout title="Banners Management">
      <div className={styles.header}>
        <h1>Banners Management</h1>
        <Button leftIcon={<Plus size={18} />} onClick={() => { setEditingBanner(null); setIsModalOpen(true); }}>Add Banner</Button>
      </div>

      <div className={styles.banners_grid}>
         {bannersData.map((banner) => (
           <Card key={banner.id} noPadding>
              <div className={styles.banner_image_wrapper}>
                 <img src={banner.image} alt={banner.title} />
                 <div className={styles.status_badge_container}>
                    <Badge type={banner.status === 'Active' ? 'success' : 'neutral'}>{banner.status}</Badge>
                 </div>
              </div>
              <div className={styles.banner_content}>
                 <h3>{banner.title}</h3>
                 <div className={styles.banner_meta}>
                    <div className={styles.meta_item}>
                       <Navigation size={14} /> {banner.placement}
                    </div>
                    <div className={`${styles.meta_item} ${styles.link}`}>
                       <LinkIcon size={14} /> {banner.url}
                    </div>
                 </div>
                 <div className={styles.banner_actions}>
                    <Button variant="outline" size="sm" fullWidth onClick={() => handleEdit(banner)}>Edit</Button>
                    <Button variant="danger" size="sm" className={styles.delete} onClick={() => handleDeleteClick(banner.id)}><Trash2 size={16} /></Button>
                 </div>
              </div>
           </Card>
         ))}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? 'Edit Banner' : 'Upload New Banner'}
        size="md"
        footer={
           <div className={styles.banner_actions} style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSave}>Save Banner</Button>
           </div>
        }
      >
        <div className={styles.form_grid}>
            <div className={styles.form_group}>
              <label>Banner Title</label>
              <input type="text" placeholder="e.g. Winter Insurance Sale" defaultValue={editingBanner?.title} />
            </div>
            <div className={styles.form_group}>
              <label>Redirect URL</label>
              <input type="text" placeholder="https://..." defaultValue={editingBanner?.url} />
            </div>
            <div className={styles.form_group}>
              <label>Placement</label>
              <select defaultValue={editingBanner?.placement}>
                <option value="Home Top">Home Top</option>
                <option value="Home Center">Home Center</option>
                <option value="Offers List">Offers List</option>
                <option value="Blog Sidebar">Blog Sidebar</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label>Banner Image</label>
              <div className={styles.upload_area}>
                {editingBanner ? (
                  <img src={editingBanner.image} alt="Preview" />
                ) : (
                  <>
                    <ImageIcon size={32} />
                    <p style={{ marginTop: '10px' }}>Drag & drop image here</p>
                  </>
                )}
              </div>
            </div>
            <div className={styles.form_group}>
               <div className={styles.checkbox_group}>
                  <input type="checkbox" id="activeStatus" defaultChecked={editingBanner?.status === 'Active'} />
                  <label htmlFor="activeStatus">Active for Promotion</label>
               </div>
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
              <Button variant="danger" onClick={confirmDelete}>Remove Banner</Button>
           </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to remove this banner? It will no longer be visible to your customers.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default BannersPage;
