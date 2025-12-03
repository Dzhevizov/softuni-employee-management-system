import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import SearchForm from "./components/SearchForm"
import UserList from "./components/UserList"

function App() {
  return (
    <>
      <Header />

      <main className="main">
        <section className="card users-container">
          <SearchForm />

          <UserList />

          <button className="btn-add btn">Add new user</button>

          <Pagination />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
