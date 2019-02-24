// BUDGET CONTROLLER
var budgetController = (function () {

    // Constructors
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.precentage = -1
    };
    Expense.prototype.calcPrecentage = function (totalIncome) {

        if (totalIncome > 0) {
            this.precentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.precentage = -1;
        }
    };
    Expense.prototype.getPrecentage = function () {
        return this.precentage;
    };
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(el => {
            sum += el.value;
        });
        data.totals[type] = sum;
    };

    // DATA STRUCTURES
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        precentage: -1
    }


    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);
            return newItem;
        },
        calculateBudget: function () {
            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the precentage of income that we spent
            if (data.totals.inc > 0) {
                data.precentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.precentage = -1;
            }
        },
        calculatePrecentages: function () {

            data.allItems.exp.forEach(function (i) {
                i.calcPrecentage(data.totals.inc);
            });
        },
        getPrecentages: function () {
            var allPrec = data.allItems.exp.map(function (v) {
                return v.getPrecentage();
            });
            return allPrec;
        },
        getBudgets: function () {
            return {
                budget: data.budget,
                totalIncomes: data.totals.inc,
                totalExpenses: data.totals.exp,
                precentage: data.precentage
            }
        },
        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItems[type].map(function (i) {
                return i.id;
            });

            index = ids.indexOf(id)

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },
        testing: function () {
            console.log(data);
        },
    }

})();

///////////////////////////////////////////////////////////////////

// UI CONTROLLER
var UIController = (function () {

    var DOMStrings = {
        inputTypes: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        precentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPrecLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function (num, type) {
        var numSplit, int, dec;
        // + / - before number
        // exactly 2 decimal points
        // comma separating 

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    }
    
    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i)
        };
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputTypes).value, // Will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            }
        },
        addListItem: function (obj, type) {
            var html, newHTML, element;
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Replace the placeholder text with some actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

            // Insret the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },
        deleteListItem: function (selectorID) {

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },
        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(element => {
                element.value = '';
            });
            fieldsArr[0].focus();
        },
        displayBudget: function (obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncomes, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExpenses, 'exp');

            if (obj.precentage > 0) {
                document.querySelector(DOMStrings.precentageLabel).textContent = obj.precentage + '%';
            } else {
                document.querySelector(DOMStrings.precentageLabel).textContent = '---'
            }
        },
        displayPrecentage: function (precentages) {

            var fileds = document.querySelectorAll(DOMStrings.expensesPrecLabel);

            nodeListForEach(fileds, function (value, index) {
                if (precentages[index] > 0) {
                    value.textContent = precentages[index] + '%';
                } else {
                    value.textContent = '---'
                }
            });

        },
        displayMonth: function () {
            var now, year, month, months
            now = new Date();
            month = now.getMonth();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agaust', 'September', 'October', 'November', 'December']
            year = now.getFullYear();            
            
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;

        },
        changeType: function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputTypes + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue);

            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });
            document.querySelector(DOMStrings.inputAddBtn).classList.toggle('red');

        },
        getDOMStrings: function () {
            return DOMStrings;
        }
    }

})();



///////////////////////////////////////////////////////////////////


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

        document.querySelector(DOM.inputTypes).addEventListener('change', UICtrl.changeType)
    };

    var updateBudgets = function () {
        // 1.Calculate the budget.
        budgetCtrl.calculateBudget();

        // 2.return the budget.
        var budget = budgetCtrl.getBudgets();

        // 3.Display the budget on the UI.
        UICtrl.displayBudget(budget);
    };
    var updatePrecentage = function () {

        // calculate precentages
        budgetCtrl.calculatePrecentages();
        // Read precentages
        var precentages = budgetCtrl.getPrecentages();
        // update the UI with the new precentages
        UICtrl.displayPrecentage(precentages)

    };
    var ctrlAddItem = function () {
        var input, newItem;
        // 1.get fields
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2.add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3.add the item to the UI Controller
            UICtrl.addListItem(newItem, input.type);

            // 4.Clear fileds after Click to adding Item.
            UICtrl.clearFields();

            // 5,Calculate and update budget
            updateBudgets();

            // 6. Calculate and Update precentage
            updatePrecentage();

        }
    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1.delete item from data structre
            budgetCtrl.deleteItem(type, ID)

            // 2.delete the item from the UI
            UICtrl.deleteListItem(itemID)

            // 3.update and show the new budget
            updateBudgets();

            updatePrecentage();

        }

    };

    return {
        init: function () {
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalIncomes: 0,
                totalExpenses: 0,
                precentage: -1
            });
            setupEventListners();
        }
    };

})(budgetController, UIController);


controller.init();