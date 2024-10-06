const ApiRoutes = {
  GET_PATIENTS: 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users',
  GET_PATIENT_ID: (id: string) => `https://63bedcf7f5cfc0949b634fc8.mockapi.io/users/${id}`,
}

export { ApiRoutes };
