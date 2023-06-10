'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const transferMessage = document.querySelector('.transfer-message');

//Compute the username
//Username should be (The initials), we create a new property to the
//objects which will be the initials called 'username'
const createUsernames = function (accs){
  accs.forEach(function (acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}
createUsernames(accounts)
console.log(accounts)

//-----------------------------------------------------------------------------------------------------------------------
//Function to display the movements of a user
const displayMovements = function (movements){
  //First empty the html already there
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i){

    //Check if the type is a deposit or withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //Create the string literal, for then pass it to the html
    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}€</div>
        </div>
    `;

    //This method accepts two strings. The first is the position, the second is the string we want to insert
    //if we use 'beforeend' the list will be inverted (From oldest to newest)
    containerMovements.insertAdjacentHTML('afterbegin', html);

  })
}
const calcDisplaySummary = function (acc){
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  console.log(incomes);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc +mov, 0);
  console.log(out);
  labelSumOut.textContent = `${Math.abs(out)} €`

  const interest = acc.movements.filter(mov => mov > 0)
      .map(deposit => deposit *acc.interestRate/100)
      .filter((int) => int >= 1) //This makes that only the interests that are more than 1 will get in
      .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.trunc(interest)} €`;

}

//-----------------------------------------------------------------------------------------------------------------------
//Reduce method
//Boil down elements of an array to one single value
//For example to end up with the balance of the account
//The first parameter in this function is the accumulator, that accumulates the value of what we want to return
//The reduce method also needs a value of starting the accumulator (Which in this case will be 0)
const calcAndDisplayBalance = function (acc){
  acc.balance = acc.movements.reduce((accum, mov) => accum + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

//-----------------------------------------------------------------------------------------------------------------------
//Using Map method, to loop over array giving a new array containing in each position
// the result of applying the method to each element.

//Example, all this movements are in EUR and want to convert them into USD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1

/*const movementsUsd = movements.map(function (mov){

  return mov * eurToUsd;
})*/

//With arrow function
const movementsUsd = movements.map (mov => mov * eurToUsd)

//Returns the desctiption of the movement
const movementDescription = movements.map((mov, i) =>

  `Movement: ${i + 1} You ${mov > 0 ? 'deposited' : 'widthdrew'} ${Math.abs(mov)}`
)

//---------------------------------------------------------------------------------------------------------------

//Filter method
//Create an array of the deposits and the widthdreawals (With arrow functions)
const deposits = movements.filter(mov => mov > 0);

const widthdrawals = movements.filter(mov => mov < 0);

console.log(deposits);
console.log(widthdrawals);

//----------------------------------------------------------------------------------------------------------------

//Getting the maximun value of an array, the last number is the starting value (Could put 0 but wont make sense)
const max = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0])

console.log(max)
//3000

//-----------------------------------------------------------------------------------------------------------------
//Chaining methods (One after another)
//For example, get all the movements, convert them from EUR to USD and finally add them all up
//3 Data transformation all in 1 go:
//PIPELINE
const totalDepositsInUsd = movements.filter(mov => mov > 0)
                                    .map(mov => mov * eurToUsd)
                                    .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsInUsd);
// 1645522.000000000001

//-------------------------------------------------------------------------------------------------------------------
//FIND METHOD TO RETRIEVE ONE ELEMENT OF THE ARRAY
//It returns the first element of the array in which the condition is true
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account)
// Object {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, username: "jd"}

//-----------------------IMPLEMENTING THE LOGIN---------------------------------------

let currentAccount;

btnLogin.addEventListener('click', function (e){
  //Prevent form from submiting
  e.preventDefault();

  currentAccount =  accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  //If current account exists
  if (currentAccount?.pin === Number (inputLoginPin.value)){

    //Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    //Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();//So the field looses it's focus.
    updateUserInterface(currentAccount);
  }

});
//-------------Update user UI -----------------------------

const updateUserInterface = function (acc){
  //Display movements
  displayMovements(acc.movements);
  //Display balance
  calcAndDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
}

//---------------------------Transfer money----------------------------
btnTransfer.addEventListener('click', function (e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcoount = accounts.find(acc => acc.username === inputTransferTo.value);

  if (amount > 0 &&
      currentAccount.balance >= amount &&
      receiverAcoount?.username !== currentAccount.username &&
      receiverAcoount){

    currentAccount.movements.push(-amount);
    receiverAcoount.movements.push(amount);
    //Update UI
    updateUserInterface(currentAccount);


  }else {
    transferMessage.textContent = `You dont have enough`
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

})

//Close an account with the findIndex method

btnClose.addEventListener('click', function (e){
  e.preventDefault();

  if (Number(inputClosePin.value) === currentAccount.pin && inputCloseUsername.value === currentAccount.username){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    //delete account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
});

//------Some and Every method--------
//We can use the includes method to see if an array includes certain value
console.log(movements);
console.log(movements.includes(-130));
// true

//However this returns true if its exactly equal, testing for equiality.
//If we want to test over a condition
//See if there was a deposit in this account

const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);
// true

//-----------------REQUEST A LOAN-------------------
//It only gives a loan if there is a deposit with at least 10% of the requested loan amount

btnLoan.addEventListener('click', function (e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount *0.1)){
    currentAccount.movements.push(amount);
    updateUserInterface(currentAccount);
  }
  inputLoanAmount.value = '';
})

//EVERY
//It only passes if ALL the elements in the array has a certain condition
console.log(account4.movements.every(mov => mov > 0));
//true

//------------Flat methods-----------
// removes all nested arrays and convert them into only one (Goes only one level deep)
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
// [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeeper = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeeper.flat(2));
// [1, 2, 3, 4, 5, 6, 7, 8]

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
/*
[200, 450, -400, 3000, -650, -130, 70, 1300]
[5000, 3400, -150, -790, -3210, -1000, 8500, -30]
[200, -200, 340, -300, -20, 50, 400, -460]
[430, 1000, 700, 50, 90]
*/

const allMovements = accountMovements.flat();
console.log(allMovements);
// [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

const overAllBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overAllBalance);
// 17840

//Same thing with flatMap
const overAllFlatMap = accounts.flatMap(acc => acc.movements)
                                .reduce((acc, mov) => acc + mov, 0);
console.log(overAllFlatMap);
// 17840

//---------------------------SORT MOVEMENTS (Sorting arrays) --------------------------------------------------
const owners = ['Jonas', 'Zach', 'Martha', 'Adam'];
//This MUTATES the original array
console.log(owners.sort())
// ["Adam", "Jonas", "Martha", "Zach"]

//Sort numbers
//return <0, a, b
//return > 0 a, b
console.log(movements.sort((a, b) => {
  if (a>b){
    return 1;
  }else if (b > a){
    return -1;
  }
}));


























































