import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Key } from 'readline'
import api from '../../services/api'
import { Container, Disciplinas, FormUpdate, Opcoes } from './styles'

interface ProfessoresParametros {
  professor: string
}

interface Cadastro {
  id: string;
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<ProfessoresParametros>()
  const [professores, setProfessores] = useState<Cadastro[]>([])
  const [ opcoes, setOpcoes] = useState(false)



  async function buscarProfessor(nome: string) {
    const professoresApi = await api.get(`/professores/${nome}`)
    setProfessores(professoresApi.data.body)
  }

  async function deletarProfessor(id: string) {
    await api.delete(`/professores/${id}`)
  }

  useEffect(() => {
    buscarProfessor(params.professor)
  }, [])

  let detalhesProfessor = []
  detalhesProfessor = professores.filter(prof => prof.professor === params.professor)

  async function handleSubmit(event: any) {
    event.preventDefault()

    const { target: form } = event

    const atualizarProfessor = {
      disciplina: form.disciplina.value,
      professor: form.professor.value,
      diasemana: form.diasemana.value,
      periodo: form.periodo.value,
      horario: form.horario.value,
    }

    await api.put(`/professores/${form.id.value}`, {
      ...atualizarProfessor
    })

    window.location.href = '/'
  }

  function editarLista(data: Cadastro, index: number){
    return(
      <div style={{display:'flex', flexDirection:'column'}}>
      <form style={{display:'flex', flexDirection:'column'}} onSubmit={handleSubmit}>
      <input type="text" name='professor' defaultValue={data.professor} required />
      <input type="text" name='disciplina' defaultValue={data.disciplina} required />
      <input  type="text" name='diasemana' defaultValue={data.diasemana} required />
      <input type="text" name='periodo' defaultValue={data.periodo} required />
      <input type="text" name='horario' defaultValue={data.horario} required />
      <input style={{ display: 'none' }} type="text"  name="id" defaultValue={data.id} />
      <button className="buttonUpdate">Atualizar</button>
      </form>
      <button className="buttonUpdate" onClick={() => setOpcoes(false)}>Voltar</button>
      </div>

    )
  }

  function listaPadrao(data: Cadastro, index: number){
    return(

      <div style={{display:'flex', flexDirection:'column'}}>
            <span>Professor: {data.professor}</span>
            <span>Disciplina: {data.disciplina}</span>
            <span>Dia Semana: {data.diasemana}</span>
            <span>Periodo: {data.periodo}</span>
            <span>Horário: {data.horario}</span>
      </div>

    )
  }

  function attPadrao(){
    return(
      <button
      onClick={() => {
        setOpcoes(true)
    
    }}>Atualizar</button>
    )
  }
  function deletPadrao(data: Cadastro){
    return(
      <button
      className="buttonDelete"
      onClick={() => {
        deletarProfessor(data.id)
        buscarProfessor(data.professor)
        window.location.reload()
    }}>Deletar</button>
    )
  }


  return (
    <Container>
      <Disciplinas>
        <ul>
          {detalhesProfessor.map((prof, index) =>
            <li key={index}>
              { opcoes ? editarLista(prof, index) : listaPadrao(prof, index) }              
            <div style={{display:'flex', flexDirection:'row', alignContent:'center', alignSelf:'center'}}>
            { opcoes ? null : attPadrao() }
            { opcoes ? null : deletPadrao(prof) }
      </div>
    </li>
          )}
        </ul>
      </Disciplinas>
    </Container>
  )
}

export default Details

