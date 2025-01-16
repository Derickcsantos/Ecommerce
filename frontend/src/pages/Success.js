import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
      {/* Usando um ícone em vez de uma imagem GIF */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        viewBox="0 0 24 24"
        fill="none"
        stroke="green"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-check-circle"
      >
        <path d="M9 11l3 3L22 4"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
      <p className='text-green-600 font-bold text-xl mt-4'>
        Pagamento realizado com sucesso
      </p>
      <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>
        Ver pedido
      </Link>
    </div>
  );
};

export default Success;
