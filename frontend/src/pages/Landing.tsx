import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import QuestionForm from '../components/questions-form/QuestionForm';
import QuestionsList from '../components/QuestionsList';
import type { Question } from '../types/question';
import './Landing.css';

function Landing() {
  const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
  const API_URL = `${BASE_URL}/questions`;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<number | string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchQuestions();
  }, [fetchQuestions]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      void fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleEdit = (item: Question) => {
    setEditingId(item.id);
    setQuestion(item.question);
    setCategory(item.category);
  };

  const handleDelete = async (id: number | string) => {
    if (!window.confirm("Delete this question?")) {
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      void fetchQuestions();
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
    <main className="landing-page">
      <section className="landing-page__hero">
        <div className="landing-page__hero-copy">
          <p className="landing-page__eyebrow">HabitLoop Studio</p>
          <h1 className="landing-page__headline">Collect thoughtful questions in one calm place.</h1>
          <p className="landing-page__subtitle">
            Capture ideas, group them by theme, and keep your list tidy as it grows.
          </p>
        </div>
      </section>

      <section className="landing-page__form-section">
        <QuestionForm
          question={question}
          category={category}
          editingId={editingId}
          onQuestionChange={setQuestion}
          onCategoryChange={setCategory}
          onSubmit={handleSubmit}
          onClear={clearForm}
        />
      </section>

      <section className="landing-page__bottom" aria-label="Questions list">
        <div className="landing-page__section-header">
          <div>
            <h2 className="landing-page__section-title">Question list</h2>
            <p className="landing-page__section-copy">
              All collected questions appear here after submission.
            </p>
          </div>
          <div className="landing-page__section-meta">
            <span className="landing-page__badge">{questions.length} questions</span>
          </div>
        </div>

        <QuestionsList
          questions={questions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}

export default Landing;
