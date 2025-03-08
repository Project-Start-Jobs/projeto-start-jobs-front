import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import Modal from './Modal';
import { registerUser } from '../services/authService';
import { LoaderCircle } from 'lucide-react';
import { registerSchema } from '../schemas/register-validate';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function ModalRegistro(props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (dataRegister) => {
    setLoading(true);

    try {
      await registerUser(dataRegister);
      setLoading(false);
      props.handleClose();
      reset();
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    handleRegister(data);
  };

  return (
    <Modal isVisible={props.isVisible}>
      <div className='py-6 px-6 lg:8  text-left relative'>
        <button
          className='text-xl absolute px-7 right-0 top-6 text-blue-600 hover:text-blue-800 transition-colors'
          onClick={props.handleClose}
        >
          X
        </button>

        <h3 className='mb-4 text-2xl font-medium text-gray-900 dark:text-white'>
          Cadastrar-se
        </h3>

        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor='nome'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Nome
            </label>
            <input
              {...register('nome')}
              type='text'
              name='nome'
              id='nome'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300    block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='Fulano'
            />
            <p className='text-red-500 text-sm'>{errors.nome?.message}</p>
          </div>
          <div>
            <label
              htmlFor='telefone'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Telefone
            </label>
            <input
              {...register('telefone')}
              type='tel'
              name='telefone'
              id='telefone'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300    block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='(XX) XXXXX-XXXX'
            />
            <p className='text-red-500 text-sm'>{errors.telefone?.message}</p>
          </div>
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
              name='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300    block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
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
              name='senha'
              id='senha'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg     outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300     block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='*********'
            />
            <p className='text-red-500 text-sm'>{errors.senha?.message}</p>
          </div>
          <div>
            <label
              htmlFor='confirmPassword'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Confirme sua senha
            </label>
            <input
              {...register('confirmSenha')}
              type='password'
              name='confirmSenha'
              id='confirmSenha'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg     outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300     block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='*********'
            />
            <p className='text-red-500 text-sm'>
              {errors.confirmSenha?.message}
            </p>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 transition-colors   font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            {loading ? (
              <span className='flex items-center justify-center gap-2'>
                <LoaderCircle className='animate-spin' /> Cadastrando
              </span>
            ) : (
              'Cadastrar'
            )}
          </button>
          <button
            type='button'
            className='flex justify-center items-center gap-2 w-full text-white bg-blue-400 hover:bg-blue-600 transition-colors  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            onClick={() =>
              console.log('Registrar-se com o Google ainda não implementado')
            }
          >
            <FaGoogle /> Registrar-se com o Google
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalRegistro;
