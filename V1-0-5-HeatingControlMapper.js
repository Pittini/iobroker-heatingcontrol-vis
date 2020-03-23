//Mapping Skript zum Adapter HeatingControl V 0.3.19 oder höher
// Skriptversion 1.0.5 Stand 23.3.2020 - https://github.com/Pittini/iobroker-heatingcontrol-vis


const praefix = "javascript.0.vis.HeatingControl."; //Grundpfad für Script DPs
const hcpraefix = "heatingcontrol.0."; //Pfad zu HeatingControlDatenpunkten
const logging = true; //Logmeldungen an/ab schalten
const WindowClosedImg = "/vis.0/HeatingControl/images/fts_window_1w.svg";
const WindowOpenImg = "/vis.0/HeatingControl/images/fts_window_1w_open.svg";

const AbsTempValueListValue = "0;1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25";
const AbsTempValueListText = "inaktiv;1°C;2°C;3°C;4°C;5°C;6°C;7°C;8°C;9°C;10°C;11°C;12°C;13°C;14°C;15°C;16°C;17°C;18°C;19°C;20°C;21°C;22°C;23°C;24°C;25°C";

const RelTempValueListValue = "0;1;2;3;4;5;6;7;8;9;10";
const RelTempDivValueListText = "inaktiv;-1°C;-2°C;-3°C;-4°C;-5°C;-6°C;-7°C;-8°C;-9°C;-10°C";
const RelTempAddValueListText = "inaktiv;+1°C;+2°C;+3°C;+4°C;+5°C;+6°C;+7°C;+8°C;+9°C;+10°C";

//Ab hier nichts mehr ändern
let RefreshingVis = false;
let ChoosenRoom = "";

//HeatingControl Werte einlesen bei Scriptstart
//Infobereich
let NumberOfProfiles = getState(hcpraefix + "info.NumberOfProfiles").val;
let UsedRooms = getState(hcpraefix + "info.UsedRooms").val;
let NumberOfPeriods = getState(hcpraefix + "info.NumberOfPeriods").val;
let ProfileType = getState(hcpraefix + "info.ProfileType").val;
let TempDecreaseMode = getState(hcpraefix + "info.TemperatureDecreaseMode").val;

// Currently not in use, disabled
// const TemperatureDecreaseMode = getState(hcpraefix + "info.TemperatureDecreaseMode").val;
// const PublicHolidayLikeSunday = getState(hcpraefix + "info.PublicHolidayLikeSunday").val;

// Main Root Bereich
let CurrentProfile = getState(hcpraefix + "CurrentProfile").val - 1;

//RoomsBereich
const Rooms = UsedRooms.split(";"); //Raumliste in Array wandeln für Fensterüberwachung
const WindowState = []; //Fensterstatus pro Raum, Index korreliert mit Rooms[]
const WindowStateTimeStamp = [];
let OpenWindowRoomCount = 0;

// Einmalig beim Programmstart alle States erzeugen, sofern nicht schon geschehen
const states = [];
let y = 0;

//States für Zeit/Temp Einstellung
switch (ProfileType) {
    //Dps erzeugen für alle ProfilType Varianten
    //V1 Alle Tage zusammen
    case "Mo - Su":
        y = 0;
        for (let x = 0; x <= NumberOfPeriods - 1; x++) {
            states[y] = { id: praefix + "ProfileTypes.Mo-Su.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } };
            y++;
            states[y] = { id: praefix + "ProfileTypes.Mo-Su.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } };
            y++;
        }
        break;

    //V2 Mo-Fr / Sa-So
    case "Mo - Fr / Sa - Su":
        y = 0;
        for (let x = 0; x <= NumberOfPeriods - 1; x++) {
            states[y] = { id: praefix + "ProfileTypes.Mo-Fr.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } };
            y++;
            states[y] = { id: praefix + "ProfileTypes.Mo-Fr.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } };
            y++;
            states[y] = { id: praefix + "ProfileTypes.Sa-So.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } };
            y++;
            states[y] = { id: praefix + "ProfileTypes.Sa-So.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } };
            y++;
        }
        break;

    //V3 Jeder Tag getrennt
    case "every Day":
        y = 0;
        for (let x = 0; x <= NumberOfPeriods - 1; x++) {
            states[y] = { id: praefix + "ProfileTypes.Mon.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Mon.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Tue.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Tue.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Wed.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Wed.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Thu.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Thu.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Fri.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Fri.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Sat.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Sat.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Sun.Periods." + x + ".Temperature", initial: 20, forceCreation: false, common: { read: true, write: true, name: "target temperature", type: "number", def: 20 } }; // 
            y++;
            states[y] = { id: praefix + "ProfileTypes.Sun.Periods." + x + ".time", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "period from", type: "string", def: "00:00" } }; // 
            y++;
        }
        break;
}

//States für Profileinstellungen
states[y] = { id: praefix + "TempDecreaseValues." + "AbsentDecrease", initial: 0, forceCreation: false, common: { read: true, write: true, name: "AbsentDecrease", type: "number", def: 0 } }; // 
y++;
states[y] = { id: praefix + "TempDecreaseValues." + "GuestIncrease", initial: 0, forceCreation: false, common: { read: true, write: true, name: "GuestIncrease", type: "number", def: 0 } }; // 
y++;
states[y] = { id: praefix + "TempDecreaseValues." + "PartyDecrease", initial: 0, forceCreation: false, common: { read: true, write: true, name: "PartyDecrease", type: "number", def: 0 } }; // 
y++;
states[y] = { id: praefix + "TempDecreaseValues." + "VacationAbsentDecrease", initial: 0, forceCreation: false, common: { read: true, write: true, name: "VacationAbsentDecrease", type: "number", def: 0 } }; // 
y++;
states[y] = { id: praefix + "TempDecreaseValues." + "WindowOpenDecrease", initial: 0, forceCreation: false, common: { read: true, write: true, name: "WindowOpenDecrease", type: "number", def: 0 } }; // 
y++;

//States für Raumeinstellungen
states[y] = { id: praefix + "RoomValues." + "MinimumTemperature", initial: 0, forceCreation: false, common: { read: true, write: true, name: "MinimumTemperature", type: "number", def: 0 } }; // 
y++;
states[y] = { id: praefix + "RoomValues." + "TemperaturOverride", initial: 0, forceCreation: false, common: { read: true, write: true, name: "TemperaturOverride", type: "number", def: 20 } }; // 
y++;
states[y] = { id: praefix + "RoomValues." + "TemperaturOverrideTime", initial: "00:00", forceCreation: false, common: { read: true, write: true, name: "TemperaturOverrideTime", type: "string", def: "00:00" } }; // 
y++;
states[y] = { id: praefix + "RoomValues." + "WindowIsOpen", initial: false, forceCreation: false, common: { read: true, write: true, name: "Fenster geöffnet?", type: "boolean", def: false } }; // 
y++;
states[y] = { id: praefix + "RoomValues." + "CurrentTimePeriod", initial: 0, forceCreation: false, common: { read: true, write: true, name: "Aktiver Zeit Slot", type: "number", def: 0 } }; // 
y++;

//Hilfs Datenpunkte
states[y] = { id: praefix + "ChoosenRoom", initial: "", forceCreation: false, common: { read: true, write: true, name: "In Vis gewählter Raum", type: "string", def: "" } }; // Welcher Raum wurde in Vis gewählt
y++;
states[y] = { id: praefix + "ProfileValueListValue", initial: "", forceCreation: false, common: { read: true, write: true, name: "Vorgabe für ProfilValueList Werte", type: "string", def: "" } }; //
y++;
states[y] = { id: praefix + "ProfileValueListText", initial: "", forceCreation: false, common: { read: true, write: true, name: "Vorgabe für ProfilValueList Text", type: "string", def: "" } }; //
y++;
states[y] = { id: praefix + "TempValueListValue", initial: "", forceCreation: false, common: { read: true, write: true, name: "Vorgabe für TemperaturValueList Wert", type: "string", def: "" } }; //
y++;
states[y] = { id: praefix + "TempAddValueListText", initial: "", forceCreation: false, common: { read: true, write: true, name: "Vorgabe für TemperaturValueList Text", type: "string", def: "" } }; //
y++;
states[y] = { id: praefix + "TempDivValueListText", initial: "", forceCreation: false, common: { read: true, write: true, name: "Vorgabe für TemperaturValueList Text", type: "string", def: "" } }; //
y++;
states[y] = { id: praefix + "WindowStatesHtmlTable", initial: "", forceCreation: false, common: { read: true, write: true, name: "Tabellarische Übersicht der geöffneten Fenster", type: "string", def: "" } }; //
y++;
states[y] = { id: praefix + "OpenWindowRoomCount", initial: 0, forceCreation: false, common: { read: true, write: true, name: "In wievielen Räumen sind Fenster geöffnet", type: "number", def: 0 } }; //

//Alle States anlegen, Main aufrufen wenn fertig
let numStates = states.length;
states.forEach(function (state) {
    createState(state.id, state.initial, state.forceCreation, state.common, function () {
        numStates--;
        if (numStates === 0) {
            if (logging) log("CreateStates fertig!");
            main();
        }
    });
});

function main() {
    InitRoom(); //Gewählten Raum einlesen, bei Erststart default setzen
    InitWindowStates(); //Fensterstati einlesen
    CreateWindowStatesTable(); //Fensterstati Liste erzeugen
    //ValueList Vorgabewerte anhand Profileinstellungen erzeugen
    SetProfileValueList(); //ValueList Vorgaben für Profile erzeugen
    SetTempDecreaseModeValueLists();//ValueList Vorgaben (Werte und Texte) für Decreasemodes erzeugen
    CreateCurrentTimePeriodTrigger("none"); //TimeperiodTrigger für aktuellen Raum wählen
    SetTrigger();    //Trigger erzeugen
    SetVis(); // Vis initialisieren
}

function InitRoom() { //Gewählten Raum einlesen, bei Erststart default= erster in der Raumliste setzen
    ChoosenRoom = getState(praefix + "ChoosenRoom").val;
    if (ChoosenRoom == "") { //Wenn bei erstem Start noch kein Raum vorhanden (nach anlegen der States), verwende ersten Raum aus der Raumliste
        const dummy = getState("heatingcontrol.0.info.UsedRooms").val;
        if (dummy.includes(";")) { //Wenn ein semikolon in der Raumliste vorhanden ist, sind auch mehrere Räume vorhanden, davon nachfolgend den ersten extrahieren
            ChoosenRoom = dummy.substring(0, dummy.indexOf(";")); //In Raumliste nach dem Semikolon suchen und alles links davon extrahieren
            if (logging) log("ChoosenRoom=" + ChoosenRoom);
        }
        else {
            ChoosenRoom = dummy; //Wenn nur ein Raum in Raumliste, diesen verwenden
        }
        setState(praefix + "ChoosenRoom", ChoosenRoom); //Bei Erststart ChoosenRoom auf default= erster in der Raumliste setzen
    }
}

function InitWindowStates() { //Bei Programmstart alle Raum/Fensterstati einlesen
    for (let x = 0; x <= Rooms.length - 1; x++) { //Alle Räume durchlaufen
        WindowState[x] = getState(hcpraefix + "Rooms." + Rooms[x] + ".WindowIsOpen").val;
        WindowStateTimeStamp[x] = formatDate(getState(hcpraefix + "Rooms." + Rooms[x] + ".WindowIsOpen").lc, "TT.MM.JJJJ SS:mm:ss");
    }
}
/*
//Einfache html Table
[{"Title": "first", "Value": 1, "_Description": "Value1"}, {"Title": "second", "Value": 2, "_Description": "Value2"}]
function CreateWindowStatesTable() {
    let HtmlTable = '<div><table width="260px" border="0">'
    OpenWindowRoomCount = 0;
    for (let x = 0; x <= Rooms.length - 1; x++) {
        if (WindowState[x] == true) {
            HtmlTable = HtmlTable + "<tr bgcolor='#ff0000'><td>" + '<img height=40px src="' + WindowOpenImg + '"&nbsp</img>' + "</td><td height=40px>" + Rooms[x] + "</td><td height=40px>" + "auf" + "</td></tr>"
            OpenWindowRoomCount++;
        }
        else {
            HtmlTable = HtmlTable + "<tr><td height=40px>" + '<img height=40px src="' + WindowClosedImg + '"&nbsp</img>' + "</td><td height=40px>" + Rooms[x] + "</td><td height=40px>" + "zu" + "</td></tr>"
        };
    };
    HtmlTable = HtmlTable + "</table></div>"
    log(HtmlTable)

    setState(praefix + "OpenWindowRoomCount", OpenWindowRoomCount);
    setState(praefix + "WindowStatesHtmlTable", HtmlTable)

}
*/
function CreateWindowStatesTable() { // Erzeugt List mit Räumen und Fensterstatus
    let HtmlTable = "";
    OpenWindowRoomCount = 0;
    for (let x = 0; x <= Rooms.length - 1; x++) {
        if (WindowState[x] == true) {
            HtmlTable = HtmlTable + '<div class="mdui-listitem mdui-center-v mdui-red-bg" style="height:48px;"> <img height=40px src="' + WindowOpenImg + '"&nbsp</img> ';
            OpenWindowRoomCount++;
        }
        else {
            HtmlTable = HtmlTable + '<div class="mdui-listitem mdui-center-v" style="height:48px;"> <img height=40px src="' + WindowClosedImg + '"&nbsp</img> ';
        }
        HtmlTable = HtmlTable + '<div class="mdui-label">' + Rooms[x] + '<div class="mdui-subtitle">seit ' + WindowStateTimeStamp[x] + '</div></div></div>';
    }
    setState(praefix + "WindowStatesHtmlTable", HtmlTable);
    setState(praefix + "OpenWindowRoomCount", OpenWindowRoomCount);
    if (logging) log(HtmlTable);
}


function SetTimeTempValue(ProfileDays, What, ScriptDpVal, Period) { //Werte vom Vis, Bereich Zeit/Temperatur, in AdapterDPs schreiben
    if (RefreshingVis == false) {
        log(typeof (ScriptDpVal));
        if (logging) log("Reaching SetTimeTempValue");
        if (logging) log("SetTimeTempValue: " + hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + ProfileDays + ".Periods." + Period + "." + What + " set to " + ScriptDpVal);
        setState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + ProfileDays + ".Periods." + Period + "." + What, ScriptDpVal);
    }
}

function SetDecreaseValue(What, ScriptDpVal) {//Werte vom Vis, Bereich Absenkungen, in AdapterDPs schreiben
    if (RefreshingVis == false) {
        if (logging) log("Reaching SetDecreaseValue");
        if (logging) log("SetDecreasValue: " + hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + TempDecreaseMode + "." + What + " set to " + ScriptDpVal);
        setState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + TempDecreaseMode + "." + What, ScriptDpVal);
    }
}

function SetRoomValue(What, ScriptDpVal) {
    if (RefreshingVis == false) {
        if (logging) log("Reaching SetDecreaseValue");
        if (logging) log("SetRoomValue: " + hcpraefix + "Rooms." + ChoosenRoom + "." + What + " set to " + ScriptDpVal);
        setState(hcpraefix + "Rooms." + ChoosenRoom + "." + What, ScriptDpVal);
    }
}

function SetWindowState() { //Fenster offenstatus für einzelnen Raum/Fenster festlegen
    if (logging) log("Reaching SetWindowState");
    setState(praefix + "RoomValues." + "WindowIsOpen", getState(hcpraefix + "Rooms." + ChoosenRoom + "." + "WindowIsOpen").val);
}

function SetVis() { // Vis Daten durch Adapterdaten ersetzen bei Umschaltung Raum oder Profil
    if (logging) log("Reaching SetVis");
    RefreshingVis = true; //Um zu vermeiden dass es ne Schleife gibt wo die Vis Aktualisierung bei Raumwechsel als Änderung gewertet wird
    switch (ProfileType) { //Profiltyp abhängige Zeit und Temperaturwerte setzen
        case "Mo - Su":
            for (let x = 0; x <= NumberOfPeriods - 1; x++) {
                setState(praefix + "ProfileTypes.Mo-Su.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Mo-Su.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Mo-Su.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Mo-Su.Periods." + x + ".time").val);
            }
            break;
        case "Mo - Fr / Sa - Su":
            for (let x = 0; x <= NumberOfPeriods - 1; x++) {
                setState(praefix + "ProfileTypes.Mo-Fr.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Mo-Fr.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Mo-Fr.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Mo-Fr.Periods." + x + ".time").val);
                setState(praefix + "ProfileTypes.Sa-So.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Sa-So.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Sa-So.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Sa-So.Periods." + x + ".time").val);
            }
            break;
        case "every Day":
            for (let x = 0; x <= NumberOfPeriods - 1; x++) {
                setState(praefix + "ProfileTypes.Mon.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Mon.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Mon.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Mon.Periods." + x + ".time").val);
                setState(praefix + "ProfileTypes.Tue.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Tue.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Tue.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Tue.Periods." + x + ".time").val);
                setState(praefix + "ProfileTypes.Wed.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Wed.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Wed.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Wed.Periods." + x + ".time").val);
                setState(praefix + "ProfileTypes.Thu.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Thu.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Thu.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Thu.Periods." + x + ".time").val);
                setState(praefix + "ProfileTypes.Fri.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Fri.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Fri.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Fri.Periods." + x + ".time").val);
                setState(praefix + "ProfileTypes.Sat.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Sat.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Sat.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Sat.Periods." + x + ".time").val);
                setState(praefix + "ProfileTypes.Sun.Periods." + x + ".Temperature", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Sun.Periods." + x + ".Temperature").val);
                setState(praefix + "ProfileTypes.Sun.Periods." + x + ".time", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + "Sun.Periods." + x + ".time").val);
            }
            break;
    }
    //DecreaseMode Werte setzen
    setState(praefix + "TempDecreaseValues." + "AbsentDecrease", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + TempDecreaseMode + "." + "AbsentDecrease").val);
    setState(praefix + "TempDecreaseValues." + "GuestIncrease", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + TempDecreaseMode + "." + "GuestIncrease").val);
    setState(praefix + "TempDecreaseValues." + "PartyDecrease", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + TempDecreaseMode + "." + "PartyDecrease").val);
    setState(praefix + "TempDecreaseValues." + "VacationAbsentDecrease", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + TempDecreaseMode + "." + "VacationAbsentDecrease").val);
    setState(praefix + "TempDecreaseValues." + "WindowOpenDecrease", getState(hcpraefix + "Profiles." + CurrentProfile + "." + ChoosenRoom + "." + TempDecreaseMode + "." + "WindowOpenDecrease").val);

    //Raum Werte setzen
    if (existsState(hcpraefix + "Rooms." + ChoosenRoom + "." + "MinimumTemperature")) { //Prüfen ob Minimum Temp Null ist
        setState(praefix + "RoomValues." + "MinimumTemperature", getState(hcpraefix + "Rooms." + ChoosenRoom + "." + "MinimumTemperature").val);
    }
    else {
        setState(praefix + "RoomValues." + "MinimumTemperature", 0);
        log("MinimumTemp=Null, skipping entry and showing 0");
    };

    setState(praefix + "RoomValues." + "TemperaturOverride", getState(hcpraefix + "Rooms." + ChoosenRoom + "." + "TemperaturOverride").val);
    setState(praefix + "RoomValues." + "TemperaturOverrideTime", getState(hcpraefix + "Rooms." + ChoosenRoom + "." + "TemperaturOverrideTime").val);
    setState(praefix + "RoomValues." + "WindowIsOpen", getState(hcpraefix + "Rooms." + ChoosenRoom + "." + "WindowIsOpen").val);
    setState(praefix + "RoomValues." + "CurrentTimePeriod", getState(hcpraefix + "Rooms." + ChoosenRoom + "." + "ActiveTimeSlot").val);

    setTimeout(function () { // Timeout setzt refresh status wieder zurück
        RefreshingVis = false;
    }, 250);
}

function SetTempDecreaseModeValueLists() { //Setzt die Vorgabewerte der Valuelists je nach gewähltem DecreaseMode
    switch (TempDecreaseMode) {
        case "relative":
            setState(praefix + "TempValueListValue", RelTempValueListValue);
            setState(praefix + "TempAddValueListText", RelTempAddValueListText);
            setState(praefix + "TempDivValueListText", RelTempDivValueListText);
            break;
        case "absolute":
            setState(praefix + "TempValueListValue", AbsTempValueListValue);
            setState(praefix + "TempAddValueListText", AbsTempValueListText);
            setState(praefix + "TempDivValueListText", AbsTempValueListText);
            break;
    }
}

function SetProfileValueList() { //Einträge für Vis Profil Valuelist erstellen
    let ProfileValueListValue = "";
    let ProfileValueListText = "";

    for (let x = 1; x <= NumberOfProfiles; x++) {
        ProfileValueListValue = ProfileValueListValue + ";" + x;
        ProfileValueListText = ProfileValueListText + ";" + x;
    };
    ProfileValueListValue = ProfileValueListValue.slice(1);
    ProfileValueListText = ProfileValueListText.slice(1);

    setState("javascript.0.vis.HeatingControl.ProfileValueListValue", ProfileValueListValue);
    setState("javascript.0.vis.HeatingControl.ProfileValueListText", ProfileValueListText);
}

function CreateCurrentTimePeriodTrigger(OldRoom) {
    if (logging) log("reaching CreateCurrentTimePeriodTrigger - Oldroom= " + OldRoom + " ChoosenRoom= " + ChoosenRoom);
    if (OldRoom != "none") { //Wenn kein Oldroom angegeben kein unsubscribe machen
        if (unsubscribe(hcpraefix + "Rooms." + OldRoom + ".ActiveTimeSlot")) { //Trigger auf vorherigen Raum löschen
            if (logging) log("Trigger für Raum " + OldRoom + " gelöscht, und für Raum " + ChoosenRoom + " gesetzt.");
        };
    };
    on(hcpraefix + "Rooms." + ChoosenRoom + ".ActiveTimeSlot", function (dp) { //Neuen Trigger setzen
        if (RefreshingVis == false) setState(praefix + "RoomValues." + "CurrentTimePeriod", dp.state.val);//Wenn Änderung des akuellen Zeitslots im aktuell gewählten Raum
    });
}

function SetTrigger() {
    //Trigger für HC Info Daten aus Admin
    on(hcpraefix + "info.NumberOfProfiles", function (dp) { //Wenn Anzahl der Profile im Admin geändert
        NumberOfProfiles = dp.state.val;
        SetProfileValueList();
    });
    on(hcpraefix + "info.NumberOfPeriods", function (dp) { //Wenn Anzahl der Perioden im Admin geändert
        NumberOfPeriods = dp.state.val - 1;
    });
    on(hcpraefix + "info.ProfileType", function (dp) { //Wenn Änderung Profiltyp im Admin
        ProfileType = dp.state.val;
    });
    on(hcpraefix + "info.TemperatureDecreaseMode", function (dp) { //Wenn Änderung des DecreaseModes im Admin
        TempDecreaseMode = dp.state.val;
    });
    on(hcpraefix + "info.UsedRooms", function (dp) { //Wenn Änderung der UsedRooms im Admin
        UsedRooms = dp.state.val;
    });

    // Currently not in use, disabled
    /*
    on(hcpraefix + "info.PublicHolidayLikeSunday", function (dp) { //Wenn 
        PublicHolidayLikeSunday = dp.state.val;
    });
    */

    //Trigger HC Main Root
    on(hcpraefix + "CurrentProfile", function (dp) { //Wenn Änderung des Profils
        CurrentProfile = dp.state.val - 1;
        SetVis();
    });

    //Trigger Script Dps
    //Root
    on(praefix + "ChoosenRoom", function (dp) { //Wenn Änderung des Raums
        ChoosenRoom = dp.state.val;
        SetVis();
        CreateCurrentTimePeriodTrigger(dp.oldState.val); //Sonderfall - Um die aktuelle Periode anzeigen zu können muss ein wechselnder Trigger auf den aktuellen Raum im HC Rooms Zweig gesetzt und bei wechsel wieder gelöscht werden
    });

    //Trigger für RaumDPs
    on(praefix + "RoomValues." + "MinimumTemperature", function (dp) { //Wenn 
        if (RefreshingVis == false) SetRoomValue("MinimumTemperature", dp.state.val);
    });
    on(praefix + "RoomValues." + "TemperaturOverride", function (dp) { //Wenn 
        if (RefreshingVis == false) SetRoomValue("TemperaturOverride", dp.state.val);
    });
    on(praefix + "RoomValues." + "TemperaturOverrideTime", function (dp) { //Wenn 
        if (RefreshingVis == false) SetRoomValue("TemperaturOverrideTime", dp.state.val);
    });

    //Trigger für alle Fenster Stati
    for (let x = 0; x <= UsedRooms.split(";").length - 1; x++) {
        if (logging) log(x + " " + Rooms[x]);
        on(hcpraefix + "Rooms." + Rooms[x] + ".WindowIsOpen", function (dp) { //Wenn Fensterstatus sich ändert
            WindowState[x] = dp.state.val;
            WindowStateTimeStamp[x] = formatDate(dp.state.lc, "TT.MM.JJJJ SS:mm:ss");
            SetWindowState();
            CreateWindowStatesTable();
            if (logging) log(WindowState[x]);
        });
    }

    //Trigger für DecreaseModes
    on(praefix + "TempDecreaseValues." + "AbsentDecrease", function (dp) { //Wenn 
        if (RefreshingVis == false) SetDecreaseValue("AbsentDecrease", dp.state.val);
    });
    on(praefix + "TempDecreaseValues." + "GuestIncrease", function (dp) { //Wenn 
        if (RefreshingVis == false) SetDecreaseValue("GuestIncrease", dp.state.val);
    });
    on(praefix + "TempDecreaseValues." + "PartyDecrease", function (dp) { //Wenn 
        if (RefreshingVis == false) SetDecreaseValue("PartyDecrease", dp.state.val);
    });
    on(praefix + "TempDecreaseValues." + "VacationAbsentDecrease", function (dp) { //Wenn 
        if (RefreshingVis == false) SetDecreaseValue("VacationAbsentDecrease", dp.state.val);
    });
    on(praefix + "TempDecreaseValues." + "WindowOpenDecrease", function (dp) { //Wenn 
        if (RefreshingVis == false) SetDecreaseValue("WindowOpenDecrease", dp.state.val);
    });

    switch (ProfileType) { //Trigger für Vis Zeit und Temperatur je nach Profiltyp
        case "Mo - Su": //Version1 Alle Tage zusammen
            for (let x = 0; x <= NumberOfPeriods - 1; x++) {
                on(praefix + "ProfileTypes.Mo-Su.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Mo-Su", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Mo-Su.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Mo-Su", "time", dp.state.val, x);
                });
            }
            break;
        case "Mo - Fr / Sa - Su": //Version2
            for (let x = 0; x <= NumberOfPeriods - 1; x++) {
                on(praefix + "ProfileTypes.Mo-Fr.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Mo-Fr", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Mo-Fr.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Mo-Fr", "time", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Sa-So.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Sa-So", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Sa-So.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Sa-So", "time", dp.state.val, x);
                });
            }
            break;
        case "every Day": //Version3
            for (let x = 0; x <= NumberOfPeriods - 1; x++) {
                on(praefix + "ProfileTypes.Mon.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Mon", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Mon.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Mon", "time", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Tue.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Tue", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Tue.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Tue", "time", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Wed.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Wed", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Wed.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Wed", "time", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Thu.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Thu", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Thu.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Thu", "time", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Fri.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Fri", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Fri.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Fri", "time", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Sat.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Sat", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Sat.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Sat", "time", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Sun.Periods." + x + ".Temperature", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Sun", "Temperature", dp.state.val, x);
                });
                on(praefix + "ProfileTypes.Sun.Periods." + x + ".time", function (dp) { //Wenn 
                    if (RefreshingVis == false) SetTimeTempValue("Sun", "time", dp.state.val, x);
                });
            }
            break;
    }
}