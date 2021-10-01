function loadVisuals() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var visualParams = getVisualParams(this.response);
            Plotly.newPlot('LineGraph', visualParams['LineGraph']['data'], visualParams['LineGraph']['layout']);
            Plotly.newPlot('Pie', visualParams['Pie']['data'], visualParams['Pie']['layout']);
        }
    };
    xhttp.open("GET", "/weather");
    xhttp.send();
}

function setupTemperatureDataPoints(WeatherData) {
    var YearList = [];
    var TemperatureList = [];
    var DataOutput = {mode: 'lines', line: {color: 'rgb(255, 164, 0)', width: 5}};
    for (var yearData in WeatherData) {
        YearList.push(yearData);
        TemperatureList.push(WeatherData[yearData]['temp']);
    }
    DataOutput['x'] = YearList;
    DataOutput['y'] = TemperatureList;
    var dataFormatted = [DataOutput];
    var today = getDate();
    var LayoutOutput = {
        title: '<b> Temperatures of Every ' + today + ' since 1970 </b>',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Temperature in F'
        }, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#FFFFFF'}, showlegend: true
    };
    var FinalOutput = {'data': dataFormatted, 'layout': LayoutOutput};
    return FinalOutput;
}

function setupWeatherDataPoints(WeatherData) {
    var YearList = [];
    var WeatherList = [];
    var DataOutput = {
        values: [],
        labels: [],
        type: 'pie',
        hole: .4
    };
    var today = getDate();
    var LayoutOutput2 = {
        title: '<b> Weather of Every ' + today + ' since 1970 </b>', paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: {color: '#FFFFFF'}, showlegend: true
    };
    for (var yearData in WeatherData) {
        YearList.push(yearData);
        WeatherList.push(WeatherData[yearData]['Condition']);
    }
    var WeatherCount = {'clear-day': 0, 'clear-night': 0, 'rain': 0, 'snow': 0, 'sleet': 0, 'wind': 0, 'fog': 0,
    'cloudy': 0, 'partly-cloudy-day': 0, 'partly-cloudy-night': 0};
    for(var Weather in WeatherList) {
        WeatherCount[WeatherList[Weather]] += 1;
    }
    var ValuesList = [];
    var LabelsList = [];
    for(Weather in WeatherCount) {
        var tempCount = WeatherCount[Weather];
        if(tempCount > 0) {
            WeatherCount[Weather] = parseInt((tempCount / WeatherList.length) * 100);
            ValuesList.push(WeatherCount[Weather]);
            LabelsList.push(Weather);
        }
    }
    DataOutput['values'] = ValuesList;
    DataOutput['labels'] = LabelsList;
    
    var dataFormatted2 = [DataOutput];
    var FinalOutput = {'data': dataFormatted2, 'layout': LayoutOutput2};
    return FinalOutput;

}

function getVisualParams(jsonStr) {
    var WeatherData = JSON.parse(jsonStr);
    var TemperatureVisualData = setupTemperatureDataPoints(WeatherData);
    var WeatherVisualData = setupWeatherDataPoints(WeatherData);
    return {LineGraph: TemperatureVisualData, Pie: WeatherVisualData};
}


function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = mm + '/' + dd
    return today
}