const amount = document.querySelector("#amount");
const description = document.querySelector("#description");
const category = document.querySelector("#category");
const ulItems = document.querySelector(".item-list");
const form = document.querySelector("#form");

const api = "http://localhost:3000/expense";

async function onSubmit(e) {
  e.preventDefault();

  const expDets = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  };
  const token = localStorage.getItem("token");
  // { headers: { Authorization: token } }
  await axios.post(`${api}/addExpense`, expDets, {
    headers: { Authorization: token },
  });

  //   li(expDets);
}

function delButton(obj) {
  const delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.appendChild(document.createTextNode("Delete Expense"));

  delBtn.addEventListener("click", (e) => deleteBtn(e, obj));

  async function deleteBtn(e, obj) {
    // const exDet = await axios.get(`${api}/getExpenses`);
    // const expObj = exDet.data.expenses.find((d) => d.id === obj.id);

    const token = localStorage.getItem("token");

    let li = e.target.parentElement;
    await axios.delete(`${api}/deleteExpense/${obj.id}`, {
      headers: { Authorization: token },
    });
    ulItems.removeChild(li);
  }

  return delBtn;
}

function li(obj) {
  const li = document.createElement("li");
  li.className = "items";
  li.appendChild(delButton(obj));
  li.appendChild(
    document.createTextNode(`${obj.amount} ${obj.description} ${obj.category}`)
  );
  ulItems.appendChild(li);
}

form.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  await axios
    .get(`${api}/getExpenses`, { headers: { Authorization: token } })
    .then((response) => {
      if (response.data.expenses.length !== 0) {
        for (let i = 0; i < response.data.expenses.length; i++) {
          li(response.data.expenses[i]);
        }
      }
    });
});
