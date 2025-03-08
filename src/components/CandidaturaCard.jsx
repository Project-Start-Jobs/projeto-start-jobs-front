import { useState, useCallback, useEffect } from 'react';
import { ProgressSteps } from './ProgressSteps';
import {
  ChevronRight,
  Loader,
  LoaderCircle,
  OctagonX,
  Trash,
  X,
} from 'lucide-react';
import dayjs from 'dayjs';
import { ApiCandidatura } from '../services/candidaturaService';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

function CandidaturaCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Estado para controlar se o Accordion está aberto

  const { deleteCandidatura } = ApiCandidatura();

  const toggleModal = useCallback(() => {
    setIsModalOpen((prevState) => !prevState);
    props.refreshJobs();
  }, []);

  useEffect(() => {
    let currentStep = 1;
    const nextStep = props.statusCandidatura.find((step) => !step.approved);

    if (nextStep) currentStep = nextStep.id;

    props.statusCandidatura?.map((step) => {
      const isRejected = step.rejected;

      const isCurrent = step.id === currentStep && !step.rejected;
      if (isCurrent || isRejected) {
        setEtapaAtual(step);
      }
    });
  }, []);

  const date1 = dayjs();
  const arr = props.dataCandidatura;
  const date = new Date(arr[0], arr[1] - 1, arr[2]);
  const dateFormat = date.toISOString().split('T')[0];
  const diffInDays = date1.diff(dayjs(dateFormat), 'day');

  async function removerCandidatura() {
    setIsLoading(true);
    await deleteCandidatura(props.id);
    setIsLoading(false);
    setConfirmDelete(false);
    toggleModal();
  }

  const handleAccordionChange = (value) => {
    setIsAccordionOpen(value === 'item-1'); // Se o item-1 estiver aberto, setamos isAccordionOpen para true
  };

  return (
    <>
      <div className='py-6 px-6  lg:px-6 text-left relative bg-gray-50 rounded-lg border border-zinc-600 shadow-lg hover:border-blue-500 hover:scale-103 transition-all duration-200 dark:bg-[#151419]'>
        {' '}
        <div className='flex flex-col xl:flex-row justify-between items-center lg:items-center gap-4 '>
          <div className='flex flex-col items-center lg:items-start gap-3 w-full lg:w-max'>
            <h1 className='lg:max-w-80 text-base  2xl:text-lg font-semibold text-gray-900 dark:text-white'>
              {props.vaga.titulo} - {props.vaga.empresa}
            </h1>
            <p className='text-sm text-gray-700 dark:text-gray-300 flex flex-wrap gap-6 '>
              <span>
                {props.vaga.senioridade === 'mid_level'
                  ? 'pleno'
                  : props.vaga.senioridade}
              </span>
              <span>{props.vaga.modeloTrabalho}</span>
              <span>{props.vaga.localizacao}</span>
            </p>
          </div>

          <div className='flex flex-col 2xl:flex-row items-center lg:gap-4 w-full lg:w-max'>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              {diffInDays > 0
                ? `Inscrito há ${diffInDays} dia${diffInDays !== 1 ? 's' : ''}`
                : 'Inscrito Hoje'}
            </p>
            <div className='flex flex-col gap-4 mt-4 lg:mt-0'>
              <button
                onClick={toggleModal}
                className='w-full lg:w-auto text-blue-700 bg-transparent border border-blue-700 hover:bg-blue-700 hover:text-white transition-colors   font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Mais detalhes
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className='w-full lg:w-auto text-red-600 bg-transparent border border-red-700 hover:bg-red-700 hover:text-white transition-colors      font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 '>
          <div className='bg-white dark:bg-[#151419] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 '>
            <div className='flex justify-between items-center border-b pb-3'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Detalhes da Candidatura
              </h2>
              <button
                onClick={toggleModal}
                className='text-blue-600 hover:text-blue-800 transition-colors'
              >
                <X />
              </button>
            </div>
            <div className='max-h-[60dvh] overflow-y-scroll'>
              <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold dark:text-white'>Status</h1>
                <p className='dark:text-zinc-400'>
                  Adicione as etapas do processo seletivo
                </p>
                <div
                  className={`flex items-center gap-2 mt-5 other-div ${
                    isAccordionOpen ? 'hidden' : ''
                  }`}
                >
                  <h1 className='font-bold text-zinc-600 dark:text-zinc-200 flex items-center gap-2'>
                    Etapa Atual{' '}
                    <ChevronRight
                      className='text-zinc-800 dark:text-zinc-400'
                      size={20}
                    />
                  </h1>
                  <div className='flex items-center gap-2 '>
                    {!etapaAtual.approved && !etapaAtual.rejected ? (
                      <Loader
                        className='text-blue-600 animate-spin'
                        size={28}
                      />
                    ) : (
                      <OctagonX className='text-red-500' size={28} />
                    )}
                    <h3
                      className={`text-base font-bold cursor-pointer ${
                        !etapaAtual.approved && !etapaAtual.rejected
                          ? 'text-blue-600'
                          : 'text-red-500'
                      }`}
                    >
                      {etapaAtual.label}
                    </h3>
                  </div>
                </div>

                <Accordion
                  type='single'
                  collapsible
                  value={isAccordionOpen ? 'item-1' : ''}
                  onValueChange={handleAccordionChange}
                >
                  <AccordionItem value='item-1'>
                    <AccordionTrigger
                      className={
                        ' rounded-lg px-4 border my-2 dark:text-zinc-50 dark:border-zinc-500  hover:border-blue-600'
                      }
                    >
                      Ver todas as etapas
                    </AccordionTrigger>
                    <AccordionContent>
                      <ProgressSteps
                        idCandidatura={props.id}
                        status={props.statusCandidatura}
                        refreshJobs={props.refreshJobs}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className='mt-4 space-y-4'>
                <p className='text-gray-700 dark:text-gray-300'>
                  <strong>Título:</strong> {props.vaga.titulo}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <strong>Empresa:</strong> {props.vaga.empresa}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <strong>Localização:</strong> {props.vaga.localizacao}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <strong>Tipo de Trabalho:</strong> {props.vaga.modeloTrabalho}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <strong>Senioridade:</strong>{' '}
                  {props.vaga.senioridade === 'mid_level'
                    ? 'pleno'
                    : props.vaga.senioridade}
                </p>
                <p className='text-gray-700 dark:text-gray-300 max-h-96 overflow-x-auto'>
                  <strong>Descrição:</strong>{' '}
                  {props.vaga.descricao || 'Descrição não fornecida.'}
                </p>
              </div>
            </div>

            <div className='flex flex-col items-center lg:flex-row justify-center mt-6 gap-3 lg:gap-10'>
              <button
                onClick={() => setConfirmDelete(true)}
                className='flex w-max gap-2 text-gray-50  bg-red-700 hover:bg-red-500  transition-colors font-medium rounded-lg text-sm px-5 py-2.5'
              >
                <Trash size={20} /> Remover candidatura
              </button>
              <a
                href={props.vaga.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium rounded-lg text-sm px-5 py-2.5'>
                  Visitar site da vaga
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
      {confirmDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-[#151419] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-[600px] p-6'>
            <div className='flex flex-col justify-between items-start border-b pb-3'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-zinc-200'>
                Remover candidatura
              </h2>
              <p className='text-base text-zinc-800 dark:text-zinc-400'>
                Tem certeza? Essa ação não pode ser desfeita.
              </p>
            </div>

            <div className='flex justify-end mt-6 space-x-2'>
              <button
                onClick={() => setConfirmDelete(false)}
                className='text-gray-700 dark:text-gray-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium rounded-lg text-sm px-5 py-2.5'
              >
                Fechar
              </button>

              <button
                className=' text-white bg-red-600 hover:bg-red-800 transition-colors      font-medium rounded-lg text-sm px-5 py-2.5 text-center w-max'
                onClick={removerCandidatura}
              >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <LoaderCircle className='animate-spin' /> Removendo
                    candidatura
                  </span>
                ) : (
                  'Remover'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CandidaturaCard;
