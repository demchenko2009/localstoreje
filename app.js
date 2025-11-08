// Створіть програму для зберігання контактів — ім'я, прізвище, телефон та
//  електронна адреса. Зберігайте контакти в localStorage та
//  дозволяйте користувачу додавати, видаляти та редагувати контакти.

const form = document.querySelector(".js-form");
const inputName = document.querySelector(".js-name");
const inputSurf = document.querySelector(".js-surname");
const inputPhobe = document.querySelector(".js-phone");
const inputMail = document.querySelector(".js-email");
const btn = document.querySelector(".js-btn");
const list = document.querySelector(".js-list");

const contacts = JSON.parse(localStorage.getItem("contacts")) || []


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = inputName.value.trim();
  const surn = inputSurf.value.trim();
  const phone = inputPhobe.value.trim();
  const email = inputMail.value.trim();
 
  addConntakt(name,surn,phone,email)
  event.currentTarget.reset()
});


function addConntakt(name,surname,phone,mail) {
    contacts.push({name,surname,phone,mail})
    savedStoraje()
  
}

function render(arrey) {
    list.innerHTML = arrey.map(({name,surname,phone,mail},index) => {
        return `<li data-idx="${index}" class="item">
    <p> имя: ${name}</p>
    <p> призвыще: ${surname}</p>
    <p телл: >${phone}</p>
    <p имеил: >${mail}</p>
    <button class="btn-dell" type="button">delete</button>
    <button class="btn-edit" type="button">Change</button>
</li>`
    }).join("")
}


function savedStoraje() {
    localStorage.setItem("contacts",JSON.stringify(contacts))
    render(contacts)
}

list.addEventListener("click",(event) => {
    if (event.target.classList.contains("btn-dell")) {
        const li = event.target.closest("li")
     const idx = li.dataset.idx
     removeItem(idx)
        
    }
})

let removeid = null;

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-edit")) {
    const li = event.target.closest("li");
    const idx = li.dataset.idx;
    const contact = contacts[idx];

    inputName.value = contact.name;
    inputSurf.value = contact.surname;
    inputPhobe.value = contact.phone;
    inputMail.value = contact.mail;

    removeid = idx;
    btn.textContent = "зберегти";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = inputName.value.trim();
  const surn = inputSurf.value.trim();
  const phone = inputPhobe.value.trim();
  const email = inputMail.value.trim();

  if (removeid !== null) {
    contacts[removeid] = { name, surname: surn, phone, mail: email };
    removeid = null;
    savedStoraje();
    event.currentTarget.reset();
    return;
  }
});


function removeItem(idx) {
    contacts.splice(idx,1)
    savedStoraje()
}

render(contacts)

