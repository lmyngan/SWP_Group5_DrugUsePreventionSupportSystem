// src/components/Survey.js
import '../styles/Survey.css';
import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const Survey = () => {
    const [answers, setAnswers] = useState(0);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const scoreSystem = {
        question4: { yes: 1, no: 0 },
        question5: { yes: 1, no: 0 },
        question6: { yes: 1, no: 0 },
        question7: { yes: 1, no: 0 },
        question8: { yes: 1, no: 0 },
        question9: { yes: 1, no: 0 },
        question10: { yes: 1, no: 0 },
        question11: { yes: 1, no: 0 },
        question12: { yes: 1, no: 0 },

        question13: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question14: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question15: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question16: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question17: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question18: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question19: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question20: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },
        question21: { never: 0, "once-twice": 1, monthly: 2, weekly: 3, daily: 4 },

        question22: { never: 0, "3-months": 2, "not-3-months": 1 },
        question23: { never: 0, "3-months": 2, "not-3-months": 1 },
        question24: { never: 0, "3-months": 2, "not-3-months": 1 },
        question25: { never: 0, "3-months": 2, "not-3-months": 1 },
        question26: { never: 0, "3-months": 2, "not-3-months": 1 },
        question27: { never: 0, "3-months": 2, "not-3-months": 1 },
        question28: { never: 0, "3-months": 2, "not-3-months": 1 },
        question29: { never: 0, "3-months": 2, "not-3-months": 1 },
        question30: { never: 0, "3-months": 2, "not-3-months": 1 },
        question31: { never: 0, "3-months": 2, "not-3-months": 1 }
    }

    const calculateScore = (answers) => {
        let total = 0;
        Object.entries(answers).forEach(([question, answer]) => {
            if (scoreSystem[question]) {
                total += scoreSystem[question][answer] || 0;
            }
        });
        return total;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalScore = calculateScore(answers);
        setScore(totalScore);
        localStorage.setItem('surveyTotalScore', totalScore);
        let riskLevel = "";
        if (totalScore <= 10) {
            riskLevel = "Low Risk";
            setModalContent({
                title: "Survey Result",
                body: `Your total score is: ${totalScore}\nRisk Level: ${riskLevel}`,
                showLogin: false
            });
            setShowModal(true);
        } else if (totalScore <= 30) {
            riskLevel = "Moderate Risk";
            setModalContent({
                title: "Survey Result",
                body: `Your total score is: ${totalScore}\nRisk Level: ${riskLevel}\nYou should login to book an appointment with a consultant.`,
                showLogin: false
            });
            setShowModal(true);
        } else {
            riskLevel = "High Risk";
            setModalContent({
                title: "Survey Result",
                body: `Your total score is: ${totalScore}\nRisk Level: ${riskLevel}\nYou should login to book an appointment with a consultant.`,
                showLogin: false
            });
            setShowModal(true);
        }
        console.log('Survey answers:', answers);
        console.log('Total score:', totalScore);
    };

    const handleLogin = () => {
        setShowModal(false);
        window.location.href = "/login";
    };

    const handleClose = () => {
        setShowModal(false);
        if (score <= 10) window.location.href = "/";;
    };

    const handleChange = (e) => {
        setAnswers({
            ...answers,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="survey-box">
            <h1 className="survey-title">Quick Survey</h1>
            <Form onSubmit={handleSubmit}>
                <div className="survey-question">
                    <h4>What is your gender?</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>What is your age group?</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Under 18"
                            name="age"
                            value="under18"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="18-24"
                            name="age"
                            value="18-24"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="25-34"
                            name="age"
                            value="25-34"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="35+"
                            name="age"
                            value="35plus"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Current employment status?</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Student"
                            name="employment"
                            value="student"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Employed"
                            name="employment"
                            value="employed"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Unemployed"
                            name="employment"
                            value="unemployed"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <h4>1. In your life, which of the following substances have you ever used? (NON-MEDICAL USE ONLY)</h4>
                <hr /><br />

                <div className="survey-question">
                    <h4>Tobacco products (cigarettes, chewing tobacco, cigars, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question4"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question4"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Alcoholic beverages (beer, wine, spirits, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question5"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question5"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Cannabis (marijuana, pot, grass, hash, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question6"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question6"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Cocaine (coke, crack, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question7"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question7"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Amphetamine type stimulants (speed, meth, ecstasy, ice etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question8"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question8"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Inhalants (nitrous, glue, petrol, paint thinner, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question9"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question9"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Sedatives or Sleeping Pills (diazepam, alprazolam, flunitrazepam, temazepam etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question10"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question10"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Hallucinogens (LSD, acid, mushrooms, trips, Ketamine, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question11"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question11"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Opioids (heroin, morphine, methadone, opium, buprenorphine, codeine, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="question12"
                            value="yes"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="question12"
                            value="no"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <h3>2. In the past three months, how often have you used the substances you mentioned (FIRST DRUG, SECOND DRUG, ETC)?</h3>
                <hr /><br />

                <div className="survey-question">
                    <h4>Tobacco products (cigarettes, chewing tobacco, cigars, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question13"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question13"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question13"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question13"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question13"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Opioids (heroin, morphine, methadone, opium, buprenorphine, codeine, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question14"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question14"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question14"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question14"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question14"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Hallucinogens (LSD, acid, mushrooms, trips, Ketamine, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question15"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question15"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question15"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question15"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question15"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Sedatives or Sleeping Pills (diazepam, alprazolam, flunitrazepam, temazepam etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question16"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question16"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question16"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question16"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question16"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Inhalants (nitrous, glue, petrol, paint thinner, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question17"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question17"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question17"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question17"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question17"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Amphetamine type stimulants (speed, meth, ecstasy, ice etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question18"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question18"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question18"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question18"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question18"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Cocaine (coke, crack, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question19"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question19"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question19"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question19"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question19"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Cannabis (marijuana, pot, grass, hash, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question20"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question20"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question20"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question20"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question20"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Alcoholic beverages (beer, wine, spirits, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Never"
                            name="question21"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Once or Twice"
                            name="question21"
                            value="once-twice"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Monthly"
                            name="question21"
                            value="monthly"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Weekly"
                            name="question21"
                            value="weekly"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Daily or Almost Daily"
                            name="question21"
                            value="daily"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <h3>3. Have you ever tried to cut down on using (FIRST DRUG, SECOND DRUG, ETC.) but failed?</h3>
                <hr /><br />

                <div className="survey-question">
                    <h4>Tobacco products (cigarettes, chewing tobacco, cigars, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question22"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question22"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question22"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Opioids (heroin, morphine, methadone, opium, buprenorphine, codeine, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question23"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question23"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question23"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Hallucinogens (LSD, acid, mushrooms, trips, Ketamine, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question24"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question24"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question24"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Sedatives or Sleeping Pills (diazepam, alprazolam, flunitrazepam, temazepam etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question25"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question25"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question25"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Inhalants (nitrous, glue, petrol, paint thinner, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question26"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question26"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question26"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Inhalants (nitrous, glue, petrol, paint thinner, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question27"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question27"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question27"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Amphetamine type stimulants (speed, meth, ecstasy, ice etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question28"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question28"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question28"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Cocaine (coke, crack, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question29"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question29"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question29"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="survey-question">
                    <h4>Cannabis (marijuana, pot, grass, hash, etc.)</h4>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="No, never"
                            name="question30"
                            value="never"
                            onChange={handleChange}
                            required
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, in the past 3 months"
                            name="question30"
                            value="3-months"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Yes, but not in the past 3 months"
                            name="question30"
                            value="not-3-months"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>

                <h3>4. Have you ever used any drug by injection? (NON-MEDICAL USE ONLY)</h3>
                <Form.Group>
                    <Form.Check
                        type="radio"
                        label="No, never"
                        name="question31"
                        value="never"
                        onChange={handleChange}
                        required
                    />
                    <Form.Check
                        type="radio"
                        label="Yes, in the past 3 months"
                        name="question31"
                        value="3-months"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Yes, but not in the past 3 months"
                        name="question31"
                        value="not-3-months"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <hr /><br />

                <Button type="submit" className="survey-submit-btn">
                    Submit Survey
                </Button>
            </Form>

            {/* Modal for result */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent.body && modalContent.body.split('\n').map((line, idx) => (
                        <div key={idx}>{line}</div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    {modalContent.showLogin ? (
                        <>
                            <Button variant="primary" onClick={handleLogin}>
                                Login
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Survey;