import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProductsIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/products/category');
  }, [router]);
  return null;
}
