const count = 30;
const apiKey = "Client-ID jDI1_HJzPk44y1JHLbt2Zu_gWKG2yKSAy1w8k2TX3wI";
let totalImages = 0;
let loadedImages = 0;
let isDone = false;
let imageList = [];

const url = `https://api.unsplash.com/photos/random?count=${count}`;
const loader = document.querySelector(".loader");

const imageLoaded = () => {
  loadedImages++;
  if (loadedImages === totalImages) {
    isDone = true;
    loader.hidden = true;
  }
};

const getPhotos = async () => {
  loadedImages = 0;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    });

    imageList = await res.json();
    totalImages = imageList.length;
    displayPhotos();
  } catch (err) {
    console.error(err);
  }
};

const displayPhotos = async () => {
  const container = document.querySelector(".image-container");
  imageList.forEach((photoObject) => {
    const img = document.createElement("img");
    const anchor = document.createElement("a");
    img.addEventListener("load", imageLoaded);

    img.src = photoObject.urls.regular;
    img.title = photoObject.description ?? "An image";
    img.alt = photoObject.description ?? "An image";
    anchor.target = "_blank";
    anchor.href = photoObject.links.html;

    anchor.appendChild(img);
    container.appendChild(anchor);
  });
};

//on Load
window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight > document.body.offsetHeight - 1000 &&
    isDone) {
    isDone = false;
    getPhotos();
  }
});

getPhotos();
