import "./styles.css";

import { Card } from "../../components/Card";
import { useState, useEffect } from "react";

export function Home() {
  const [userName, setUserName] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleChange(event) {
    setUserName(event.target.value);
  }

  function handleClick() {
    const newStudent = {
      name: userName,
      time: new Date().toLocaleString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setStudents((prevState) => [...prevState, newStudent]);
    setUserName("");
  }

  console.log('oi')

  function handleDelete(index){
    let temporarioArray = [...students]
    temporarioArray.splice(index)

    setStudents(temporarioArray);
  }

  useEffect(() => {
    async function fetchData() {
      try {
       const response = await fetch("https://api.github.com/users/isamensatto")
       const data = await response.json()

       setUser({
        name: data.name,
        avatar: data.avatar_url
       })
       
      } catch (error) {
        console.log("error:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div className="infos">
          <strong>{user.name}</strong>
          <img src={user.avatar} />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o seu nome..."
        onChange={handleChange}
        value={userName}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={userName === "" && loading}
      >
        Adicionar
      </button>
      {students.map((card, index) => (
        <Card key={card.time} name={card.name} time={card.time} onClick={() => handleDelete(index)} />
      ))}
    </div>
  );
}
