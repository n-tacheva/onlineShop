const data = [{
    "ProductID": 1,
    "ProductName": "Chai",
    "UnitPrice": 18,
    "UnitsInStock": 39,
    "DeliveryOn": new Date(1996, 8, 20)
},
{
    "ProductID": 2,
    "ProductName": "Chang",
    "UnitPrice": 19,
    "UnitsInStock": 17,
    "DeliveryOn": new Date(1996, 7, 12)
},
{
    "ProductID": 3,
    "ProductName": "Aniseed Syrup",
    "UnitPrice": 10,
    "UnitsInStock": 0,
    "DeliveryOn": new Date(1996, 8, 26)
},
{
    "ProductID": 4,
    "ProductName": "Chef Anton's Cajun Seasoning",
    "UnitPrice": 22,
    "UnitsInStock": 53,
    "DeliveryOn": new Date(1996, 9, 19)
},
{
    "ProductID": 5,
    "ProductName": "Chef Anton's Gumbo Mix",
    "UnitPrice": 21.35,
    "UnitsInStock": 0,
    "DeliveryOn": new Date(1996, 7, 17)
},
{
    "ProductID": 6,
    "ProductName": "Grandma's Boysenberry Spread",
    "UnitPrice": 25,
    "UnitsInStock": 120,
    "DeliveryOn": new Date(1996, 9, 19)
},
{
    "ProductID": 7,
    "ProductName": "Uncle Bob's Organic Dried Pears",
    "UnitPrice": 30,
    "UnitsInStock": 0,
    "DeliveryOn": new Date(1996, 7, 22)
},
{
    "ProductID": 8,
    "ProductName": "Northwoods Cranberry Sauce",
    "UnitPrice": 40,
    "UnitsInStock": 0,
    "DeliveryOn": new Date(1996, 11, 1)
},
{
    "ProductID": 9,
    "ProductName": "Mishi Kobe Niku",
    "UnitPrice": 97,
    "UnitsInStock": 29,
    "DeliveryOn": new Date(1997, 1, 21)
},
{
    "ProductID": 10,
    "ProductName": "Ikura",
    "UnitPrice": 31,
    "UnitsInStock": 31,
    "DeliveryOn": new Date(1996, 8, 5)
}]

///fix months starting from 0 in js
data.forEach(product => {
    product.DeliveryOn = new Date(product.DeliveryOn.setMonth(product.DeliveryOn.getMonth()-1))
})

console.log(data)
let dataSchema = new kendo.data.DataSource({
    data,
    schema: {
        model: {
            fields: {
                ProductID: {type: "number"},
                ProductName: {type: "string"},
                UnitPrice: {type: "number"},
                UnitsInStock: {type: "number"},
                DeliveryOn: {type: "date"},
            }
        }
    },
    pageSize: 10,
    sort: {
        field: "ProductName",
        dir: "asc"
    },
});

$("#listView").kendoListView({
    dataSource: dataSchema,
    template: kendo.template($("#template").html())
});

data.forEach(product => {
    const {ProductID} = product 

    $(`#popup-${ProductID}`).kendoPopup({
        anchor: $(`#product-${ProductID}`),
        position: "bottom left"
    });
    const popup = $(`#popup-${ProductID}`).data("kendoPopup");

    $(`#open-${ProductID}`).click(() =>{
        popup.open({
            effects: "fadeIn zoom:in",
            duration: 300,
          });
    });

    // $(`#popup-${ProductID}`).mouseleave(() => {
    //     popup.close({
    //         effects: "fadeOut zoom:out",
    //         duration: 300
    //       });
    // });
});

$("#pager").kendoPager({
    dataSource: dataSchema,
});

