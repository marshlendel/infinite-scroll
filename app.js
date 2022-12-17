const count = 10;
const apiKey = "Client-ID jDI1_HJzPk44y1JHLbt2Zu_gWKG2yKSAy1w8k2TX3wI";

const url = `https://api.unsplash.com/photos/random?count=${count}`;
const loader = document.querySelector(".loader");

const getPhotos = async () => {
  try {
    loader.hidden = false;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await res.json();
    loader.hidden = true;
    displayPhotos(data);
  } catch (err) {
    console.error(err);
  }
};

const displayPhotos = (arr) => {
  const container = document.querySelector(".image-container");
  arr.forEach((photoObject) => {
    const img = document.createElement("img");
    const anchor = document.createElement("a");

    img.src = photoObject.urls.regular;
    img.title = photoObject.description ?? "An image";
    img.alt = photoObject.description ?? "An image";
    anchor.target = "_blank"
    anchor.href = photoObject.links.html;

    anchor.appendChild(img);
    container.appendChild(anchor);
  });
};

//on Load
getPhotos();
