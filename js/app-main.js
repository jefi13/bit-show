const mainModule = ((data, ui) => {
    // Initialize displaying top 50 shows at landing page
    const init = () => {        
        $.get(data.apiURLs.url)
        .done((response) => {
            const showList = data.createTop50(response);
            ui.displayTop50(showList);
        })
        .fail((response) => {
            alert("Your request failed!");
        });
    }

    // Initialize displaying selected TV show by be redirected to the "Show Info Page"
    const initSelectedShow = () => {
        const selectedShowJSON = localStorage.getItem("id");
        const selectedShow = JSON.parse(selectedShowJSON);
        ui.displaySelectedShow(selectedShow);
    }

    // Search on input data to search box
    $(uiModule.DOMSelectors.searchShowsInput).on('keyup', searchShow);

    // Function for searching
    function searchShow(event) {
        const searchInput = $(uiModule.DOMSelectors.searchShowsInput);

        const urlSearch = dataModule.apiURLs.urlSearch;
        const searchValue = searchInput[0].value;
        const searchByShowName = `${urlSearch}${searchValue}`;

        if (searchValue.length < 3) {
            return;
        }

        $.get(searchByShowName)
        .done((response) => {
            const list = dataModule.createSearchDropdown(response);
            uiModule.createSearchValues(list);
        });
    }

    $(document).on('click', ".single-show", function () {
        const currentID = this.getAttribute("id");
        dataModule.addToLocalStorage("id", currentID);
        window.location.href = './show_info.html';
    });

    // Exposed functions
    return {
        init,
        initSelectedShow
    }

})(dataModule, uiModule)