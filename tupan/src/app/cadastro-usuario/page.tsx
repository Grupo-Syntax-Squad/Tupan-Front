'use client';

import React, { useState } from 'react';
import axios from 'axios'; // Importando axios para fazer requisições
import { useRouter } from 'next/navigation'; // Importando useRouter para redirecionamento

const CadastroForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Hook para redirecionar

  const handleCadastro = async () => {
    try {
      // Fazendo a requisição POST com axios
      const response = await axios.post('http://localhost:8000/usuarios/', {
        nome,
        email,
        password,
      });

      // Verificando a resposta da requisição
      if (response.status === 201 || response.status === 200) {
        console.log('Usuário cadastrado com sucesso!', response.data);
        router.push('/');
      } else {
        console.error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  const handleCancel = () => {
    // Redireciona para a página inicial ao cancelar
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', 
    minHeight: '100vh', backgroundColor: '#fff' }}>
      <div style={{ width: '100%', maxWidth: '350px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', 
          marginBottom: '24px' }}>Cadastre-se!</h2>
        <form
          style={{
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '16px',
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#4A5568', fontSize: '14px', 
              fontWeight: 'bold', marginBottom: '8px' }} htmlFor="nome">
              Nome
            </label>
            <input
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                border: '1px solid #000',
                borderRadius: '10px',
                width: '90%',
                padding: '8px 12px',
                color: '#4A5568',
              }}
              id="nome"
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#4A5568', fontSize: '14px',
               fontWeight: 'bold', marginBottom: '8px' }} htmlFor="email">
              E-mail
            </label>
            <input
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                border: '1px solid #000',
                borderRadius: '10px',
                width: '90%',
                padding: '8px 12px',
                color: '#4A5568',
              }}
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#4A5568', fontSize: '14px', 
              fontWeight: 'bold', marginBottom: '8px' }} htmlFor="senha">
              Senha
            </label>
            <input
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                border: '1px solid #000',
                borderRadius: '10px',
                width: '90%',
                padding: '8px 12px',
              }}
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              style={{
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: 'bold',
                padding: '8px 16px',
                border: '1px solid #000',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              style={{
                backgroundColor: '#7ed957',
                color: '#000',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                border: '1px solid #000',
              }}
              type="button"
              onClick={handleCadastro}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;
