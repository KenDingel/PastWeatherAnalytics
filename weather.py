import json
import urllib.request
from datetime import datetime
import calendar
oneyearUNIX = 31556926


def getYearsUNIX():
    d = datetime.utcnow()
    unixtime = calendar.timegm(d.utctimetuple())
    CurrentTime = unixtime
    ArrYear = {d.year: CurrentTime}
    Years = int(CurrentTime / oneyearUNIX)
    for i in range(Years):
        YeartoCheckUNIX = CurrentTime - ((i + 1) * oneyearUNIX)
        YeartoCheck = d.year - (i + 1)
        ArrYear[YeartoCheck] = YeartoCheckUNIX
    return ArrYear


def getWeatherData(DateinUNIX):
    jsonHostURL = 'https://api.darksky.net/forecast'
    APIKey = '/bc82ae5a063b799c6a60a342c0056ce7'
    UBCoord = '/43.001188,-78.786305,'
    UNIX = str(DateinUNIX)
    flags = '?exclude=flags,hourly,daily,minutely'
    APIRequestURL = jsonHostURL + APIKey + UBCoord + UNIX + flags
    exportData = {'temp': 0, 'Condition': 'rain'}
    with urllib.request.urlopen(APIRequestURL) as f:
        jsonData01 = f.read().decode('utf-8')
        data = json.loads(jsonData01)
        exportData['temp'] = data['currently']['temperature']
        exportData['Condition'] = data['currently']['icon']
    return exportData


def get_weather_data():
    ArrYear = getYearsUNIX()
    MasterData = {}
    for Year in ArrYear:
        YearData = getWeatherData(ArrYear[Year])
        MasterData[Year] = YearData
    finalOutput = json.dumps(MasterData)
    return finalOutput
