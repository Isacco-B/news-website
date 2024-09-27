import "../css/style.scss";
import axios from "axios";
const _ = require("lodash");

// These constants hold the API endpoints
const API_LATEST = "https://hacker-news.firebaseio.com/v0/newstories.json";
const API_BEST = "https://hacker-news.firebaseio.com/v0/beststories.json";
const API_JOB = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const API_SHOW = "https://hacker-news.firebaseio.com/v0/showstories.json";
const API_URL_ID = "https://hacker-news.firebaseio.com/v0/item/";

// These constants hold elements selected from the DOM
const newsContainer = document.querySelector(".news-container");
const newsTitle = document.querySelector(".news-title");
const loadMoreBtn = document.getElementById("btn-loadmore");
const spinner = document.getElementById("loader");
const navBarMenu = document.querySelector(".navbar-menu");

// This event listener triggers the spinner loader when the page loads
window.addEventListener("load", () => {
  spinnerLoader();
});

// This event listener handles clicks on the navbar menu
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

// This function fetches news IDs from the API endpoint
async function fetchNewsId(api) {
  axios
    .get(api)
    .then((response) => {
      newsId = _.get(response, "data");
      fetchNews();
    })
    .catch((error) => console.log(error));
}

// This function fetches news data from the API and call the renderNews function
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

// This function renders individual news items on the page
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

// This function adds and removes the spinner loader class to show/hide the spinner
function spinnerLoader() {
  spinner.classList.add("loader");
  setTimeout(() => {
    spinner.classList.remove("loader");
  }, 2000);
}

// Fetches more news when the "Load More" button is clicked.
loadMoreBtn.addEventListener("click", () => {
  spinnerLoader();
  fetchNews();
  if (count >= newsId.length) {
    loadMoreBtn.style.display = "none";
  }
});

fetchNewsId(API_LATEST);
