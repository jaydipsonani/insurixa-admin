import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { 
  Plus, 
  Trash2, 
  Edit3
} from 'lucide-react';
import styles from './locations.module.scss';

const statesData = [
  { id: 'ST-01', name: 'Gujarat', code: 'GJ', citiesCount: 45 },
  { id: 'ST-02', name: 'Maharashtra', code: 'MH', citiesCount: 62 },
  { id: 'ST-03', name: 'Delhi', code: 'DL', citiesCount: 12 },
  { id: 'ST-04', name: 'Rajasthan', code: 'RJ', citiesCount: 38 },
];

const citiesData = [
  { id: 'CT-01', name: 'Ahmedabad', state: 'Gujarat', pincode: '380001', status: 'Active' },
  { id: 'CT-02', name: 'Mumbai', state: 'Maharashtra', pincode: '400001', status: 'Active' },
  { id: 'CT-03', name: 'Pune', state: 'Maharashtra', pincode: '411001', status: 'Active' },
  { id: 'CT-04', name: 'Jaipur', state: 'Rajasthan', pincode: '302001', status: 'Active' },
];

const LocationsPage = () => {
  const [activeTab, setActiveTab ] = useState<'states' | 'cities'>('states');

  const stateColumns = [
    { header: 'State Name', accessor: 'name' as any, sortable: true },
    { header: 'Code', accessor: 'code' as any, sortable: true },
    { header: 'Total Cities', accessor: 'citiesCount' as any, sortable: true },
    { 
      header: 'Actions', 
      accessor: () => (
        <div className={styles.avatar_placeholder} style={{ background: 'transparent', gap: '8px', color: 'inherit' }}>
          <button className={styles.action_btn}><Edit3 size={16} /></button>
          <button className={`${styles.action_btn} ${styles.delete}`}><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  const cityColumns = [
    { header: 'City Name', accessor: 'name' as any, sortable: true },
    { header: 'State', accessor: 'state' as any, sortable: true },
    { header: 'Pincode', accessor: 'pincode' as any, sortable: true },
    { 
      header: 'Status', 
      accessor: (c: any) => (
        <Badge type={c.status === 'Active' ? 'success' : 'neutral'}>{c.status}</Badge>
      )
    },
    { 
      header: 'Actions', 
      accessor: () => (
        <div className={styles.avatar_placeholder} style={{ background: 'transparent', gap: '8px', color: 'inherit' }}>
          <button className={styles.action_btn}><Edit3 size={16} /></button>
          <button className={`${styles.action_btn} ${styles.delete}`}><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <Layout title="States & Cities">
      <div className={styles.header}>
        <h1>States & Cities</h1>
        <Button leftIcon={<Plus size={18} />}>
          {activeTab === 'states' ? 'Add State' : 'Add City'}
        </Button>
      </div>

      <div className={styles.tabs}>
        <div className={`${styles.tab} ${activeTab === 'states' ? styles.active : ''}`.trim()} onClick={() => setActiveTab('states')}>States List</div>
        <div className={`${styles.tab} ${activeTab === 'cities' ? styles.active : ''}`.trim()} onClick={() => setActiveTab('cities')}>Cities Management</div>
      </div>

      {activeTab === 'states' ? (
        <DataTable columns={stateColumns} data={statesData} searchPlaceholder="Search state by name or code..." />
      ) : (
        <DataTable columns={cityColumns} data={citiesData} searchPlaceholder="Search city by name or pincode..." />
      )}
    </Layout>
  );
};

export default LocationsPage;
