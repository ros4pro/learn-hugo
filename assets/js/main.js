import * as params from '@params';

document
    .getElementById("quiz")
    .addEventListener("submit", (event) => {
        event.preventDefault();

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