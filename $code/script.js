const page_load = () => {
    fetch('./googledrive/data.xml').then(res => {
        res.text().then(xml => {
            let _parser = new DOMParser();
            let _root = _parser.parseFromString(xml, 'application/xml').querySelector('root');
            
        })
    });
}