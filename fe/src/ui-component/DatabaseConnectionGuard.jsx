import { useState, useEffect } from 'react';

// project imports
import Loader from 'ui-component/Loader';
import ServiceNoticeModal from 'ui-component/ServiceNoticeModal';

// ==============================|| DATABASE CONNECTION GUARD ||============================== //

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000');

export default function DatabaseConnectionGuard({ children }) {
  const [dbOk, setDbOk] = useState(null); // null = checking, true = ok, false = failed

  useEffect(() => {
    let cancelled = false;

    const checkDb = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/health`);
        const data = res.ok ? await res.json() : {};
        if (cancelled) return;
        if (res.ok && data.dbConnected) {
          setDbOk(true);
        } else {
          setDbOk(false);
        }
      } catch {
        if (cancelled) return;
        setDbOk(false);
      }
    };

    checkDb();
    return () => { cancelled = true; };
  }, []);

  const handleExit = () => {
    window.close();
  };

  if (dbOk === null) {
    return <Loader />;
  }

  if (dbOk === false) {
    return <ServiceNoticeModal onExit={handleExit} />;
  }

  return children;
}
