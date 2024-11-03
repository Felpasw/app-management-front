import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const MyDoughnutChart = (params: any) => {
  
  const data = {
    labels: ['Sucesso', 'Falha'], // Rótulos dos dados no gráfico
    datasets: [
      {
        label: 'Quantidade de testes',
        data: [params.params.success, params.params.fail],
        backgroundColor: ['rgb(74 222 128)', 'rgb(248 113 113)'],
        hoverBackgroundColor: ['rgb(34 197 94)', 'rgb(239 68 68)'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default MyDoughnutChart;
