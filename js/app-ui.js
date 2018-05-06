const uiModule = (() => {
    // DOM selectors
    const DOMSelectors = {
        top50DivOutput: '#top-50',
        searchShowsInput: '#search-show',
        navForm: '.form-inline',
        selectedShowOutput: '#selected-show',
        selectedShowTitle: '#show-title'
    }

    // Display top 50 TV shows at landing page
    const displayTop50 = (showList) => {
        showList.forEach((show) => {
            const $divColumn = $('<div>');
            const $divShow = $('<div>');
            const $poster = $('<img>');
            const $title = $('<p>');
            $divColumn.addClass('col-12 col-md-6 col-xl-4');
            $divShow.addClass('singleShow hoverDiv');
            $poster.attr('id', show.id);
            $poster.attr('src', show.poster);
            $poster.attr('alt', show.title);
            $title[0].textContent = show.title;
            $divShow.append($poster);
            $divShow.append($title);
            // $divShow.addClass("single-show");
            $divColumn.append($divShow);
            $(DOMSelectors.top50DivOutput).append($divColumn);
        });
    }

    // // Display selected TV show by be redirected to the "Show Info Page"
    const displaySelectedShow = (show) => {
        const posterDiv = createCols(6);
        const poster = $('<img>');
        const rightDiv = createCols(6);
        const summaryDiv = createCols(12);
        const ulSeasons = createULSeasons(show);
        const ulCast = createULCasts(show);

        $(DOMSelectors.selectedShowTitle)[0].textContent = show.name;

        poster.addClass('showPoster');
        poster.attr('src', show.poster);
        poster.attr('alt', show.title);
        posterDiv.append(poster);
        $(DOMSelectors.selectedShowOutput).append(posterDiv);

        rightDiv.append('<h2>Seasons</h2>');
        rightDiv.append(ulSeasons)

        rightDiv.append('<h2>Cast</h2>');
        rightDiv.append(ulCast);
        
        $(DOMSelectors.selectedShowOutput).append(rightDiv);

        summaryDiv.append(show.summary);

        $(DOMSelectors.selectedShowOutput).append('<h3>Show Details</h3>');
        $(DOMSelectors.selectedShowOutput).append(summaryDiv);
    }

    const displaySearchDropdown = (search) => {
        const searchInput = $(DOMSelectors.searchShowsInput);
        const ul = createSearchValues(search);
        ul[0].style.display = "block";
    }

    const createSearchValues = (search) => {
        const $ul = $('<ul>');
        search.forEach((element) => {
            $ul.append(`<li id="${element.id}">${element.name}</li>`);
        })
        return $ul;
    }

    // Create unorder list of show's seasons
    const createULSeasons = (show) => {
        const $ul = $('<ul>');

        show.seasons.forEach((season) => {
            $ul.append(`<li>${season.startDate} - ${season.endDate}</li>`);
        });

        return $ul;
    }

    // Create unorder list of show's cast
    const createULCast = (show) => {
        const ul = $('<ul>');

        show.cast.forEach((cast) => {
            ul.append(`<li>${cast.fullName}</li>`)
        });

        return $ul;
    }

    // Create columns
    const createCols = (rows) => {
        const columnDiv = $('<div>');
        columnDiv.addClass(`col-xl-${rows}`)
        return columnDiv;
    }

    // Exposed constants and functions
    return {
        DOMSelectors,
        displayTop50,
        displaySearchDropdown,
        createSearchValues,
        displaySelectedShow
    }
})()