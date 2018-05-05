const dataModule = (() => {

    // TV Maze API
    const apiURLs = {
        // List of shows endpoint
        url: 'http://api.tvmaze.com/shows',
        // Single show data
        urlSearch: 'http://api.tvmaze.com/search/shows?q='
    }

    /**
     * Represent basic info about TV show at top 50
     * @constructor
     * @param {number} id - The TV show's id
     * @param {string} title - The TV show's title
     * @param {string} poster - The TV show's poster URL
     */
    class ShowBasic {
        constructor(id, title, poster = "") {
            this.id = id;
            this.title = title;
            this.poster = poster;
        }
    }

    // methods

    // Create the list of top 50 TV shows
    const createTop50 = (showResponse) => {
        let showList = [];

        // Filter TV shows with average rating above 8
        const topShows = showResponse.filter(showResponse => showResponse.rating.average >= 8.5);

        topShows.forEach((show, index) => {
            if (index < 50) {
                showList.push(new ShowBasic(show.id, show.name, show.image.medium));
            }
        });

        return showList;
    }

    // Create the list of max 10 shows for search dropdown list
    const createSearchDropdown = (searchShows) => {
        let showSearchList = [];

        searchShows.forEach((show, index) => {
            if (index < 10) {
                showSearchList.push(new ShowBasic(show.id, show.name));
            }
        });

        return showSearchList;
    }

    /**
     * Represent the cast's list of the TV show
     * @constructor
     * @param {string} fullName - The cast's full name
     */
    class Cast {
        constructor(fullName) {
            this.fullName = fullName;
        }
    }

    // method

    // Create the list of cast of the TV show
    const createCastList = (cast) => {
        let castList = [];

        cast.forEach((cast) => {
            castList.push(new Cast(cast.fullName));
        });

        return castList;
    }

    /**
     * Represent the season's list of the TV show
     * @constructor
     * @param {string} startDate - The start date of the given season
     * @param {string} endDate - the end date of the given season
     */
    class Season {
        constructor(startDate, endDate) {
            this.startDate = startDate;
            this.endDate = endDate;
        }
    }

    // method

    // Create the list of seasons of the TV show with premiere date and end date for each season
    const createSeasonList = (seasons) => {
        let seasonList = [];

        seasons.forEach((season) => {
            seasonList.push(new Season(season.premiereDate, season.endDate));
        });

        return seasonList;
    }

    /**
     * Represent basic info about TV show at top 50
     * @constructor
     * @param {number} id - The TV show's id
     * @param {string} title - The TV show's title
     * @param {string} poster - The TV show's poster URL
     * @param {string} summary - The TV show's summary
     * @param {Array<Season>} seasons - The list of TV show's seasons
     * @param {Array<Cast>} casts - The list of Tv show's cast
     */
    class SelectedShow extends ShowBasic {
        constructor(id, title, poster, summary, seasons, casts) {
            super(id, title, poster);
            this.summary = summary;
            this.seasons = seasons;
            this.casts = casts;
        }
    }

    // methods

    // Create selected show
    const createSelectedShow = (show) => {
        return new SelectedShow(id, show.name, show.image, show.summary, show.seasonList, show.castList);
    }

    // Add selected show to the local storage
    const addToLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    }

    // Get ID of selected show from the local storage
    const getSelectedShowID = (key) => {
        return localStorage.getItem(key);
    }

    // Exposed constants and functions
    return {
        apiURLs,
        createTop50,
        createSearchDropdown,
        createCastList,
        createSeasonList,
        createSelectedShow,
        addToLocalStorage,
        getSelectedShowID
    }
})()