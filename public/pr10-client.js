const socket = io('/')

// Repopulate the list when the server broadcasts an event
socket.on('update-list', () => {
    populateList()
})

const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/p10/fetchAll')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            while (nameList.firstChild) nameList.firstChild.remove()

            // Repopulate the list
            for (const avenger of data.avengers) {
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(avenger.name))
                
                li.appendChild(document.createTextNode(avenger.power))
                nameList.appendChild(li)
            }
        })
        .catch(err => {
            console.error(err)
        })
}

const submitName = () => {

    console.log('submitName')

    const newName = document.getElementById('newName').value // Grab the value of our new name
    const newPower = " Power " + document.getElementById('newPower').value // Grab the value of our new name


    console.log(newName)
    console.log(newPower)
    
    fetch('/p10/insertName', {
        method: 'POST', // Send a POST request
        headers: {
            // Set the Content-Type, since our server expects JSON
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName,newPower})
    })
        .then(res => {
            // Clear the input
            document.getElementById('newName').value = ''
            document.getElementById('newPower').value = ''

            populateList()

            socket.emit('new-name')
            socket.emit('new-power')

        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = ''
            document.getElementById('newPower').value = ''
            console.error(err)
        })
}

// Initialize the list
populateList()
