// get object from json format
let foodAll = async _ => {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`);
    return await response.json();
}

// get details from specific food
let viewFood = (values) => {
    let foodViewTitle = document.getElementById("food-view-title");
    let foodViewThumbnail = document.getElementById("food-view-thumbnail");
    let foodViewCategory = document.getElementById("food-view-category");
    let foodViewArea = document.getElementById("food-view-area");
    let foodViewInstruction = document.getElementById("food-view-instruction");
    let foodViewYoutube = document.getElementById("food-view-youtube");

    foodViewTitle.innerText = values[0];
    foodViewThumbnail.src = values[1];
    foodViewCategory.innerHTML = `<span class="fw-medium">Category: </span> ${values[2]}`;
    foodViewArea.innerHTML = `<span class="fw-medium">Area: </span> ${values[3]}`;
    foodViewInstruction.innerHTML = `<span class="fw-medium">Instruction: </span> ${values[4]}`;
    foodViewYoutube.innerHTML = `<span class="fw-medium">Youtube: </span> ${values[5]}`;
}

// display food in food container
let displayFoodItem = async callback => {
    let itemArea = document.querySelector(".item-area");
    let food;
    let foodCount = 0;

    await callback().then(response => food = response);
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

// initial load
onload = _ => {
    displayFoodItem(foodAll);
}