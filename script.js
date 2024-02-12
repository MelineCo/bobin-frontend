// Afficher une citation aléatoire
document.querySelector("#btn-shuffle").addEventListener('click', function () {
    const alea = Math.ceil(Math.random() * 26)
    console.log(alea)

    fetch(`http://localhost:3000/quotes/${alea}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
        .then(data => {
            document.querySelector("#quote").textContent = data.quote.quote;
            document.querySelector("#author").textContent = `- ${data.quote.author}`;
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

