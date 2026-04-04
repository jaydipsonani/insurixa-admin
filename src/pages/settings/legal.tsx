import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Save } from 'lucide-react';
import styles from './settings.module.scss';
import { toast } from 'react-hot-toast';

const LegalSettingsPage = () => {
  const [activeTab, setActiveTab ] = useState('terms');

  const handleSave = () => {
    toast.success('Legal documents updated successfully!');
  };

  const getTabLabel = () => {
    switch(activeTab) {
      case 'privacy': return 'Privacy Policy';
      case 'cancellation': return 'Cancellation Policy';
      default: return 'Terms & Conditions';
    }
  };

  return (
    <Layout title="Legal & Compliance">
      <div className={styles.header}>
        <h1>Legal & Compliance</h1>
        <Button leftIcon={<Save size={18} />} onClick={handleSave}>Save Changes</Button>
      </div>

      <Card>
        <div className={styles.form_section}>
           <h3>Legal Documents</h3>
           <div className={styles.nav_tabs}>
              <p 
                className={`${styles.nav_tab_item} ${activeTab === 'terms' ? styles.active : ''}`}
                onClick={() => setActiveTab('terms')}
              >
                Terms & Conditions
              </p>
              <p 
                className={`${styles.nav_tab_item} ${activeTab === 'privacy' ? styles.active : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                Privacy Policy
              </p>
              <p 
                className={`${styles.nav_tab_item} ${activeTab === 'cancellation' ? styles.active : ''}`}
                onClick={() => setActiveTab('cancellation')}
              >
                Cancellation Policy
              </p>
           </div>
           <div className={styles.form_group}>
              <label>{getTabLabel()} Content (HTML/Markdown)</label>
              <textarea 
                rows={15}
                key={activeTab} // Force re-render on tab change
                defaultValue={`<h1>${getTabLabel()}</h1><p>Welcome to Insurixa. Please read these terms carefully...</p>`}
              ></textarea>
           </div>
        </div>
      </Card>
    </Layout>
  );
};

export default LegalSettingsPage;
