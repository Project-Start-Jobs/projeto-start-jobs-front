import { useState } from 'react';
import Modal from './Modal';
import { LoaderCircle } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { ApiCandidatura } from '../services/candidaturaService';

function ModalNewCandidatura(props) {
  const [formData, setFormData] = useState({
    titulo: '',
    empresa: '',
    descricao: '',
    senioridade: '',
    modeloTrabalho: '',
    localizacao: '',
    url: '',
  });
  const [loading, setLoading] = useState(false);
  const { adicionarCandidatura } = ApiCandidatura();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function salvarCandidatura(e) {
    e.preventDefault();
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
        titulo: formData.titulo,
        descricao: formData.descricao,
        empresa: formData.empresa,
        localizacao: formData.localizacao,
        senioridade: formData.senioridade,
        modeloTrabalho: formData.modeloTrabalho
          ? 'Remoto'
          : props.hybrid
          ? 'Híbrido'
          : 'Presencial',
        url: formData.url,
      },
    };

    const data = adicionarCandidatura(candidaturaData);
    setLoading(false);
    setFormData({
      titulo: '',
      empresa: '',
      descricao: '',
      senioridade: '',
      modeloTrabalho: '',
      localizacao: '',
      url: '',
    });
    props.refreshJobs()
    props.handleClose();
    
  }
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
        <form className='space-y-6' onSubmit={salvarCandidatura}>
          <div>
            <label
              htmlFor='titulo'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Titulo da Vaga
            </label>
            <input
              type='text'
              name='titulo'
              id='titulo'
              value={formData.titulo}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='Desenevolvedor....'
              required
            />
          </div>
          <div>
            <label
              htmlFor='empresa'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Empresa
            </label>
            <input
              type='text'
              name='empresa'
              id='empresa'
              value={formData.empresa}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='ex: Google, Amazon'
              required
            />
          </div>
          <div>
            <label
              htmlFor='descricao'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Descrição
            </label>
            <textarea
              name='descricao'
              id='descricao'
              rows={3}
              maxLength={1000}
              value={formData.descricao}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='Descrição da vaga'
              required
            />
          </div>
          <div>
            <label
              htmlFor='url'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Link da vaga
            </label>
            <input
              type='text'
              name='url'
              id='url'
              value={formData.url}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='link da vaga. ex: http://.....'
              required
            />
          </div>
          <div>
            <label
              htmlFor='senioridade'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Senioridade
            </label>

            <select
              name='senioridade'
              id='senioridade'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              onChange={handleChange}
              value={formData.senioridade}
            >
              <option value='' disabled>
                Escolha a senioridade
              </option>
              <option value='estagio'>Estágio</option>
              <option value='trainee'>Trainee</option>
              <option value='junior'>Júnior</option>
              <option value='mid_level'>Pleno</option>
              <option value='senior'>Senior</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='modeloTrabalho'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Modelo de Trabalho
            </label>
            <select
              name='modeloTrabalho'
              id='modeloTrabalho'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              onChange={handleChange}
              value={formData.modeloTrabalho}
            >
              <option value='' disabled>
                Escolha o Modelo de Trabalho
              </option>
              <option value='Remoto'>Remoto</option>
              <option value='Híbrido'>Hibrido</option>
              <option value='Presencial'>Presencial</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='localizacao'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Localização
            </label>
            <input
              type='text'
              name='localizacao'
              id='localizacao'
              value={formData.localizacao}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-zinc-700 dark:bg-[#151419] dark:text-zinc-300'
              placeholder='cidade, estado'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
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
