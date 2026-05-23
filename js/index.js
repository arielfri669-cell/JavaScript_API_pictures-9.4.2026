

const presentationDiv = document.getElementById("presentationDiv")
const singlPic = document.getElementById("singlPic")

let Gpichers = []
let Gcurrenpichers


async function getDataFromAPI() {
    presentationDiv.innerHTML = '<p class="loading">Loding pics...</p>'
    singlPic.innerHTML = ""

    try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random/10")
        const data = await res.json()
        Gpichers = data.message.map((url, index) => {
            return {
                id: index + 1,
                image: url,
            }
        })

        Gcurrenpichers = Gpichers

        renderCard(Gcurrenpichers)

    } catch (error) {
        presentationDiv.innerHTML = '<p class="errorMsg">Error loading pictures</p>'
        console.error(error)
    }

}


function renderCard(currentData) { // מייצרת כרטיס אוכל ומציגה אותו בדום
    if (!currentData.length) { // בדיקה האם התקבל מידע והצגת הודעה בהתאם
        presentationDiv.innerHTML = `
        <div class="message">
        <p>No result found</p>
        </div>
    `
        return
    }

 presentationDiv.innerHTML = currentData
        .map((pic) => `
        <div class="picher-card">
            <img src="${pic.image}" alt="dog image" />
            <p>Pic number: ${pic.id}</p>
            <button onclick="showDetails(${pic.id})">Details</button>
            <button onclick="deletPicher(${pic.id})">Del</button>
        </div>
        `)
        .join("")
}

function showDetails(id) {
    const picher = Gpichers.find((pic) => pic.id === id)

    if (!picher) {
        singlPic.innerHTML = `
        <div class="message">
            <p>No picture found</p>
        </div>
        `
        return
    }

    singlPic.innerHTML = `
    <div class="larg-pic">
        <h2>Large Presentation</h2>
        <img src="${picher.image}" alt="large dog image" />
    </div>
    `

    singlPic.scrollIntoView({ behavior: "smooth" })
}

function deletPicher(id) {
    Gpichers = Gpichers.filter((pic) => pic.id !== id)
    Gcurrenpichers = Gpichers
    renderCard(Gcurrenpichers)
    singlPic.innerHTML = ""
}