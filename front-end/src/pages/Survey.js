// src/components/Survey.js
import '../styles/Survey.css';
import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getTestQuestion } from '../service/api';

const Survey = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));
        }

        const fetchQuestions = async () => {
            const testId = 1;
            const data = await getTestQuestion(testId);
            if (Array.isArray(data)) {
                setQuestions(data);
            } else if (Array.isArray(data.questions)) {
                setQuestions(data.questions);
            } else {
                setQuestions([]);
            }
        };
        fetchQuestions();
    }, []);

    const handleChange = (questionId, option) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const calculateScore = () => {
        let total = 0;
        questions.forEach(q => {
            const selectedOptionId = answers[q.questionId];
            const selectedOption = q.options.find(opt => opt.optionId === Number(selectedOptionId));
            if (selectedOption) {
                total += selectedOption.score;
            }
        });
        return total;
    };

    const getRiskLevel = (score) => {
        if (score <= 10) return "Low Risk";
        if (score <= 30) return "Medium Risk";
        return "High Risk";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalScore = calculateScore();
        const riskLevel = getRiskLevel(totalScore);

        setScore(totalScore);
        setShowModal(true);
        let body = `Your total score is: ${totalScore}\nRisk Level: ${riskLevel}`;
        if (riskLevel === "Medium Risk") {
            body += `\nYou should Join Event.`;
        }
        if (riskLevel === "High Risk") {
            body += `\nYou should Book Appointment with Consultant.`;
        }
        setModalContent({
            title: "Survey Result",
            body: body,
        });

        localStorage.setItem("totalScore", totalScore);
    };

    const handleClose = () => setShowModal(false);

    const groupTitles = [
        { range: [4, 12], title: "1. In your life, which of the following substances have you ever used? (NON-MEDICAL USE ONLY)" },
        { range: [13, 21], title: "2. In the past three months, how often have you used the substances you mentioned (FIRST DRUG, SECOND DRUG, ETC)?" },
        { range: [22, 29], title: "3. Have you ever tried to cut down on using (FIRST DRUG, SECOND DRUG, ETC.) but failed?" },
        { range: [30, 30], title: "4. Have you ever used any drug by injection? (NON-MEDICAL USE ONLY)" }
    ];

    // Hàm kiểm tra có phải là câu hỏi đầu tiên của group không
    const isFirstInGroup = (questionId, idx, questions) => {
        for (let group of groupTitles) {
            if (questionId === group.range[0]) {
                // Nếu là câu hỏi đầu tiên của group
                // hoặc là câu hỏi đầu tiên trong mảng và nằm trong group
                return group.title;
            }
        }
        return null;
    };

    return (
        <div className="survey-box">
            <h1 className="survey-title">Quick Survey</h1>
            <Form onSubmit={handleSubmit}>
                {questions.length === 0 ? (
                    <div>Loading questions...</div>
                ) : (
                    <>
                        {questions.map((q, idx) => {
                            // Kiểm tra nếu là câu hỏi đầu tiên của group thì hiển thị title
                            const groupTitle = isFirstInGroup(q.questionId, idx, questions);
                            return (
                                <div key={q.questionId}>
                                    {groupTitle && (
                                        <div className="survey-group-title" style={{ fontWeight: "bold", margin: "16px 0 8px 0" }}>
                                            {groupTitle}
                                        </div>
                                    )}
                                    <div className="survey-question">
                                        <h4>{q.questionText}</h4>
                                        <Form.Group>
                                            {q.options.map(opt => (
                                                <Form.Check
                                                    key={opt.optionId}
                                                    type="radio"
                                                    label={opt.optionText}
                                                    name={`question_${q.questionId}`}
                                                    value={opt.optionId}
                                                    checked={answers[q.questionId] === opt.optionId}
                                                    onChange={() => handleChange(q.questionId, opt.optionId)}
                                                    required
                                                />
                                            ))}
                                        </Form.Group>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
                <Button type="submit" className="survey-submit-btn">
                    Submit Survey
                </Button>
            </Form>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Survey Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Your total score is: {score}</div>
                    <div>Risk Level: {getRiskLevel(score)}</div>
                    {getRiskLevel(score) === "Medium Risk" && (
                        <div>You should Join Event.</div>
                    )}
                    {getRiskLevel(score) === "High Risk" && (
                        <div>You should Book Appointment with Consultant.</div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {getRiskLevel(score) === "Medium Risk" && (
                        <Button variant="primary" onClick={() => window.location.href = '/event'}>
                            Join Event
                        </Button>
                    )}
                    {getRiskLevel(score) === "High Risk" && (
                        <Button variant="primary" onClick={() => window.location.href = '/book-appointment'}>
                            Book Appointment
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Survey;