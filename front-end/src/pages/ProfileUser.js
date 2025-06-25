import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const ProfileUser = () => {
    const [user, setUser] = useState(null);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        const score = localStorage.getItem("surveyTotalScore");
        if (score !== null) {
            setTotalScore(score);
        }
    }, []);

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
                                <strong>Username:</strong> {user.accountName || user.accountname}
                            </Card.Text>
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
                            {totalScore !== null && (
                                <Card.Text>
                                    <strong>Survey Total Score:</strong> {totalScore}
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileUser;