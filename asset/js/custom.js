let searchKW = document.querySelector("#search").value;
let itemArea = document.querySelector(".item-area");
let foodStart = 0, foodEnd = 5;

// get object from json format
let foodAll = async searchKW => {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKW}`);
    return await response.json();
}

// check food exist or not
let isExist = searchKW => {
    if(searchKW == null) {
        if (!document.querySelector("#food .non-exist")) {
            let alert = document.createElement("div");

            alert.classList.add("non-exist", "alert", "alert-warning", "mx-auto");
            alert.setAttribute("role", "alert");
            alert.style.maxWidth = "30rem";
            alert.innerText = "No foods were found to match your search.";

            document.querySelector(".food").insertBefore(alert, itemArea);
        }

        document.querySelector("#btn-show-more").classList.add("d-none");

        return false;
    } else {
        if (document.querySelector("#food .non-exist")) document.querySelector("#food .non-exist").parentNode.removeChild(document.querySelector("#food .non-exist"));

        return true;
    }
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

    await callback(searchKW).then(response => food = response);
    let foods = food.meals;
    let exist = isExist(foods);

    if (exist === false) return false;

    if (foodStart > foods.length) foodStart -= foodStart - (foods.length - 1);
    if (foodEnd > foods.length) {
        foodEnd = foods.length - 1;
        document.querySelector("#btn-show-more").classList.add("d-none");
    } else document.querySelector("#btn-show-more").classList.remove("d-none");

    for (let num = foodStart; num <= foodEnd; num++) {
        let foodValues = [foods[num].strMeal, foods[num].strMealThumb, foods[num].strCategory, foods[num].strArea, foods[num].strInstructions, foods[num].strYoutube];
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
    }
}

// get value depends on search
document.querySelector("#btn-search").addEventListener("click", _ => {
    foodStart = 0; foodEnd = 5;
    itemArea.textContent = "";
    searchKW = document.querySelector("#search").value;
    displayFoodItem(searchKW, foodAll);
});

// display more food
document.querySelector("#btn-show-more").addEventListener("click", _ => {
    foodStart += 6; foodEnd += 6;
    displayFoodItem(searchKW, foodAll);
});

// initial load
onload = _ => {
    displayFoodItem(searchKW, foodAll);
}