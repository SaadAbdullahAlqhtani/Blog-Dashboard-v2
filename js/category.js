const url = window.location.href.split("/")[window.location.href.split("/").length - 1];
const categoryTable = document.querySelector(".latestCategories");

class UI {
    addCategory(category) {
    
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
          <td>${category.id}</td>
          <td>${category.title}</td>
          <td>${new Date(category.date).toDateString().split(" ").slice(1).join(" ")}</td>
          <td><a href="details.html" class="btn btn-secondary"><i class="fas fa-angle-double-right"></i> Details</a></td>`;
        categoryTable.appendChild(row);
      };
}

class Store {
    static getcategories() {
        // Declare var
        let categories;
        // If LS doesn't have books, create it
        if (localStorage.getItem('categories') === null) {
          categories = [];
        }
        // If LS does have books, get it.
        else {
          categories = JSON.parse(localStorage.getItem('categories'));
        }
        // return books
        return categories;
      }

    static displayLatestCategories(categoryNum) {
    // get posts from LS
    const categories = Store.getcategories();
    // Get most recently added posts
    const latestCategories = categories;
    // Init UI
    const ui = new UI;
    // Get latest 5 posts
    for (let i = 0; i < categoryNum; i++) {
        // Add the posts to the UI
        ui.addCategory(latestCategories[i]);
    };
    }

    static addCategory(category) {
        // get posts from LS
        const categories = Store.getcategories();
        // Push into array
        categories.push(category);
        // Set back to local storage
        localStorage.setItem('categories', JSON.stringify(categories));
    }
}


const exampleCategories = [
    {
      id: '1',
      title: 'Web Development',
      date: '2019-11-01'
    },
    {
      id: '2',
      title: 'Tech Gadgets',
      date: '2019-05-11'
    },
    {
      id: '3',
      title: 'Business',
      date: '2019-04-20'
    },
    {
      id: '4',
      title: 'Health & Wellness',
      date: '2019-04-20'
    }
];

if(categoryTable) {
    let firstVisit = localStorage.getItem('categories');
    if (firstVisit === null) {
        exampleCategories.forEach((category) => {
        Store.addCategory(category);
        });
    }
    console.log("dhjgjwqgdjh")
    Store.displayLatestCategories(JSON.parse(localStorage.getItem('categories')).length);

    document.querySelectorAll(".nav-item").forEach(li => {
      if(li.firstElementChild.getAttribute("href") === url) {
        li.firstElementChild.classList.add("active");
      }
    });
}
