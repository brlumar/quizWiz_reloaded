const questionData = [
  {
      question: 'What is the purpose of the "typeof" operator in JavaScript?',
      answers: [
          { text: 'Determining the data type of a variable', correct: true },
          { text: 'Testing for equality', correct: false },
          { text: 'Accessing object properties', correct: false },
          { text: 'Looping over arrays', correct: false },
      ]
  },
  {
      question: 'How can you create a new array by extracting a subset of elements from an existing array in JavaScript?',
      answers: [
          { text: 'Using the splice() method', correct: false },
          { text: 'Using the slice() method', correct: true },
          { text: 'Using the filter() method', correct: false },
          { text: 'Using the concat() method', correct: false },
      ]
  },
  {
      question: 'What is the difference between "undefined" and "null" in JavaScript?',
      answers: [
          { text: 'They are identical and can be used interchangeably', correct: false },
          { text: 'Undefined represents a variable that has been declared but not assigned a value, while null represents a deliberate absence of value', correct: true },
          { text: 'Undefined is a data type, while null is an object', correct: false },
          { text: 'Undefined is used for string values, while null is used for numeric values', correct: false },
      ]
  },
  {
      question: 'Which keyword is used to declare a constant variable in JavaScript?',
      answers: [
          { text: 'var', correct: false },
          { text: 'let', correct: false },
          { text: 'const', correct: true },
          { text: 'static', correct: false },
      ]
  },
  {
      question: 'What does the "this" keyword refer to in JavaScript?',
      answers: [
          { text: 'The current function', correct: false },
          { text: 'The global object', correct: false },
          { text: 'The object that owns the executing code', correct: true },
          { text: 'The previous function in the call stack', correct: false },
      ]
  },
  {
      question: 'How can you convert a string to a number in JavaScript?',
      answers: [
          { text: 'Using the parseInt() function', correct: true },
          { text: 'Using the toString() method', correct: false },
          { text: 'Using the Math.random() function', correct: false },
          { text: 'Using the JSON.parse() method', correct: false },
      ]
  },
  {
      question: 'What is the purpose of the "addEventListener" method in JavaScript?',
      answers: [
          { text: 'To create a new HTML element', correct: false },
          { text: 'To attach an event handler to an HTML element', correct: true },
          { text: 'To remove an HTML element from the DOM', correct: false },
          { text: 'To execute a function asynchronously', correct: false },
      ]
  },
  {
      question: 'Which operator is used for strict equality comparison in JavaScript?',
      answers: [
          { text: '=', correct: false },
          { text: '==', correct: false },
          { text: '===', correct: true },
          { text: '!=', correct: false },
      ]
  },
  {
      question: 'What is the purpose of the "map" method in JavaScript arrays?',
      answers: [
          { text: 'To filter out elements that match a specific condition', correct: false },
          { text: 'To sort the elements in ascending order', correct: false },
          { text: 'To iterate over each element and modify it', correct: true },
          { text: 'To check if a specific element exists in the array', correct: false },
      ]
  },
  {
      question: 'How can you prevent the default behavior of an event in JavaScript?',
      answers: [
          { text: 'By using the stopPropagation() method', correct: false },
          { text: 'By using the preventDefault() method', correct: true },
          { text: 'By using the return false statement', correct: false },
          { text: 'By using the break keyword', correct: false },
      ]
  },
];
