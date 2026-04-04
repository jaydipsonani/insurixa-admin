import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { 
  Users, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Layers,
  Activity
} from 'lucide-react';
import dynamic from 'next/dynamic';
import styles from './dashboard.module.scss';

// Dynamic import for Recharts to avoid SSR issues
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });

const salesData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

const claimsData = [
  { name: 'Approved', value: 400, color: '#10B981' },
  { name: 'Pending', value: 300, color: '#F59E0B' },
  { name: 'Rejected', value: 100, color: '#EF4444' },
];

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { title: 'Total Users', value: '24,512', icon: Users, colorClass: styles.users, change: '+12.5%', isUp: true },
    { title: 'Active Policies', value: '1,204', icon: ShieldCheck, colorClass: styles.policies, change: '+5.2%', isUp: true },
    { title: 'Claims Today', value: '48', icon: FileText, colorClass: styles.claims, change: '-2.4%', isUp: false },
    { title: 'Monthly Revenue', value: '$124,500', icon: TrendingUp, colorClass: styles.revenue, change: '+18.2%', isUp: true },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', date: '2023-10-24' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Blocked', date: '2023-10-23' },
    { id: 3, name: 'Robert Fox', email: 'robert@example.com', status: 'Active', date: '2023-10-22' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active', date: '2023-10-21' },
  ];

  return (
    <Layout title="Dashboard">
      <div className={styles.header}>
        <div>
          <h1>Welcome back, Admin</h1>
          <p>Here's what's happening with Insurixa today.</p>
        </div>
        <div className={styles.date_filter}>
          <button className={styles.active}>Today</button>
          <button>Weekly</button>
          <button>Monthly</button>
        </div>
      </div>

      <div className={styles.stats_grid}>
        {stats.map((stat, idx) => (
          <Card key={idx} className={styles.stat_card}>
            <div className={styles.stat_content}>
              <div className={styles.stat_info}>
                <p className={styles.stat_title}>{stat.title}</p>
                <h2 className={styles.stat_value}>{stat.value}</h2>
                <div className={`${styles.stat_change} ${stat.isUp ? styles.up : styles.down}`}>
                  {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{stat.change}</span>
                  <span className={styles.since}>since last month</span>
                </div>
              </div>
              <div className={`${styles.stat_icon_wrapper} ${stat.colorClass}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.charts_grid}>
        <Card title="Policy Sales Trend" extra={<MoreVertical size={18} className={styles.more_icon} />}>
          <div className={styles.chart_container}>
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                  />
                  <Line type="monotone" dataKey="value" stroke="#FF6B35" strokeWidth={3} dot={{ r: 4, fill: '#FF6B35', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card title="Claims Status Distribution" extra={<Activity size={18} className={styles.more_icon} />}>
          <div className={styles.chart_container}>
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={claimsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {claimsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <div className={styles.bottom_grid}>
        <Card title="Recent Registered Users" noPadding extra={<button className={styles.view_all}>View All</button>}>
          <div className={styles.table_wrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.user_cell}>
                        <div className={styles.avatar_small}>{user.name.charAt(0)}</div>
                        <div>
                          <p className={styles.name}>{user.name}</p>
                          <p className={styles.email}>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge type={user.status === 'Active' ? 'success' : 'error'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td>{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Quick Actions" className={styles.quick_actions}>
          <div className={styles.actions_grid}>
            <button className={styles.action_item}>
              <div className={`${styles.action_icon} ${styles.orange}`}>
                <Layers size={20} />
              </div>
              <span>Add New Policy</span>
            </button>
            <button className={styles.action_item}>
              <div className={`${styles.action_icon} ${styles.blue}`}>
                <FileText size={20} />
              </div>
              <span>Export Reports</span>
            </button>
            <button className={styles.action_item}>
              <div className={`${styles.action_icon} ${styles.green}`}>
                <Users size={20} />
              </div>
              <span>Manage Agents</span>
            </button>
            <button className={styles.action_item}>
              <div className={`${styles.action_icon} ${styles.purple}`}>
                <ShieldCheck size={20} />
              </div>
              <span>Security Audit</span>
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
