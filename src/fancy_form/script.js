function onlyNumberKey(e) {
  // Only ASCII charactar in that range allowed
  var ASCIICode = e.which ? e.which : e.keyCode;
  return !(ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57));
}

function onlyCurrencyKey(e) {
  var ASCIICode = e.which ? e.which : e.keyCode;
  return onlyNumberKey(e) || ASCIICode == 46 || ASCIICode == 44;
}

function clickEvent(first, next, prev) {
  if (first.value.length) {
    document.getElementById(next).focus();
  } else {
    document.getElementById(prev).focus();
  }
}

function checkBalance(e) {
  e.preventDefault();
  let balance = document.getElementById('balance').innerHTML;
  balance = Number(balance.replaceAll(',', ''));
  let send = document.getElementById('input-amount').value;
  send = Number(send.replaceAll(',', ''));
  console.log(balance);
  console.log(send);
  if (send > balance) {
    document.getElementById('input-amount').style.borderColor = 'red';
    document.getElementById('warn').style.visibility = 'visible';
    setTimeout(() => {
      document.getElementById('input-amount').style.borderColor =
        'rgba(0,0,0,0)';
      document.getElementById('warn').style.visibility = 'hidden';
    }, 3000);
  } else {
    document.getElementById('balance').innerHTML = Number(
      balance - send
    ).toLocaleString();
    let color = document.getElementById('balance').style.color;
    document.getElementById('balance').style.color = 'rgb(255, 55, 55)';
    document.getElementById('balance-curr').style.color = 'rgb(255, 55, 55)';
    setTimeout(() => {
      document.getElementById('balance').style.color = color;
      document.getElementById('balance-curr').style.color = color;
    }, 1000);
  }
}
