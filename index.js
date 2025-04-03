document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");

    let currentCharacter = null;

    // Fetch characters from server
    fetch("http://localhost:3000/characters")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(characters => {
            // Clear any existing content
            characterBar.innerHTML = '';
            
            // Create and append span for each character
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer"; // Show it's clickable
                
                // Add click event to display character details
                span.addEventListener("click", () => {
                    displayCharacter(character);
                });
                
                characterBar.appendChild(span);
            });

            // Display first character by default if available
            if (characters.length > 0) {
                displayCharacter(characters[0]);
            }
        })
        .catch(error => {
            console.error("Error fetching characters:", error);
            characterBar.textContent = "Error loading characters";
        });

    // Function to display character details
    function displayCharacter(character) {
        currentCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        imageElement.alt = character.name;
        voteCountElement.textContent = character.votes;
    }

    // Handle vote submission
    votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!currentCharacter) return;

        const votesInput = document.getElementById("votes");
        const votesToAdd = parseInt(votesInput.value) || 0;
        
        currentCharacter.votes += votesToAdd;
        voteCountElement.textContent = currentCharacter.votes;
        votesInput.value = "";
    });

    // Handle vote reset
    resetButton.addEventListener("click", () => {
        if (!currentCharacter) return;
        currentCharacter.votes = 0;
        voteCountElement.textContent = 0;
    });
});
