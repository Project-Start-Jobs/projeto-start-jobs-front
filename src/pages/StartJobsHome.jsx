import { useState } from 'react';
import logo from '../assets/logo2x.png';
import Home from './Home';
import Candidaturas from './candidaturas';
import Dashboard from './Dashboard';
import DicasCV from './DicasCV';
import VagasEmAlta from './VagasEmAlta';
import ModalLogin from '../components/ModalLogin';
import ModalRegistro from '../components/ModalRegistro';
import ModalRecoveryPassword from '../components/ModalRecoveryPassword';
import SideBar from '../components/SideBar';

const StartJobsHome = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [activePage, setActivePage] = useState('home'); 
  const [activeModal, setActiveModal] = useState(null); 

  const handleShowPage = (page) => {
    setActivePage(page);
    setOpenMenu(false); 
  };

  const handleShowModal = (modal) => {
    setActiveModal(modal);
    setActivePage('login');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    handleShowPage('home');
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className='min-h-screen bg-slate-100 transition-colors dark:bg-[#1F1E25] rounded-2xl overflow-hidden'>
      <SideBar
        openMenu={openMenu}
        logo={logo}
        handleOpenMenu={handleOpenMenu}
        handleShowPage={handleShowPage}
        handleShowModal={handleShowModal}
        activePage={activePage}
        activeModal={activeModal}
      />

      {activePage === 'home' && <Home />}
      {activePage === 'candidaturas' && <Candidaturas />}
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'dicasCv' && <DicasCV />}
      {activePage === 'vagasEmAlta' && <VagasEmAlta />}

      <ModalLogin
        isVisible={activeModal === 'login'}
        handleClose={handleCloseModal}
        showRecoveryPassword={() => handleShowModal('recoveryPassword')}
      />

      <ModalRegistro
        isVisible={activeModal === 'register'}
        handleClose={handleCloseModal}
      />

      <ModalRecoveryPassword
        isVisible={activeModal === 'recoveryPassword'}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default StartJobsHome;
