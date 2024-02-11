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

document.querySelector("#btn-add").addEventListener('click', function () {
    document.querySelector("#add-form").innerHTML = `
    <form action="" method="get" class="form">
        <div class="form-example">
            <label class='label' for="quote">CITATION :</label><br/>
            <textarea id="quote" name="quote" rows="4" col="150">
            </textarea>
        </div>
        <div class="form-example">
            <label class='label' for="author">AUTEUR(E) :</label><br/>
            <input type="text" id="author" name="author" />
        </div>
        <div class="submit-btns">
            <input id="submit-quote" class="submit-btn submit" type="submit" value="SOUMETTRE LA CITATION" />
            <input id="cancel-quote" class="submit-btn cancel" type="submit" value="ANNULER" />
        </div>
    </form>
    `

    addNewQuote()
})


function addNewQuote() {
    document.querySelector('#submit-quote').addEventListener('click', function () {
        const submittedQuote = {
            quote: "testFetch",
            author: "tesFetchAuthor"
        }

        fetch(`http://localhost:3000/quotes/new`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    quote: "testFetch",
                    author: "tesFetchAuthor"
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    console.log("quote submitted!")
                    this.parentNode.parentNode.remove();
                }
            });
    });
}

