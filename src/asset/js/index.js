import "../css/style.scss";
import axios from "axios";
const _ = require("lodash");

const API_LATEST = process.env.API_LATEST;
const API_BEST = process.env.API_BEST;
const API_JOB = process.env.API_JOB;
const API_SHOW = process.env.API_SHOW;
const API_URL_ID = process.env.API_URL_ID;

const newsContainer = document.querySelector(".news-container");
const newsTitle = document.querySelector(".news-title");
const loadMoreBtn = document.getElementById("btn-loadmore");
const spinner = document.getElementById("loader");
const navBarMenu = document.querySelector(".navbar-menu");

window.addEventListener("load", () => {
  spinnerLoader();
});

navBarMenu.addEventListener("click", function (e) {
  const newsType = e.target.id;
  switch (newsType) {
    case "latest":
      newsContainer.innerHTML = "";
      newsTitle.innerHTML = "LatestNews";
      count = 0;
      spinnerLoader();
      fetchNewsId(API_LATEST);
      break;
    case "best":
      newsContainer.innerHTML = "";
      newsTitle.innerHTML = "BestNews";
      count = 0;
      spinnerLoader();
      fetchNewsId(API_BEST);
      break;
    case "job":
      newsContainer.innerHTML = "";
      newsTitle.innerHTML = "JobNews";
      count = 0;
      spinnerLoader();
      fetchNewsId(API_JOB);
      break;
    case "show":
      newsContainer.innerHTML = "";
      newsTitle.innerHTML = "ShowNews";
      count = 0;
      spinnerLoader();
      fetchNewsId(API_SHOW);
      break;
    default:
      break;
  }
});

let count = 0;
let newsId = [];

async function fetchNewsId(api) {
  axios
    .get(api)
    .then((response) => {
      newsId = _.get(response, "data");
      fetchNews();
    })
    .catch((error) => console.log(error));
}

async function fetchNews() {
  newsId.slice(count, (count += 10)).forEach((id) => {
    axios
      .get(`${API_URL_ID}/${id}.json`)
      .then((response) => {
        let newsData = _.get(response, "data");
        renderNews(newsData);
      })
      .catch((error) => console.log(error));
  });
}

function renderNews(data) {
  const time = new Date(data.time * 1000).toLocaleString();
  const newsHtml = `
            <div class="news">
              <div class="news-info">
                  <h2> ${data.title} </h2>
                  <p> ${time} </p>
                  <p> By ${data.by} </p>
                  <a href="${data.url}" target="_blank">
                  <button class="btn-primary">ReadMore</button>
                  </a>
              </div>
            </div>
          `;
  newsContainer.innerHTML += newsHtml;
}

function spinnerLoader() {
  spinner.classList.add("loader");
  setTimeout(() => {
    spinner.classList.remove("loader");
  }, 2000);
}

loadMoreBtn.addEventListener("click", () => {
  spinnerLoader();
  fetchNews();
  if (count >= newsId.length) {
    loadMoreBtn.style.display = "none";
  }
});

fetchNewsId(API_LATEST);
