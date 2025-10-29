// Aspetta che tutta la pagina sia caricata
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Riferimenti agli elementi ---
    const terminalContent = document.getElementById('terminal-content');
    const promptElement = document.getElementById('prompt');
    const jumpscareElement = document.getElementById('jumpscare');
    const inviteElement = document.getElementById('invite');
    const soundElement = document.getElementById('scare-sound2');

    // --- 2. Testo del terminale ---
    const lines = [
        "Inizializzazione protocollo H.A.L.L.O.W.E.E.N...",
        "Caricamento 'pumpkin_patch.exe'... OK",
        "Scansione presenze anomale...",
        "...",
        "...",
        "Rilevata 1 entità non umana.",
        "ATTENZIONE: File 'anima.dll' corrotto!",
        "Stanno... guardando...",
        "N O N T I G I R A R E",
        "..."
    ];

    let lineIndex = 0;
    const typingSpeed = 1500; // Millisecondi tra una riga e l'altra (1.5 sec)

    // --- 3. Funzione per "scrivere" il testo ---
    function typeLine() {
        if (lineIndex < lines.length) {
            const p = document.createElement('p');
            p.textContent = lines[lineIndex];
            terminalContent.appendChild(p);
            lineIndex++;

            // Scrolla la pagina in fondo (utile se il testo è lungo)
            window.scrollTo(0, document.body.scrollHeight);

            // Chiama se stessa per la prossima riga
            setTimeout(typeLine, Math.random() * 1000 + 500); // Delay variabile
        } else {
            // Finito di scrivere! Mostra il prompt (S/N)
            showPrompt();
        }
    }

    // --- 4. Mostra il prompt e attiva l'ascolto ---
    function showPrompt() {
        promptElement.classList.remove('hidden');
        // Aggiunge un ascoltatore per UN SOLO tasto premuto
        window.addEventListener('keydown', handleKeyPress, { once: true });
    }

    // --- 5. Gestisce la pressione del tasto ---
    function handleKeyPress(event) {
        // Controlla se il tasto premuto è 's' (minuscolo o maiuscolo)
        if (event.key.toLowerCase() === 's') {
            triggerJumpscare();
        } else {
            // Se preme 'N' o qualsiasi altra cosa, rimettiamo l'ascoltatore
            // per la prossima pressione
            window.addEventListener('keydown', handleKeyPress, { once: true });
        }
    }

    // --- 6. Scatena il Jumpscare! ---
    function triggerJumpscare() {
        // Nasconde il terminale
        document.getElementById('terminal').classList.add('hidden');

        // Mostra l'immagine spaventosa
        jumpscareElement.classList.remove('hidden');

        // SUONA L'AUDIO!
        soundElement.play().catch(e => console.error("Errore riproduzione audio:", e));

        // Dopo 3 secondi (3000ms) di terrore, mostra l'invito
        setTimeout(showInvite, 3000);
    }

    // --- 7. Mostra l'invito finale ---
    function showInvite() {
        // Nasconde lo jumpscare
        jumpscareElement.classList.add('hidden');
        // Mostra l'invito
        inviteElement.classList.remove('hidden');
    }

    // --- Avvia tutto ---
    typeLine();

});
