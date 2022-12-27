const _passcode = '000111000';
const _passhint = 'SOS binary morse';
const login_click = () => {
    let _pass = document.getElementById('tpass');
    if(_pass.value == _passcode) {
        _pass.value = '';
        _pass.placeholder = 'OK! Sign in';
        setTimeout(() => {
            _pass.placeholder += '.';
            setTimeout(() => {
                _pass.placeholder += '.';
                setTimeout(() => {
                    _pass.placeholder += '.';
                    setTimeout(() => { window.location.href = './main.html'; } , 500);
                } ,1000);
            } ,1000);
        } ,1000);
    }
    else {
        _pass.value='';
        _pass.placeholder = 'Invalid! Try Again';
        setTimeout(() => {
            _pass.placeholder = _passhint;
        }, 3000);
    }
}