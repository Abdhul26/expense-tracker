document.getElementById('addExpense').addEventListener('click', addExpenses)
let expenses = []

function addExpenses() {
  const description = document.getElementById('expenseDesc').value
  const amount = document.getElementById('expenseAmount').value
  const type = document.getElementById('expenseType').value

  console.log(description, amount, type)

  if (!description || !amount || !type) {
    alert('Please fill all details ')
    return
  }

  const expense = {
    description: description,
    amount: parseFloat(amount),
    type: type,
  }

  expenses.push(expense)

  saveExpenses() // Save to local storage
  displayExpenses() // Display the updated list
  clearInputFields()
}

function displayExpenses() {
  const expenseList = document.getElementById('expenseList')
  expenseList.innerHTML = '' // Clear current list
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div')
    expenseItem.classList.add('expense-item')
    expenseItem.innerHTML = `
      <span>${expense.description} - $${expense.amount} [${expense.type}]</span>

    `

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.onclick = () => deleteExpense(index) // Call deleteExpense with the index

    expenseItem.appendChild(deleteBtn)
    expenseList.appendChild(expenseItem)
    expenseList.appendChild(expenseItem)
  })
}

function deleteExpense(index) {
  expenses.splice(index, 1)
  saveExpenses()
  displayExpenses()
}
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses))
}
function loadExpenses() {
  const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || []
  expenses = savedExpenses
  displayExpenses()
}

function clearInputFields() {
  document.getElementById('expenseDescription').value = ''
  document.getElementById('expenseAmount').value = ''
  document.getElementById('expenseType').value = 'food'
}

loadExpenses()
