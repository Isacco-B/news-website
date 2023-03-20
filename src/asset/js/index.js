import '../css/style.scss'

const axios = require("axios");

const NEWS_PER_PAGE = 10;
const newsContainer = document.querySelector('.project-container')
const loadMoreBtn = document.querySelector('.btn-loadmore');

let newsData = [];
let currentPage = 0;


function renderNews(start, end) {
  const newsHtml = newsData
    .slice(start, end)
    .map((newsItem) => {
      const time = new Date(newsItem.time * 1000).toLocaleString();
      return `
        <div class='project-container-right'>
            <div class="project">
            <div class="project-info">
                <h2> ${newsItem.title} </h2>
                <p> ${time} </p>
                <p> By ${newsItem.by} </p>

                <a href="${newsItem.url}" target="_blank">
                <button class="btn-primary project-btn">ReadMore</button>
                </a>
            </div>
            </div>
        </div>
      `;
    })
    .join("");
  newsContainer.innerHTML += newsHtml;
}

let newsId = []
// Chiamata all'API per ottenere i primi 10 nuovi articoli
axios
  .get("https://hacker-news.firebaseio.com/v0/newstories.json")
  .then((response) => {
    const newsId = response.data;
    const requests = newsId.map((id) =>
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );
    axios
      .all(requests)
      .then((responses) => {
        console.log(responses)
        newsData = responses.map((response) => response.data);
        renderNews(0, NEWS_PER_PAGE);
        currentPage += NEWS_PER_PAGE;
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

function loadNews(){
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
}
loadMoreBtn.addEventListener("click", () => {
  renderNews(currentPage, currentPage + NEWS_PER_PAGE);
  currentPage += NEWS_PER_PAGE;
  if (currentPage >= newsData.length) {
    loadMoreBtn.style.display = "none";
  }
});
