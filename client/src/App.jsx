import { useEffect, useState } from "react";
import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import SearchForm from "./components/SearchForm"
import UserList from "./components/UserList"
import CreateUserModal from "./components/CreateUserModal"

function App() {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(true);

    useEffect(() => {
      fetch('http://localhost:3030/jsonstore/users')
        .then(response => response.json())
        .then(data => {
            setUsers(Object.values(data));
        })
        .catch(err => alert(err.message));
    }, [forceRefresh]);

  const addUserClickHandler = () => {
    setShowCreateUser(true);
  };

  const closeUserModalHandler = () => {
    setShowCreateUser(false);
  };

  const addUserSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const {country, city, street, streetNumber, ...userData} = Object.fromEntries(formData);
    userData.address = {
      country,
      city,
      street,
      streetNumber
    };

    userData.createdAt = new Date().toISOString;
    userData.updatedAt = new Date().toISOString;

    fetch('http://localhost:3030/jsonstore/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
      .then(() => {
        closeUserModalHandler();
        setForceRefresh(state => !state)
    })
      .catch(err => alert(err.message))
  };

  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <SearchForm />

          <UserList users={users}/>

          <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

          <Pagination />
        </section>

        {showCreateUser && 
          <CreateUserModal 
            onClose={closeUserModalHandler}
            onSubmit={addUserSubmitHandler}
          />
        }

      </main>

      <Footer />
    </>
  )
}

export default App
