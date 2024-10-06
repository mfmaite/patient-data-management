import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Patient } from 'network/types/patient';
import { Modal } from 'components/Modals/modal';
import { Button } from 'components/Button/button';
import { PatientModal } from 'components/Modals/patient-modal';

import defaultImg from 'assets/images/default-avatar.jpg';
import { ReactComponent as EditSVG } from 'assets/icons/edit.svg';
import { ReactComponent as WarningSVG } from 'assets/icons/warning.svg';
import { ReactComponent as ChevronDownSVG } from 'assets/icons/chevron-down.svg';

type PatientCardProps = {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

const PatientCard = ({ patient, onEdit, onDelete }: PatientCardProps) => {
  const [isOpen, setOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | undefined>(undefined);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = defaultImg;
  };

  return (
    <>
      <motion.div
        initial={{ height: 'auto' }}
        animate={{ height: 'auto' }}
        className="w-full flex bg-blue-100 p-5 rounded-xl shadow-lg text-start"
      >
        <motion.img
          src={patient.avatar ? patient.avatar : defaultImg}
          onError={handleImageError}
          className="object-cover rounded-full"
          initial={{ height: '65px', width: '65px' }}
          animate={{ height: isOpen ? '150px' : '65px', width: isOpen ? '150px' : '65px' }}
        />

        <div className="ml-4 w-full">
          <div className="w-full flex flex-row justify-between">
            <div className="flex items-center">
              <h6 className="h6">{patient.name}</h6>
              <button
                onClick={() => setEditPatient(patient)}
              >
                <EditSVG className="ml-2 w-3 h-3" />
              </button>
            </div>

            <motion.button
              onClick={() => setOpen((prevState) => !prevState)}
              animate={{ transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }}
            >
              <ChevronDownSVG className="w-5 h-5" />
            </motion.button>
          </div>
          <span className="text-sm text-gray-600 text-start">Created on: {patient.createdAt.toDateString()}</span>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
            className="overflow-hidden text-start mt-2"
          >
            <div className="flex">
              <h6 className="w-2/12 font-semibold">Description:</h6>
              <div className="w-10/12">{patient.description}</div>
            </div>

            <div className="flex mt-2">
              <h6 className="w-2/12 font-semibold">Website:</h6>
              <a className="w-10/12 text-blue-500 underline" href={patient.website}>{patient.website}</a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <PatientModal
        title="Edit Patient"
        onClose={() => setEditPatient(undefined)}
        onSubmit={() => {
          if (editPatient)
            onEdit(editPatient);
            setEditPatient(undefined)
          }}
        setPatient={setEditPatient}
        patient={editPatient}
        onDelete={setConfirmationModal}
      />

      <Modal
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        className="flex flex-col items-center justify-center w-1/3 text-center"
      >
        <WarningSVG className="w-20 h-20" />
        <h5 className="h5 mb-4">{patient.name}</h5>
        <span>Are you sure you want to delete this patient?</span>
        <span className="font-semibold text-red-600">This action can not be undone.</span>
        <div className="w-full mt-6 flex justify-between">
          <Button
            onClick={() => {
              onDelete(patient);
              setConfirmationModal(false)
            }}
          >
            Yes, delete
          </Button>

          <Button>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  )
}

export { PatientCard };
