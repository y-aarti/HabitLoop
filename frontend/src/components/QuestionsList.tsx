import type { Question } from '../types/question';

interface QuestionsListProps {
  questions: Question[];
  onEdit: (item: Question) => void;
  onDelete: (id: number | string) => void;
}

function QuestionsList({ questions, onEdit, onDelete }: QuestionsListProps) {
  return (
    <div className="questions-list">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length === 0 ? (
            <tr>
              <td colSpan={3}>No questions available.</td>
            </tr>
          ) : (
            questions.map((question) => (
              <tr key={question.id}>
                <td>{question?.category}</td>
                <td>{question?.question}</td>
                <td>
                  <button className="questions-list__button questions-list__button--edit" type="button" onClick={() => onEdit(question)}>
                    Edit
                  </button>
                  <button className="questions-list__button questions-list__button--delete" type="button" onClick={() => onDelete(question.id)}>
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

export default QuestionsList;
