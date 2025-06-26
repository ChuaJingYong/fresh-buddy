function addToStorage(){
    // set the key, value
    localStorage.setItem('fruit','orange')
}

function getFromStorage(){
    const item = localStorage.getItem('fruit')
    document.getElementById('items').textContent = item
}

function deleteFromStorage(){
    localStorage.removeItem('fruit')
}

function editFromStorage(){
    // Get the data from local storage
    let item = localStorage.getItem('fruit')
    // Modify the data
    item = 'apple'
    // Store back into local storage
    localStorage.setItem("fruit",item)
}



