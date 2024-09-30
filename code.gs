function myFunction() {
  getOptionList()
}


var scriptProp = PropertiesService.getScriptProperties()
var rule_sheet_name  =scriptProp.getProperty('rule-sheet') 

function intialSetup () {
  let activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doGet(e){
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function getOptionList(){								
	try{			
     let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(rule_sheet_name);
     let listOptions =  sheet.getRange("A2:A").getValues()
     let listValues =  sheet.getRange("B2:B").getValues()
     let options = listOptions.filter(v=> v &&  v.toString().trim().length >0  ).map((f,i)=>[f[0].toString(),listValues[i][0]]);
     Logger.log(options);
     return options;				
    }catch(e){		
        SpreadsheetApp.getUi().alert( `error occured :  ${e.message}`);								
        return null;								
    }								
}	
