
import './App.css'
import Available from './components/Available'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import Players from './components/Players';
import Footer from './components/Footer';
import Subscribe from './components/Subscribe';
// import Players from './components/Players';


function App() {

  return (
    <div className='w-full mt-0 bg-white min-h-screen'>
      <header>
      <Navbar></Navbar>
      <Banner></Banner>
      </header>

      <main>
      <Available
      
      />
      <Players></Players>
      </main>
      <footer className='mt-10'>
        <Subscribe></Subscribe>
        <Footer></Footer>

      </footer>

    </div>
  )
}

export default App
