import React, { useEffect, useState } from 'react';

import { notifyError } from 'utils/app-error';
import { Patient } from 'network/types/patient';
import { Button } from 'components/Button/button';
import { Spinner } from 'components/Spinner/spinner';
import { PatientController } from 'network/patient-controller';
import { PatientCard } from 'components/PatientCard/patient-card';

import { ReactComponent as AddSVG } from 'assets/icons/add.svg';


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

  if (loading) return <Spinner />

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="mb-4 h1">Patients List</h1>
        <Button

        >
          <AddSVG className="mr-2 w-4 h-4" />
          New Patient
        </Button>
      </div>

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
