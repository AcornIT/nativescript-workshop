//Using http methods requires to load "http" module.
var http = require("http");

//navigation
var frameModule = require("ui/frame");

var page = null;
var url = "http://192.168.1.220:3000"; //the server url

var productsList = null;
var products = [];

exports.onNavigatingTo = function onNavigatingTo(args) {
	
    page = args.object; 
    
    //add the css file
    page.addCssFile('~/res/css/main-page.css');
    
    //get the ui repeater component 'Product List' 
    productsList = page.getViewById("productsList");

    //set the product list items 
    productsList.items = products
    
    //async load the products
    if(products.length === 0)
    	loadItems();
    
};

exports.showDetails = function(args) {
	var data = args.object.bindingContext;
	
	var topmost = frameModule.topmost();
	var navigationEntry = {
		    moduleName: "pages/product-details/product-details",
		    context: {productData : data},
		    animated: true
		};
	topmost.navigate(navigationEntry);
};


function loadItems() {
	http.getJSON(url + '/api/Items').then(function (rsp) {

		for(var key in rsp) {
			var prod = rsp[key];
			//set each product image source
			prod.imgSrc = url + '/res/img/products/' + prod.itemnum + '.jpg';
			//add the product to the list
			products.push(prod);
		}
		
		//manually refresh the list
		productsList.refresh();
		
	}, function (err) {
		
		//print the error to the console
		console.log(err.message);
		
		//show the error in an alert box
		alert(err.message);
	});
}