// https://dummyjson.com/products/search?q=XXX&limit=5&delay=1000

async function getSearch(phrase) {
    const response = await fetch("https://dummyjson.com/products/search?q="+ phrase +"&limit=5&delay=1000");
    const list = await response.json();
    // const list = JSON.parse('{"products":[{"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/2.jpg","https://cdn.dummyjson.com/product-images/1/3.jpg","https://cdn.dummyjson.com/product-images/1/4.jpg","https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"]},{"id":49,"title":"Chappals & Shoe Ladies Metallic","description":"Womens Chappals & Shoe Ladies Metallic Tong Thong Sandal Flat Summer 2020 Maasai Sandals","price":23,"discountPercentage":2.62,"rating":4.72,"stock":107,"brand":"Maasai Sandals","category":"womens-shoes","thumbnail":"https://cdn.dummyjson.com/product-images/49/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/49/1.jpg","https://cdn.dummyjson.com/product-images/49/2.jpg","https://cdn.dummyjson.com/product-images/49/3.webp","https://cdn.dummyjson.com/product-images/49/thumbnail.jpg"]},{"id":53,"title":"printed high quality T shirts","description":"Brand: vintage Apparel ,Export quality","price":35,"discountPercentage":7.54,"rating":4.89,"stock":6,"brand":"Vintage Apparel","category":"mens-shirts","thumbnail":"https://cdn.dummyjson.com/product-images/53/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/53/1.webp","https://cdn.dummyjson.com/product-images/53/2.jpg","https://cdn.dummyjson.com/product-images/53/3.jpg","https://cdn.dummyjson.com/product-images/53/4.jpg","https://cdn.dummyjson.com/product-images/53/thumbnail.jpg"]}],"total":3,"skip":0,"limit":3}');
    console.log(list);
    console.log(list['products'])
    return list['products'];
  }

  
  const input = document.getElementById("search_input").querySelector("input");
  const searchOutput = document.getElementById("search_output");
  const spinner = document.getElementById("spinner");
  
  let delayTimer;
  
  input.addEventListener('input', function () {
      clearTimeout(delayTimer);
  
      const searchTerm = input.value;
  
      delayTimer = setTimeout(async function () {
          if (searchTerm.length >= 3) {
              searchOutput.innerHTML = "";
  
              console.log(searchTerm);
              try {
                  spinner.style.display = "block";
                  const result = await getSearch(searchTerm);
  
                  console.log(result);
                  result.forEach(item => {
                      searchOutput.innerHTML += "<li>" + item["title"] + "<span>$" + item["price"] + "</span></li>";
                      searchOutput.innerHTML += "<hr>";
                  });
                  searchOutput.style.display = "block";
                  spinner.style.display = "none";
              } catch (error) {
                  console.error(error);
              }
          } else {
              searchOutput.style.display = "none";
          }
      }, 500); 
  });
  