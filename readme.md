

So, versprochen ist versprochen, hier der View zum Adapter und ne kleine Anleitung dazu. Am Ende sollte das ganze so aussehen:
![preview.png](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/admin/preview.png) 

**Voraussetzungen um den View ohne Änderungen verwenden zu können sind:**
1. Du verwendest 1 oder 2 Profile
2. Du verwendest die Option Mo-Fr / Sa-So
3. Du verwendest eine einigermaßen aktuelle Version des HeatingControl Adapters

**1. Wie installier ich den Kram?**
**a.)** Zuerst sollte das MaterialDesign installiert werden, hierzu das Skript und Css in die entsprechenden Felder kopieren, siehe Bild, (roter Kringel rechte Seite).

![watchout1.jpg](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/admin/watchout1.jpg) 

**Skript:**
[MaterialUiScript.txt](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/MaterialUiScript.txt) 

**CSS:**
[MaterialUiCss.txt](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/MaterialUiCss.txt) 


**b.)** Der "Kram" besteht aus zwei Views. Im einen View sind die Einstellungen der globalen Parameter drin, dieser wird später in jedem View angezeigt. Diesen View solltest Du "cardHzngGlobals" nennen (siehe Bild, rote Kringel linke Seite), also einen **leeren View** mit diesem Namen anlegen und dann via **Widgets importieren** ein lesen. Der zweite View beinhaltet alle Elemente eines Raums. Ich hab exemplarisch das Wohnzimmer genommen. Wenn Du das Skript für mehrere Räume verwendest, brauchst Du natürlich auch nen View für jeden Raum. Anstatt manuell die ganzen Widgets anzupassen, solltest Du in einem Texteditor Deiner Wahl mit "suchen und ersetzen" arbeiten. Lass nach "Wohnzimmer" suchen und diesen Begriff z.B. mit "Bad" ersetzen, et voila schon haste den kompletten View fürs Bad fertig (naja fast, siehe .4). Diesen Vorgang wiederholst Du für jeden Raum.

**View cardHzngGlobals:** [cardHzngGlobals.txt](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/cardHzngGlobals.txt) 

Hier bitte einen leeren View anlegen mit Zimmerbezeichnung Wohnzimmer und via **Widgets importieren** die Daten reinholen. Die **txt Dateien** bitte **NICHT im Browser öffnen** und dann den Text kopieren, sondern direkt (recht Maustaste > Link speichern unter) abspeichern!

**View cardHzngWohnzimmer:** [cardhzngwohnzimmer1Profil.txt](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/cardHzngWohnzimmer1Profil.txt) - **Für 1 Profil** mit automatischer Erkennung ob relative/absolute Absenkung gewählt.

**ODER**

**View cardHzngWohnzimmer:** [cardHzngWohnzimmer.txt](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/cardHzngWohnzimmer.txt)    - **Für 2 Profile**, OHNE automatische Erkennung ob relative/absolute Absenkung gewählt, dafür mit automatischer Profilumschaltung. Hier bitte den ungenutzten Block (relative oder absolute Absenkung) löschen und nötigenfalls den übriggebliebenen Block neu positionieren.


**2. Warum schaut das bei mir so scheisse aus und gar nicht wie auf dem Screenshot?**
Ich verwende das MaterialDesign Script und CSS von @Uhula, hast Du das nicht (richtig) installiert oder gab es beim Import Probleme dann sieht der View erstmal etwas seltsam aus. Wenn Dich das ganze näher interessiert, wirst Du hier fündig: https://github.com/Uhula/ioBroker-Material-Design-Style

**3. Warum sehen einige Sachen sporadisch/regelmäßig/dauernd anders aus als vorhin?**
Die Anzeigen haben ein gewisses "Eigenleben", d.h. sie reagieren auf Statusänderungen mit Farbwechseln von grün(inaktiv) auf rot(aktiv). Außerdem werden die Anzeigeblöcke der Profilparameter eines Raumes, abhängig davon ob im Adapter relative oder absolute Temperaturabsenkung gewählt ist, ausgetauscht. Dabei werden sowohl die Texte, als auch die Vorgaben der Dropdowns geändert.

**4. Woher kommen die Daten des Blockes "Status"?**
Von Deinen Gerätedatenpunkten. Hier mußt Du selber die Datenpunkte zuweisen. "Ist Temp Thermostat" steht für die Temp des Thermostatfühlers, "Ist Temp Sensor" ist optional und zeigt den Wert eventuell vorhanden Raumtempfühler, "Soll Temp Raum" ist die vom Adapter am Thermostaten eingestellte Temp, "Ventilstellung" dürfte selbsterklärend sein, ist ein Datenpunkt des Heizkörperthermostaten, "Modus" zeigt an ob das Thermostat auf manuell oder automatik steht, mit "Boost" wird bei HM Thermostaten ein 5min. Boost aktiviert, Fenster" zeigt an ob ein dem Raum zugeordnetes Fenster geöffnet/geschlossen ist, greift auf den Datenpunkt des Adapters zu und braucht üblicherweise nicht angepasst zu werden. Mit Override wird Dauer und Temp für TemperaturOverride eingestellt.
**4a.** Eine Besonderheit, welche dem Material Design gechuldet ist, ist dass Du an einem Punkt pro Statusseite ein Änderung einfügen mußt weil sonst der Schalter für den Boost nicht funktioniert. Wähle den Schalter und passe den Wert im Feld "HTML anhängen" entsprechend der widgetnummer an (siehe Bild). **Sicherheitshalber solltest Du auch alle Schalter vom View *cardHzngGlobals* überprüfen!!!**
![watchout2.jpg](https://github.com/Pittini/iobroker-heatingcontrol-vis/blob/master/admin/watchout2.jpg) 

**5. Fertig**
Nachdem Dein erster View jetzt aussehen sollte wie auf obigem Screenshot, kannst Du wie in 1. beschrieben, die Views für die anderen Räume anlegen. Script und Css ist projektweit, muß also nur einmalig eingetragen werden. Viel Spaß.

# Changelog

* Update 1.1.20 - Update der Mehrprofilversion. 
> Hizugefügt: "Aktiv" im Statusfenster, zeigt an welche Heizperiode gerade aktiviert ist.   
> Hinzugefügt: "Minimaltemperatur" bei den Profilparametern, korrespondierend zur neuen Einstellmöglichkeit im Adapteradmin (löschen wenn unbenutzt).  
> Hinzugefügt: Grüner Balken unter den Zeit/Temp Einstellungen zur Anzeige der gerade aktiven Periode  
> Hinzugefügt: Anzeige des aktiven Profils in allen relevanten Blöcken "(P1...)  
* Update 22.12.19 - Bugfix im 2 Profile Vis 
* Update: 20.12.19 - Optionale Erweiterung auf 2 Profile, dafür Wegfall der automatischen Umschaltung bei Änderung relative/absolute Absenkung.
* Update: 2. 12.19 - kleinere Bugfixxes
* Release 1.12.19 im Adapter Test Bereich
> Edit: Kosmetik  
