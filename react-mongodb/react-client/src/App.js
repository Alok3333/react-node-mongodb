import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handlerForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8090/', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    console.log(result);
  };

  const getUser = async () => {
    const res = await fetch('http://localhost:8090/', {
      method: 'GET',
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-image">
            <h2 className="card-heading">
              Get Started
              <small>Let us create your account</small>
            </h2>
          </div>
          <form onSubmit={handleSubmitForm} className="card-form">
            <div className="input">
              {/* <label className="input-label">Username</label> */}
              <input
                type="text"
                name="username"
                onChange={handlerForm}
                className="input-field"
                placeholder="Username"
                required
              />
            </div>
            <div className="input">
              {/* <label className="input-label">Password</label> */}
              <input
                type="password"
                name="password"
                onChange={handlerForm}
                className="input-field"
                placeholder="Password"
                required
              />
            </div>
            <div className="action">
              <button type="submit" className="action-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
