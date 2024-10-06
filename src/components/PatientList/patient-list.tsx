import React, { useEffect, useState } from 'react';

import { notifyError } from 'utils/app-error';
import { Patient } from 'network/types/patient';
import { Button } from 'components/Button/button';
import { Spinner } from 'components/Spinner/spinner';
import { PatientController } from 'network/patient-controller';
import { PatientCard } from 'components/PatientCard/patient-card';

import { ReactComponent as AddSVG } from 'assets/icons/add.svg';
import { NewPatientModal } from 'components/Modals/new-patient-modal';

const initialPatient: Patient = {
  id: '',
  name: '',
  description: '',
  avatar: '',
  website: '',
  createdAt: new Date(),
}

const PatientList = () => {
  const [loading, setLoading] = useState(false);
  const [newPatient, setNewPatient] = useState<Patient | undefined>(undefined);
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

  const addPatient = () => {
    try {
      if (newPatient) setPatients([ ...patients, newPatient ]);
    } catch {
      notifyError('Error creating new patient');
    } finally {
      setNewPatient(undefined);
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
          onClick={() => setNewPatient(initialPatient)}
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

      <NewPatientModal
        patient={newPatient}
        setPatient={setNewPatient}
        onClose={() => setNewPatient(undefined)}
        onSubmit={addPatient}
      />
    </div>
  )
}

const EmptyPage = () => (
  <div>
    There are no patients yet.
  </div>
)

export { PatientList };
