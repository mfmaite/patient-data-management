import React, { Dispatch, FormEventHandler, SetStateAction } from 'react';

import { Modal } from './modal';
import { Input } from 'components/Input/input';
import { Patient } from 'network/types/patient';
import { Button } from 'components/Button/button';
import { TextArea } from 'components/TextArea/text-area';

import { ReactComponent as SaveSVG } from 'assets/icons/save.svg';
import { ReactComponent as DeleteSVG } from 'assets/icons/delete.svg';

type PatientModalProps = {
  title?: string;
  onClose: () => void;
  patient?: Patient;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
  onSubmit: () => void;
  onDelete?: Dispatch<SetStateAction<boolean>>;
}

const PatientModal = ({
  title, onClose, patient, setPatient, onSubmit, onDelete,
}: PatientModalProps) => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!!patient?.name && !!patient?.description && !!patient?.avatar && !!patient?.website) {
      onSubmit();
    }
  }
  return (
    <Modal
      isOpen={!!patient}
      onClose={onClose}
      title={title}
      className="w-2/5 h-fit"
    >
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Name"
          value={patient?.name}
          onChange={(e) => patient && setPatient({ ...patient, name: e.target.value})}
          required
          error={!patient?.name ? "This field is required" : ''}
        />

        <Input
          id="website"
          label="Website"
          value={patient?.website}
          onChange={(e) => patient && setPatient({ ...patient, website: e.target.value})}
          required
          error={!patient?.website ? "This field is required" : ''}
        />

        <Input
          id="avatar"
          label="Avatar"
          value={patient?.avatar}
          onChange={(e) => patient && setPatient({ ...patient, avatar: e.target.value})}
          required
          error={!patient?.avatar ? "This field is required" : ''}
        />

        <TextArea
          id="description"
          label="Description"
          value={patient?.description}
          onChange={(e) => patient && setPatient({ ...patient, description: e.target.value})}
          rows={3}
          required
          error={!patient?.description ? "This field is required" : ''}
        />

        <div className={`mt-4 flex ${onDelete ? 'justify-between' : 'justify-end'}`}>
          {onDelete && (
            <Button
              onClick={() => {
                setPatient(undefined);
                onDelete(true);
              }}
              type="button"
            >
              <DeleteSVG className="mr-2 w-4 h-4" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSubmit}
          >
            <SaveSVG className="mr-2 w-4 h-4" />
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export { PatientModal };
