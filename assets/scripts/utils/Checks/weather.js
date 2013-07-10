define(['require'], function (require) {

	// Only load the 'weather' module if it's available on the page
    var weather_table = document.querySelector('.weather-table');
    var news_weather_table = document.querySelector('.news-weather-table');

    if (!!weather_table || !!news_weather_table) {
        // We know that one of the selectors above matched, so lets find out which...
        var selector = (!!weather_table) ? '.weather-table' : '.news-weather-table';

        // We'll create a new Weather Backbone View instance and pass in the relevant selector/element
        require(['../../Views/Weather'], function (Weather) {
            new Weather({
            	el: $(selector)
            });
        });
    }

});