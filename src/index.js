document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(data => createDogArr(data))
    
})

let dogs = []

function createDogArr(data) {
    data.forEach(function(dog) {
        dogs.push(dog)
        populateDog(dog)
    })
}

function populateDog(dog) {
    //dog attributes
    let dogId = dog['id']
    let dogName = dog['name']
    let dogBreed = dog['breed']
    let dogSex = dog['sex']
    
    let tr = document.createElement('tr')
    tr.id = dogId
    let dogTable = document.querySelector('#table-body')

    let td1 = document.createElement('td')
    td1.innerText = dogName
    tr.appendChild(td1)
    let td2 = document.createElement('td')
    td2.innerText = dogBreed
    tr.appendChild(td2)
    let td3 = document.createElement('td')
    td3.innerText = dogSex
    tr.appendChild(td3)
    let td4 = document.createElement('td')
    td4.innerHTML = '<button>Edit Dog</button>'
    td4.addEventListener('click', makeADogEdit)
    tr.appendChild(td4)

    dogTable.appendChild(tr)
}

function makeADogEdit(e) {
    let dogId = e.target.parentNode.parentNode.id
    let dogName = dogs[dogId-1]['name']
    let dogBreed = dogs[dogId-1]['breed']
    let dogSex = dogs[dogId-1]['sex']

    let dogForm = document.querySelector('#dog-form')
    dogForm[0].value = dogName
    dogForm[1].value = dogBreed
    dogForm[2].value = dogSex

    dogForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newDogName = e.target[0].value
        let newDogBreed = e.target[1].value
        let newDogSex = e.target[2].value
        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: newDogName,
                breed: newDogBreed,
                sex: newDogSex
            })
        })
        // location.reload()
        removeAllDogs()
        fetch('http://localhost:3000/dogs')
            .then(resp => resp.json())
            .then(data => createDogArr(data))
    })
    
}

function removeAllDogs() {
    let dogTable = document.querySelector('#table-body')
    dogTable.innerText = ''
}