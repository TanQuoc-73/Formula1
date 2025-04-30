// hooks/useAdminData.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CurrentUser, Team, Driver } from '@/types';

export function useAdminData() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/signin');
      return;
    }

    const parsedUser: CurrentUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'Admin') {
      router.push('/');
      return;
    }

    setUser(parsedUser);

    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamsRes, driversRes] = await Promise.all([
          fetch('http://localhost:8080/api/teams'),
          fetch('http://localhost:8080/api/drivers'),
        ]);
        if (!teamsRes.ok || !driversRes.ok) throw new Error('Failed to fetch data');

        setTeams(await teamsRes.json());
        setDrivers(await driversRes.json());
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return { user, teams, drivers, loading, error };
}
