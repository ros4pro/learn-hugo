import * as params from '@params';

const form = document.getElementById("quiz");
const data = new FormData(form);

const doc = window.jspdf.jsPDF('landscape');

function compute_score() {

    const questions = params.questions;
    let score = 0;

    for (const q of questions) {
        switch (q.type) {
            case 'choice':
                if (data.get(q.id) == q.answers[q.answer_index][0]) {
                    score++;
                }

                break
            case 'multichoice':
                const user_answers = data.getAll(q.id);

                let answers = []
                q.answer_index.forEach(index => {
                    answers.push(q.answers[index])
                })

                if (
                    answers.length == user_answers.length &&
                    answers.filter(a => !user_answers.includes(a)).length == 0
                ) {
                    score++;
                }
                break
        }
    }

    return score
}

function generate_pdf(user_score) {
    // doc.addImage("/images/logo.png", 'JPEG', 15, 10, 16, 16)

    // doc.setFontSize(24)
    // doc.text(
    //     `Certificat de suivi de l\'activité "${params.name}"`,
    //     50,
    //     15);

    // doc.setFontSize(16)
    // let text = "Nous certifions que le détenteur de certificat a suivi l'activité sus-nommé, et qu'il a obtenu le score suivant :";

    // let lines = doc.splitTextToSize(text, 150);
    // doc.text(50, 35, lines);

    // doc.rect(5, 5, 220, 200, 'S');
    // doc.rect(235, 5, 50, 200, 'S');

    // doc.setFontSize(50)

    // doc.text(
    //     '10/15',
    //     175,
    //     55);

    // doc.addPage("a4", "p")

    const questions = params.questions;

    const question_per_page = 3

    for (let i = 0; i < questions.length; i++) {

        if (i % question_per_page == 0) {
            doc.addPage("a4", "p");
        }

        const x = 20 + (i % question_per_page) * 100

        doc.setFontSize(16)
        console.log(questions[i].text + " x");
        doc.text(questions[i].text, 10, x);

        for (let j = 0; j < questions[i].answers.length; j++) {

            const user_answers = data.getAll(questions[i].id)

            if (user_answers.includes(questions[i].answers[j])) {
                if (questions[i].answer_index.includes(j)) {
                    // Réponse correcte et répondue
                    doc.setFillColor("#46db18")
                } else {
                    // Réponse incorrecte et répondue
                    doc.setFillColor("#0275e0")
                }
            } else {
                if (questions[i].answer_index.includes(j)) {
                    // Réponse correcte et non répondue
                    doc.setFillColor("#d91818")
                } else {
                    // Réponse incorrecte et non répondue
                    doc.setFillColor("#8c7b79")
                }
            }

            const x2 = x + (20 * (j + 1))
            doc.roundedRect(10, x2 - 10, 150, 16, 5, 5, 'DF')

            console.log(questions[i].answers[j]);
            doc.text(questions[i].answers[j], 20, x2)
        }
    }


    for (const q of questions) {



    }



}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    generate_pdf(compute_score());

    doc.save("certificat.pdf");
    return false;
});
