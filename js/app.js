const url = window.location.href.split("/")[window.location.href.split("/").length - 1];

// Local Storage for Posts
// TODO: Add script tag on each HTML files

// POSTS
class Post {
  constructor(id, title, category, date) {
    this.id = id;
    this.title = title;
    this.category = category;
    if (date) {
      this.date = Date(date);
    } else {
      this.date = Date.now();
    }
  }
}

class Category {
  constructor(id, title, date) {
    this.id = id;
    this.title = title;
    if (date) {
      this.date = Date(date);
    } else {
      this.date = Date.now();
    }
  }
}

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class UI {
  addPost(post) {
    const postsTable = document.querySelector('tbody');
    // Create tr element
    const row = document.createElement('tr');

    
    
    // Insert cols
    row.innerHTML = `
      <td>${post.id}</td>
      <td>${post.title}</td>
      <td>${post.category}</td>
      <td>${new Date(post.date).toDateString().split(" ").slice(1).join(" ")}</td>
      <td><a href="details.html" class="btn btn-secondary">
      <i class="fas fa-angle-double-right"></i> Details
    </a><button class="btn btn-danger delete-post ml-2"><i class="fas fa-trash-alt"></i></button></td>
    `;

    const deleteBtn = row.querySelector(".delete-post");
    deleteBtn.addEventListener("click", () => {
      row.remove();
      Store.removePost(post.id)
      Store.displayLatestPosts();
    });
    postsTable.appendChild(row);
  };

  

  // Show alert on DOM
  showAlert(message, className) {
    // Create DIV
    const div = document.createElement('div');
    // Add classes 
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message))

    // Get parent
    const postParent = document.getElementById('postParent');

    // Get container
    const container = document.getElementById('postContainer');

    // Insert alert
    postParent.insertBefore(div, container);
    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  };
  clearTable() {
    const postsTable = document.querySelector('tbody');
    postsTable.innerHTML = '';
  }
}

// Local Storage Class
class Store {
  static setDefaultPosts() {

  }

  static getPosts() {
    // Declare var
    let posts;
    // If LS doesn't have books, create it
    if (localStorage.getItem('posts') === null) {
      posts = [];
    }
    // If LS does have books, get it.
    else {
      posts = JSON.parse(localStorage.getItem('posts'));
    }
    // return books
    return posts;
  }

  

  static displayPosts() {
    // get posts from LS
    const posts = Store.getPosts();

    posts.forEach(function (post) {
      const ui = new UI;
      // Add book to UI
      ui.addPost(post);
    });
  }

  static displayLatestPosts(postNum) {
    // get posts from LS
    const posts = Store.getPosts();
    // Get most recently added posts
    const latestPosts = posts;
    // Init UI
    const ui = new UI;
    // Get latest 5 posts
    for (let i = 0; i < postNum; i++) {
      // Add the posts to the UI
      ui.addPost(latestPosts[i]);
    };
  }

  

  static addPost(post) {
    // get posts from LS
    const posts = Store.getPosts();
    // Push into array
    posts.push(post);
    // Set back to local storage
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  

  static removePost(id) {
    // get posts from LS
    const posts = Store.getPosts();
    // Loop through array
    posts.forEach(function (post, index) {
      if (post.id === id) {
        posts.splice(index, 1);
      }
    });
    // Set back to local storage
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  static displayCategoriesToDOM() {
    const categories = JSON.parse(localStorage.getItem("categories"));

    if(categories) {
        const categoryOptions = document.querySelector("#postCategory");
      const option = document.createElement("option");

      categories.forEach((category) => {
        option.textContent = `${category.title}`;
        categoryOptions.appendChild(option);
      });
    }
  }
}

// Default Posts
const examplePosts = [
  {
    id: '1',
    title: 'Post One',
    category: 'Web Development',
    date: '2019-11-01'
  },
  {
    id: '2',
    title: 'Post Two',
    category: 'Tech Gadgets',
    date: '2019-05-11'
  },
  {
    id: '3',
    title: 'Post Three',
    category: 'Web Development',
    date: '2019-04-20'
  },
  {
    id: '4',
    title: 'Post Four',
    category: 'Business',
    date: '2019-06-30'
  },
  {
    id: '5',
    title: 'Post Five',
    category: 'Web Development',
    date: '2019-01-01'
  },
  {
    id: '6',
    title: 'Post Six',
    category: 'Health & Wealthness',
    date: '2019-01-01'
  }
];


// Post Count Widget
function postCount() {
  let postsArr = Store.getPosts();
  // Number of posts
  let pCount = postsArr.length ;
  let pTextNode = document.createElement("span");
  pTextNode.textContent = `${pCount}`;
  let parentNode = document.getElementById('postCount');
  let refNode = parentNode.firstElementChild;
  // Insert into DOM
  refNode.parentNode.insertBefore(pTextNode, refNode.nextSibiling);
}

function categoryCount() {
  let categoriesArr = JSON.parse(localStorage.getItem("categories"));
  if(categoriesArr) {
    // Number of posts
  let pCount = categoriesArr.length ;
  document.querySelector('#categoryCount span').remove();
  let pTextNode = document.createElement("span");
  pTextNode.textContent = `${pCount}`;
  let parentNode = document.getElementById('categoryCount');
  let refNode = parentNode.firstElementChild;
  // Insert into DOM
  refNode.parentNode.insertBefore(pTextNode, refNode.nextSibiling);
  }
}

function userCount() {
  let usersArr = JSON.parse(localStorage.getItem("users"));
  if(usersArr) {
    // Number of posts
  let pCount = usersArr.length ;
  document.querySelector('#userCount span').remove();
  let pTextNode = document.createElement("span");
  pTextNode.textContent = `${pCount}`;
  let parentNode = document.getElementById('userCount');
  let refNode = parentNode.firstElementChild;
  // Insert into DOM
  refNode.parentNode.insertBefore(pTextNode, refNode.nextSibiling);
  }
}

// DOM Load Events

// Load posts from LS
document.addEventListener('DOMContentLoaded', function () {
  let firstVisit = localStorage.getItem('posts');
  // If first visit, load example posts
  if (firstVisit === null) {
    examplePosts.forEach((post) => {
      Store.addPost(post);
    });
  }
  // Load Latest Posts
  Store.displayLatestPosts(Store.getPosts().length);
  // Update Post Count
  postCount();

  categoryCount();

  userCount();

  Store.displayCategoriesToDOM();

  document.querySelectorAll(".nav-item").forEach(li => {
    if(li.firstElementChild.getAttribute("href") === url) {
      li.firstElementChild.classList.add("active");
    }
  });
});


// TESTING
// const newPost = new Post('9', 'New Post', 'Web Development', 'image', 'body', '01-01-2000');

const newCategory = new Category('5', 'Online Courses');

// Init UI
const ui = new UI;

const addPostButton = document.getElementById('addPostBtn');
addPostButton.addEventListener('click', function () {
  // Check if values are empty
  const title = document.getElementById('postTitle');
  const category = document.getElementById('postCategory');
  // Random ID
  const id = Store.getPosts().length + 1;
  if (title.value === '' | category.value === '') {
    // Error Handling
    console.log('Error: Post incomplete. Please include both a title and category');
  } else {
    // Inputs Validated - Create new post
    const post = new Post(id, title.value, category.value);
    // Store post
    Store.addPost(post);
    // Init UI
    const ui = new UI;
    // Clear Latest PostsUI
    ui.clearTable();
    // Reload Latest Posts
    Store.displayLatestPosts(id);
    // Display Alert
    ui.showAlert('Post Added!', 'alert-success');

    document.querySelector('#postCount span').remove();

    postCount();
  }
  // Clear Inputs
  title.value = '';
  // TODO: clear select option
});

const addCategoryButton = document.querySelector('.addCategoryButton');
addCategoryButton.addEventListener('click', () => {
  
  const title = document.querySelector('.categoryTitle');

  // Random ID
  const id = JSON.parse(localStorage.getItem("categories")).length + 1;
  if (title.value === '') {
    // Error Handling
    console.log('Error: Post incomplete. Please include both a title and category');
  } else {
    // Inputs Validated - Create new post
    const category = new Category(id, title.value);

    const categories = JSON.parse(localStorage.getItem("categories"));

    categories.push(category);

    localStorage.setItem('categories', JSON.stringify(categories));


    categoryCount();

    window.location.href = "categories.html";
    
  }
  // Clear Inputs
  title.value = '';
  // TODO: clear select option
});





const addUserButton = document.querySelector('.addUserButton');
addUserButton.addEventListener('click', () => {
  
  const name = document.querySelector('.userName');
  const email = document.querySelector('.userEmail');
  const passTwo = document.querySelector('.userPassOne');
  const passOne = document.querySelector('.userPassTwo');

  // Random ID
  const id = JSON.parse(localStorage.getItem("users")).length + 1;
  if (name.value === '' || email.value === '' || passOne.value === '' || passTwo.value === '') {
    // Error Handling
    console.log('Error: User Fields incomplete. Please include all fields');
  } else {
    // Inputs Validated - Create new post
    console.log("hdkjhwwjkd");
    const user = new User(id, name.value, email.value);

    const users = JSON.parse(localStorage.getItem("users"));

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));


    userCount();

    window.location.href = "users.html";
    
  }
  // Clear Inputs
  name.value = '';
  email.value = '';
  passOne.value = '';
  passTwo.value = '';
  // TODO: clear select option
});



