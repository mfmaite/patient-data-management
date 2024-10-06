import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Patient } from 'network/types/patient';

import defaultImg from 'assets/images/default-avatar.jpg';
import { ReactComponent as EditSVG } from 'assets/icons/edit.svg';
import { ReactComponent as ChevronDownSVG } from 'assets/icons/chevron-down.svg';

type PatientCardProps = {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isOpen, setOpen] = useState(false);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = defaultImg;
  };

  return (
    <motion.button
      initial={{ height: 'auto' }}
      animate={{ height: 'auto' }}
      className="w-full flex bg-blue-100 p-5 rounded-xl shadow-lg text-start"
      onClick={() => setOpen((prevState) => !prevState)}
    >
      <motion.img
        src={patient.avatar ? patient.avatar : defaultImg}
        onError={handleImageError}
        className="w-20 h-20 object-cover rounded-full"
        initial={{ height: '75px', width: '75px' }}
        animate={{ height: isOpen ? '130px' : '75px', width: isOpen ? '130px' : '75px' }}
      />

      <div className="ml-4 w-full">
        <div className="w-full flex flex-row justify-between">
          <div className="flex items-center">
            <h6 className="h6">{patient.name}</h6>
            <button>
              <EditSVG className="ml-2 w-3 h-3" />
            </button>
          </div>

          <motion.div
            animate={{ transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }}
          >
            <ChevronDownSVG className="w-5 h-5" />
          </motion.div>
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
    </motion.button>
  )
}

export { PatientCard };
