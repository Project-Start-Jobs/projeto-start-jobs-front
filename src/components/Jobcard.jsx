import { useState } from 'react';
import dayjs from 'dayjs';
import { LoaderCircle, X } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { ApiCandidatura } from '../services/candidaturaService';

function Jobcard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmCandidatura, setConfirmCandidatura] = useState(false);
  const [loading, setLoading] = useState(false);

  const { adicionarCandidatura } = ApiCandidatura();

  const { user } = useAuth();
  const date1 = dayjs(); // Data atual
  const diffInDays = date1.diff(dayjs(props.date_posted), 'day'); // Calculando a diferença de dias

  async function salvarCandidatura() {
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
        titulo: props.job_title,
        descricao: props.description,
        empresa: props.company,
        localizacao: props.location,
        senioridade: props.seniority,
        modeloTrabalho: props.remote
          ? 'Remoto'
          : props.hybrid
          ? 'Híbrido'
          : 'Presencial',
        url: props.url,
        dataCriacao: props.date_posted,
      },
    };

    const data = adicionarCandidatura(candidaturaData);
    setLoading(false);
    setConfirmCandidatura(false);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className='py-6 px-6 2xl:max-h-44 lg:px-6 text-left relative bg-gray-50 rounded-lg border border-zinc-600 shadow-lg hover:border-blue-500 hover:scale-103 transition-all duration-200 dark:bg-[#151419]'>        <div className='flex flex-col xl:flex-row justify-between items-center lg:items-center gap-4 lg:gap-8'>
          <div className='flex flex-col items-start gap-3 w-full lg:w-max'>
            <h1 className='lg:max-w-80 text-lg font-semibold text-gray-900 dark:text-white'>
              {props.job_title} - {props.company}
            </h1>
            <p className='text-sm text-gray-700 dark:text-gray-300 flex flex-wrap gap-6'>
              <span>
                {props.seniority === 'mid_level' ? 'pleno' : props.seniority}
              </span>
              <span>
                {props.remote
                  ? 'Remoto'
                  : props.hybrid
                  ? 'Híbrido'
                  : 'Presencial'}
              </span>
              <span>{props.location}</span>
            </p>
          </div>

          <div className='flex flex-col 2xl:flex-row items-center lg:gap-4 w-full lg:w-auto'>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              {`Publicado há ${diffInDays} dia${diffInDays !== 1 ? 's' : ''}`}
            </p>
            <div className='flex xl:flex-col-reverse gap-4 mt-4 lg:mt-0'>
              <button
                onClick={toggleModal}
                className='w-full lg:w-auto text-blue-700 bg-transparent border border-blue-700 hover:bg-blue-700 hover:text-white transition-colors    font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Ver mais detalhes
              </button>
              <a href={props.url} target='_blank' rel='noopener noreferrer'>
                <button
                  className=' text-white bg-blue-600 hover:bg-blue-800 transition-colors   font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full'
                  onClick={() => setConfirmCandidatura(true)}
                >
                  Aplicar
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-[#151419] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6'>
            <div className='flex justify-between items-center border-b pb-3'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Detalhes da Vaga
              </h2>
              <button
                onClick={toggleModal}
                className='text-blue-600 hover:text-blue-800 transition-colors'
              >
                <X />
              </button>
            </div>
            <div className='mt-4 space-y-4'>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Título:</strong> {props.job_title}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Empresa:</strong> {props.company}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Localização:</strong> {props.location}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Tipo de Trabalho:</strong>{' '}
                {props.remote
                  ? 'Remoto'
                  : props.hybrid
                  ? 'Híbrido'
                  : 'Presencial'}
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                <strong>Senioridade:</strong>{' '}
                {props.seniority === 'mid_level' ? 'pleno' : props.seniority}
              </p>
              <p className='text-gray-700 dark:text-gray-300 max-h-96 overflow-x-auto'>
                <strong>Descrição:</strong>{' '}
                {props.description || 'Descrição não fornecida.'}
              </p>
            </div>
            <div className='flex justify-end mt-6'>
              <button
                onClick={toggleModal}
                className='text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium rounded-lg text-sm px-5 py-2.5'
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmCandidatura && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-[#151419] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-[600px] p-6'>
            <div className='flex flex-col justify-between items-start border-b pb-3'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-zinc-200'>
                Confirmar candidatura
              </h2>
              <p className='text-base text-zinc-800 dark:text-zinc-400'>
                Se inscreveu na vaga? Salve em suas candidaturas.
              </p>
            </div>

            <div className='flex justify-end mt-6 space-x-2'>
              <button
                onClick={() => setConfirmCandidatura(false)}
                className='text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium rounded-lg text-sm px-5 py-2.5'
              >
                Fechar
              </button>

              <button
                className=' text-white bg-blue-600 hover:bg-blue-800 transition-colors   font-medium rounded-lg text-sm px-5 py-2.5 text-center w-max'
                onClick={salvarCandidatura}
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <LoaderCircle className='animate-spin' /> Salvando
                  </span>
                ) : (
                  'Salvar em candidaturas'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Jobcard;
