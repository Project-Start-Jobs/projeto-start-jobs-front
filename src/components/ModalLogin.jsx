import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import Modal from './Modal';
import { login } from '../services/authService';
import { useAuth } from '../context/auth-context';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/login-schema';

function ModalLogin(props) {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { logged } = useAuth();

  const handleLogin = async (loginData) => {
    setLoading(true);
    try {
      const data = await login(loginData.email, loginData.senha);
      logged(data);
      localStorage.setItem('token', data); // Salva o token no localStorage
      setLoading(false);
      reset();
      props.handleClose();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <Modal isVisible={props.isVisible}>
      <div className='py-6 px-6 lg:8 text-left relative'>
        <button
          className='text-xl absolute px-7 right-0 top-6 text-blue-600 hover:text-blue-800 transition-colors'
          onClick={props.handleClose}
        >
          X
        </button>
        <h3 className='mb-4 text-2xl font-medium text-gray-900 dark:text-white'>
          Faça login pra entrar na plataforma
        </h3>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Seu email
            </label>
            <input
              {...register('email')}
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:border-zinc-700 outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='name@company.com'
            />
            <p className='text-red-500 text-sm'>{errors.email?.message}</p>
          </div>
          <div>
            <label
              htmlFor='senha'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Sua senha
            </label>
            <input
              {...register('senha')}
              type='password'
              id='senha'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300  block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='*********'
            />
            <p className='text-red-500 text-sm'>{errors.senha?.message}</p>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='remember'
                  type='checkbox'
                  className='w-4 h-4 bg-gray-50 rounded border border-gray-300'
                />
              </div>
              <label
                htmlFor='remember'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Lembrar?
              </label>
            </div>
            <button
              type='button'
              onClick={props.showRecoveryPassword}
              className='text-sm text-blue-700 hover:underline'
            >
              Esqueceu a senha?
            </button>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 transition-colors    font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            {loading ? (
              <span className='flex items-center justify-center gap-2'>
                <LoaderCircle className='animate-spin' /> Entrando
              </span>
            ) : (
              'Entrar'
            )}
          </button>
          <button
            type='button'
            className='flex justify-center items-center gap-2 w-full text-white bg-blue-400 hover:bg-blue-600 transition-colors   font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            onClick={() =>
              console.log('Login com Google ainda não implementado')
            }
          >
            <FaGoogle /> Entrar com o Google
          </button>
          {/* <GoogleLogin
            onSuccess={(data) => {
              logged(data.credential);
              localStorage.setItem('token', data.credential);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
        </form>
      </div>
    </Modal>
  );
}

export default ModalLogin;
