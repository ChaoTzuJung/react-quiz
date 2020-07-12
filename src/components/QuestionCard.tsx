import React from 'react';

type Props = {
    question: string;
    awnsers: string[];
    callback: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ 
    question,
    awnsers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
}) => (
    <div>
        <p className="number">
            Questions: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {awnsers.map(answer => (
                <div>
                    <button disabled={userAnswer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))}
        </div>
    </div>
)

export default QuestionCard;