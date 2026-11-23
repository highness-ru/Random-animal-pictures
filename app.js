const form = document.querySelector("#picker");
const animalSelect = document.querySelector("#animal");
const confirmButton = document.querySelector("#confirm");
const status = document.querySelector("#status");
const photo = document.querySelector("#photo");

const labels = {
    cat: "cat",
    dog: "dog",
    fox: "fox",
    duck: "duck",
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const animal = animalSelect.value;
    if (!animal) {
        status.textContent = "Choose an animal first.";
        return;
    }
    loadAnimal(animal);
});

async function loadAnimal(animal) {
    confirmButton.disabled = true;
    status.textContent = `Loading a ${labels[animal]}...`;

    try {
        const url = await pictureUrl(animal);
        await waitForImage(url);
        photo.src = url;
        photo.alt = `A random ${labels[animal]}`;
        photo.hidden = false;
        status.textContent = `Here's a ${labels[animal]}.`;
    } catch (error) {
        status.textContent = "Couldn't load a picture. Try again.";
    } finally {
        confirmButton.disabled = false;
    }
}

async function pictureUrl(animal) {
    if (animal === "cat") {
        const data = await readJson("https://api.thecatapi.com/v1/images/search");
        if (!data[0] || !data[0].url) {
            throw new Error("Missing cat picture");
        }
        return data[0].url;
    }

    if (animal === "dog") {
        const data = await readJson("https://dog.ceo/api/breeds/image/random");
        if (!data.message) {
            throw new Error("Missing dog picture");
        }
        return data.message;
    }

    if (animal === "fox") {
        const data = await readJson("https://randomfox.ca/floof/");
        if (!data.image) {
            throw new Error("Missing fox picture");
        }
        return data.image;
    }

    if (animal === "duck") {
        return `https://random-d.uk/api/randomimg?t=${Date.now()}`;
    }

    throw new Error("Unknown animal");
}

async function readJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
}

function waitForImage(url) {
    return new Promise((resolve, reject) => {
        const probe = new Image();
        probe.onload = () => resolve();
        probe.onerror = () => reject(new Error("Picture failed to load"));
        probe.src = url;
    });
}
