import { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css";

const getTodo = () => {
  const config = {
    url: "http://localhost:3001/products",
    method: "get"
  };
  return axios(config);
};

const TodoDelete = (id) => {
  const config = {
    method: "delete",
    url: `http://localhost:3001/products/${id}`
  };
  return axios(config);
};

const ToggleUpdate = (id, status) => {
  if (status) {
    var f = false;
  } else {
    var f = true;
  }
  const config = {
    method: "patch",
    url: `http://localhost:3001/products/${id}`,
    data: {
      status: f
    }
  };
  return axios(config);
};

const updateTasks = (id, title) => {
  const config = {
    method: "patch",
    url: `http://localhost:3001/products/${id}`,
    data: {
      titles: title
    }
  };
  return axios(config);
};
const createTodo = (titles) => {
  const payload = {
    titles: titles,
    status: false
  };
  const config = {
    url: "http://localhost:3001/products",
    method: "post",
    data: payload
  };
  return axios(config);
};
function Todo() {
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState([]);
  const [todoinput, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit && onSubmit();
    setInput("");
  };
  useEffect(() => {
    getTodo()
      .then((res) => {
        setTodo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onSubmit = () => {
    setIsLoading(true);
    createTodo(todoinput)
      .then((res) => {
        setTodo([...todo, res.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete Tasks
  const handleDelete = (id) => {
    TodoDelete(id);
    getTodo()
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ToggleStatus
  const ToggleStatus = (id, status) => {
    ToggleUpdate(id, status);
    getTodo()
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (id) => {
    updateTasks(id, todoinput);
    getTodo()
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <h3>...Loading</h3>;
  }
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input placeholder="add something" onChange={handleChange} />
        <button onClick={handleSubmit}>Add</button>
      </div>
      <div>
        {todo.map((item) => (
          <h1 key={item.id}>
            {item.titles} {item.status ? "Done" : "NotDone"}
            <button onClick={() => handleUpdate(item.id)}>Update Tasks</button>
            <button onClick={() => ToggleStatus(item.id, item.status)}>
              Toggle status
            </button>
            <button
              className="delete_btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete Task
            </button>{" "}
          </h1>
        ))}
      </div>
    </div>
  );
}
export default Todo;
