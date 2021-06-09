import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styles'

import api from '../../services/api'

interface Cadastro {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const Dashboard: React.FC = () => {
  const [professores, setProfessores] = useState<Cadastro[]>([])

  async function loadData() {
    const professoresApi = await api.get('/professores')
    setProfessores(professoresApi.data.body)
  }

  useEffect(() => {
    loadData()
  }, [])

  console.log(professores)
  let professorUnico = []
  professorUnico = Array.from(new Set(professores.map(prof => prof.professor))).sort()
  console.log(professorUnico)
  return (
    <Container>
      <ul>
        {professorUnico.map((professor, index) =>
          <li key={index.toString()}>
            <Link to={`/details/${professor}`}>{professor}</Link>
          </li>
        )}
      </ul>
    </Container>
  )
}

export default Dashboard
