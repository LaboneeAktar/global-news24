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
        // console.log(category);
        const { title, details, thumbnail_url, author, total_view } = category;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class ="card lg:card-side mb-16 shadow-xl">
            <figure><img src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p>${details.length > 200 ? details.slice(0, 400) + '...' : details}</p>
                <div class="md:flex mt-10 space-x-20">
                    <div class="flex">
                        <img src="${author.img}" class="h-14 w-14 rounded-full" alt="image">
                        <span class="ml-5">
                            <h1 class="text-lg">${author.name ? author.name : "No Data Found"}</h1>
                            <p>${author.published_date}</p>
                        </span>
                    </div> 
                    <div>
                        <p class="mt-3 text-lg"><i class="fa-regular fa-eye"></i> ${total_view ? total_view : 'No Data Found'}</p>
                    </div>
                   <div class="mt-3">
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                   </div>
                    <div class="card-actions md:justify-end">
                        <label onclick ="loadDetails('${category._id}')" for="my-modal-3" class="btn modal-button bg-emerald-600">Details  <i class="fa-solid fa-arrow-right ml-3"></i></label>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    })
}


const loadDetails = (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => diplayDetails(data.data))
}

const diplayDetails = details => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    details.forEach(detail => {
        console.log(detail);
        const { title, details, total_view, rating, author } = detail;
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = `
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold">Title: ${title}</h3>
            <p class="py-4"> <span class="font-bold">Details:</span> ${details}</p>
            <p class="pt-4"> <span class="font-bold">Total View:</span> ${total_view ? total_view : 'No Data Found'}</p>
            <p class="py-1"> <span class="font-bold">Ratings:</span> ${rating.number}</p>
            <h3 class="text-lg font-bold pt-4">Author Details:</h3>
            <p class="pt-4"> <span class="font-bold">Name:</span> ${author.name ? author.name : "No Data Found"}</p>
            <p class="py-1"> <span class="font-bold">Published Date & Time:</span> ${author.published_date}</p>
        `;
        detailsContainer.appendChild(detailDiv);
    })
}

loadDetails();







loadCategoryId('08');

loadCategoryName();