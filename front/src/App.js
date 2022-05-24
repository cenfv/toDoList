import Axios from "axios";
import { useEffect, useState } from "react";
import "./global.css";

function App() {
  const [tarefa, setTarefa] = useState([]);
  const [tarefaCrud, setTarefaCrud] = useState({
    id: null,
    descricao: "",
    concluido: false,
  });
  const [input, setInput] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:1337/api/tarefas").then((response) => {
      if (response.status === 200 && response.statusText === "OK") {
        setTarefa(response.data.data);
      }
    });
  }, [tarefaCrud]);

  function handleEdit(id, descricao, concluido) {
    Axios.put(`http://localhost:1337/api/tarefas/${id}`, {
      data: {
        descricao: descricao,
        concluido: concluido,
      },
    }).then((response) => {
      if (response.status === 200 && response.statusText === "OK") {
        console.log("sucess");
      }
    });
  }
  function handleCreate(descricao) {
    Axios.post("http://localhost:1337/api/tarefas", {
      data: {
        descricao: descricao,
        concluido: false,
      },
    }).then((response) => {
      if (response.status === 200 && response.statusText === "OK") {
        console.log("sucess");
      }
    });
  }
  return (
    <div className="flex flex-col overflow-hidden h-screen bg-gray-50 ">
      <div className="w-1/3 mt-8 flex flex-col  space-y-5 rounded-lg bg-gray-100 max-w-6xl mx-auto p-5 flex-wrap sm:flex-nowrap ">
        <h1 className="text-center font-semibold text-3xl">TODO APP</h1>
        <h2 className="font-semibold text-2xl">Tarefas</h2>
        <div>
          <ul className="ml-5 list-disc">
            {tarefa.map((tarefa) => {
              return (
                <div className="flex flex-row space-x-3">
                  {tarefa.attributes.concluido === true ? (
                    <li className="line-through	">
                      {tarefa.attributes.descricao}
                    </li>
                  ) : (
                    <li>{tarefa.attributes.descricao}</li>
                  )}

                  <button
                    onClick={() => {
                      setTarefaCrud({
                        id: tarefa.id,
                        descricao: tarefa.attributes.descricao,
                        concluido: tarefa.attributes.concluido,
                      });
                      setInput(tarefa.attributes.descricao);
                      console.log(tarefaCrud);
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(
                        tarefa.id,
                        tarefa.attributes.descricao,
                        !tarefa.attributes.concluido
                      );
                      setTarefaCrud({
                        descricao: tarefa.attributes.descricao,
                        concluido: tarefa.attributes.concluido,
                      });
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      Axios.delete(
                        `http://localhost:1337/api/tarefas/${tarefa.id}`
                      ).then((response) => {
                        if (
                          response.status === 200 &&
                          response.statusText === "OK"
                        ) {
                          setTarefaCrud({
                            id: "",
                            descricao: "",
                            concluido: false,
                          });
                        }
                      });
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Deletar
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">Nova tarefa</h2>
          <input
            id="setTarefa"
            name="setTarefa"
            type="text"
            className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Digite o nome da tarefa"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            onClick={() => {
              tarefaCrud.id
                ? handleEdit(tarefaCrud.id, input, tarefaCrud.concluido)
                : handleCreate(input);
              setTarefaCrud({ ...tarefaCrud, descricao: input });
            }}
            className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:blue-indigo-500"
          >
            Salvar
          </button>
          {tarefaCrud.id && (
            <button
              onClick={() => {
                setInput("");
                setTarefaCrud({
                  id: null,
                  descricao: "",
                  concluido: false,
                });
              }}
              className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:blue-indigo-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
