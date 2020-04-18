import React, {useState, useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    }).catch(error => console.log(error))
  }, []);

  async function handleAddRepository() {
   try {
      const repository = {
        title: `Repository ${Date.now()}`,
        url: 'url',
        techs: ['React', 'ReactJS']
      };
      const response = await api.post('repositories', repository);
      setRepositories([...repositories, response.data]);
   } catch (error) {
     console.log(error)
   }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);
      if(response) {
        setRepositories(repositories.filter(repository => repository.id !== id));
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
