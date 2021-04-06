   // delete a pattern: get a pattern and replace it with ""
 class FormatText{
    constructor(text="",pattern){
        this.text = text;
        this.pattern = pattern;
    }

    // delete a pattern: get a pattern and replace it with ""
    deletePattern = () => {
        return this.text.replace(new RegExp(this.pattern,"ig"),"");
    }
}

module.exports = FormatText