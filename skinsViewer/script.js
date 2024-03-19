document.addEventListener("DOMContentLoaded", function () {
    const imageList = {PASTE HERE THE CONTENT OF OUTPUT2.JSON};

    displayImages(Object.values(imageList));
});

async function displayImages(imageList) {
    const imageContainer = document.getElementById('imageContainer');
    let i = 0;

    for (const imagePath of imageList) {
        await new Promise(resolve => {
            const img = new Image();
            img.style.width = "100px";
            img.style.height = "100px";
            img.onload = () => {
                i++;
                resolve();
            };
            img.onerror = () => {
                console.error(`Erreur de chargement de l'image: ${imagePath}`);
                resolve();
            };
            img.src = imagePath;
            imageContainer.appendChild(img);
        });

        await new Promise(resolve => setTimeout(resolve, 10));
    }

    document.title = i.toString();
}

