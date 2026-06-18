import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('base',import.meta.env.VITE_API_URL);
const API_URL = `${BASE_URL}/questions`;

function App() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      alert("Question is required");
      return;
    }

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            category,
          }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            category,
          }),
        });
      }

      setQuestion("");
      setCategory("");
      setEditingId(null);

      fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setQuestion(item.question);
    setCategory(item.category);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) {
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setQuestion("");
    setCategory("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Question Management App</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button type="submit">
          {editingId ? "Update Question" : "Add Question"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={clearForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Question List</h2>

      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {questions.length === 0 ? (
            <tr>
              <td colSpan="4">No Questions Found</td>
            </tr>
          ) : (
            questions.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.question}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;