// API Accsess key
import { aKey } from "./config.js";


const formSubmit = document.querySelector("form");
const getElementInput = document.getElementById("input-search");
const searchResult = document.querySelector(".main");
const showMoreBtn = document.getElementById("show_more");

let inputData = "";
let page = 1;

// Function to search images
async function searchImages() {
    inputData = getElementInput.value.trim(); 

    if (!inputData) {
        alert("Please enter a search term!");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${aKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

    
        const results = data.results;

       
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        
        results.forEach((result) => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("images");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.description;

            
            imageContainer.appendChild(image);
            imageContainer.appendChild(imageLink);
            searchResult.appendChild(imageContainer);
        });

       
        if (results.length > 0) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
            if (page === 1) {
                alert("No results found. Please try another search term.");
            }
        }

       
        page++;
    } catch (error) {
        console.error("Error fetching images:", error);
        alert("An error occurred while fetching images. Please try again later.");
    }
}

// Event listener for form submission
formSubmit.addEventListener("submit", (event) => {
    event.preventDefault(); 
    page = 1; 
    searchImages();
});

// Event to handle "Show More" button
showMoreBtn.addEventListener("click", () => {
    searchImages();
});
