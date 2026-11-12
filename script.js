
let budget = 0;
let expenses = [];

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");

const budgetDisplay = document.getElementById("budget");
const expensesDisplay = document.getElementById("expenses");
const balanceDisplay = document.getElementById("balance");
const message = document.getElementById("message");

// Update dashboard
function updateDashboard() {
    let totalExpenses = 0;

    expenses.forEach(function(expense) {
        totalExpenses += expense.amount;
    });

    let remainingBalance = budget - totalExpenses;

    budgetDisplay.textContent = "KES " + budget.toLocaleString();
    expensesDisplay.textContent = "KES " + totalExpenses.toLocaleString();
    balanceDisplay.textContent = "KES " + remainingBalance.toLocaleString();
}

// Display expenses
function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach(function(expense, index) {
        const listItem = document.createElement("li");

        const expenseText = document.createElement("span");
        expenseText.textContent =
            expense.name + " - KES " + expense.amount.toLocaleString();

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function() {
            expenses.splice(index, 1);
            displayExpenses();
            updateDashboard();
            message.textContent = "Expense deleted successfully!";
        });

        listItem.appendChild(expenseText);
        listItem.appendChild(deleteButton);

        expenseList.appendChild(listItem);
    });
}

// Set budget
budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    if (newBudget <= 0) {
        message.textContent = "Please enter a valid budget.";
        return;
    }

    const totalExpenses = expenses.reduce(function(total, expense) {
        return total + expense.amount;
    }, 0);

    if (newBudget < totalExpenses) {
        message.textContent = "Your budget cannot be less than your expenses.";
        return;
    }

    budget = newBudget;

    updateDashboard();

    message.textContent = "Your budget has been set successfully!";
    budgetInput.value = "";
});

// Add expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || amount <= 0) {
        message.textContent = "Please enter a valid expense.";
        return;
    }

    if (budget <= 0) {
        message.textContent = "Please set your budget first.";
        return;
    }

    const totalExpenses = expenses.reduce(function(total, expense) {
        return total + expense.amount;
    }, 0);

    if (totalExpenses + amount > budget) {
        message.textContent = "This expense is greater than your remaining balance.";
        return;
    }

    expenses.push({
        name: name,
        amount: amount
    });

    displayExpenses();
    updateDashboard();

    message.textContent = "Expense added successfully!";

    expenseName.value = "";
    expenseAmount.value = "";
});
