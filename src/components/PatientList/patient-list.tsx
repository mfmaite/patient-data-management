import React, { useEffect, useState } from 'react';

import { notifyError } from 'utils/app-error';
import { PatientController } from 'network/patient-controller';
import { Patient } from 'network/types/patient';
import { PatientCard } from 'components/PatientCard/patient-card';


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
      <h1 className="mb-4 h1">Patients List</h1>

      {patients ? (
        <div className="flex flex-wrap flex-row gap-6">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
            />
          ))}
        </div>
      ) : (
        <div>
          <EmptyPage />
        </div>
      )}
    </div>
  )
}

const EmptyPage = () => (
  <div>
    There are no patients yet.
  </div>
)

export { PatientList };
