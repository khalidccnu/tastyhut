let searchKW = document.querySelector("#search").value;
let itemArea = document.querySelector(".item-area");

// get object from json format
let foodAll = async searchKW => {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKW}`);
    return await response.json();
}

// get details from specific food
let viewFood = values => {
    document.getElementById("food-view-title").innerText = values[0];
    document.getElementById("food-view-thumbnail").src = values[1];
    document.getElementById("food-view-category").innerHTML = `<span class="fw-medium">Category: </span> ${values[2]}`;
    document.getElementById("food-view-area").innerHTML = `<span class="fw-medium">Area: </span> ${values[3]}`;
    document.getElementById("food-view-instruction").innerHTML = `<span class="fw-medium">Instruction: </span> ${values[4]}`;
    document.getElementById("food-view-youtube").innerHTML = `<span class="fw-medium">Youtube: </span> ${values[5]}`;
}

// display food in food container
let displayFoodItem = async (searchKW, callback) => {
    let food;
    let foodCount = 0;

    await callback(searchKW).then(response => food = response);
    let foods = food.meals;

    for (let food of foods) {
        let foodValues = [food.strMeal, food.strMealThumb, food.strCategory, food.strArea, food.strInstructions, food.strYoutube];
        let card = document.createElement("div");

        card.className = "card";
        card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${foodValues[1]}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${foodValues[0]}</h5>
                    <p class="card-text text-truncate overflow-x-hidden">${foodValues[4]}</p>
                    <button type="button" class="btn btn-sm btn-warning px-3" data-bs-toggle="modal" data-bs-target="#food-view">View</button>
                </div>
            </div>
        </div>
        `;

        card.querySelector("button").onclick = _ => {
            viewFood(foodValues);
        };

        itemArea.appendChild(card);

        foodCount++;

        if (foodCount === 6) break;
    }
}

// get value depends on search
document.querySelector("#btn-search").addEventListener("click", _ => {
    itemArea.textContent = "";
    searchKW = document.querySelector("#search").value;
    displayFoodItem(searchKW, foodAll);
});

// initial load
onload = _ => {
    displayFoodItem(searchKW, foodAll);
}