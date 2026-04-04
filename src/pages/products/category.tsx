import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { 
  Plus
} from 'lucide-react';
import styles from './products.module.scss';
import { toast } from 'react-hot-toast';

const categoriesData = [
  { name: 'Car Insurance', count: 12 },
  { name: 'Bike Insurance', count: 8 },
  { name: 'Commercial Vehicle', count: 4 },
  { name: 'Health Insurance', count: 6 },
  { name: 'Travel Insurance', count: 3 },
  { name: 'Add-ons', count: 5 },
];

const ProductCategoriesPage = () => {
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
    <Layout title="Product Categories">
      <div className={styles.header}>
        <h1>Product Categories</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>Add New Category</Button>
      </div>

      <div className={styles.category_grid}>
          {categoriesData.map((cat, idx) => (
            <Card key={idx} title={cat.name}>
              <div className={styles.category_footer}>
                  <p className={styles.product_count}>{cat.count} Products Active</p>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(cat)}>Edit</Button>
              </div>
            </Card>
          ))}
      </div>

      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingItem ? 'Edit Category' : 'Add New Category'}
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
            <label>Category Name</label>
            <input type="text" placeholder="e.g. Life Insurance" defaultValue={editingItem?.name} />
          </div>
          <div className={styles.form_group}>
            <label>Description</label>
            <textarea placeholder="Write a short description..." rows={4}></textarea>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default ProductCategoriesPage;
