---
title: "Passwörter auf dem Silbertablett"
date: 2018-03-17T20:25:40+01:00
draft: false
---
Hallo lieber Leser und willkommen auf CLattenzaun, eigentlich wollte ich meinen ersten "Blog"-Beitrag über digitale Bildung schreiben, aber wie es eben so ist, kommt erstens immer alles anders und zweitens als man denkt.

Findet Ihr Passwörter auch so lästig wie ich? Furchtbar oder? Man hat Tausende von den Dingern, zich Accounts die gesichert werden wollen und besonders schlimm im Unternehmen. Dort heißt es dann 20 Zeichen mit Sonderzeichen und Zahlen, Groß- und Kleinschreibung und alle drei Monate bitte ein neues.

Zum Glück kamen irgendwann mal Leute auf die Idee, Passwortmanager zu erfinden. Natürlich nutze ich auch einen Passwortmanager, und zwar keinen Unbekannten sondern den recht beliebten KeePass. Und den nutze ich wirklich gerne und überall. Als ich in der letzten Februarwoche einen neuen Laptop bei meiner Arbeit erhalten habe, kam für mich als einer der ersten Installationen überhaupt KeePass auf den Rechner, inkl. http-Plug-in, damit ich nicht ständig mein Passwort auf Webseiten eintippen muss.

Es kam, wie es kommen musste, meine Datenbank konnte ich nicht mehr öffnen, da ich als Zugriffsoption den Windowsaccount genutzt hatte (meine Datenbank liegt zusätzlich in einem VeraCrypt-Container). Tja so ein Mist, aber ich wäre nicht ich, wenn ich nicht zumindest probieren, würde meine geschäftliche Datenbank irgendwie zu retten.

Ich hatte kurz die Webseite von KeePass und auch dem BSI überflogen, nach Bugs gesucht und eventuellen Lücken gegoogelt. Wirklich viel zeit habe ich nicht rein investiert also lud ich fix einfach mal den Quellcode runter. Sehr bequem war die Tatsache, dass es sich um C# handelt, weshalb ich mich direkt heimisch fühlen konnte. Ok der Codestyle entsprach nicht meinem Geschmack, aber da kann man ja nichts machen. Schon beim ersten Überflug konnte ich hier und da erhaschen, dass mit den Passwörtern an der einen oder anderer Stelle mit String gearbeitet wird und die Forms verwendeten das Standard Textcontrol.

Die Datenbank ein bisschen vergessen interessierte mich jetzt eine Sache und aus reiner Neugier machte ich ein paar Tests. Praktischer weiße steht mir hier zu auf meinem Laptop das eine oder andere Tool zur Verfügung, das ich mir über die Zeit angeeignet habe bzw. ich konnte meine Toolsammlung auf dem neuen Laptop recht simpel wieder herstellen. An sich habe ich mir nicht wirklich gedacht dass ich zu einem Resultat kommen würde da sowohl beim BSI als auch bei Heise oder auf der Webseite von KeePass stets betont wird, wie sicher die Verschlüsselung ist. Doch mein Analyse Ansatz war viel einfacher. Ich habe eine neue KeePass Instanz gestartet und mit der CheatEngine, die ich für solche zwecke gerne nutze, nun versucht mein Passwort zu erraten. Dabei war der Erfolg überraschend schnell und einfach.

Ich war ein baff und googelte noch mal ein wenig, ob diese Lücke bereits bekannt war, auf der Webseite entdeckte ich dann folgenden Hinweis (hätte ich im Vorfeld mal besser lesen sollen).

> While KeePass is running, sensitive data (like the hash of the master key and entry passwords) is stored encryptedly in process memory. This means that even if you would dump the KeePass process memory to disk, you could not find any sensitive data.
>
> Furthermore, KeePass erases all security-critical memory when it is not needed anymore, i.e. it overwrites these memory areas before releasing them.

> KeePass uses the Windows DPAPI for encrypting sensitive data in memory (via CryptProtectMemory / ProtectedMemory). With DPAPI, the key for the memory encryption is stored in a secure, non-swappable memory area managed by Windows. DPAPI is available on Windows 2000 and higher. KeePass 2.x always uses DPAPI when it is available; in KeePass 1.x, this can be disabled (in the advanced options; by default using DPAPI is enabled; if it is disabled, KeePass 1.x uses the ARC4 encryption algorithm with a random key; note that this is less secure than DPAPI, mainly not because ARC4 cryptographically is not that strong, but because the key for the memory encryption is also stored in swappable process memory; similarly, KeePass 2.x falls back to encrypting the process memory using ChaCha20, if DPAPI is unavailable). On Unix-like systems, KeePass 2.x uses ChaCha20, because Mono does not provide any effective memory protection method.
>
>For some operations, KeePass must make sensitive data available unencryptedly in process memory. For example, in order to show a password in the standard list view control provided by Windows, KeePass must supply the cell content (the password) as unencrypted string (unless hiding using asterisks is enabled). Operations that result in unencrypted data in process memory include, but are not limited to: displaying data (not asterisks) in standard controls, searching data, and replacing placeholders (during auto-type, drag&drop, copying to clipboard, ...).

Jetzt wollte ich es ein wenig genauer wissen. Ich habe auf einer Azure Machine (Windows 10 N) die KeePass Version 2.38 installiert. Danach eine neue Datenbank erstellt mit einem zusammengesetzten Schlüssel (Passwort + Passwortdatei). In meinem gespielten Szenario gehe ich nun davon aus, dass potenzielle Schadsoftware erst im Nachhinein auf den Rechner kommt.

Als Nächstes legte ich einen neuen Testeintrag an, mit einem entsprechenden Passwort ohne es mir anzeigen zu lassen.

![Testeintrag](/images/Passwoerter-auf-dem-Silbertablett/Keepass_Datenbank.jpg)

Nun warte ich 10 Minuten ab und starte dann mein Tool. Es sollte genug zeit sein, dass der Speicher keine Reste mehr vom Passwort enthält. Ich ziehe mir nun händisch mit der CheatEngine ein Speicherabbild, und zwar bereits auf alle strings des Prozesses gefiltert. Bei diesem ersten Lauf erhielt ich eine liste mit 294364 Strings. In dieser Datei war mein Test Passwort ganze 20-mal enthalten. Ok zwischen den ganzen Strings ist vllt. nicht direkt das Passwort als Passwort zu erkennen. Woher die Einträge kommen, ist denke ich klar, aus meiner direkten Eingabe des Eintrags. Ich hatte weitere 10 Minuten gewartet oder länger und ein zweites Speicherabbild erstellt. Die Liste enthielt dieses Mal 294 599 Strings. Der Status war unverändert, 20 Einträge. 

Mhm man trägt ja nun nicht jeden Tag neue Einträge ein, also beschloss ich KeePass zu schließen, und neu zu öffnen. Nach dem schließen war der Speicher zum Glück komplett geleert worden. Direkt nach dem Öffnen der Datenbank machte ich erneut ein Speicherabbild und erhielt 244906 Strings. Mit einer dunklen Vorahnung durchsuchte ich die Datei nach meinem Masterpasswort. Und leider fand ich es auch, und zwar mit einem fast ähnlichen Muster wie die Passwörter bereits davor. Das heißt, Passwörter sind in Speicherabbildern auffindbar. Immerhin war in diesem vierten Speicherabbild mein anderes Passwort nicht auffindbar. puhh. Auch hier gute 10 bis 20 Minuten Später das Passwort bleibt im Speicher unter demselben Muster. Schlecht. Dass das Masterpasswort noch im Speicher war, sollte sich gegen später als "glücksfall" rausstellen.

Als Nächstes hole ich mir mein Passwort aus der Datenbank, per Doppelklick, in den Zwischenspeicher. Gleichzeitig suggeriert mir KeePass das in 12 sec das Passwort aus dem Speicher geholt wird. Die Sicherheit trügt. Mein Passwort ist gut Minuten später noch sichtbar. Und noch länger. Wer sich die Ergebnisse ansieht, der wird schnell feststellen, dass es etliche Möglichkeiten gibt mittels RegEx oder anderen Mechanismen die Passwörter aus so einem Abbild zu extrahieren.

![Passwort kopiert](/images/Passwoerter-auf-dem-Silbertablett/copy_selected.jpg)

Das Resultat, dieses ersten Tests, war also das man ein Tool schreiben könnte, das nach seiner Aktivierung KeePass als Prozess erkennt und alle 30 Sekunden oder alle 3 Minuten sich einmal alle Strings aus dem Speicher holt und per RegEx oder anderen Mechanismen die Passwörter extrahiert und dem Angreifer zukommen lassen. Oder besser gleich die ganze Datei. Dank Bezeichnung, Kategorie und Username ist es mir ein leichtes das Passwort zu verwenden. Ich bekomme die Einträge förmlich auf dem Silbertablett serviert und dem User wird vermeintliche Sicherheit vorgegaukelt.

![Ergebnisse](/images/Passwoerter-auf-dem-Silbertablett/Passwoerter.jpg)

Bevor ich mit diesem Wissen irgendwas anfing, habe ich Dominik Reichel am 02.03.2018 empfohlen Streams im Code zu schließen, auf SecureStrings zu setzen und nach Verwendung direkt die verwendeten Strings zu überschreiben. Ein Passwort darf nicht bis zu 30 Minuten lang für jeden lesbar im Zwischenspeicher liegen. 

Als zweiten schritt, informierte ich zusätzlich Heise und stellte meine Recherche Ergebnisse zur Verfügung. Dort meldete sich dann nach einer Zeit Peter Siering bei mir mit der Antwort, dass Heise bereits an genau diesem Thema sitzen würden. Ich entschloss meinen Blogbeitrag weiter nach hinten zu verschieben und pflegte mit Herr Siering nun eine E-Mail Konversationen. Dabei machte ich mehrere weitere Tests mit KeePass und schaute unter anderem auch noch mal mir genauer den Code von KeePass an.

In weiteren Tests stellte sich heraus, dass das Auslesen des Masterpassworts zum Beispiel Glücksache ist. Liest man nur die Strings aus dem dump bekommt man zu dem, ein Muster mit dem sich wie oben erwähnt arbeiten lässt.

````
05C2C114 - C:UsersExperimentDocumentsNewDatabase_2.kdbx
05C2C178 - Heise Test
05C2C6C0 - CLattenzaun
05C2C714 - CLattenzaun
05C2C7D4 - {PASSWORD_ENC}
05C2C80C - {GROUP
````

oder alternativ eines der möglichen Muster für das Masterpasswort

````
20E259A0 - get_accState
20E259D0 - !KeeAttackTango1""
20E25A00 - get_accHelpTopic
````

Unweigerlich kommt die Frage auf, warum das Passwort im Speicher auffindbar ist. Wenn nicht absichtlich der Speicher gesäubert wird also gelöscht oder überschrieben wird bleiben Variablen im Speicher. In dotnet kümmert sich um das Aufräumen des Prozessspeichers normaler weise der Garbadge Collector der aber bei einem schlanken Tool wie KeePass nicht anspringt, weil der reservierte Speicher absolut ausreicht. D. h. der Speicher von weggeworfenen Variablen bleibt bestehen und wird beim nächsten Bedarf einfach wieder überschrieben. Oft hat man über zusätzliche Variablen gar keine Kontrolle wenn sie z. B. sich innerhalb einer nicht selbst geschriebenen dll befinden oder vom System angelegt werden. Da reicht bei c# die Verwendung eines ToList oder sogar manchmal die Verwendung einer foreach-Anweisung. Ist da nun ein Passwort dabei nunja shit happens. Unmanaged sprachen kommen unter umständen auch nicht so gut weg. Der letzte gerade erwähnte Part gilt auch hier, und wenn der Entwickler für den Speicher verantwortlich ist, ist es doch die Frage, ob er sich auch sauber drum kümmert. Sicher vermeiden lässt sich die Tatsache in einem solchen Fall nicht, dass das Passwort nie im Speicher ist, aber wir müssen als Entwickler es anderen ja auch nicht gleich zu leicht machen.

Kommt man wieder auf KeePass zurück so ist mein Highlite, dass Dominik Reichl die Problematik bewusst sein muss. Im KeePass Code findet man dazu folgendes Kommentar:

![Kommentar im Code](/images/Passwoerter-auf-dem-Silbertablett/Comment.jpg)

Am 17.03 habe ich ihn noch mal um ein Statement gebeten, eine Antwort erwarte ich allerdings nicht. Dank dem Artikel von heise und dem regen E-Mail Kontakt ist mir zudem bewusst, dass die hier aufgezeigte Sicherheitslücke auch in anderen Managern vorkommt. Wissentlich oder unwissentlich das wissen wir nicht. Für mich ist hierbei besonders der Umgang schlimm. Zum einen sagt es mir das bei Test als auch bei der Entwicklung geschlampt wurde oder zumindest nicht an so etwas Banales gedacht wurde. Zum anderen halte ich es für gefährlich das dem User auf Webseiten und von den Tools suggeriert wird, seine Passwörter seien sicher. Hier vertraut man einem Tool eine wertvolle Information, an die dann all zu leicht preisgegeben wird. Für Open Source Anwendungen kann zumindest die Community auf die Behebung achten bei gekauften Managern bleibt den meisten nur Vertrauen übrig.

Natürlich bleibt die Frage, wie wahrscheinlich ist es, dass diese Sicherheitslücke ausgenutzt wird. Es bedarf keine super Informatikerfähigkeiten und auf Rechner zu gelangen schaffen auch andere Tools und Viren. Für mich bleibt bei den Managern ein fader Beigeschmack. Mag sein, dass andere Angriffe lukrativer sind, aber ich habe während meiner Ausbildung eines gelernt, wenn irgendwas möglich ist, wird es auch irgendwann jemand tun und sei es nur aus Neugier oder spaß.

Für KeePass habe ich mir herausgenommen das Tool zu forken, ich weis, noch nicht ob ich das Datenleck komplett geschlossen bekomme und wie viel Zeit ich in diesen Fork investieren kann, aber ich versuche es. Als Schluss beleibt die Erkenntnis keiner Software zu vertrauen, nachsichtiger beim Testen und Entwickeln von Software zu sein und generell auf seine IT-Sicherheit zu achten. Auf einem Rechner, wo kein Virus drauf kommt, liest mir auch hoffentlich keiner die Passwörter aus. Marketing technisch vielleicht schlecht aber sicher sicherheitstechnisch sinnvoll wäre es zudem auf solche Fehler aufmerksam zu machen. Zudem sollte man bei wichtigen Dingen wohl eher auf Zweifaktorauthentifizierung setzen.

---

Der c't Artikel ist in der Ausgabe 07/2018 (S. 74) erschienen. Er ist auch online erhältlich: [Klartext?](https://www.heise.de/ct/ausgabe/2018-7-Ein-zweiter-Blick-auf-Passwortmanager-unter-Windows-3991668.html).

Der Fork zu KeePass findet ihr [hier](https://github.com/Gallimathias/KeePass).

> Korrektur: In einer früheren Ausgabe habe ich mich vertippt. Ich nutze natürlich die CheatEngine 6.7, im Artikel hieß es ich nutze eine GameEngine das ist natürlich Murks.