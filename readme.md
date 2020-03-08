

# View Version2 zum Adapter HeatingControl und Anleitung. 

### coming soon:

![prview.png](/admin/prview.png) 

**Voraussetzungen um den View ohne Änderungen verwenden zu können sind:**
1. Du verwendest eine einigermaßen aktuelle Version des HeatingControl Adapters und hast diesen funktionsfähig konfiguriert
2. Du verwendest keinen MaterialDesign Adapter!

**Features:**
1. Nur noch eine Vis-Seite nötig, für beliebig viele Räume und Profile
2. Keine übereinanderliegenden Widgets mehr
3. Farben (Schrift/Hintergrund/etc) via Dialog Einstellbar
4. Selbsständige Anpassung des Vis bei Änderungen der Adapter Konfiguration (Profilzahl, DecreaseMode, Profiltyp, Perioden)
5. Responsive Design
6. Zusammenklappbare Elemente um Platz zu sparen
7. Leichtere Installation auch für Einsteiger da komplettes eigenständiges Vis Projekt.
8. Zusätzliche Beispielseiten z.B. für Raumstati und Fensterstatus für eigene Erweiterungen der Grundfunktionen


**1. Wie installier ich den Kram?**
Der "Kram" besteht aus zwei Teilen, einem JS Skript und einem kompletten Vis Projekt.
**a.)**  Am besten installierst Du zuerst das JavaSript Script und startest es
Die **js Dateien** bitte **NICHT im Browser öffnen** und dann den Text kopieren, sondern direkt (rechte Maustaste > Link speichern unter) abspeichern!

**b.)** Nun importierst Du die Zip Datei in Dein Vis



**2. Warum schaut das bei mir so scheisse aus und gar nicht wie auf dem Screenshot?**
Ich verwende das MaterialDesign Script und CSS 2.x von @Uhula, hast Du zusätzlich den MaterialDesign Adapter installiert, kriegen die sich in die Haare und keines von beiden wird mehr korrekt funktionieren. Oder gab es beim Import Probleme dann sieht der View erstmal etwas seltsam aus. Wenn Dich das ganze näher interessiert, wirst Du hier fündig: https://github.com/Uhula/ioBroker-Material-Design-Style

**3. Warum sehen einige Sachen sporadisch/regelmäßig/dauernd anders aus als vorhin?**
Die Anzeigen haben ein gewisses "Eigenleben", d.h. sie reagieren auf Statusänderungen mit Farbwechseln von grün(inaktiv) auf rot(aktiv). Außerdem werden die Anzeigeblöcke der Profilparameter eines Raumes, abhängig davon ob im Adapter relative oder absolute Temperaturabsenkung gewählt ist, ausgetauscht. Dabei werden sowohl die Texte, als auch die Vorgaben der Dropdowns geändert.
Außerdem reagiert das Vis auf Änderungen im Adapteradmin und passt sich (in gewissen Grenzen) automatisch an. Es werden max 5 Perioden unterstützt, jedoch eine unbegrenzte Anzahl an Räumen und Profilen

**4. Woher kommen die Daten des der kleinen Infoblöcke und diese selbst??**
Von Deinen Gerätedatenpunkten. Hier mußt Du selber die Datenpunkte zuweisen. "Ist Temp Thermostat" steht für die Temp des Thermostatfühlers, "Ist Temp Sensor" ist optional und zeigt den Wert eventuell vorhanden Raumtempfühler, "Soll Temp Raum" ist die vom Adapter am Thermostaten eingestellte Temp, "Ventilstellung" dürfte selbsterklärend sein, ist ein Datenpunkt des Heizkörperthermostaten, das Fenstericon zeigt an ob ein dem Raum zugeordnetes Fenster geöffnet/geschlossen ist, greift auf den Datenpunkt des Adapters zu und braucht üblicherweise nicht angepasst zu werden. Mit Override wird Dauer und Temp für TemperaturOverride eingestellt.



**5. Fertig**
Nachdem Dein erster View jetzt aussehen sollte wie auf obigem Screenshot, kannst Du wie in 1. beschrieben, die Views für die anderen Räume anlegen. Script und Css ist projektweit, muß also nur einmalig eingetragen werden. Viel Spaß.

# Changelog

* ### Update 8.3.20 - Init 

