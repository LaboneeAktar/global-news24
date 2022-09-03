const loadCategoryName = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryName(data.data.news_category))
}

const displayCategoryName = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        // console.log(category);
        const categoryLi = document.createElement('li');
        categoryLi.innerHTML = `
        <li onclick="loadCategoryId('${category.category_id}')">${category.category_name}</li>
        `;
        categoryContainer.appendChild(categoryLi);
    })
}

const loadCategoryId = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
}


const displayCategoryNews = categories => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    categories.forEach(category => {
        console.log(category)
        const { title, details, thumbnail_url, author, total_view } = category;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class ="card lg:card-side mb-16 shadow-xl">
            <figure><img src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p>${details.length > 200 ? details.slice(0, 400) + '...' : details}</p>
                <div class="md:flex mt-10 space-x-28">
                    <div class="flex">
                        <img src="${author.img}" class="h-14 w-14 rounded-full" alt="image">
                        <span class="ml-5">
                            <h1 class="text-xl">${author.name}</h1>
                            <p>${author.published_date}</p>
                        </span>
                    </div> 
                    <div>
                        <p class="mt-3 text-xl"><i class="fa-regular fa-eye"></i> ${total_view}K</p>
                    </div>
                   <div class="mt-3">
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                   </div>
                    <div class="card-actions md:justify-end">
                        <button class="btn btn-secondary">Details <i class="fa-solid fa-arrow-right ml-3"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    })
}


loadCategoryId('01')




loadCategoryName();