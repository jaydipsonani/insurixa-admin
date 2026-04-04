import React from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShieldCheck,
  TrendingDown,
  Download
} from 'lucide-react';
import Button from '@/components/Button';
import styles from './analytics.module.scss';

const AnalyticsPage = () => {
  return (
    <Layout title="Reports & Analytics">
      <div className={styles.header}>
        <h1>Reports & Analytics</h1>
        <Button leftIcon={<Download size={18} />} variant="outline">Export Reports</Button>
      </div>

      <div className={styles.stats_grid}>
        <Card title="Revenue Growth">
          <div className={styles.stat_content}>
            <div className={styles.value}>$124,500</div>
            <div className={`${styles.trend} ${styles.up}`}>
              <TrendingUp size={14} /> +12% from last month
            </div>
          </div>
        </Card>
        <Card title="New Policies">
          <div className={styles.stat_content}>
            <div className={styles.value}>1,248</div>
            <div className={`${styles.trend} ${styles.up}`}>
              <TrendingUp size={14} /> +5.4% from last month
            </div>
          </div>
        </Card>
        <Card title="Claims Processed">
          <div className={styles.stat_content}>
            <div className={styles.value}>342</div>
            <div className={`${styles.trend} ${styles.down}`}>
              <TrendingDown size={14} /> -2% from last month
            </div>
          </div>
        </Card>
      </div>

      <Card title="Monthly Performance Overview" className={styles.chart_placeholder}>
        <div className={styles.placeholder_content}>
           <BarChart3 size={48} color="var(--text-muted)" />
           <p>Interactive charts and detailed metrics will be integrated here.</p>
        </div>
      </Card>
    </Layout>
  );
};

export default AnalyticsPage;
