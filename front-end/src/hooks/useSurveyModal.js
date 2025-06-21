import { useState } from "react";

export default function useSurveyModal(initial = true) {
    const [showModal, setShowModal] = useState(initial);

    const handleYes = () => {
        setShowModal(false);
        window.location.href = "/survey";
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return { showModal, handleYes, handleCancel };
}