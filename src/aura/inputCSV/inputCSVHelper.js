({
    parseFile : function(component) {
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        if (file.size > this.MAX_FILE_SIZE) {
            alert('File size cannot exceed ' + this.MAX_FILE_SIZE + ' bytes.\n' +
                  'Selected file size: ' + file.size);
            return;
        }
        this.parse(file);
    },
    MAX_FILE_SIZE: 4 500 000
})