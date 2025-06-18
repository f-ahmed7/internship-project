// Event listners
document.getElementById("searchButton").addEventListener("click", function() {
    const entryValue = document.getElementById("searchInput").value.toLowerCase();
    if (entryValue) {
        fetchData(entryValue);
    } else {
        console.log("Value is not valid");
    }
});
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {                    
        const entryValue = document.getElementById("searchInput").value.toLowerCase();
        if (entryValue) {
            fetchData(entryValue);
        } else {
            console.log("Value is not valid");
        }
    }
});


// Random search 
    function getRandomEntry() {
    const randomEntryValue = Math.floor(Math.random() * 389) + 1; // Random number between 1 and 389
    fetchData(randomEntryValue);
    }

const resultCard = document.getElementById("resultCard");

// API search function
async function fetchData(entryValue) {
    const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${entryValue}`);
    const responseJson = await response.json();
    
    const item = responseJson.data;
    console.log(item.category);

    // Displaying the result on the website
    if (item.category == "monsters")     {
        resultCard.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}"/>
        <p><strong>Category: </strong> ${item.category}</p>
        <p>${item.description}</p>${item.common_locations}
        <p><strong>Common Locations: </strong> </p>
        <p><strong>Drops: </strong> ${item.drops.join(", ")}</p>
        <p><strong>DLC: </strong> ${item.dlc}</p>
        `;
    }
    else if (item.category == "equipment")  {
        resultCard.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}"/>
        <p><strong>Category: </strong> ${item.category}</p>
        <p>${item.description}</p>
        <p><strong>Common Locations: </strong> ${item.common_locations}</p>
        <h3>Properties:</h3>
        <ul>
            <li><strong>Attack: </strong> ${item.properties.attack}</li>
            <li><strong>Defense: </strong> ${item.properties.defense}</li>
            <li><strong>Effect: </strong> ${item.properties.effect}</li>
            <li><strong>Type: </strong> ${item.properties.type }</li>
        </ul>
        <p><strong>DLC: </strong> ${item.dlc}</p>
        `;
    }
    else if (item.category == "materials") {
        resultCard.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}"/>
        <p><strong>Category:</strong> ${item.category}</p>
        <p>${item.description}</p>
        <p><strong>Common Locations: </strong> ${item.common_locations}</p>
        <p><strong>Hearts Recovered: </strong> ${item.hearts_recovered}</p>
        <p><strong>Cooking Effect: </strong> ${item.cooking_effect}</p>
        <p><strong>Fuse Attack Power: </strong> ${item.fuse_attack_power}</p>
        <p><strong>DLC: </strong> ${item.dlc}</p>
        `
    }
  else if (item.category == "creatures" && item.edible == true) {
       resultCard.innerHTML = `
       <h2>${item.name}</h2>
       <img src="${item.image}" alt="${item.name}"/>
       <p><strong>Category: </strong> ${item.category}</p>
       <p>${item.description}</p>
       <p><strong>Common Locations: </strong> ${item.common_locations}</p>
       <p><strong>Hearts Recovered: </strong> ${item.hearts_recovered}</p>
       <p><strong>Cooking Effect: </strong> ${item.cooking_effect}</p>
       <p><strong>Edible: </strong> ${item.edible}</p>
       <p><strong>DLC: </strong> ${item.dlc}</p>
       `
        }
  else if (item.category == "creatures" && item.edible == false) {
       resultCard.innerHTML = `
       <h2>${item.name}</h2>
       <img src="${item.image}" alt="${item.name}"/>
       <p><strong>Category: </strong> ${item.category}</p>
       <p>${item.description}</p>
       <p><strong>Common Locations: </strong> ${item.common_locations}</p>
       <p><strong>Edible: </strong> ${item.edible}</p>
       <p><strong>DLC: </strong> ${item.dlc}</p>
       `
        }
  else if (item.category == "treasure") {
        resultCard.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}"/>
        <p><strong>Category: </strong> ${item.category}</p>
        <p>${item.description}</p>
        <p><strong>Common Locations: </strong> ${item.common_locations}</p>
        <p><strong>DLC: </strong> ${item.dlc}</p>
        `
    }
    else {
        resultCard.innerHTML = `<h2>No results found for "${entryValue}"</h2>`;
    }

}

// Import datalist entries into index.html
fetch("datalist.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("datalistImport").innerHTML = data;
      });