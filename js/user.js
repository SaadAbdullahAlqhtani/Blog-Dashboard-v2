const url = window.location.href.split("/")[window.location.href.split("/").length - 1];
const usersTable = document.querySelector("#latestUsers") ;

class UI {
    addUser(user) {
        const row = document.createElement("tr");

        row.innerHTML = `
        
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
            <a href="details.html" class="btn btn-secondary">
                <i class="fas fa-angle-double-right"></i> Details
            </a>
            </td>
        `;
        usersTable.appendChild(row);
    }
}


class Store {
    static getUsers() {
        // Declare var
        let users;
        // If LS doesn't have books, create it
        if (localStorage.getItem('users') === null) {
          users = [];
        }
        // If LS does have books, get it.
        else {
          users = JSON.parse(localStorage.getItem('users'));
        }
        // return books
        return users;
      }

    static displayLatestUsers(userNum) {
    // get posts from LS
    const users = Store.getUsers();
    // Get most recently added posts
    const latestUsers = users;
    // Init UI
    const ui = new UI;
    // Get latest 5 posts
    for (let i = 0; i < userNum; i++) {
        // Add the posts to the UI
        ui.addUser(latestUsers[i]);
    };
    }

    static addUser(user) {
        // get posts from LS
        const users = Store.getUsers();
        // Push into array
        users.push(user);
        // Set back to local storage
        localStorage.setItem('users', JSON.stringify(users));
    }
}


const exampleUsers = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com"
    },
    {
        id: "2",
        name: "Harry White",
        email: "harry@yahoo.com"
    },
    {
        id: "3",
        name: "Marry Johnson",
        email: "marry@gmail.com"
    }
];


if(usersTable) {
    let firstVisit = localStorage.getItem('users');
    if (firstVisit === null) {
        exampleUsers.forEach((user) => {
        Store.addUser(user);
        });
    }
    Store.displayLatestUsers(JSON.parse(localStorage.getItem('users')).length);

    document.querySelectorAll(".nav-item").forEach(li => {
        if(li.firstElementChild.getAttribute("href") === url) {
          li.firstElementChild.classList.add("active");
        }
      });
}