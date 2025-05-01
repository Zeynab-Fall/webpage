document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const item = data.find(item => item.image === itemId);
            if (item) {
                // Update visible page content
                document.getElementById("item-title").innerText = item.title;
                document.getElementById("item-image").src = `images/${item.image}`;
                document.getElementById("item-description").innerText = item.keywords;
                document.getElementById("item-location").innerText = item.location;
                document.getElementById("item-photographer").innerText = item.photographer;
                document.getElementById("item-subject").innerText = item.subject;
                document.getElementById("item-cultural_significance").innerText = item.cultural_significance;


                // Create JSON-LD metadata
                const jsonLd = {
                    "@context": "https://schema.org/",
                    "@type": "ImageObject",
                    "name": item.title,
                    "contentUrl": `images/${item.image}`,
                    "author": {
                      "@type": "Person",
                      "name": item.photographer
                    },
                    "datePublished": item.date,
                    "keywords": item.keywords,
                    "description": item.subject
                };

                // Insert JSON-LD into the <head> of the document
                const script = document.createElement("script");
                script.type = "application/ld+json";
                script.textContent = JSON.stringify(jsonLd);
                document.head.appendChild(script);
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});
