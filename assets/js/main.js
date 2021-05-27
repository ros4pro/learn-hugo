import * as params from '@params';

document
    .getElementById("quiz")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        
        const doc = window.jspdf.jsPDF();
        doc.text("Hello World !", 10, 10);
        doc.save("certificat.pdf");       

        return false;
});