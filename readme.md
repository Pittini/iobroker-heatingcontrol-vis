# Hier eine kleine Anleitung zu dem View für Vis. 

## Voraussetzungen um den View ohne Änderungen verwenden zu können sind:
1. Du verwendest 1 Profil
2. Du verwendest die Option Mo-Fr / Sa-So
3. Du verwendest die aktuelle Version vom Adapter Heatingcontrol

##1. Wie installier ich den Kram?
a.) Zuerst sollte das MaterialDesign installiert werden, hierzu das Skript und Css in die entsprechenden Felder kopieren, siehe Bild.
b.) Der "Kram" besteht aus zwei Views. Im einen View sind die Einstellungen der globalen Parameter drin, dieser wird später in jedem View angezeigt. Diesen View solltest Du "cardHzngGlobals" nennen. Der zweite View beinhaltet alle Elemente eines Raums. Ich hab exemplarisch das Wohnzimmer genommen. Wenn Du das Skript für mehrere Räume verwendes, brauchst Du natürlich auch nen View für jeden Raum. Anstatt manuell die ganzen Widgets anzupassen, solltest Du in einem Texteditor Deiner Wahl mit "suchen und ersetzen" arbeiten. Lass nach "Wohnzimmer" suchen und diesen Begriff z.B. mit "Bad" ersetzen, et voila schon haste den kompletten View fürs Bad fertig (naja fast, siehe .4). Diesen Vorgang wiederholst Du für jeden Raum.

##2. Warum schaut das bei mir so scheisse aus und gar nicht wie auf dem Screenshot?
Ich verwende das MaterialDesign Script und CSS von @Uhula, hast Du das nicht (richtig) installiert oder gab es beim Import Probleme dann sieht der View erstmal etwas seltsam aus. Wenn Dich das ganze näher interessiert, wirst Du hier fündig: https://github.com/Uhula/ioBroker-Material-Design-Style

##3. Warum sehen einige Sachen sporadisch/regelmäßig/dauernd anders aus als vorhin?
Die Anzeigen haben ein gewisses "Eigenleben", d.h. sie reagieren auf Statusänderungen mit Farbwechseln von grün(inaktiv) auf rot(aktiv). Außerdem werden die Anzeigeblöcke der Profilparameter eines Raumes, abhängig davon ob im Adapter relative oder absolute Temperaturabsenkung gewählt ist, ausgetauscht. Dabei werden sowohl die Texte, als auch die Vorgaben der Dropdowns geändert.

##4. Woher kommen die Daten des Blockes "Status"?
Von Deinen Gerätedatenpunkten. Hier mußt Du selber die Datenpunkte zuweisen. "Ist Temp Thermostat" steht für die Temp des Thermostatfühlers, "Ist Temp Sensor" ist optional und zeigt den Wert eventuell vorhanden Raumtempfühler, "Soll Temp Raum" ist die vom Adapter am Thermostaten eingestellte Temp, "Ventilstellung" dürfte selbsterklärend sein, ist ein Datenpunkt des Heizkörperthermostaten, "Modus" zeigt an ob das Thermostat auf manuell oder automatik steht, mit "Boost" wird bei HM Thermostaten ein 5min. Boost aktiviert, Fenster" zeigt an ob ein dem Raum zugeordnetes Fenster geöffnet/geschlossen ist, greift auf den Datenpunkt des Adapters zu und braucht üblicherweise nicht angepasst zu werden. Mit Override wird Dauer und Temp für TemperaturOverride eingestellt.