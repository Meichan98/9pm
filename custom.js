let dataRender = [...dataSet];
let maxRows = 10;
let currentPage = 1;

// let isSearch = false;
// let dataSearch = [];
// let lenListSearch = 0;

const $ = (el) => {
	return document.querySelectorAll(el);
  }
const renderDataTable = (data) => {
	let htmlTable = "";
	data.forEach(element => {
	  var str = "<tr>";
	  element.forEach((field) => {
		var tr = `<td>${field}</td>`
		str += tr;
	  })
	  str += "</tr>"
	  htmlTable += str;
	});
	$('#table-body')[0].innerHTML = htmlTable;

} 

const renderPagination = (data, maxRow, current) => {
	let htmlPagination = "";
	for (idx = 0; idx < Math.ceil(data.length / maxRow); idx++) {
		var str = `<li class= "pagination-page">${idx+1}</li>`
		if (current == idx + 1) {
			str = `<li class= "pagination-page page-current">${idx+1}</li>`
		}
		htmlPagination += str;
	}
	$(".pagination-list")[0].innerHTML = htmlPagination;
	selectPage();
	addCSSPagination(0);
}

const addCSSPagination = (idx) => {
	$(".pagination-page").forEach((element, index) =>{
		element.setAttribute("class", "pagination-page");
		if (idx == index) {
			element.setAttribute("class", "pagination-page current-page");
		}
	})
	if (idx == $(".pagination-page").length - 1) {
		$(".next-btn")[0].setAttribute("class", "btn next-btn btn-disable")
	} else {
		$(".next-btn")[0].setAttribute("class", "btn next-btn")

	}
	if (idx == 0) {
		$(".prev-btn")[0].setAttribute("class", "btn prev-btn btn-disable")
	} else {
		$(".prev-btn")[0].setAttribute("class", "btn prev-btn")

	}
	
}

const selectPage = () => {
	$(".pagination-page").forEach((element, index) => {
		element.addEventListener("click", () => {
			changePage(index + 1, maxRows);
		})
	})
}



const changePage = (nextPage, maxRow) => {
	const dataDisplay = dataRender.slice(parseInt((nextPage - 1) * maxRow), parseInt(nextPage * maxRow));
	addCSSPagination(nextPage -1);
	currentPage = nextPage;
	renderDataTable(dataDisplay);
}

const goNextPage = () => {
	const maxPage = Math.ceil(dataRender.length / maxRows);
	if (currentPage <= maxPage - 1) {
		changePage(currentPage + 1, maxRows);
	}
}

const goPrevPage = () => {
	if (currentPage >= 2) {
		changePage(currentPage -1, maxRows)
	}
}


const renderAll = (dataRender, dataTotal, maxRow, currentPage) => {
	renderDataTable(dataRender);
	renderPagination(dataTotal, maxRow, currentPage);
}

// const handleSearch = (values, maxRows) => {

// 	values = values.toUpperCase().trim();
// 	isSearch = values.length !== 0;
// 	let newData;
// 	if (isSearch) {
// 	  // currentPage =1;
// 	  newData = dataSet.filter((row) =>
// 		row[0].toUpperCase().includes(values) |
// 		row[1].toUpperCase().includes(values) |
// 		row[2].toUpperCase().includes(values) |
// 		row[3].toUpperCase().includes(values) |
// 		row[4].toUpperCase().includes(values) |
// 		row[5].toUpperCase().includes(values));
// 	  lenListSearch = newData.length;
// 	  $('.cancel-search')[0].style.display = "block";
// 	} else {
// 	  newData = [...dataSet];
// 	  $('.cancel-search')[0].style.display = "none";
// 	}
// 	dataRender = newData;
// 	DataDisplay = newData.slice(0, maxRows);
// 	renderAll(DataDisplay, newData, maxRows, 1);
  
//   }

window.onload = () => {
	let dataDisplay = dataRender.slice(0, maxRows);
	renderAll(dataDisplay, dataRender, maxRows, currentPage);

	$("#rowperpage")[0].addEventListener("change", (e) => {
		currentPage = 1;
		const limitRows = e.target.value;
		maxRows = Math.min(limitRows, dataRender.length)
		dataDisplay = dataRender.slice(0, maxRows);
		renderAll(dataDisplay, dataRender, maxRows, currentPage);
	})

	// $(".next-btn")[0].addEventListener("click", () => goNextPage());
	$(".next-btn")[0].addEventListener("click", () => goNextPage());
	$(".prev-btn")[0].addEventListener("click", () => goPrevPage());


// 	$("#table__search")[0].addEventListener("keyup", (e) => {
// 		handleSearch(e.target.value, maxRows), currentPage = 1
// 	  });

// 	    ///cancel search
//   $('.cancel-search')[0].addEventListener("click", () => {
//     dataRender = [...dataSet];
//     isSearch = false;
//     $("#table__search")[0].value = "";
//     $('.cancel-search')[0].style.display = "none";
//     let DataDisplay = dataRender.slice(0, maxRows);
//     renderAll(DataDisplay, dataRender, maxRows, currentPage);
//   });
}