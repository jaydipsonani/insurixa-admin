import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Badge from '@/components/Badge';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Calendar, 
  User, 
  Image as ImageIcon,
  ExternalLink,
  Save,
  X,
  AlertTriangle
} from 'lucide-react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { toast } from 'react-hot-toast';
import styles from './blogs.module.scss';

const initialPosts = [
  { 
    id: 1, 
    title: 'How to choose the best car insurance for your needs', 
    category: 'Insurance Tips', 
    author: 'Admin', 
    date: '2023-11-20', 
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 2, 
    title: 'Insurixa launches new 24x7 roadside assistance', 
    category: 'Company News', 
    author: 'Marketing', 
    date: '2023-11-15', 
    status: 'Published',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=400'
  }
];

const categories = ['Insurance Tips', 'Company News', 'Vehicle Care', 'Claim Guides'];

const BlogPostsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedPostId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success('Post deleted successfully!');
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    toast.success(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
    setIsDrawerOpen(false);
  };

  return (
    <Layout title="Blog Posts">
      <div className={styles.header}>
        <h1>Blog Posts</h1>
        <Button leftIcon={<Plus size={18} />} onClick={handleCreate}>
          Create Post
        </Button>
      </div>

      <div className={styles.posts_container}>
        {initialPosts.map((post) => (
          <div key={post.id} className={styles.blog_card}>
            <div className={styles.thumbnail}>
              <img src={post.image} alt={post.title} />
            </div>
            <div className={styles.content}>
              <div>
                <span className={styles.category_tag}>{post.category}</span>
                <h3>{post.title}</h3>
                <div className={styles.meta}>
                  <span><Calendar size={12} /> {post.date}</span>
                  <span><User size={12} /> {post.author}</span>
                </div>
              </div>
              <div className={styles.footer}>
                <Badge type={post.status === 'Published' ? 'success' : 'warning'}>
                  {post.status}
                </Badge>
                <div className={styles.actions}>
                  <button className={styles.action_btn} onClick={() => handleEdit(post)}><Edit3 size={18} /></button>
                  <button className={styles.action_btn}><ExternalLink size={18} /></button>
                  <button className={`${styles.action_btn} ${styles.delete}`} onClick={() => handleDeleteClick(post.id)}><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingPost ? 'Edit Post' : 'Create New Post'}
        size="lg"
        footer={
          <div className={styles.drawer_footer_actions}>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Discard</Button>
            <Button variant="secondary" leftIcon={<Save size={18} />} onClick={handleSave}>
              {editingPost ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        }
      >
        <div className={styles.form_grid}>
          <div className={styles.form_group}>
            <label>Post Title</label>
            <input type="text" placeholder="Enter title here..." defaultValue={editingPost?.title} />
          </div>

          <div className={styles.form_group}>
            <label>Meta Keywords (SEO)</label>
            <input type="text" placeholder="keyword1, keyword2..." />
          </div>

          <div className={styles.form_group}>
            <label>Category</label>
            <select defaultValue={editingPost?.category}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className={styles.form_group}>
            <label>Thumbnail Image</label>
            <div className={styles.upload_area}>
               {editingPost ? (
                 <div className={styles.image_preview_container}>
                    <img src={editingPost.image} alt="Preview" />
                    <button className={styles.remove_image_btn}><X size={16}/></button>
                 </div>
               ) : (
                  <>
                    <ImageIcon size={32} />
                    <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Click to upload cover image</p>
                    <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>PNG, JPG or WEBP (Max 2MB)</span>
                  </>
               )}
            </div>
          </div>

          <div className={styles.form_group}>
            <label>Content</label>
            <textarea placeholder="Write your blog content here..." defaultValue="This is a sample blog post content for insurance guide."></textarea>
          </div>

          <div className={styles.form_group}>
             <div className={styles.checkbox_group}>
                <input type="checkbox" id="published" defaultChecked={editingPost?.status === 'Published'} />
                <label htmlFor="published">Publish immediately</label>
             </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="var(--error)" style={{ marginBottom: '15px' }} />
          <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default BlogPostsPage;
