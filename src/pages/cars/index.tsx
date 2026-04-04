import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CarsIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/cars/company');
  }, [router]);
  return null;
}
