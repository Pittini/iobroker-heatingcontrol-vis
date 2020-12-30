

# View/Vis-Projekt Version 3.1.0 zum Adapter HeatingControl und Anleitung. 

## V3 Version ab HeatingControl 0.4.x benötigt KEIN separates Skript mehr, dieses wurde in den Adapter integriert!

## HeatingControl 2.x benötigt V3.1 der vis, da hier die Profile und Perioden mit Index 1 starten 


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GGF786JBJNYRN&source=url) 

## Update von Version 3.0.1 auf die neue 3.1.0
Wer bereits die 3.0.1 nutzt und gegebenenfalls eigene Anpassungen realisiert hat, möchte vielleicht nicht einfach die 3.1.0 installieren.
Folgende Anpassungen *müssen* in der 3.0.1 gemacht werden, damit die vis kompatibel zu HeatingControl 2.x wird:

in den views cardHzngMoSu, cardHzngMoSuSeparat und cardHzngMoFrSaSo müssen in allen Zeiten und Temperatur-widgets die Object-ID's jeweils um eins erhöht werden.
Aus z.Bsp. heatingcontrol.0.vis.ProfileTypes.Mon.Periods.0.time wird heatingcontrol.0.vis.ProfileTypes.Mon.Periods.1.time usw. 
![ChangeV3.1_1.PNG](/admin/ChangeV3.1_1.PNG)

Zusätzlich muss der grüne Balken noch angepasst werden. Für jedes widget muss der Wert für die Sichtbarkeit um eins erhöht werden
![ChangeV3.1_2.PNG](/admin/ChangeV3.1_2.PNG)

Im Profile Mo-Fr / Sa-So muss jetzt noch in Schreibfehler in allen widgets (Temperatur und Zeit) ausgebessert werden: aus Sa-So wird Sa-Su

![ChangeV3.1_3.PNG](/admin/ChangeV3.1_3.PNG)


### News in 3.1.0

* limits für Temperatureinstellungen aus dem admin konfigurierbar:

Im admin von HeatingControl kann man Minimum, Maximum und Schrittweite konfigurieren. Damit das in der vis verwendet werden kann,
muss das für alle Profil-Temperatur-Widgets konfiguriert werden

![news_V3.1_profile_value_list.PNG](/admin/news_V3.1_profile_value_list.PNG)

* einfache Raum-Status-Liste (widget HTML):

es gibt nun einen Datenpunkt, der der HTML-Liste zur Verfügung stellt, in der alle Räume mit Soll, Ist und Status aufgelistet werden.

![news_V3.1_room_state_list.PNG](/admin/news_V3.1_room_state_list.PNG)

* neue Raum-Vorlage

Die neue Raum-Vorlage enthält einen Status-Log und einen Button, zum Rücksetzen des Manual-Modus 

![news_V3.1_room_template.PNG](/admin/news_V3.1_room_template.PNG)


* einfache Fenster-Status-Anzeige

Wenn man die einfache view verwendet, ist es evtl. sinnvoll, auch eine einfache Anzeige der Fenster-Stati zu nutzen.
Das Verhalten schaltet man im admin durch "einfache Version nutzen" ein. Das erzeugt dann eine einfache HTML-Tabelle mit dem Fenster-Status pro Raum

![news_V3.1_simple_window_state.PNG](/admin/news_V3.1_simple_window_state.PNG)


* zwei neue Raum-Vorlagen zum Kopieren

![news_V3.1_Kueche.PNG](/admin/news_V3.1_Kueche.PNG)

![news_V3.1_WoZi.PNG](/admin/news_V3.1_WoZi.PNG)


## Update von Version 2.x auf die neue 3.x
Wer bereits Version 2.x verwendet und evtl. viele Anpassungen gemacht hat, bzw. seine ganzen Thermostate mit der Kopiervorlage visualisiert, sollte nicht einfach diese neue Version "drüberbügeln" da dadurch alle bisherigen Änderungen verloren gehen würden. Im Vis selber gibt es zwar bisher keinerlei funktionale Änderungen (was aber durch die fortschreitende Adapterentwicklung absehbar ist), allerdings haben sich durch die Skriptintegration in den Adapter alle Pfade zu den Datenpunkten geändert. Um Euer schon bestehendes Projekt auf diesen Stand zu bringen, empfehle ich folgende Vorgehensweise:

1. Du exportierst Dein gesamtes Projekt als zip Datei. Hierzu im Vis Editor Menüpunkt "Setup > Projekt-Export/import > Exportieren (normal)" auswählen. Nun wurde eine Zip Datei erstellt welche Dein ganzes Projekt beinhaltet.
2. In dieser Zip-Datei findet sich eine Textdatei namens "vis-views.json". Diese ziehst Du aus dem zip raus und öffnest sie Du mit dem Editor Deines Vertrauens, welcher eine "suchen & ersetzen" Funktionalität besitzen muß.
3. Du läßt nach der Zeichenfolge "javascript.0.vis.HeatingControl" suchen, und ersetzt diese mit der Zeichenfolge "heatingcontrol.0.vis".
4. Du speicherst nun das ganze und schiebst die "vis-views.json wieder in das zip Archiv.
5. Nun importierst Du die zip Datei wieder in Vis, via "Setup > Projekt-Export/import > Importieren". Willst Du auf Nummer sichergehen, kannst Du vorher das alte Projekt im Vis Dateimanager umbenennen, es liegt im Verzeichnis "vis.0"
6. Es sollte nun alles laufen und aussehen wie vorher. Das in der V2 verwendete Skript wird nicht mehr benötigt, Du kannst es deaktivieren und löschen.

## ZusatzView:
### V3.1.0-Vis-Simple-HeatingControl.txt (Stand 29.12.2020) enthält alle relevanten Elemente, um die Funktionalität in eigene Projekte integrieren zu können. Es entfällt dadurch jedoch Responsive Design, Farbeinstellungen, klappbare Cards, etc. 
Die einzelnen Element-Blöcke sind gruppiert und haben die gleiche Funktionalität wie das große Projekt, es wurden jedoch alle Verweise auf MaterialDesign und relative Größenangaben entfernt. **Um die Optik müßt Ihr Euch hier selber kümmern.** Die Textdatei ist via "Widgets Importieren" einzufügen. Wer das große Projekt verwendet, braucht diese Datei NICHT.

##  Ab hier nun die Infos zum Projekt:

![V2preview-2.png](/admin/V2preview-2.png)

**Voraussetzungen um das Vis Projekt ohne Änderungen verwenden zu können sind:**
1. Du verwendest **Version 0.4.x oder höher** des HeatingControl Adapters, hast diesen funktionsfähig konfiguriert und die entsprechende Option ganz unten im Adapteradmin aktiviert.
![V3Activation.jpg](/admin/V3Activation.jpg)
2. **Du verwendest keinen MaterialDesign Adapter!**


**Features:**
1. Nur eine Vis-Seite nötig, für beliebig viele Räume und Profile
2. Logische Aufteilung in verschiedene "Cards" um Responive Design zu ermöglichen.
3. Keine übereinanderliegenden Widgets mehr.
4. Farben (Schrift,Hintergrund etc.) via Dialog einstellbar.
5. Selbständige Anpassung des Vis bei Änderungen der Adapter Konfiguration (Profilzahl, DecreaseMode, Profiltyp, Perioden).
6. Zusätzliche Card mit Übersicht des Fensterstatus jeden Raumes.
7. Responsive Design.
8. Zusammenklappbare Elemente um Platz zu sparen.
9. Leichtere Installation auch für Einsteiger, da komplettes eigenständiges Vis Projekt, auch geeignet als Grundlage/Beispiel für eigenes Gesamtprojekt.
10. Zusätzliche Beispielseite für Raumstati für eigene Erweiterungen der Grundfunktionen.


**1. Wie installier ich den Kram?**  
Der "Kram" besteht aus einem kompletten Vis Projekt. Das bisherige Skript zum Projekt wurde ab Version 0.4.0 des HeatingControl Adapters in diesen integriert. 

**b.) Vis Projekt installieren**  
Du importierst die Zip Datei als Projekt in Dein Vis. Das Zip dazu **NICHT** auspacken! Als Projektname vergibst Du den Namen **HeatingControl** in genau dieser Schreibweise!  
**Jeder andere Name bzw. Schreibweise wird dazu führen, dass die verwendeten Icons nicht mehr gefunden werden**, da der Projektname von Iob. auch als Pfadnamen verwendet wird und dieser im Projekt bei den Icons fest vorgegeben ist. Weiterhin wird die Funktionalität eingeschränkt sein, da auch in den mdui Klassen auf den Projektnamen Bezug genommen wird. Wer es trotzdem tun möchte, sollte Projektweit mit "suchen & ersetzen" vorgehen.

Wenn Du weißt wie ein Projekt importiert wird, bist Du hier fertig, ansonsten weiterlesen.

### Um das Vis Projekt zu importieren rufst Du den Vis Editor auf und wählst aus dem Register die Option "Setup", dort den Menüpunkt "Projekt-Export/import" und den Untermenüpunkt "Import". 

![V2VisInstall-1.jpg](/admin/V2VisInstall-1.jpg)

### In das erscheinende Fenster ziehst Du nun die Projekt Zip Datei und vergibst den Projektnamen **HeatingControl**.  

![V2VisInstall-2.jpg](/admin/V2VisInstall-2.jpg)

Damit ist die Grundinstallation abgeschlossen und Du kannst das Projekt starten, die Startseite hat die Bezeichnung _landing.
Nun solltest Du die Startseite mit dem rotierenden HeatingControl Logo sehen:
![V2preview-1.png](/admin/V2preview-1.png)

Sobald Du auf Start oder das rotierende Logo klickst, gelangst Du auf die eigentliche Seite.
Diese kann beispielsweise so aussehen, möglicherweise aber auch etwas anders, dies ist abhängig davon welche Optionen Du im HeatingControl Adapter gewählt hast

![V2preview-2.png](/admin/V2preview-2.png)

**2. Warum schaut das bei mir so scheisse aus und gar nicht wie auf dem Screenshot?**
Das Projekt verwendet das MaterialDesign Script und CSS 2.x von @Uhula, hast Du zusätzlich einen MaterialDesign Adapter installiert, kriegen die beiden sich in die Haare und keines von beiden wird mehr korrekt funktionieren. 

**3. Warum sehen einige Sachen sporadisch/regelmäßig/dauernd anders aus als vorhin?**
Die Anzeigen haben ein "Eigenleben", d.h. sie reagieren auf Statusänderungen mit Farbwechseln von grün(inaktiv) auf rot(aktiv). 
Folgendes Verhalten ist vorgesehen:

**Card Allgemeines:**  
* Kann mit Pfeil rechts oben zusammengeklappt werden.  
* Sonst keine Besonderheiten.

**Card Profilparameter:**  
* Kann mit Pfeil rechts oben zusammengeklappt werden.  
* Titel zeigt immer aktuell gewählten Raum.  
* Untertitel zeigt aktuell gewähltes Profil und Absenkmethode (relativ/absolute).  
* Bezeichnungstexte färben sich rot wenn der entsprechende Parameter aktiviert wurde.
* Bezeichnungstexte werden komplett ausgetauscht bei Änderung Absenkmethode relativ/absolute - Beispiel: bei relative "Gäste Absenkung", bei absolute "Gäste Temperatur". Ebenso ändern sich die Vorgaben der ValueLists.

**Card Fensterstatus:**  
* Kann mit Pfeil rechts oben zusammengeklappt werden.  
* Untertitel zeigt (auch im zusammengeklappten Zustand) die Anzahl der Räume mit geöffneten Fenstern; ist mindestens ein Fenster geöffnet, wird dies durch rotes Blinken signalisiert.  
* In der Liste werden die Zeilen der Räume mit geöffneten Fenstern rot dargestellt. 
* Unter dem Raumnamen seht Ihr den Zeitstempel der letzten öffnung/schliessung.

**Card Uhr**  
* Kann mit Pfeil rechts oben zusammengeklappt werden.  
* Kann mit Symbol links vom Pfeil zum Vollbild vergrößert werden.

**Card Raum/Profil Einstellungen**  
* Kann mit Pfeil rechts oben zusammengeklappt werden.  
* Titel zeigt immer aktuell gewählten Raum.  
* Untertitel zeigt immer aktuell gewähltes Profil. 
* Grüner Balken zeigt die aktuell aktive Periode.  
* Es werden max. 5 Perioden unterstützt, jedoch eine unbegrenzte Anzahl an * Räumen und Profilen.
* Gesamte Card wird automatisch bei Änderung des Profiltyps (im Adapteradmin) ausgetauscht, um die nötige Anzahl von Eingabefeldern bereitzustellen; folgende Varianten sind vorgesehen:  

Bei Profiltyp "Alle Tage zusammen"  

![V2preview-3.png](/admin/V2preview-3.png)  


Bei Profiltyp "Mo-Fr / Sa-So"  

![V2preview-4.png](/admin/V2preview-4.png)

Bei Profiltyp "jeder Tag getrennt"  

![V2preview-5.png](/admin/V2preview-5.png)
  

**Card Räume Kopiervorlage**  

* Dient als Layout Vorlage falls Du für jeden Raum die Basis Werte anzeigen möchtest. Muss komplett von Dir konfiguriert werden. Am besten gehst Du folgendermaßen vor:
Markiere alle Widgets mit Strg-A, klicke auf Widgets exportieren und kopiere den angezeigten Code in die Zwischenablage (Strg-A / Strg-C).
Nun legst Du einen neuen View an und nennst diesen z.B. cardHzngWohnzimmer. Du hast nun eine leere Seite, hier wählst Du Widgets importieren und fügst den Code aus der Zwischenablage via Strg-V ein. Nun hat diese Seite alle Elemente der Vorlagenseite. Diesen Vorgang wiederholst Du für jeden Raum.
Hast Du alle Seiten angelegt, gehst Du sie wieder reihum durch und passt die ObjektIDs der Widgets an. Nachfolgend erkläre ich Dir was wofür vorgesehen ist:  

* ![V2preview-6.png](/admin/V2preview-6.png)

* Ändere den im Bild orange dargestellten Titeltext zu Deiner Raumbezeichnung, z.B "Wohnzimmer".
* Ändere die ObjekID beim Widget rechts des Titels mit Tempanzeige auf den Datenpunkt Deines Thermostates welcher die gesetzte (set) Temperatur anzeigt.
* Ändere die ObjekID beim Fenstersymbol auf den Datenpunkt des HeatingControl Adapters welcher den Fensterstatus des Raumes anzeigt (WindowIsOpen).
* Ändere die ObjekID beim Wifi-Symbol auf den Datenpunkt Deines Thermostats (oder CCU) welcher den Connetion Status anzeigt.
* Ändere die ObjekID beim Empfangsbalken auf den Datenpunkt welcher die Empfangsstärke (RSSI) des Thermostats anzeigt. 
* Ändere die ObjekID bei der Batterieanzeig auf den Datenpunkt Deines Thermostats welcher die Batteriespannung anzeigt.
* Ändere die ObjekID bei "vor ... Minuten" auf den Datenpunkt Deines Thermostates welcher die gesetzte Temperatur anzeigt. (Damit hast Du einen Überblick ob die Regelung auch regelt).
* Ändere die ObjekID bei "Temperatur am Regler" auf den Datenpunkt Deines Thermostates welcher die Ist Temperatur anzeigt.
* Ändere die ObjekID bei "Ventilstellung" auf den Datenpunkt Deines Thermostates welcher die Ventilstellung anzeigt.
* Ändere die ObjekID bei "Temperatur am Sensor" auf den Datenpunkt Deines eventuell vorhandenen 2ten Raumtempsensors (Vergleichswert). Hast Du so etwas nicht oder nicht in jedem Raum, das Widget einfach löschen.

Diese Schritte wiederholst Du für jeden Raum. Klingt aufwendiger als es ist, etliches kann man sich mit copy&paste sowie mit einem Editor via "suchen und ersetzen" vereinfachen.  

* Nachdem Du nun alle Cards angelegt hast, musst Du diese noch in die Seite integrieren. Dies geschieht über die Seite "contHzng". Dies ist die zentrale Seite, welche festlegt, welche Card in welcher Größe und Reihenfolge angezeigt wird; verwendet werden hierfür "View in Widget" Widgets. Du suchst Dir nun das Widget welches die Raumvorlagecard anzeigt, markierst und kopierst dieses (Strg-C). Nun fügst Du via Strg-V diese Kopie ein und änderst an zwei Stellen; Bei "Viewname" wählst Du den ersten Deiner selbst gemachten Raumviews aus. Bei "CSS-Klasse" änderst Du den Teil "mdui-order-30" auf "mdui-order-35". Beim nächsten View dann 40 und so weiter. Du legst damit die Anzeigereihenfolge fest. Die 5er Schritte machen es leichter noch etwas einzufügen oder umzusortieren, Du kannst hier jede gewünschte Schrittweite verwenden.

* ![V2preview-9.jpg](/admin/V2preview-9.jpg)


**Farbeinstellungen**  
* Die Seite baut auf dem Material Design 2.x von @Uhula auf, dieses bietet die Möglichkeit Farbeinstellungen im Betrieb zu treffen/verändern. Hierzu rufst Du den Einstelldialog durch Klick auf das Zahnrad in der Titelleiste auf.

* ![V2preview-7.jpg](/admin/V2preview-7.jpg)

* Stell Dir die Farben nach Wunsch ein, die Änderungen werden sofort live angezeigt.

**Site Menüs**
* Es gibt, durch Klick auf die Symbole ganz rechts und links in der Titelleiste, ausklappbare Sidemenüs. Im rechten hab ich Dir Links zu den Projekten und Anleitungen von Vis, MaterialDesign und HeatingControl hinterlegt. Das linke Menü ist an sich unbenutzt, kann aber von Dir verwendet werden falls Du die Seite erweitern möchtest.

**Responsive Design**
* Der Seitenaufbau ermöglicht Responsive Design, d.h. verkleinerst Du das Fenster, werden sich die einzelnen Cards neu anordnen. Hast Du die Cards zusätzlich zusammengeklappt, sollte auch auf kleineren Bildschirmen noch eine Bedienung möglich sein.

* ![V2preview-8.png](/admin/V2preview-8.png)

**5. Fertig** -  Viel Spaß.

## Changelog

* #### Version 3.1 - Anpassung an HeatingControl 2.x
* #### Version 3.0 - Großes update des gesamten Projekts da sich durch die integration des Skriptes in den Adapter alle Grundpfade der Datenpunkte änderten.
* #### Scriptupdate > Version 1.0.5 - Bugfix bei "jeder Tag separat" Do und Fr wurden nicht gefunden.
* #### Simple Vis updated > made prettyer.
* #### Skriptupdate > Version 1.0.4 - Bugfix beim erstellen des Triggers für aktuelle Zeitperiode / corrected Syntax for TempDecreaseMode Trigger.
* #### Version 2.0.3 - Bugfix im Vis, Raumname wird jetzt auch bei Profiltyp alle Tage separat angezeigt / Skript (1.0.2) Warnmeldung bei leerer MinimumTemperature vermieden (HC < 0.3.19).
* #### Version 2.0.2 - Bugfix im Vis, nicht verwendete Perioden werden jetzt korrekt ausgeblendet.
* #### Version 2.0.1 - Bugfix bei Anzeige der aktuellen Periode, Bugfix in der Card bei "jeder Tag separat". Anpassung des Skripts.
* #### Version 2.0.0 - Init.

