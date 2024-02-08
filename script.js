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
            <input type="text" id="quote" name="quote" required/>
        </div>
        <div class="form-example">
            <label class='label' for="author">AUTEUR(E) :</label><br/>
            <input type="text" id="author" name="author" required/>
        </div>
        <div >
            <input class="submit-btn" type="submit" value="SOUMETTRE LA CITATION" />
        </div>
    </form>
    `
})


