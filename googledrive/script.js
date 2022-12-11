var _arrAccounts = new Array();
var _arrPassword = new Array();
var _arrFDrive = new Array();
var _arrFileSize = new Array();
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
    fetch('./data.xml').then(resp => {
        resp.text().then(xmlf => {
            let _pars = new DOMParser();
            let _dirs = _pars.parseFromString(xmlf, 'application/xml').querySelectorAll('dir');
            for(i=0; i<_dirs.length; i++) {
                for(j=0; j<_dirs[i].children.length; j++) {
                    if(_dirs[i].children[j].nodeName != 'dir') {
                        _arrFDrive.push(_dirs[i].children[j].className);
                        _arrFileSize.push(new Array(_dirs[i].children[j].id, _dirs[i].children[j].slot, _dirs[i].children[j].nodeName));
                    }
                }
            }
            selected_account('mplotus.github.io');
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
    let _accName = document.getElementById('x_accounts').value;
    selected_account(_accName);
}
const selected_account = _account => {
    let _filesSize = new Array();
    for(i=0; i<_arrFDrive.length; i++) {
        if(_account == _arrFDrive[i] + '.mplotus') _filesSize.push(new Array(_arrFileSize[i][0], _arrFileSize[i][1],_arrFileSize[i][2]));
    }
    let _sumSize = 0;
    // Clear table
    let _tbFiles = document.getElementById('tb_filelist');
    while(_tbFiles.children.length>1) {
        _tbFiles.removeChild(_tbFiles.children[1]);
    }
    for(i=0; i<_filesSize.length; i++) {
        let _strSize = _filesSize[i][0];
        let _sizeType = _strSize[_strSize.length - 1];
        let _size = parseFloat(_strSize.substring(0, _strSize.length - 1));
        let _factor = (_sizeType == 'm')?0.954:((_sizeType == 'g')?953.674:1);
        _sumSize += _size * _factor;
        // Add file name to table file list
        let _trFile = document.createElement('tr');
        let _tdName = document.createElement('td');
        _tdName.innerText = _filesSize[i][1];
        _tdName.style.paddingRight = '30px';
        _trFile.appendChild(_tdName);
        let _tdSize = document.createElement('td');
        _tdSize.innerText = resize_ubuntu(_filesSize[i][0]);
        _tdSize.style.paddingLeft = '30px';
        _tdSize.style.paddingRight = '30px';
        _trFile.appendChild(_tdSize);
        let _tdType = document.createElement('td');
        _tdType.innerText = _filesSize[i][2].replace('_','');
        _tdType.style.paddingLeft = '30px';
        _tdType.style.paddingRight = '30px';
        _trFile.appendChild(_tdType);
        _tbFiles.appendChild(_trFile);
    }
    let _useGB = Math.floor(_sumSize / 1000 * 100) / 100; 
    let _freGB = Math.floor((15 - _useGB) * 100) / 100;
    document.getElementById('x_useinf').innerText = _useGB + 'GB';
    document.getElementById('x_freinf').innerText = _freGB + 'GB';
    let _useBar = document.getElementById('x_usage');
    _useBar.style.width = Math.floor(_useGB * 200 / 15.0).toString() + 'px';
    if(_useGB < 7.5) {
        _useBar.style.backgroundColor = '#0000a0';
        _useBar.style.boxShadow = '0 0 10px white';
    }
    else if(_useGB < 11.25) {
        _useBar.style.backgroundColor = '#00a000';
        _useBar.style.boxShadow = '0 0 10px white';
    }
    else if(_useGB < 13.5) {
        _useBar.style.backgroundColor = '#a0a000';
        _useBar.style.boxShadow = '0 0 10px white';
    }
    else {
        _useBar.style.backgroundColor = '#a00000';
        _useBar.style.boxShadow = '0 0 10px white';
    }

}
const resize_ubuntu = _size => {
    let _sizeType = _size[_size.length - 1];
    let _rsize = parseFloat(_size.substring(0, _size.length - 1));
    let _factor = (_sizeType == 'm')?0.954:((_sizeType == 'g')?953.674:1);
    let _msize = _rsize * _factor;
    if(_msize > 0.9 * 1024) {
        return (Math.floor(_msize / 1024 * 100) / 100.0).toString() + 'GB';
    }
    else {
        return (Math.floor(_msize * 100) / 100.0).toString() + 'MB';
    }
}