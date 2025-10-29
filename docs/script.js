// Aspetta che tutta la pagina sia caricata
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Riferimenti agli elementi ---
    const terminalContent = document.getElementById('terminal-content');
    const promptElement = document.getElementById('prompt');
    const jumpscareElement = document.getElementById('jumpscare');
    const inviteElement = document.getElementById('invite');
    const soundElement = document.getElementById('scare-sound');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const inviteSoundElement = document.getElementById('invite-sound');

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

        // Aggiungiamo TUTTI gli ascoltatori.
        // { once: true } assicura che vengano eseguiti solo una volta

        // 1. Ascolta il bottone SÌ
        btnYes.addEventListener('click', handleYes, { once: true });

        // 2. Ascolta il bottone NO
        btnNo.addEventListener('click', handleNo, { once: true });

        // 3. Ascolta la TASTIERA (per desktop)
        window.addEventListener('keydown', handleKeyPress, { once: true });
    }

// --- 5. Gestisce la pressione del tasto ---
    function handleKeyPress(event) {
        // Rimuovi gli ascoltatori dei bottoni, tanto abbiamo già una risposta
        btnYes.removeEventListener('click', handleYes);
        btnNo.removeEventListener('click', handleNo);

        if (event.key.toLowerCase() === 's') {
            handleYes(); // Chiama la stessa funzione del bottone
        } else {
            handleNo(); // Tratta qualsiasi altro tasto (come 'N') come un "NO"
        }
    }

// --- 6. NUOVE Funzioni per gestire SÌ o NO ---

    function handleYes() {
        // ... (le tue righe per rimuovere i listener) ...

        // 1. Avvia il suono dello jumpscare (come prima)
        soundElement.play().catch(e => console.error("Errore riproduzione audio:", e));

        // --- NUOVA LOGICA "PRE-CARICAMENTO" ---
        // 2. Autorizziamo l'audio dell'invito...
        inviteSoundElement.volume = 0; // Muto
        inviteSoundElement.play().catch(e => console.error("Errore pre-avvio musica:", e));

        // ... ma lo fermiamo e riavvolgiamo subito.
        setTimeout(() => {
            inviteSoundElement.pause();
            inviteSoundElement.currentTime = 1;
            inviteSoundElement.volume = 1; // Imposta il volume per dopo (es. 50%)
        }, ); // Piccolo delay per assicurarsi che il .play() sia partito
        // --- FINE NUOVA LOGICA ---

        // Scatena l'evento visuale (come prima)
        triggerJumpscare();
    }

    function handleNo() {
        // Rimuovi gli altri ascoltatori per sicurezza
        window.removeEventListener('keydown', handleKeyPress);
        btnYes.removeEventListener('click', handleYes);

        // Nascondi e rimostra il prompt per dare un'altra chance
        promptElement.classList.add('hidden');
        setTimeout(() => {
            showPrompt(); // Mostra di nuovo il prompt
        }, 300); // Piccolo ritardo
    }

// --- 7. Scatena il Jumpscare! ---
// (Questa funzione e showInvite() restano INVARIATE)
    function triggerJumpscare() {
        // Nasconde il terminale
        document.getElementById('terminal').classList.add('hidden');

        // Mostra l'immagine spaventosa
        jumpscareElement.classList.remove('hidden');

        // --- CANCELLA QUESTA RIGA ---
        // soundElement.play().catch(e => console.error("Errore riproduzione audio:", e));
        // --- (L'abbiamo già avviato in handleYes) ---

        // Dopo 3 secondi (3000ms) di terrore, mostra l'invito
        setTimeout(showInvite, 5000);
    }

// --- 8. Mostra l'invito finale ---
// (Questa funzione resta INVARIATA)
    function showInvite() {
        // Nasconde lo jumpscare
        jumpscareElement.classList.add('hidden');
        // Mostra l'invito
        inviteElement.classList.remove('hidden');

        // 1. Ferma o abbassa di colpo il suono dello jumpscare
        soundElement.pause();
        soundElement.currentTime = 0;

        // 2. Avvia l'audio corto dell'invito
        inviteSoundElement.play().catch(e => console.error("Errore riproduzione audio invito:", e));
    }


    // --- 6. Scatena il Jumpscare! ---
    function triggerJumpscare() {
        // Nasconde il terminale
        document.getElementById('terminal').classList.add('hidden');

        // SUONA L'AUDIO!
        soundElement.play().catch(e => console.error("Errore riproduzione audio:", e));

        // Mostra l'immagine spaventosa
        jumpscareElement.classList.remove('hidden');



        // Dopo 3 secondi (3000ms) di terrore, mostra l'invito
        setTimeout(showInvite, 4000);
    }

    // --- 7. Mostra l'invito finale ---
    function showInvite() {
        // Nasconde lo jumpscare
        jumpscareElement.classList.add('hidden');
        // Mostra l'invito
        inviteElement.classList.remove('hidden');

        // 1. Ferma o abbassa di colpo il suono dello jumpscare
        soundElement.pause();
        soundElement.currentTime = 0;

        // 2. Avvia l'audio corto dell'invito
        inviteSoundElement.play().catch(e => console.error("Errore riproduzione audio invito:", e));
    }

    // --- Avvia tutto ---
    typeLine();

});
