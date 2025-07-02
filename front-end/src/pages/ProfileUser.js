import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { getTestScore } from "../service/api";

const ProfileUser = () => {
    const [user, setUser] = useState(null);
    const [testScore, setTestScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);

            // Fetch test results if user has accountId
            if (userData.accountId) {
                fetchTestResults(userData.accountId);
            }
        }
    }, []);

    const fetchTestResults = async (accountId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getTestScore(accountId);
            if (response.error) {
                setError(response.error);
            } else {
                // Get the latest test result score
                const results = Array.isArray(response) ? response : [response];
                if (results.length > 0) {
                    // Get the most recent result (assuming results are ordered by date)
                    const latestResult = results[0];
                    setTestScore(latestResult.score);
                }
            }
        } catch (err) {
            setError("Failed to fetch test results");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Container className="mt-5">
                <h4>Please login to view your profile.</h4>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card>
                        <Card.Header as="h4">User Profile</Card.Header>
                        <br />
                        <Card.Body>
                            <Card.Text>
                                <strong>Full Name:</strong> {user.fullName}
                            </Card.Text>
                            <Card.Text>
                                <strong>Date of Birth:</strong> {user.dateOfBirth}
                            </Card.Text>
                            <Card.Text>
                                <strong>Gender:</strong> {user.gender}
                            </Card.Text>
                            <Card.Text>
                                <strong>Address:</strong> {user.address}
                            </Card.Text>
                            <br />
                            <Card.Text>
                                <strong>Survey Total Score:</strong> {testScore}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileUser;