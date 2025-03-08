import { useEffect, useState } from 'react';
import {
  CheckCircle,
  CircleDot,
  Loader,
  LoaderCircle,
  OctagonX,
  PlusCircle,
  X,
} from 'lucide-react';
import { ApiCandidatura } from '../services/candidaturaService';
import { toast } from 'react-toastify';

export const ProgressSteps = ({ idCandidatura, status, refreshJobs }) => {
  const [steps, setSteps] = useState(status);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentStatus, setCurrentStatus] = useState();
  const [newSteps, setNewSteps] = useState([]);
  const [idUpdate, setIdUpdate] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [modalNewStep, setModalNewStep] = useState(false);
  const [modalConfirmUpdate, setModalConfirmUpdate] = useState(false);
  const [loading, setloading] = useState(false);

  const { updateCandidaturaStatus, addCandidaturaNewStatus } = ApiCandidatura();

  useEffect(() => {
    const nextStep = steps.find((step) => !step.approved);

    if (nextStep) {
      setCurrentStep(nextStep.id);
      setCurrentStatus(nextStep);
    }
  }, [steps]);

  const markCompleted = (stepId) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);

    if (stepIndex > 0 && !steps[stepIndex - 1].approved) {
      return;
    }

    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        const prev =
          step.id === stepId
            ? { ...step, approved: true, rejected: false }
            : step;
        return prev;
      })
    );

    const nextStep = steps.find((step) => !step.approved);
    if (nextStep) {
      setCurrentStep(nextStep.id);
    }

    setUpdateStatus(true);
  };

  const markRejected = (stepId) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);

    if (stepIndex > 0 && !steps[stepIndex - 1].approved) {
      return;
    }
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        const prev =
          step.id === stepId
            ? { ...step, approved: false, rejected: true }
            : step;
        return prev;
      })
    );

    const nextStep = steps.find((step) => !step.rejected);
    if (nextStep) {
      setCurrentStep(nextStep.id);
    }

    setUpdateStatus(true);
  };

  useEffect(() => {
    if (updateStatus) {
      atualizarStatus(steps);
      refreshJobs();
    }
  }, [updateStatus]);

  useEffect(() => {
    if (newSteps.length > 0) {
      setloading(true);
      async function adicionarNovoStatus() {
        
        await addCandidaturaNewStatus(idCandidatura, newSteps);

        setNewSteps([]);
        setModalNewStep(false);
        refreshJobs();  
        setloading(false);
      }

      adicionarNovoStatus();
    }
  
  }, [newSteps]);

  async function atualizarStatus(stepsUpdated) {
    await updateCandidaturaStatus(idCandidatura, stepsUpdated);
    setModalConfirmUpdate(false);
    setUpdateStatus(false);
  }

  function confirmUpdate(id) {
    const isCurrent = id === currentStep;
    const currentStep2 = steps.find((step) => step.id === currentStep);
    if (!isCurrent) return;

    if (currentStep2.rejected) return;

    setIdUpdate(id);
    setModalConfirmUpdate(true);
  }

  function pegarLabel() {
    var select = document.getElementById('etapas');
    var selectedOption = select.options[select.selectedIndex];
    var label = selectedOption.text;
    const tempSteps = steps.find((step) => step.label === label);
    if (!tempSteps) {
      const newStep = {
        id: steps.length + 1,
        label: label,
        approved: false,
        rejected: false,
      };

      setSteps((prevSteps) => [...prevSteps, newStep]);
      setNewSteps((prevNewSteps) => [...prevNewSteps, newStep]);

      setCurrentStep(steps.length + 1);
      refreshJobs();
    } else {
      setModalNewStep(false);

      toast.error('Etapa ja adicionada!');
    }
  }

  return (
    <div className='flex flex-col items-center space-y-4 p-4'>
      <div className='flex flex-col  '>
        {steps.map((step, index) => {
          const isCompleted = step.approved;
          const isRejected = step.rejected;
          const isCurrent = step.id === currentStep && !step.rejected;

          const hasNext = index < steps.length - 1;

          return (
            <div className='flex space-x-2  overflow-hidden' key={step.id} >
              <div className='flex flex-col items-center'>
                <div className='w-8 h-8 flex items-center justify-center cursor-pointer'>
                  {isCompleted ? (
                    <CheckCircle className='text-blue-500' size={28} />
                  ) : isRejected ? (
                    <OctagonX className='text-red-500' size={28} />
                  ) : isCurrent ? (
                    <Loader className='text-blue-500 animate-spin ' size={28} />
                  ) : (
                    <CircleDot
                      className='text-gray-400 dark:text-zinc-400'
                      size={28}
                    />
                  )}
                </div>
                {hasNext && (
                  <div
                    className={`w-0.5 h-6   ${
                      isCompleted
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-zinc-400'
                    } `}
                  ></div>
                )}
              </div>
              <div>
                <h3
                  onClick={() => confirmUpdate(step.id)}
                  className={`text-base font-bold cursor-pointer ${
                    isCompleted || isCurrent
                      ? 'text-blue-600'
                      : isRejected
                      ? 'text-red-500'
                      : 'text-gray-400 dark:text-zinc-400'
                  }`}
                >
                  {step.label}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className='flex space-x-2'>
        <button
          onClick={() => setModalNewStep(true)}
          disabled={currentStatus?.rejected}
          className={`flex items-center space-x-2 ${
            currentStatus?.rejected ? 'text-blue-600/50' : 'text-blue-600'
          }`}
        >
          <PlusCircle size={25} />{' '}
          <span className='text-base'>Adicionar Etapa</span>
        </button>
      </div>

      {/* Modal de Confirmação de Atualização */}
      {modalConfirmUpdate && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-[#151419] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 p-6 space-y-4'>
            <div className='flex justify-between items-start border-b pb-3'>
              <div>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  Atualizar Etapa
                </h2>
                <p className='text-sm dark:text-zinc-300'>
                  Clique em <strong>Avançar</strong> caso tenha avançado nessa
                  etapa do processo seletivo
                </p>
                <p className='text-sm dark:text-zinc-300'>
                  Clique em <strong>Rejeitado</strong> caso não tenha sido
                  aprovado nessa etapa do processo seletivo
                </p>
              </div>

              <button
                onClick={() => setModalConfirmUpdate(false)}
                className='text-blue-600 hover:text-blue-800 transition-colors'
              >
                <X />
              </button>
            </div>

            <div className='flex space-x-2'>
              <button
                onClick={() => markRejected(idUpdate)}
                className='flex items-center h-10 space-x-2 text-white bg-red-500 px-2 rounded-md hover:bg-red-600 transition-colors'
              >
                <span>Rejeitado</span>
              </button>
              <button
                onClick={() => markCompleted(idUpdate)}
                className='flex items-center h-10 space-x-2 text-white bg-blue-500 px-2 rounded-md hover:bg-blue-600 transition-colors'
              >
                <span>Avançar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para adicionar nova etapa */}
      {modalNewStep && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-[#151419] rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 p-6 space-y-4'>
            <div className='flex justify-between items-start border-b pb-3'>
              <div>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                  Adicionar Nova Etapa
                </h2>
                <p className='text-base dark:text-white'>
                  Adicione novas etapas do processo seletivo
                </p>
              </div>

              <button
                onClick={() => setModalNewStep(false)}
                className='text-blue-600 hover:text-blue-800 transition-colors'
              >
                <X />
              </button>
            </div>

            <div className='flex space-x-2'>
              <select
                id='etapas'
                name='etapas'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg      block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              >
                <option value='' selected disabled>
                  Selecione uma etapa
                </option>
                <option value='entrevista_rh'>Entrevista RH</option>
                <option value='fit_cultural'>Fit Cultural</option>
                <option value='teste_logica'>Teste de Lógica</option>
                <option value='teste_ingles'>Teste de Inglês</option>
                <option value='entrevista_tecnica'>Entrevista Técnica</option>
                <option value='teste_conhecimentos'>
                  Teste de Conhecimentos Específicos
                </option>
                <option value='dinamica_grupo'>Dinâmica de Grupo</option>
                <option value='entrevista_final'>Entrevista Final</option>
                <option value='proposta'>Proposta</option>
              </select>
              <button
                onClick={pegarLabel}
                className='flex items-center space-x-2 text-white bg-blue-500 px-2 rounded-md hover:bg-blue-600 transition-colors'
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <LoaderCircle className='animate-spin' /> Adicionando
                  </span>
                ) : (
                  <span className='flex items-center justify-center gap-2'>
                    <PlusCircle size={20} /> <span>Adicionar</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
