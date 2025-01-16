// Calculator Functions //
function Solve(val) {
  var v = document.getElementById("res");
  v.value += val;
}
function Result() {
  var num1 = document.getElementById("res").value;
  try {
    var num2 = eval(num1.replace("x", "*"));

    num2 = num2.toFixed(2);

    document.getElementById("res").value = num2;
  } catch {
    document.getElementById("res").value = "Error";
  }
}
function Clear() {
  var inp = document.getElementById("res");
  inp.value = "";
}
function Back() {
  var ev = document.getElementById("res");
  ev.value = ev.value.slice(0, -1);
}
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const validKeys = "0123456789+-*/.%";
  if (validKeys.includes(key)) {
    // Prevent multiple decimal points in a number
    let currentValue = document.getElementById("res").value;
    if (key === "." && currentValue.includes(".")) {
      return; // Prevent adding another decimal point
    }

    Solve(key === "*" ? "x" : key);
  } else if (key === "Enter") {
    Result();
  } else if (key === "Backspace") {
    Back();
  } else if (key.toLowerCase() === "c") {
    Clear();
  }
});
