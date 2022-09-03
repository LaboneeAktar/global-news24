const loadNewsCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
}

const displayNewsCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        console.log(category);
        const categoryLi = document.createElement('li');
        categoryLi.innerHTML = `
        <li>${category.category_name}</li>
        `;
        categoryContainer.appendChild(categoryLi);
    })
}

loadNewsCategory();