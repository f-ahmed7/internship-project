const searchInput = document.getElementById("searchInput");
const resultCard = document.getElementById("resultCard");

// API search function
async function fetchData() {
    entryValue = searchInput.value.toLowerCase();
  
    response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${entryValue}`);
    responseJson = await response.json();
    
    const item = responseJson.data;

    // Displaying the result on the website
    if (item.category == "monsters")     {
        resultCard.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}"/>
        <p><strong>Category: </strong> ${item.category}</p>
        <p>${item.description}</p>
        <p><strong>Common Locations: </strong> ${item.common_locations.join(", ")}</p>
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
        <p><strong>Common Locations: </strong> ${item.common_locations.join(", ")}</p>
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
        <p><strong>Common Locations: </strong> ${item.common_locations.join(", ")}</p>
        <p><strong>Hearts Recovered: </strong> ${item.hearts_recovered}</p>
        <p><strong>Cooking Effect: </strong> ${item.cooking_effect}</p>
        <p><strong>Fuse Attack Power: </strong> ${item.fuse_attack_power}</p>
        <p><strong>DLC: </strong> ${item.dlc}</p>
        `
    }
  else if (item.category == "creatures" && item.edibile == true) {
       resultCard.innerHTML = `
       <h2>${item.name}</h2>
       <img src="${item.image}" alt="${item.name}"/>
       <p><strong>Category: </strong> ${item.category}</p>
       <p>${item.description}</p>
       <p><strong>Common Locations: </strong> ${item.common_locations.join(", ")}</p>
       <p><strong>Hearts Recovered: </strong> ${item.hearts_recovered}</p>
       <p><strong>Cooking Effect: </strong> ${item.cooking_effect}</p>
       <p><strong>Edible: </strong> ${item.edibile}</p>
       <p><strong>DLC: </strong> ${item.dlc}</p>
       `
        }
  else if (item.category == "creatures" && item.edibile == false) {
       resultCard.innerHTML = `
       <h2>${item.name}</h2>
       <img src="${item.image}" alt="${item.name}"/>
       <p><strong>Category: </strong> ${item.category}</p>
       <p>${item.description}</p>
       <p><strong>Common Locations: </strong> ${item.common_locations.join(", ")}</p>
       <p><strong>Edible: </strong> ${item.edibile}</p>
       <p><strong>DLC: </strong> ${item.dlc}</p>
       `
        }
  else if (item.category == "treasure") {
        resultCard.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}"/>
        <p><strong>Category: </strong> ${item.category}</p>
        <p>${item.description}</p>
        <p><strong>Common Locations: </strong> ${item.common_locations.join(", ")}</p>
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