// Afficher une citation aléatoire
const randomHistory = []
document.querySelector("#btn-shuffle").addEventListener('click', function () {
    // Calcul du nombre aléatoire
    fetch(`http://localhost:3000/quotes/size`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
        .then(data => {
            const collectionSize = data.size;
            let alea = Math.ceil(Math.random() * collectionSize)
            if (randomHistory.length >= 2) {
                // si le nombre aléatoire est égal à l'un des trois derniers tirages, on "relance" l'aléatoire
                if (randomHistory[randomHistory.length - 1] === alea || randomHistory[randomHistory.length - 2] === alea || randomHistory[randomHistory.length - 3] === alea) {
                    alea = Math.ceil(Math.random() * collectionSize)
                }
            }
            randomHistory.push(alea)

            // Récupération de la citation correspondant au nombre aléatoire
            fetch(`http://localhost:3000/quotes/${alea}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json())
                .then(data => {
                    document.querySelector("#quote").textContent = data.quote.quote;
                    document.querySelector("#author").textContent = `- ${data.quote.author}`;
                })
        })
})


// Afficher les champs à renseigner au click sur le bouton "Ajouter"
document.querySelector("#btn-add").addEventListener('click', function () {
    document.querySelector("#add-form").style.display = "block";
})

// Ajout d'une citation à la BDD
document.querySelector('#submit-quote').addEventListener('click', function () {
    const submittedQuote = {
        quote: document.querySelector('#citation').value,
        author: document.querySelector('#auteur').value,
    }

    fetch(`http://localhost:3000/quotes/new`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedQuote)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log("quote submitted!")
                // J'efface les champs
                document.querySelector('#citation').value = "";
                document.querySelector('#auteur').value = "";
            }
        });

    document.querySelector("#add-form").style.display = "none"
});


// Annuler l'ajout de citation
document.querySelector('#cancel-quote').addEventListener('click', function () {
    document.querySelector('#citation').value = "";
    document.querySelector('#auteur').value = "";
    document.querySelector("#add-form").style.display = "none"
});
