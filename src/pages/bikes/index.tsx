import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BikesIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/bikes/company');
  }, [router]);
  return null;
}
