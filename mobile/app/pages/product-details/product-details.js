var observable = require("data/observable");
var viewModel = new observable.Observable();

var page = null;
var productData = null;

exports.onNavigatingTo = function onNavigatingTo(args) {
	
	page = args.object;
	
	//add the css file
    page.addCssFile('~/res/css/product-details.css');
	
    //get the navigation context
	productData = page.navigationContext.productData;
	
	//set the page title 
	page.actionBar.title = productData.itemname;
	
	viewModel.set("imgSrc", productData.imgSrc);
	viewModel.set("catdescription", productData.catdescription);
	
	page.bindingContext = viewModel;
}