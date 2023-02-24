// get object from json format
let foodAll = async _ => {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`);
    return await response.json();
}

// display food in food container
let displayFoodItem = async callback => {
    let itemArea = document.querySelector(".item-area");
    let food;
    let foodCount = 0;

    await callback().then(response => food = response);
    let foods = food.meals;

    for (let food of foods) {
        let card = document.createElement("div");

        card.className = "card";
        card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${food.strMealThumb}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${food.strMeal}</h5>
                    <p class="card-text text-truncate overflow-x-hidden">${food.strInstructions}</p>
                    <button class="btn btn-sm btn-warning px-3">View</button>
                </div>
            </div>
        </div>
        `;

        itemArea.appendChild(card);

        foodCount++;

        if (foodCount === 6) break;
    }
}

// initial load
onload = _ => {
    displayFoodItem(foodAll);
}