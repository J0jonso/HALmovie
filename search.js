const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");

let search,url,result,movieInfo;

async function searchMovie() {
    url = `http://www.omdbapi.com/?apikey=72b6f9aa&t=${search}&`;
    try {
        result = await fetch(url);
        movieInfo = await result.json();
        console.log(movieInfo);
        if (movieInfo.Response === "False") {
            document.querySelector("#movieInfo").innerHTML = "";
            let notFound = document.createElement("h1");

            notFound.setAttribute("class","title");
            notFound.textContent = "😥 Movie not found";

            document.querySelector("#movieInfo").style.display = "flex";

            document.querySelector("#movieInfo").appendChild(notFound);
        }else {
            showInfo();
        }
    }catch(error) {
        alert("SYSTEM ERROR" + " " + error.message)
    }
}
function convertText(text) {
    let newText = ""
    for(let i = 0;i<text.length;i++) {
        if (text.charAt(i) == " ") {
            newText += "+";
        }else {
            newText += text.charAt(i);
        }
    }
    return newText;
}
function showInfo() {
    let info = document.querySelector("#movieInfo");
    info.style.opacity = 1;

    info.innerHTML = "";

    let textInformation = document.createElement("div");
    textInformation.setAttribute("class","info");

    let title = document.createElement("h1");
    title.setAttribute("class","titleInfo");
    title.textContent = movieInfo.Title + " " + `(${movieInfo.Year})`;

    let plot = document.createElement("p");
    plot.setAttribute("class","textInfo");
    plot.textContent = movieInfo.Plot;

    let rate = document.createElement("h1");
    rate.setAttribute("class","titleInfo");
    rate.textContent = `⭐ ${movieInfo.imdbRating}/10`;

    let director = document.createElement("h1");
    director.setAttribute("class","textInfo");
    director.textContent = `Director: ${movieInfo.Director}`

    let type = document.createElement("p");
    type.setAttribute("class","blocks");
    type.textContent = movieInfo.Type;

    let age = document.createElement("p");
    age.setAttribute("class","blocks");
    age.textContent = movieInfo.Rated;

    let moreInfo = document.createElement("div");
    moreInfo.setAttribute("class","moreInfo");

    moreInfo.appendChild(type);
    moreInfo.appendChild(age);

    textInformation.appendChild(title);
    textInformation.appendChild(plot);
    textInformation.appendChild(rate);
    textInformation.appendChild(director);
    textInformation.appendChild(moreInfo);

    if (movieInfo.Poster && movieInfo.Poster !== "N/A") {
        let img = document.createElement("img");
        img.setAttribute("class","image");
        img.setAttribute("src",movieInfo.Poster);
        info.appendChild(img);
    }
    info.appendChild(textInformation);
}

searchBtn.addEventListener("click",() => {
    search = searchInput.value;
    search = convertText(search);
    console.log(search)
    searchMovie();
})