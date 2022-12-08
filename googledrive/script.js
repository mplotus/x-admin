var _arrAccounts = new Array();
var _arrPassword = new Array();
const page_load = () => {
    fetch('./accounts.xml').then(res => {
        res.text().then(xml => {
            let _parser = new DOMParser();
            let _accs = _parser.parseFromString(xml, 'application/xml').querySelectorAll('acc');
            for(i=0; i<_accs.length; i++) {
                let _item = document.createElement('option');
                _item.innerText = _accs[i].id;
                _arrAccounts.push(_accs[i].id);
                _arrPassword.push(_accs[i].slot);
                document.getElementById('x_accounts').appendChild(_item);
            }
            let _password = document.getElementById('x_password');
            _password.value = _arrPassword[0];
        })
    });
}
const show_pass = () => {
    let _pass = document.getElementById('x_password');
    let _button = document.getElementById('x_showhide');
    if(_pass.type == 'password') { 
        _pass.type = 'text';
        _button.innerText = 'hide';
    }
    else {
        _pass.type = 'password';
        _button.innerText = 'show';
    }
}
const account_change = () => {
    let _index = document.getElementById('x_accounts').selectedIndex;
    document.getElementById('x_password').value = _arrPassword[_index];
}