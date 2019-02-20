// BUDGET CONTROLLER
var budgetController = (function () {

    // Constructors
    var Expense = function(id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
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
        }
    }

    
    return {
        addItem: function(type,des,val) {
            var newItem, ID;

            // Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else {
                ID = 0
            }

            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    }

})();

///////////////////////////////////////////////////////////////////

// UI CONTROLLER
var UIController = (function () {

    var DOMStrings = {
        inputTypes: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddBtn: '.add__btn'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputTypes).value,  // Will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value, 
                value: document.querySelector(DOMStrings.inputValue).value,
            }
        },
        getDOMStrings: function() {
            return DOMStrings;
        }
    }

})();



///////////////////////////////////////////////////////////////////


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListners = function() {
        var DOM = UICtrl.getDOMStrings();
        
        document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
    };

    var ctrlAddItem = function () {
        var input, newItem;
        // 1.get fields
        input = UICtrl.getInput();

        // 2.add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        // 3.add the item to the UI Controller

        // 4.Calculate the budget

        // 5.Display the budget on the UI

    };

    return {
        init: function() {
            console.log('Application has started');
            setupEventListners();
        }
    }

})(budgetController, UIController);


controller.init();