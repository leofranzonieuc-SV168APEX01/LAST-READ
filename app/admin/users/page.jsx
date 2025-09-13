import { getUserFromCookie } from '@/lib/auth';
import AdminUsersClient from './AdminUsersClient';

export default function AdminUsersPage() {
  const user = getUserFromCookie();
  if (!user || user.role !== 'admin') return <main className="max-w-5xl mx-auto p-6">Accès refusé (admin requis).</main>;
  return <main className="max-w-5xl mx-auto p-6"><AdminUsersClient /></main>;
}
