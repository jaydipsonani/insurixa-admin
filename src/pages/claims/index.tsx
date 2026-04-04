import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  FileText, 
  User, 
  Car, 
  AlertTriangle,
  Download
} from 'lucide-react';
import styles from './claims.module.scss';
import { toast } from 'react-hot-toast';

interface Claim {
  id: string;
  userName: string;
  vehicle: string;
  type: 'Accident' | 'Theft' | 'Medical' | 'Third Party';
  status: 'Pending' | 'Approved' | 'Rejected';
  amount: string;
  date: string;
}

const initialClaims: Claim[] = [
  { id: 'CLM-5012', userName: 'John Doe', vehicle: 'Maruti Suzuki Brezza (GJ01-AB-1234)', type: 'Accident', status: 'Pending', amount: '$1,250', date: '2023-11-23' },
  { id: 'CLM-4985', userName: 'Jane Smith', vehicle: 'Honda Activa 6G (MH12-XY-9876)', type: 'Theft', status: 'Approved', amount: '$800', date: '2023-11-20' },
  { id: 'CLM-5024', userName: 'Robert Fox', vehicle: 'Hyundai Creta (DL04-CD-4567)', type: 'Accident', status: 'Rejected', amount: '$2,400', date: '2023-11-24' },
  { id: 'CLM-5001', userName: 'Emily Davis', vehicle: 'Tata Nexon (KA05-MN-2233)', type: 'Third Party', status: 'Pending', amount: '$500', date: '2023-11-22' },
];

const ClaimsPage = () => {
  const [claims, setClaims] = useState<Claim[]>(initialClaims);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isDrawerOpen, setIsDrawerOpen ] = useState(false);

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsDrawerOpen(true);
  };

  const handleStatusUpdate = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setClaims(claims.map(c => c.id === id ? { ...c, status: newStatus } : c));
    toast.success(`Claim ${newStatus} Successfully`);
    setIsDrawerOpen(false);
  };

  const columns = [
    { header: 'Claim ID', accessor: 'id' as any, sortable: true },
    { header: 'User', accessor: 'userName' as any, sortable: true },
    { header: 'Vehicle', accessor: 'vehicle' as any },
    { 
      header: 'Type', 
      accessor: (claim: Claim) => (
        <Badge type="info">{claim.type}</Badge>
      )
    },
    { 
      header: 'Status', 
      accessor: (claim: Claim) => (
        <Badge type={claim.status === 'Approved' ? 'success' : claim.status === 'Pending' ? 'warning' : 'error'}>
          {claim.status}
        </Badge>
      )
    },
    { header: 'Amount', accessor: 'amount' as any, sortable: true },
    { 
      header: 'Actions', 
      accessor: (claim: Claim) => (
        <div className={styles.actions_pill}>
          <button className={styles.action_btn} onClick={(e) => { e.stopPropagation(); handleViewClaim(claim); }}>
            <Eye size={18} />
          </button>
          {claim.status === 'Pending' && (
            <>
              <button className={`${styles.action_btn} ${styles.icon_success}`} onClick={(e) => { e.stopPropagation(); handleStatusUpdate(claim.id, 'Approved'); }}>
                <CheckCircle size={18} />
              </button>
              <button className={`${styles.action_btn} ${styles.icon_error}`} onClick={(e) => { e.stopPropagation(); handleStatusUpdate(claim.id, 'Rejected'); }}>
                <XCircle size={18} />
              </button>
            </>
          )}
        </div>
      )
    },
  ];

  return (
    <Layout title="Claims Management">
      <div className={styles.header}>
        <h1>Claims Management</h1>
        <div className={styles.header_actions}>
          <Button variant="outline" leftIcon={<Download size={18} />}>Export Report</Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={claims} 
        searchPlaceholder="Search by Claim ID or User Name..." 
        onRowClick={handleViewClaim}
      />

      <Modal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Claim Settlement Details"
        size="lg"
        footer={
          selectedClaim?.status === 'Pending' ? (
            <div className={styles.actions_pill} style={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => handleStatusUpdate(selectedClaim.id, 'Rejected')}>Reject Claim</Button>
              <Button variant="primary" onClick={() => handleStatusUpdate(selectedClaim.id, 'Approved')}>Approve & Pay</Button>
            </div>
          ) : (
            <Button variant="outline" fullWidth onClick={() => setIsDrawerOpen(false)}>Close Window</Button>
          )
        }
      >
        {selectedClaim && (
          <div className={styles.claim_detail}>
             <div className={styles.claim_info_group}>
                <h4><User size={18} /> User Information</h4>
                <div className={styles.claim_grid}>
                   <div>
                      <p className={styles.label_small}>Policy Holder</p>
                      <p className={styles.value_semibold}>{selectedClaim.userName}</p>
                   </div>
                   <div>
                      <p className={styles.label_small}>Mobile Number</p>
                      <p className={styles.value_semibold}>+91 98765 43210</p>
                   </div>
                </div>
             </div>

             <div className={styles.claim_info_group}>
                <h4><Car size={18} /> Vehicle Details</h4>
                <p className={styles.claim_description}>{selectedClaim.vehicle}</p>
                <div className={`${styles.claim_grid} ${styles.mt_10}`}>
                   <div>
                      <p className={styles.label_small}>Engine No.</p>
                      <p className={styles.value_semibold}>ENG782B12</p>
                   </div>
                   <div>
                      <p className={styles.label_small}>Chassis No.</p>
                      <p className={styles.value_semibold}>CHS1920K10</p>
                   </div>
                </div>
             </div>

             <div className={styles.claim_info_group}>
                <h4><AlertTriangle size={18} /> Incident Summary</h4>
                <div className={styles.claim_grid}>
                   <div>
                      <p className={styles.label_small}>Type of Claim</p>
                      <Badge type="info">{selectedClaim.type}</Badge>
                   </div>
                   <div>
                      <p className={styles.label_small}>Date of Incident</p>
                      <p className={styles.value_semibold}>Nov 20, 2023</p>
                   </div>
                </div>
                <div className={styles.mt_15}>
                   <p className={styles.label_small}>Description</p>
                   <p className={styles.claim_description}>
                      Vehicle was parked in a public area and sustained damage on the front bumper due to another vehicle's collision.
                   </p>
                </div>
             </div>

             <div className={styles.claim_info_group}>
                <h4><FileText size={18} /> Documentation</h4>
                <div className={styles.doc_list}>
                   <div className={styles.doc_item}>
                      <span className={styles.doc_name}>Accident Photos.zip</span>
                      <button className={styles.action_btn}><Download size={14} /></button>
                   </div>
                   <div className={styles.doc_item}>
                      <span className={styles.doc_name}>Driving License.pdf</span>
                      <button className={styles.action_btn}><Download size={14} /></button>
                   </div>
                   <div className={styles.doc_item}>
                      <span className={styles.doc_name}>Insurance Policy.pdf</span>
                      <button className={styles.action_btn}><Download size={14} /></button>
                   </div>
                </div>
             </div>

             <div className={styles.claim_info_group}>
                <h4>Status Timeline</h4>
                <div className={styles.status_timeline}>
                   <div className={`${styles.timeline_item} ${styles.active}`}>
                      <p>Claim Submitted</p>
                      <span>Nov 23, 2023 - 09:12 AM</span>
                   </div>
                   <div className={styles.timeline_item}>
                      <p>Surveyor Assigned</p>
                      <span>Nov 23, 2023 - 02:45 PM</span>
                   </div>
                   <div className={styles.timeline_item}>
                      <p>Documents Verified</p>
                      <span>Pending Verification</span>
                   </div>
                </div>
             </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default ClaimsPage;
