// Get modal elements
const modal = document.getElementById('itemModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const backBtn = document.querySelector('.back-btn');
const form = document.getElementById('addItemForm');
const quantityInput = document.getElementById('quantity');

let editIndex = null;

// Initialize an array of food objects
let foods = [
    {
        name:"Pizza",
        expiryCounter:7,
        notes: "Has cheese",
        tag:"Food",
        quantity:1,
        imageUrl: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Homemade-Pizza_EXPS_FT23_376_EC_120123_3.jpg"
    },
    {
        name:"Milo",
        expiryCounter:4,
        notes: "",
        tag:"Drink",
        quantity:3,
        imageUrl: "https://www.greedygirlgourmet.com/wp-content/uploads/2023/03/iced-milo-drink-recipe.jpg"
    },
    {
        name:"Milk",
        expiryCounter:7,
        notes: "Has cheese",
        tag:"Drink",
        quantity:1,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glass_of_Milk_%2833657535532%29.jpg/1200px-Glass_of_Milk_%2833657535532%29.jpg"
    },
    {
        name:"Potato Buns",
        expiryCounter:4,
        notes: "",
        tag:"Food",
        quantity:3,
        imageUrl: "https://handletheheat.com/wp-content/uploads/2016/02/Potato-Buns-Square.jpg"
    },
]

function handleDelete(id){
    // Remove the item from the foods array using the provided id
    foods = foods.filter((food, index) => index !== id);

    // Re-display the updated list
    displayCards();
}

function handleEdit(id) {
    const food = foods[id]
    if (!food) return
  
    // Show modal
    document.getElementById('itemModal').style.display = 'block'
  
    // Populate form inputs
    document.getElementById('name').value = food.name
    document.getElementById('quantity').value = food.quantity
    document.getElementById('expiryDate').value = food.expiryDate // assuming expiryDate is in YYYY-MM-DD format
    document.getElementById('category').value = food.tag.toLowerCase()
    document.getElementById('notes').value = food.notes
  
    // Set edit index globally so we know it's not a new item
    editIndex = id;
    console.log('edit Index',editIndex)
  
    // Optional: change button text
    document.querySelector('.submit-btn').textContent = 'Save changes'
  }


function displayCards(){
    // Get the parent container
    const foodList = document.getElementById('food-list')
    // Insert the child element into the food array
    
    // Clear the foodList first before populating new data
    foodList.innerHTML = ``

    // Get the foods data from local storage
    // When getting an object from local storage, we need to convert it from JSON back to regular object with JSON.parse()
    const localStorageFoods = JSON.parse(localStorage.getItem('foods'))
    console.log('localStorageFoods',localStorageFoods)

    localStorageFoods.map((food,index)=>{
        // Create the child HTML element
        const foodCard = `
        <div class="card" id="${index}">
            <img src="${food.imageUrl}" alt="${food.name}" class="food-img" />
            <div class="card-content">
            <h2>${food.name}</h2>
            <p class="expiry">Expires in <span class="highlight">${food.expiryCounter}</span> days</p>
            <p class="note">${food.notes}</p>
            <div class="tags">
                <span class="tag red">🍽️ ${food.tag}</span>
                <span class="tag gray">🛒 ${food.quantity}</span>
            </div>
            <div class="actions">
                <button class="delete-btn" onclick="handleDelete(${index})">🗑️ Delete</button>
                <button class="edit-btn" onclick="handleEdit(${index})">✏️ Edit</button>
            </div>
            </div>
      </div>
        `
        // Add the new element to existing parent
        foodList.innerHTML += foodCard
    })
}

// 🚧 To fix before next class: Ensure data is stored properly with proper initialization

function addFood(food){
    // - Take in the user food object
    // - Insert the object into the array (of food)
    // foods.push(food)
    
    // Improved: Take the "foods" from the local storage instead
    let localStorageFood = null

    // If local storage of "foods" is found, get foods data from local storage
    if(localStorage.getItem('foods').length > 0){
        localStorageFood = JSON.parse(localStorage.getItem('foods'))
    } else{
        // else set it as an empty array
        localStorageFood = []
    }

    localStorageFood.push(food)

    addToLocalStorage()
    // Display all food after new item added
    displayCards()
}


// Open modal function
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

// Close modal function
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Event listeners for opening and closing the modal
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
backBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});


// Form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get form values
    const itemName = document.getElementById('name').value
    const quantity = document.getElementById('quantity').value
    const expiryDate = document.getElementById('expiryDate').value
    const category = document.getElementById('category').value
    const notes = document.getElementById('notes').value
    
    // Here you would typically send this data to a server or store it locally
    console.log('Added item:',itemName, quantity, expiryDate, category, notes)

    // Close the modal after submission
    closeModal()

    // Optional: Reset form
    form.reset()

    // Calculate expiry date
    const differenceInMilliseconds = new Date (expiryDate) - new Date()
    const differenceInDays = differenceInMilliseconds/(1000 * 60 * 60 * 24)
    const daysLeft = Math.ceil(differenceInDays)

    // Create an object
    const food = {
        name: itemName,
        quantity:quantity,
        expiryCounter: daysLeft,
        tag:category,
        notes:notes,
        imageUrl: modalImageUrl
    }

    // If-else
    // If editIndex !== null
    // Update the food array (based on the id)

    if (editIndex !== null){
        foods[editIndex] = food
        console.log('current food',foods[editIndex])
        // reset editIndex to null since we're done editing
        editIndex = null
        displayCards()
    } else{
        // Pass the object into the addFood function
        addFood(food)
    }
});

let modalImageUrl = ""

function getImageUrl(){
    modalImageUrl = prompt('Please enter your image URL')
}

// When website finish loading, display cards
window.addEventListener('load',()=>{
    displayCards()
})

function addToLocalStorage(){
    // We use JSON.stringify() when storing objects into local storage
    localStorage.setItem('foods',JSON.stringify(foods))
}

// function removeFromLocalStorage(){
//     localStorage.removeItem('food')
// }

// function getFromLocalStorage(){
//     const food = localStorage.getItem('food')
//     console.log('the food is',food)
// }

// Add 7 days
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);
console.log(futureDate)
// Get the timestamp
const futureTimestamp = futureDate.getTime();
console.log(futureTimestamp)

// 🚧 To fix before next class: Ensure data is stored properly with proper initialization