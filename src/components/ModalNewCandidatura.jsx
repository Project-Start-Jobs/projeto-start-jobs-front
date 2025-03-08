import { useState } from 'react';
import Modal from './Modal';
import { LoaderCircle } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { ApiCandidatura } from '../services/candidaturaService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { candidaturaSchema } from '../schemas/new-candidatura';

function ModalNewCandidatura(props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(candidaturaSchema),
  });
  const [loading, setLoading] = useState(false);
  const { adicionarCandidatura } = ApiCandidatura();
  const { user } = useAuth();

  async function handleNewCandidatura(data) {
    setLoading(true);
    const candidaturaData = {
      idUsuario: user.id,
      statusCandidatura: [
        {
          label: 'Em Análise',
          approved: false,
          rejected: false,
        },
      ],
      vaga: {
        ...data,
      },
    };

    await adicionarCandidatura(candidaturaData);
    setLoading(false);
    reset();
    props.handleClose();
    props.refreshJobs();
  }

  const onSubmit = (data) => {
    handleNewCandidatura(data);
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

        <div className='mb-5'>
          <h3 className='mb-1 text-2xl font-medium text-gray-900 dark:text-white'>
            Nova Candidatura
          </h3>
          <p className='text-base text-zinc-800 dark:text-zinc-400'>
            Se inscreveu na vaga? Salve em suas candidaturas.
          </p>
        </div>
        <form className='space-y-6 max-h-[70dvh] overflow-y-scroll' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor='titulo'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Titulo da Vaga
            </label>
            <input
              {...register('titulo')}
              type='text'
              name='titulo'
              id='titulo'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300  block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='Desenevolvedor....'
            />
            <p className='text-red-500 text-sm'>{errors.titulo?.message}</p>
          </div>
          <div>
            <label
              htmlFor='empresa'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Empresa
            </label>
            <input
              {...register('empresa')}
              type='text'
              name='empresa'
              id='empresa'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300  block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='ex: Google, Amazon'
            />
            <p className='text-red-500 text-sm'>{errors.empresa?.message}</p>
          </div>
          <div>
            <label
              htmlFor='descricao'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Descrição
            </label>
            <textarea
              {...register('descricao')}
              name='descricao'
              id='descricao'
              rows={3}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300   block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='Descrição da vaga'
            />
            <p className='text-red-500 text-sm'>{errors.descricao?.message}</p>
          </div>
          <div>
            <label
              htmlFor='url'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Link da vaga
            </label>
            <input
              {...register('url')}
              type='text'
              name='url'
              id='url'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg    outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300  block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='link da vaga. ex: http://.....'
            />
            <p className='text-red-500 text-sm'>{errors.url?.message}</p>
          </div>
          <div>
            <label
              htmlFor='senioridade'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Senioridade
            </label>

            <select
              {...register('senioridade')}
              name='senioridade'
              id='senioridade'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300   block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
            >
              <option value='' disabled selected>
                Escolha a senioridade
              </option>
              <option value='estagio'>Estágio</option>
              <option value='trainee'>Trainee</option>
              <option value='junior'>Júnior</option>
              <option value='mid_level'>Pleno</option>
              <option value='senior'>Senior</option>
            </select>
            <p className='text-red-500 text-sm'>
              {errors.senioridade?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor='modeloTrabalho'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Modelo de Trabalho
            </label>
            <select
              {...register('modeloTrabalho')}
              name='modeloTrabalho'
              id='modeloTrabalho'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300   block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
            >
              <option value='' disabled selected>
                Escolha o Modelo de Trabalho
              </option>
              <option value='Remoto'>Remoto</option>
              <option value='Híbrido'>Hibrido</option>
              <option value='Presencial'>Presencial</option>
            </select>
            <p className='text-red-500 text-sm'>
              {errors.modeloTrabalho?.message}
            </p>
          </div>

          <div>
            <label
              htmlFor='localizacao'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Localização
            </label>
            <input
              {...register('localizacao')}
              type='text'
              name='localizacao'
              id='localizacao'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg    outline-none focus:border-blue-700 dark:focus:border-blue-700 transition-colors duration-300  block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='cidade, estado'
            />
            <p className='text-red-500 text-sm'>
              {errors.localizacao?.message}
            </p>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 transition-colors    font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            {loading ? (
              <span className='flex items-center justify-center gap-2'>
                <LoaderCircle className='animate-spin' /> Salvando candidatura
              </span>
            ) : (
              'Salvar candidatura'
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalNewCandidatura;
