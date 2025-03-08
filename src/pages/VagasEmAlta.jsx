import { FilterX, MenuIcon, UserCircle2, UserPlus } from 'lucide-react';
import SearchBar from '../components/SearchBar';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
// import { getJobs, getJobsByFilters } from '../services/jobService';
import { useAuth } from '../context/auth-context';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../components/ui/drawer';
import Jobcard from '../components/Jobcard';
import { getJobs, getJobsByFilters } from '../services/jobService';

const VagasEmAlta = ({ showMenu, showLogin, showRegister }) => {
  const [jobs, setJobs] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    remote: '',
  });

  const { user } = useAuth();

  useEffect(() => {
    Jobs();
  }, [filters]);

  useEffect(() => {
    Jobs();
  }, []);

  async function Jobs() {
    if (filters.keyword != '' || filters.location != '') {
      const response = await getJobsByFilters(
        filters.keyword,
        filters.location,
        filters.remote
      );
      //  console.log('🚀 ~ Jobs ~ response:', response.data);
      if (response.success) {
        setJobs(response.data);
      } else {
        setJobs(response);
      }
      // setJobs([]);
    } else {
      const response = await getJobs();

      if (response.success) {
        setJobs(response.data);
      } else {
        setJobs(response);
      }

    
    }
  }

  function handleOpenMenu() {
    showMenu();
  }
  function handleOpenLogin() {
    showLogin();
  }
  function handleOpenRegister() {
    showRegister();
  }
  return (
    <div className='min-h-screen bg-slate-100 transition-colors dark:bg-[#1F1E25] flex flex-col'>
      <main className='flex-1 justify-between ml-0 md:ml-64 p-6 relative'>
        <button
          onClick={handleOpenMenu}
          className='md:hidden dark:text-zinc-50 z100'
        >
          <MenuIcon />
        </button>

        <Header
          title={'Vagas em Alta'}
          description={'Pesquise e filtre as oportunidades desejadas.'}
        />

        <div className='md:hidden flex justify-center'>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger className='w-32 mt-2 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 '>
              Filtros
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerClose className='fixed right-2 top-3'>
                  <FilterX className='dark:text-[#FAFAF9]' />
                </DrawerClose>

                <DrawerTitle>Filtros</DrawerTitle>
              </DrawerHeader>
              <SearchBar onSearch={(e) => setFilters(e)} />
              <DrawerFooter className=' px-10'></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className='max-md:hidden'>
          <SearchBar onSearch={(e) => setFilters(e)} />
        </div>

        {user && (
          <div style={{ minHeight: 'calc(100dvh - 370px)' }}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 my-10'>
              {jobs && jobs?.map((job) => <Jobcard key={job.id} {...job} />)}
            </div>
          </div>
        )}

        {!user && (
          <div className='h-dvh overflow-y-auto z-100 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center '>
            <button
              onClick={handleOpenMenu}
              className='md:hidden dark:text-zinc-50 absolute top-6 left-6'
            >
              <MenuIcon />
            </button>
            <div className='bg-white dark:bg-[#151419] dark:border dark:border-zinc-700 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-[600px] p-6 lg:ml-32'>
              <div className='flex flex-col justify-between items-start border-b pb-3'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-zinc-200'>
                  Faça Login ou cadastro pra Visualizar as vagas de emprego{' '}
                </h2>
              </div>

              <div className='flex justify-center mt-6 space-x-2'>
                <button
                  className='text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium rounded-lg text-sm px-5 py-2.5'
                  onClick={handleOpenRegister}
                >
                  <span className='flex items-center justify-center gap-2'>
                    <UserPlus size={20} />
                    Cadastro
                  </span>
                </button>

                <button
                  className=' text-white bg-blue-600 hover:bg-blue-800 transition-colors  font-medium rounded-lg text-sm px-10 py-3.5 text-center w-max'
                  onClick={handleOpenLogin}
                >
                  <span className='flex items-center justify-center gap-2'>
                    <UserCircle2 size={20} />
                    Login
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VagasEmAlta;
