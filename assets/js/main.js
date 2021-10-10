import * as params from '@params';

const form = document.getElementById("quiz");

function compute_score() {

    const questions = params.questions;
    let score = 0;

    const data = new FormData(form);

    for (const q of questions) {
        switch (q.type) {
            case 'choice':
                if (data.get(q.id) == q.answers[q.answer_index]) {
                    score++;
                }

                break
            case 'multichoice':
                const user_answers = data.getAll(q.id);
                console.log(user_answers)

                let answers = []
                q.answer_index.forEach(index => {
                    answers.push(q.answers[index])
                })
                console.log(answers)

                if (
                    answers.length == user_answers.length &&
                    answers.filter(arr1Item => !user_answers.includes(arr1Item)).length == 0
                ) {
                    score++;
                }
                break
        }
    }

    return score
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // process questions and get results
    console.log("score " + compute_score());

    return 0

    // process the first page

    // process all pages questions

    const doc = window.jspdf.jsPDF('landscape');
    doc.addImage("/images/logo.png", 'JPEG', 15, 10, 16, 16)
    doc.setFontSize(24)
    doc.text(
        `Certificat de suivi de l\'activité "${params.name}"`,
        50,
        15);

    doc.setFontSize(16)
    let text = "Nous certifions que le détenteur de certificat a suivi l'activité sus-nommé, et qu'il a obtenu le score suivant :";

    let lines = doc.splitTextToSize(text, 150);
    doc.text(50, 35, lines);

    doc.rect(5, 5, 220, 200, 'S');
    doc.rect(235, 5, 50, 200, 'S');

    doc.setFontSize(50)

    doc.text(
        '10/15',
        175,
        55);

    doc.save("certificat.pdf");
    return false;
});
