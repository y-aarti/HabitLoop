import type { FormEvent } from 'react';
import './QuestionForm.css';

interface QuestionFormProps {
  question: string;
  category: string;
  editingId: number | string | null;
  onQuestionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
}

function QuestionForm({
  question,
  category,
  editingId,
  onQuestionChange,
  onCategoryChange,
  onSubmit,
  onClear,
}: QuestionFormProps) {
  return (
    <form className="question-form" onSubmit={onSubmit}>
      <h2 className="question-form__title">Share your question</h2>

      <div className="question-form__controls">
        <div className="question-form__field-group">
          <label className="question-form__label" htmlFor="question">
            Describe your question
          </label>
          <textarea
            className="question-form__textarea"
            id="question"
            name="question"
            rows={4}
            placeholder="What do you want to ask?"
            value={question}
            onChange={(event) => onQuestionChange(event.target.value)}
          />
        </div>

        <div className="question-form__field-group">
          <label className="question-form__label" htmlFor="category">
            Category
          </label>
          <input
            className="question-form__input"
            id="category"
            name="category"
            type="text"
            placeholder="e.g. productivity, habits, focus"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          />
        </div>

        <div className="question-form__action">
          <button className="question-form__submit" type="submit">
            {editingId ? 'Update' : 'Submit'}
          </button>
          {editingId && (
            <button
              type="button"
              className="question-form__cancel"
              onClick={onClear}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default QuestionForm;
