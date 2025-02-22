import axios from 'axios';

export const getJobsByFilters = async (title, location, remote) => {
  try {
    const response = await axios.post(
      'https://api.theirstack.com/v1/jobs/search',
      {
        include_total_results: false,
        order_by: [
          {
            desc: true,
            field: 'date_posted',
          },
        ],
        posted_at_max_age_days: 15,
        job_country_code_or: ['BR'],
        job_title_or: [title],
        remote: remote === 'yes' ? true : false,
        job_location_pattern_or: [location],
        page: 0,
        limit: 6,
        blur_company_data: false,
      },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpZ29yLnNvYnJhbEBhY2FkZW1pY28uaWZwYi5lZHUuYnIiLCJwZXJtaXNzaW9ucyI6InVzZXIiLCJjcmVhdGVkX2F0IjoiMjAyNS0wMi0yMlQxNzo1MToxNS4yNTA0OTQrMDA6MDAifQ.dVSMBfb0iqBdciqL4YcpwxYaFmvSeVOqlvEaTbtMml8',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    throw error;
  }
  
};

export const getJobs = async () => {
  try {
    const response = await axios.post(
      'https://api.theirstack.com/v1/jobs/search',
      {
        include_total_results: false,
        order_by: [
          {
            desc: true,
            field: 'date_posted',
          },
        ],
        posted_at_max_age_days: 15,
        job_country_code_or: ['BR'],
        job_title_or: ['Desenvolvedor'],
        page: 0,
        limit: 6,
        blur_company_data: false,
      },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpZ29yLnNvYnJhbEBhY2FkZW1pY28uaWZwYi5lZHUuYnIiLCJwZXJtaXNzaW9ucyI6InVzZXIiLCJjcmVhdGVkX2F0IjoiMjAyNS0wMi0yMlQxNzo1MToxNS4yNTA0OTQrMDA6MDAifQ.dVSMBfb0iqBdciqL4YcpwxYaFmvSeVOqlvEaTbtMml8',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    throw error;
  }
};

