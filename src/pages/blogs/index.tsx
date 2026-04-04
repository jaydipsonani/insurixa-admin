import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BlogsIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/blogs/posts');
  }, [router]);
  return null;
}
