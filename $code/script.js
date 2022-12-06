const page_load = () => {
    
}
var _passHint = 'SOS binary morse code';
var _passAct = '000111000';
const forgot_pw = () => {
    if(document.getElementById('tx_pw').placeholder != _passHint) 
        document.getElementById('tx_pw').placeholder = _passHint;
    else document.getElementById('tx_pw').placeholder = 'Enter administrator password';
}
const pass_signin = () => {
    if(document.getElementById('tx_pw').value == _passAct) {
        document.getElementById('tx_pw').value = '';
        document.getElementById('tx_pw').placeholder = 'Signing in, please wait...';
        setTimeout(() => {
            let _address = window.location.href.replace('index.html','');
            window.location.href = _address + 'main.html';
        }, 2000);
    }
    else {
        document.getElementById('tx_pw').value = '';
        document.getElementById('tx_pw').style.boxShadow = '0 0 15px red';
        document.getElementById('tx_pw').placeholder = 'Invalid administrator password';
        setTimeout(() => {
            document.getElementById('tx_pw').focus();
            document.getElementById('tx_pw').style.boxShadow = 'none';
            document.getElementById('tx_pw').placeholder = 'Enter administrator password';
        }, 2000);
    }
}