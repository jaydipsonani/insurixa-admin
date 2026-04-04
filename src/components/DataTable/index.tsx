import React, { useState } from 'react';
import styles from './DataTable.module.scss';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  Download,
  Filter
} from 'lucide-react';
import Button from '../Button';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  actions?: React.ReactNode;
}

const DataTable = <T extends { id: string | number }>({ 
  columns, 
  data, 
  title, 
  searchPlaceholder = "Search...",
  onRowClick,
  actions
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' | null }>({ key: null, direction: null });

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key: direction ? key : null, direction });
  };

  const filteredData = data.filter(item => {
    return Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className={styles.table_container}>
      <div className={styles.table_actions}>
        <div className={styles.search_wrapper}>
          <Search size={18} className={styles.search_icon} />
          <input 
            type="text" 
            placeholder={searchPlaceholder} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filter_btns}>
          <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>Filter</Button>
          <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Export</Button>
          {actions}
        </div>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} onClick={() => typeof col.accessor === 'string' && col.sortable && handleSort(col.accessor as keyof T)}>
                  {col.header}
                  {col.sortable && typeof col.accessor === 'string' && (
                    <ArrowUpDown size={14} className={styles.sort_icon} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <tr key={item.id} onClick={() => onRowClick && onRowClick(item)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
                  {columns.map((col, idx) => (
                    <td key={idx}>
                      {typeof col.accessor === 'function' 
                        ? col.accessor(item) 
                        : (item[col.accessor as keyof T] as unknown as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No data found
                    </td>
                </tr>
            )}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <div className={styles.info}>
            Showing 1 to {sortedData.length} of {data.length} entries
          </div>
          <div className={styles.btns}>
            <button className={styles.page_btn}><ChevronLeft size={16} /></button>
            <button className={`${styles.page_btn} ${styles.active}`}>1</button>
            <button className={styles.page_btn}>2</button>
            <button className={styles.page_btn}>3</button>
            <button className={styles.page_btn}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
