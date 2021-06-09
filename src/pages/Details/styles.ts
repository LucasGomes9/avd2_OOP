import styled, { css } from 'styled-components'

interface IOpcoes {
  mostrar: boolean;
}

export const Container = styled.div`
width: 100%;
max-width: 580px;
margin: 0 auto;
padding: 0 30px;

background: #fff;
border: 1px solid #ddd;
margin-top: 30px;

  button {
    margin-top: 1rem;
    margin-left: 1.2rem;
  }
`

export const Disciplinas = styled.div`
  ul li {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  ul li + li {
    margin-top: 2rem;
  }
`
export const FormUpdate = styled.div`
  form {
    width: 100%;
    input {
      width: 100%;
      margin-top: 0.2rem;
    }
  }
`

export const Opcoes = styled.div<IOpcoes>`
  width: 100%;
  visibility: hidden;
  height: 0;

  ${props =>
    props.mostrar === true &&
    css`
      visibility: visible;
      height: 10rem;
    `}

  button {
    width: 100%;
    margin-top: 0.5rem;
    margin-left: 0;
    border: none;
    color: #FFF;
    border-radius: 0.4rem;
    padding: 0.4rem;
  }

  .buttonUpdate {
    background: #7159c1;
  }

  .buttonDelete {
    background: red;
  }
`
