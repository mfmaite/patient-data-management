import React from 'react';
import { PatientList } from './components/PatientList/patient-list';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="max-w-screen h-screen py-6 px-8 bg-blue-10">
      <PatientList />

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
      />
    </div>
  );
}

export default App;
