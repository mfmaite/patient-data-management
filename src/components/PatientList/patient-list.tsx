import React, { useEffect, useState } from 'react';

import { notifyError } from '../../utils/app-error';
import { PatientController } from '../../network/patient-controller';
import { Patient } from '../../network/types/patient';


const PatientList = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const getPatients = async () => {
    setLoading(true);
    try {
      const data = await PatientController.getPatients();
      setPatients(data);
    } catch {
      notifyError('Error retrieving patients');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div>

    </div>
  )
}

export { PatientList };
