import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8000/api/students';
const emptyStudent = { name: '', gender: '', section: '', hobby: '' };

export default function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ ...emptyStudent });
  const [newStudentPut, setNewStudentPut] = useState({ id: '', ...emptyStudent });
  const [deleteId, setDeleteId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Task 5: GET API_URL, check response.ok, update students, loading and error.
  async function fetchStudents() {}

  // Task 6: update the matching field in newStudent using event.target.
  function handleInputChangePost(event) {}

  // Task 7: POST newStudent, show feedback, clear the form, refresh students.
  async function handleAddStudent(event) {}

  // Task 8: update the matching field in newStudentPut using event.target.
  function handleInputChangePut(event) {}

  // Task 9: PUT all four fields to API_URL/id, show feedback, reset, refresh.
  async function handleUpdateStudent(event) {}

  // Task 10: update deleteId from event.target.value.
  function handleDeleteChange(event) {}

  // Task 11: DELETE API_URL/id, show feedback, clear deleteId, refresh.
  async function handleDeleteSubmit(event) {}

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <main>
      <header>
        <p>Integrative Programming Technologies 2</p>
        <h1>Student Manager</h1>
        <p>Practice activity: complete the empty functions listed in the README.</p>
      </header>

      <p role="status">{message}</p>
      {error && <p role="alert" className="error">{error}</p>}

      <section aria-labelledby="students-heading">
        <div className="section-heading">
          <h2 id="students-heading">Student records</h2>
          <button type="button" onClick={fetchStudents} disabled={loading}>Refresh students</button>
        </div>
        {loading ? <p role="status">Loading students...</p> : (
          <div className="table-scroll">
            <table>
              <caption>Use the record ID when updating or deleting a student.</caption>
              <thead><tr><th scope="col">ID</th><th scope="col">Name</th><th scope="col">Gender</th><th scope="col">Section</th><th scope="col">Hobby</th></tr></thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td><td>{student.name}</td><td>{student.gender}</td><td>{student.section}</td><td>{student.hobby}</td>
                  </tr>
                ))}
                {students.length === 0 && <tr><td colSpan="5">No students found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="forms">
        <section aria-labelledby="add-heading">
          <h2 id="add-heading">Add student</h2>
          <form onSubmit={(event) => { event.preventDefault(); handleAddStudent(event); }}>
            <label htmlFor="add-name">Name</label>
            <input id="add-name" name="name" value={newStudent.name} onChange={handleInputChangePost} required />
            <label htmlFor="add-gender">Gender</label>
            <input id="add-gender" name="gender" value={newStudent.gender} onChange={handleInputChangePost} required />
            <label htmlFor="add-section">Section</label>
            <input id="add-section" name="section" value={newStudent.section} onChange={handleInputChangePost} required />
            <label htmlFor="add-hobby">Hobby</label>
            <input id="add-hobby" name="hobby" value={newStudent.hobby} onChange={handleInputChangePost} required />
            <button disabled={loading}>Add student</button>
          </form>
        </section>

        <section aria-labelledby="update-heading">
          <h2 id="update-heading">Update student</h2>
          <form onSubmit={(event) => { event.preventDefault(); handleUpdateStudent(event); }}>
            <label htmlFor="update-id">Student ID</label>
            <input id="update-id" name="id" type="number" min="1" step="1" value={newStudentPut.id} onChange={handleInputChangePut} required />
            <label htmlFor="update-name">Name</label>
            <input id="update-name" name="name" value={newStudentPut.name} onChange={handleInputChangePut} required />
            <label htmlFor="update-gender">Gender</label>
            <input id="update-gender" name="gender" value={newStudentPut.gender} onChange={handleInputChangePut} required />
            <label htmlFor="update-section">Section</label>
            <input id="update-section" name="section" value={newStudentPut.section} onChange={handleInputChangePut} required />
            <label htmlFor="update-hobby">Hobby</label>
            <input id="update-hobby" name="hobby" value={newStudentPut.hobby} onChange={handleInputChangePut} required />
            <button disabled={loading}>Update student</button>
          </form>
        </section>

        <section aria-labelledby="delete-heading">
          <h2 id="delete-heading">Delete student</h2>
          <form onSubmit={(event) => { event.preventDefault(); handleDeleteSubmit(event); }}>
            <label htmlFor="delete-id">Student ID</label>
            <input id="delete-id" type="number" min="1" step="1" value={deleteId} onChange={handleDeleteChange} required />
            <button disabled={loading}>Delete student</button>
          </form>
        </section>
      </div>
    </main>
  );
}
