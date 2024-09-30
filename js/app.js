// All Categories
// https://openapi.programming-hero.com/api/news/categories

// Categories 1 News 
// https://openapi.programming-hero.com/api/news/category/01

// News detail 
// https://openapi.programming-hero.com/api/news/%7Bnews_id%7D



loadAllCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await response.json();
        const categories = data.data.news_category;
        // console.log(categories);
        showNewsCategory(categories);
    } catch (error) {
        console.error(error);
    }
}


function showNewsCategory(newsCategory) {
    const categoryContainer = document.getElementById('categories-list');

    // categoryContainer.textContent = '';

    newsCategory.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('cursor-pointer');
        div.classList.add('active:text-violet-700');
        div.setAttribute("onclick", `loadCategoriesNews('${category.category_id}')`);
        // div.setAttribute = "onclick=See()";
        div.innerHTML = `
            <p
                class="text-gray-500  
                active:bg-blue-200 focus:outline-none focus:ring focus:ring-violet-300
                hover:text-blue-400 font-bold hover:bg-blue-200 px-3 py-2 rounded"
            >
                ${category.category_name}
        `;

        categoryContainer.appendChild(div);
    })
    // toggleLoadingSpinner(true);
}

loadAllCategories();


// Load Categories all news
function loadCategoriesNews(category_id, isSeeAll) {
  
  toggleLoadingSpinner(true);
  
  fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(response => response.json())
    .then(data => showCategoryWiseAllNews(data.data, category_id, isSeeAll));
}


// Slice news 
function sliceNews(allNews, isSeeAll) {
  if(isSeeAll) {
    return allNews;
  } else {
    return allNews.slice(0,5);
  }
}


// Show category wised all news 
function showCategoryWiseAllNews(allNews, category_id, isSeeAll) {
    allNews.sort((a, b) => b.total_view - a.total_view);
    const slicedNews = sliceNews(allNews, isSeeAll);
    console.log(slicedNews, isSeeAll, category_id);
    

    const newsContainer = document.getElementById('news-card-container');
    newsContainer.textContent = '';

    // console.log(allNews.length);
    
    if(category_id !== '08') {
      document.getElementById('category-wise-total-news-found').classList.remove('hidden');
      document.getElementById('total-news').innerText = allNews.length;
    }else {
      document.getElementById('category-wise-total-news-found').classList.add('hidden');
    }
    
    const seeAllBtn = document.getElementById('see-all');
    
    // let isSeeAll = false;
    document.getElementById('see-all').addEventListener('click', function() {
      isSeeAll = true;
      loadCategoriesNews(category_id, isSeeAll);
    });
    
    // console.log(isSeeAll);
    

    // Slice the categories data
    if (allNews.length>5 && !isSeeAll) {
        seeAllBtn.classList.remove('hidden');
        // allNews = allNews.slice(0,5);
    }
    else {
        seeAllBtn.classList.add('hidden');
    }
    
    slicedNews.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('border-2', 'rounded-xl', 'p-4', 'bg-base-100','shadow-xl', 'flex', 'flex-row');

        div.innerHTML = `
        <figure class="rounded-xl w-1/4 border-2">
  <img
    class="w-full h-full rounded-xl"
    src="${news.thumbnail_url}"
    alt="Movie"
  />
</figure>
<div class="w-3/4 card-body flex-grow">
  <h2 class="card-title font-bold">
    ${news.title}
  </h2>
  <p class="text-base text-gray-600 line-clamp-6">
    ${news.details}
  </p>

  <!-- Bottom Container -->
  <div
    class="mt-5 flex flex-row gap-5 items-center justify-between"
  >
    <div class="flex flex-row gap-4 justify-center items-center">
      <!-- Avatar -->
      <div class="cursor-pointer avatar">
        <div
          class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2"
        >
          <img src="${news.author.img}" />
        </div>
      </div>
      <!-- Name -->
      <div class="flex flex-col">
        <h1 class="font-bold">${news.author.name}</h1>
        <p class="text-gray-400">${news.author.published_date}</p>
      </div>
    </div>
    <!-- View -->
    <div class="flex flex-row justify-center items-center gap-2">
      <i class="fa-regular fa-eye"></i>
      <p class="font-bold">${news.total_view}</p>
    </div>
    <!-- Rating -->
    <div class="">
      <div class="rating">
        <input
          type="radio"
          name="rating-1"
          class="mask mask-star"
        />
        <input
          type="radio"
          name="rating-1"
          class="mask mask-star"
          checked="checked"
        />
        <input
          type="radio"
          name="rating-1"
          class="mask mask-star"
        />
        <input
          type="radio"
          name="rating-1"
          class="mask mask-star"
        />
        <input
          type="radio"
          name="rating-1"
          class="mask mask-star"
        />
      </div>
    </div>
    <!-- Arrow -->
    <button
      onclick="loadModalDetailsData('${news._id}')"
      class="cursor-pointer bg-gray-300 rounded-full px-2 py-1 items-center justify-center"
    >
      <i class="fa-solid fa-arrow-right text-blue-500"></i>
    </button>
  </div>
</div>

`;

        newsContainer.appendChild(div);
    });

    // Hide loading spinner
    toggleLoadingSpinner(false);
}

loadModalDetailsData = (news_id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
  .then(response => response.json())
  .then(data => showModalDetails(data.data));
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

showModalDetails = (news) => {
  // console.log(news[0]);
  // console.log(news[0].title);

  const modalContainer = document.getElementById('modal-container');

  modalContainer.innerHTML = `
            <div
            class="rounded-lg bg-blue-200 p-5 mx-auto flex flex-row justify-center items-center text-center"
          >
            <img class="w-52 rounded-lg" src="${news[0].image_url}" alt="" />
          </div>

          <div class="mt-5">
            <h1 class="mb-5 font-bold text-xl">
              ${news[0].title}
            </h1>
            <p><span class="font-bold">Author Name:</span> ${news[0].author.name}</p>
            <p><span class="font-bold">Rating: </span>${news[0].rating.number}</p>
            <p><span class="font-bold">Badge: </span>${news[0].rating.badge}</p>
            <p><span class="font-bold">Total View: </span>${news[0].total_view}</p>
            <p><span class="font-bold">Published Data: </span>${news[0].author.published_date}</p>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button
                class="btn rounded bg-red-600 text-white border-2 border-red-600 hover:bg-transparent hover:border-2 hover:border-red-600 hover:text-red-600"
              >
                Close
              </button>
            </form>
          </div>
  `;
  show_news_modal.showModal();
}

searchCategoriesNews = () => {
}


loadCategoriesNews('08')


//  See all function
function seeAll(params) {
    // loadCategoriesNews(, true);
    console.log(params.parentNode.children[0].children);
    
}

