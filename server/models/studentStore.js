// shortcut: records reset on server restart, use persistent storage when persistence is required.
const studentStore = {
  nextId: 3,
  students: [
    { id: 1, name: 'Alex Santos', gender: 'Male', section: 'BSIT 4A', hobby: 'Coding' },
    { id: 2, name: 'Jamie Cruz', gender: 'Female', section: 'BSIT 4B', hobby: 'Drawing' },
  ],
};

export default studentStore;
