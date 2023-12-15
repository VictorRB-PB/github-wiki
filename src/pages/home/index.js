import { useState } from "react";
import gitlogo from "../../assets/github.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ItemRepo from "../../components/ItemRepo";
import { api } from "../../services/api";

import { Container } from "./styles";


function App() {

  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    if(currentRepo === null || currentRepo.length === 0){
      alert('Preencha o campo vazio');
    }else {
      
      const { data } = await api.get(`repos/${currentRepo}`);

     if(data.id){

        const isExist = repos.find(repo => repo.id === data.id);

        if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo("");
        return 
        }
      }
      alert('Repositório não encontrado');
    }
  }

  const handleRemoveRepo = (id) => {
    // utilizar filtro
    if(id){
      console.log("Removendo registro 2: ", id);
      const newRepos = repos.filter((repo) => repo.id !== id);
      setRepos(newRepos);    
    }
  }

  return (
    <Container>
      <img src={gitlogo} alt="GitHub" width={72} height={72} />
      <Input value={currentRepo}  onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
