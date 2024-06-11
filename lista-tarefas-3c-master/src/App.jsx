import './App.css'
import React, {useCallback, useReducer, useState} from 'react'

//definindo as ações adicionar, marcar como feito e deletar das tarefas
const taskReducer = (state, action) =>{
  switch(action.type){
    case 'ADD_TAREFA':
      return [...state, action.payload]
    case 'CONCLUIDO':
      const atualizarTarefa = [...state]
      atualizarTarefa[action.payload].completed = true
      return atualizarTarefa
    case 'DELETE':
      return state.filter((_, index) => index !== action.payload)
    default:
      return state
  }
}

function App() {
  const [tarefa, setTarefa] = useState('')
  const [tarefaAtual, dispatch] = useReducer(taskReducer, [])

  //funcao adicionar tarefa
  const addTarefa = useCallback(() =>{
    if(tarefa.trim() !== ''){
      dispatch({type: 'ADD_TAREFA', payload: {text: tarefa, completed: false}})
      setTarefa('');
    }
  }, [tarefa])

  //funcao marcar tarefa como concluida
  const concluirTarefa = useCallback((index) =>{
    dispatch ({type: 'CONCLUIDO', payload: index})
  }, [])

  //funcao excluir tarefa
  const deleteTarefa = useCallback((index) => {
    dispatch({type: 'DELETE', payload: index})
  }, [])

  return (
    <>
      <div className="center">
        <h1>Lista de Tarefas</h1>
        <div className="input">
          <input type="text" 
            placeholder='Nova tarefa'
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button onClick={addTarefa}>Adicionar</button>
        </div>
        <ul>
          {tarefaAtual.map((tarefas, index) => (
            <li key={index}>
              <span style={{ textDecoration: tarefas.completed ? 'line-through' : 'none' }}>
                {tarefas.text}
              </span>
              {
                !tarefas.completed && (
                  <>
                  <button onClick={() => concluirTarefa(index)}>
                    Concluir tarefa
                  </button>
                  </>
                )
              }
              <button onClick={() => deleteTarefa(index)}>
                Excluir tarefa
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
