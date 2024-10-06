import React, { useEffect, useState } from 'react';

import { notifyError, notifySuccess } from 'utils/app-error';
import { Patient } from 'network/types/patient';
import { Button } from 'components/Button/button';
import { Spinner } from 'components/Spinner/spinner';
import { PatientModal } from 'components/Modals/patient-modal';
import { PatientController } from 'network/patient-controller';
import { PatientCard } from 'components/PatientCard/patient-card';

import { ReactComponent as AddSVG } from 'assets/icons/add.svg';

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
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatient, setNewPatient] = useState<Patient | undefined>(undefined);

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

  const editPatient = (editedPatient: Patient) => {
    try {
      const res = patients.map((patient) => {
        if (patient.id !== editedPatient.id) return patient;
        return editedPatient;
      });
      setPatients(res);

      notifySuccess('The patient was edited successfully');
    } catch {
      notifyError('Error editing patient');
    }
  }

  const deletePatient = (deletedPatient: Patient) => {
    try {
      const res = patients.filter((patient) => patient.id !== deletedPatient.id);
      setPatients(res);
      notifySuccess('The patient was deleted successfully');
    } catch {
      notifyError('Error editing patient');
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
              onEdit={editPatient}
              onDelete={deletePatient}
            />
          ))}
        </div>
      ) : (
        <div>
          <EmptyPage />
        </div>
      )}

      <PatientModal
        title="New Patient"
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
