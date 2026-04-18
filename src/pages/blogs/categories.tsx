import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Edit3, 
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import styles from './blogs.module.scss';

const categories = [
  { name: 'Insurance Tips', slug: 'insurance-tips', count: 12 },
  { name: 'Company News', slug: 'company-news', count: 5 },
  { name: 'Vehicle Care', slug: 'vehicle-care', count: 8 },
  { name: 'Claim Guides', slug: 'claim-guides', count: 10 }
];

const BlogCategoriesPage = () => {
  const [isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const handleEdit = (cat: any) => {
    setEditingCategory(cat);
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (slug: string) => {
    setSelectedSlug(slug);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success('Category deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    toast.success(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
    setIsDrawerOpen(false);
  };

  return (
    <Layout title="Blog Categories">
      <div className={styles.header}>
        <h1>Blog Categories</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>
          Add Category
        </Button>
      </div>

      <Card noPadding>
        <div className={styles.table_scroll}>
          <table className={styles.table}>
            <thead>
            <tr>
              <th>Category Name</th>
              <th>Slug</th>
              <th>Posts Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx}>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.count}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.action_btn} onClick={() => handleEdit(cat)}><Edit3 size={16} /></button>
                    <button className={`${styles.action_btn} ${styles.delete}`} onClick={() => handleDeleteClick(cat.slug)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        size="md"
        footer={
          <div className={styles.drawer_footer_actions}>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </div>
        }
      >
        <div className={styles.form_grid}>
          <div className={styles.form_group}>
            <label>Category Name</label>
            <input type="text" placeholder="e.g. Life Insurance" defaultValue={editingCategory?.name} />
          </div>
          <div className={styles.form_group}>
            <label>Category Slug</label>
            <input type="text" placeholder="e.g. life-insurance" defaultValue={editingCategory?.slug} />
          </div>
          <div className={styles.form_group}>
            <label>Description</label>
            <textarea placeholder="Write a short description..." rows={4}></textarea>
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
            <Button variant="danger" onClick={confirmDelete}>Delete Category</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to delete this category? All posts in this category will be marked as 'Uncategorized'.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default BlogCategoriesPage;
