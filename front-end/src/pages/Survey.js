// src/components/Survey.js
import '../styles/Survey.css';
import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getTestQuestion } from '../service/api';
import { submitTestScore } from '../service/api';
import { addNotification } from '../service/api';

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
        if (score <= 10) return "low";
        if (score <= 30) return "moderate";
        return "high";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalScore = calculateScore();
        const riskLevel = getRiskLevel(totalScore);
        const testId = 1;
        let recommendation = "";
        if (riskLevel === "moderate") recommendation = "You should join Event.";
        if (riskLevel === "high") recommendation = "You should book appointment with consultant.";

        if (user && user.accountId) {
            await submitTestScore({
                accountId: user.accountId,
                testId,
                score: totalScore,
                riskLevel,
                recommendation
            });
        }

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

        if (user && user.accountId) {
            let notificationMessage = "";

            if (riskLevel === "moderate") {
                notificationMessage = `Based on your survey result (Score: ${totalScore}, Risk Level: ${riskLevel}), we recommend you to join our events for support and guidance.`;
            } else if (riskLevel === "high") {
                notificationMessage = `Based on your survey result (Score: ${totalScore}, Risk Level: ${riskLevel}), we strongly recommend you to book an appointment with our consultant for professional help.`;
            } else {
                notificationMessage = `Your survey result shows a low risk level (Score: ${totalScore}). Keep up the good work and stay healthy!`;
            }

            try {
                await addNotification({
                    accountId: user.accountId,
                    message: notificationMessage
                });
                console.log('Survey result notification sent successfully');
            } catch (error) {
                console.error('Failed to send survey notification:', error);
            }
        }
    };

    const handleClose = () => setShowModal(false);

    const groupTitles = [
        { range: [4, 12], title: "1. In your life, which of the following substances have you ever used? (NON-MEDICAL USE ONLY)" },
        { range: [13, 21], title: "2. In the past three months, how often have you used the substances you mentioned (FIRST DRUG, SECOND DRUG, ETC)?" },
        { range: [22, 29], title: "3. Have you ever tried to cut down on using (FIRST DRUG, SECOND DRUG, ETC.) but failed?" },
        { range: [30, 30], title: "4. Have you ever used any drug by injection? (NON-MEDICAL USE ONLY)" }
    ];

    const isFirstInGroup = (questionId, idx, questions) => {
        for (let group of groupTitles) {
            if (questionId === group.range[0]) {
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
                                                <div key={opt.optionId} className="form-check">
                                                    <input
                                                        type="radio"
                                                        id={`question_${q.questionId}_option_${opt.optionId}`}
                                                        name={`question_${q.questionId}`}
                                                        value={opt.optionId}
                                                        checked={answers[q.questionId] === opt.optionId}
                                                        onChange={() => handleChange(q.questionId, opt.optionId)}
                                                        className="form-check-input"
                                                        required
                                                    />
                                                    <label
                                                        htmlFor={`question_${q.questionId}_option_${opt.optionId}`}
                                                        className="form-check-label"
                                                    >
                                                        {opt.optionText}
                                                    </label>
                                                </div>
                                            ))}
                                        </Form.Group>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
                <Button type="submit" className="survey-submit-btn">Submit Survey</Button>
            </Form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content-custom">
                        <h2>Survey Result</h2>
                        <div>Your total score is: {score}</div>
                        <div>Risk Level: {getRiskLevel(score)}</div>
                        {getRiskLevel(score) === "moderate" && (
                            <div>You should Join Event.</div>
                        )}
                        {getRiskLevel(score) === "high" && (
                            <div>You should Book Appointment with Consultant.</div>
                        )}
                        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                            {getRiskLevel(score) === "moderate" && (
                                <button className="btn btn-primary" onClick={() => window.location.href = '/event'}>
                                    Join Event
                                </button>
                            )}
                            {getRiskLevel(score) === "high" && (
                                <button className="btn btn-primary" onClick={() => window.location.href = '/mentor'}>
                                    Book Appointment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content-custom">
                        <h2>Survey Result</h2>
                        <div>Your total score is: {score}</div>
                        <div>Risk Level: {getRiskLevel(score)}</div>
                        {getRiskLevel(score) === "moderate" && (
                            <div>You should Join Event.</div>
                        )}
                        {getRiskLevel(score) === "high" && (
                            <div>You should Book Appointment with Consultant.</div>
                        )}
                        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                            {getRiskLevel(score) === "moderate" && (
                                <button className="btn btn-primary" onClick={() => window.location.href = '/event'}>
                                    Join Event
                                </button>
                            )}
                            {getRiskLevel(score) === "high" && (
                                <button className="btn btn-primary" onClick={() => window.location.href = '/mentor'}>
                                    Book Appointment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Survey;  