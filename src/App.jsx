import './App.css';
import { useState } from 'react';
import Available from './components/Available';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Players from './components/Players';
import Footer from './components/Footer';
import Subscribe from './components/Subscribe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [credit, setCredit] = useState(0);

  const HandleCredit = (totalCredit) => {
    setCredit((prev) => prev + totalCredit);
    toast.success(`Credit Added to Your Account`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className='w-full mt-0 bg-white min-h-screen'>
      <header>
        <Navbar credit={credit}></Navbar>
        <Banner HandleCredit={HandleCredit}></Banner>
      </header>

      <main>
        <Available />
        <Players />
      </main>

      <footer className='mt-10'>
        <Subscribe />
        <Footer />
      </footer>

      <ToastContainer />
    </div>
  );
}

export default App;
