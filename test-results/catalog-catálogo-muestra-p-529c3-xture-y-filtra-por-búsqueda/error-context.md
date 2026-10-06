# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog.spec.ts >> catálogo >> muestra podcasts de fixture y filtra por búsqueda
- Location: e2e\catalog.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /Fixture Show/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('link', { name: /Fixture Show/i }) with timeout 5000ms
  - waiting for getByRole('link', { name: /Fixture Show/i })

```

```yaml
- banner:
  - link "Ondea":
    - /url: /
  - button "Activar tema oscuro"
- main:
  - text: "100"
  - combobox "Filtrar por género":
    - option "All genres" [selected]
    - option "Music"
    - option "Music Commentary"
    - option "Music History"
    - option "Music Interviews"
  - textbox "Filtrar podcasts":
    - /placeholder: Search podcast...
  - 'link "Tony Mantor''s : Almost Live..... Nashville Tony Mantor''s : Almost Live..... Nashville Author: iHeartPodcasts"':
    - /url: /podcast/1751194045
    - 'img "Tony Mantor''s : Almost Live..... Nashville"'
    - 'heading "Tony Mantor''s : Almost Live..... Nashville" [level=2]'
    - paragraph: "Author: iHeartPodcasts"
  - 'link "The Joe Budden Podcast The Joe Budden Podcast Author: The Joe Budden Network"':
    - /url: /podcast/1535809341
    - img "The Joe Budden Podcast"
    - heading "The Joe Budden Podcast" [level=2]
    - paragraph: "Author: The Joe Budden Network"
  - 'link "Jersey Made Jersey Made Author: Buzz Knight | Music History Podcast Host"':
    - /url: /podcast/6807140302
    - img "Jersey Made"
    - heading "Jersey Made" [level=2]
    - paragraph: "Author: Buzz Knight | Music History Podcast Host"
  - 'link "Music Saved Me Podcast Music Saved Me Podcast Author: Buzz Knight Media Productions"':
    - /url: /podcast/1703080557
    - img "Music Saved Me Podcast"
    - heading "Music Saved Me Podcast" [level=2]
    - paragraph: "Author: Buzz Knight Media Productions"
  - 'link "Takin’ A Walk Nashville Takin’ A Walk Nashville Author: Buzz Knight Media Productions"':
    - /url: /podcast/1846859935
    - img "Takin’ A Walk Nashville"
    - heading "Takin’ A Walk Nashville" [level=2]
    - paragraph: "Author: Buzz Knight Media Productions"
  - 'link "Techy Tekki Trance, Techno, and Euphoric Hardstyle Techy Tekki Trance, Techno, and Euphoric Hardstyle Author: DJ Patochan"':
    - /url: /podcast/1807824696
    - img "Techy Tekki Trance, Techno, and Euphoric Hardstyle"
    - heading "Techy Tekki Trance, Techno, and Euphoric Hardstyle" [level=2]
    - paragraph: "Author: DJ Patochan"
  - 'link "Dolly Parton''s America Dolly Parton''s America Author: WNYC Studios & OSM Audio"':
    - /url: /podcast/1481398762
    - img "Dolly Parton's America"
    - heading "Dolly Parton's America" [level=2]
    - paragraph: "Author: WNYC Studios & OSM Audio"
  - 'link "The New Wave Music Podcast The New Wave Music Podcast Author: The New Wave Music Podcast"':
    - /url: /podcast/1584426703
    - img "The New Wave Music Podcast"
    - heading "The New Wave Music Podcast" [level=2]
    - paragraph: "Author: The New Wave Music Podcast"
  - 'link "DISGRACELAND DISGRACELAND Author: Exactly Right and iHeartPodcasts"':
    - /url: /podcast/1275172907
    - img "DISGRACELAND"
    - heading "DISGRACELAND" [level=2]
    - paragraph: "Author: Exactly Right and iHeartPodcasts"
  - 'link "Music Matters with Darrell Craig Harris Music Matters with Darrell Craig Harris Author: Darrell Craig Harris"':
    - /url: /podcast/1541561056
    - img "Music Matters with Darrell Craig Harris"
    - heading "Music Matters with Darrell Craig Harris" [level=2]
    - paragraph: "Author: Darrell Craig Harris"
  - 'link "New Rory & MAL New Rory & MAL Author: iHeartPodcasts and The Volume"':
    - /url: /podcast/1572182022
    - img "New Rory & MAL"
    - heading "New Rory & MAL" [level=2]
    - paragraph: "Author: iHeartPodcasts and The Volume"
  - 'link "A History of Rock Music in 500 Songs A History of Rock Music in 500 Songs Author: Andrew Hickey"':
    - /url: /podcast/1437402802
    - img "A History of Rock Music in 500 Songs"
    - heading "A History of Rock Music in 500 Songs" [level=2]
    - paragraph: "Author: Andrew Hickey"
  - 'link "Joe and Jada Joe and Jada Author: iHeartPodcasts and The Volume"':
    - /url: /podcast/1812462068
    - img "Joe and Jada"
    - heading "Joe and Jada" [level=2]
    - paragraph: "Author: iHeartPodcasts and The Volume"
  - 'link "Bandsplain Bandsplain Author: The Ringer"':
    - /url: /podcast/1671021737
    - img "Bandsplain"
    - heading "Bandsplain" [level=2]
    - paragraph: "Author: The Ringer"
  - 'link "Popcast Popcast Author: The New York Times"':
    - /url: /podcast/120315823
    - img "Popcast"
    - heading "Popcast" [level=2]
    - paragraph: "Author: The New York Times"
  - 'link "You''ll Hear It: Full Album Deep Dives with Jazz Musicians You''ll Hear It: Full Album Deep Dives with Jazz Musicians Author: Peter Martin & Adam Maness"':
    - /url: /podcast/1342674932
    - 'img "You''ll Hear It: Full Album Deep Dives with Jazz Musicians"'
    - 'heading "You''ll Hear It: Full Album Deep Dives with Jazz Musicians" [level=2]'
    - paragraph: "Author: Peter Martin & Adam Maness"
  - 'link "The Indie Sound with Jimmy Star The Indie Sound with Jimmy Star Author: theindiesoundwithjimmystar"':
    - /url: /podcast/1847762617
    - img "The Indie Sound with Jimmy Star"
    - heading "The Indie Sound with Jimmy Star" [level=2]
    - paragraph: "Author: theindiesoundwithjimmystar"
  - 'link "No Dogs in Space No Dogs in Space Author: The Last Podcast Network"':
    - /url: /podcast/1495604041
    - img "No Dogs in Space"
    - heading "No Dogs in Space" [level=2]
    - paragraph: "Author: The Last Podcast Network"
  - 'link "60 Songs That Explain the ''90s 60 Songs That Explain the ''90s Author: The Ringer"':
    - /url: /podcast/1635211340
    - img "60 Songs That Explain the '90s"
    - heading "60 Songs That Explain the '90s" [level=2]
    - paragraph: "Author: The Ringer"
  - 'link "The Zane Lowe Interview Series The Zane Lowe Interview Series Author: Apple Music"':
    - /url: /podcast/1461515071
    - img "The Zane Lowe Interview Series"
    - heading "The Zane Lowe Interview Series" [level=2]
    - paragraph: "Author: Apple Music"
  - 'link "Alchemy with Anthony Mason Alchemy with Anthony Mason Author: Anthony Mason"':
    - /url: /podcast/6802714431
    - img "Alchemy with Anthony Mason"
    - heading "Alchemy with Anthony Mason" [level=2]
    - paragraph: "Author: Anthony Mason"
  - 'link "Drink Champs Drink Champs Author: The Black Effect Podcast Network and iHeartPodcasts"':
    - /url: /podcast/1096830182
    - img "Drink Champs"
    - heading "Drink Champs" [level=2]
    - paragraph: "Author: The Black Effect Podcast Network and iHeartPodcasts"
  - 'link "Song Exploder Song Exploder Author: Hrishikesh Hirway"':
    - /url: /podcast/788236947
    - img "Song Exploder"
    - heading "Song Exploder" [level=2]
    - paragraph: "Author: Hrishikesh Hirway"
  - 'link "NPR Music NPR Music Author: NPR"':
    - /url: /podcast/79687345
    - img "NPR Music"
    - heading "NPR Music" [level=2]
    - paragraph: "Author: NPR"
  - 'link "One Song One Song Author: One Song"':
    - /url: /podcast/1696154359
    - img "One Song"
    - heading "One Song" [level=2]
    - paragraph: "Author: One Song"
  - 'link "\"Lets Rap About it\" hosted by Fabolous, Maino, Dave East & Jim Jones \"Lets Rap About it\" hosted by Fabolous, Maino, Dave East & Jim Jones Author: IFC"':
    - /url: /podcast/1845657564
    - img "\"Lets Rap About it\" hosted by Fabolous, Maino, Dave East & Jim Jones"
    - heading "\"Lets Rap About it\" hosted by Fabolous, Maino, Dave East & Jim Jones" [level=2]
    - paragraph: "Author: IFC"
  - 'link "Before The Moment with Nile Rodgers Before The Moment with Nile Rodgers Author: iHeartPodcasts"':
    - /url: /podcast/6810221315
    - img "Before The Moment with Nile Rodgers"
    - heading "Before The Moment with Nile Rodgers" [level=2]
    - paragraph: "Author: iHeartPodcasts"
  - 'link "Takin'' A Walk - Music History with Buzz Knight Takin'' A Walk - Music History with Buzz Knight Author: Buzz Knight | Music History Podcast Host"':
    - /url: /podcast/1594930776
    - img "Takin' A Walk - Music History with Buzz Knight"
    - heading "Takin' A Walk - Music History with Buzz Knight" [level=2]
    - paragraph: "Author: Buzz Knight | Music History Podcast Host"
  - 'link "Light Box Light Box Author: Mark Henry Phillips & Radiotopia"':
    - /url: /podcast/6798327577
    - img "Light Box"
    - heading "Light Box" [level=2]
    - paragraph: "Author: Mark Henry Phillips & Radiotopia"
  - 'link "Broken Record with Rick Rubin, Malcolm Gladwell, Bruce Headlam and Justin Richmond Broken Record with Rick Rubin, Malcolm Gladwell, Bruce Headlam and Justin Richmond Author: Pushkin Industries"':
    - /url: /podcast/1311004083
    - img "Broken Record with Rick Rubin, Malcolm Gladwell, Bruce Headlam and Justin Richmond"
    - heading "Broken Record with Rick Rubin, Malcolm Gladwell, Bruce Headlam and Justin Richmond" [level=2]
    - paragraph: "Author: Pushkin Industries"
  - 'link "The Vic Mensa Show The Vic Mensa Show Author: Mass Appeal & ORANJ"':
    - /url: /podcast/6800160324
    - img "The Vic Mensa Show"
    - heading "The Vic Mensa Show" [level=2]
    - paragraph: "Author: Mass Appeal & ORANJ"
  - 'link "Bobby Bones Presents: The BobbyCast Bobby Bones Presents: The BobbyCast Author: Nashville Podcast Network"':
    - /url: /podcast/1220200987
    - 'img "Bobby Bones Presents: The BobbyCast"'
    - 'heading "Bobby Bones Presents: The BobbyCast" [level=2]'
    - paragraph: "Author: Nashville Podcast Network"
  - 'link "Sleep & Relaxation Music to Calm the Nervous System Sleep & Relaxation Music to Calm the Nervous System Author: SOMA Sound"':
    - /url: /podcast/1736221446
    - img "Sleep & Relaxation Music to Calm the Nervous System"
    - heading "Sleep & Relaxation Music to Calm the Nervous System" [level=2]
    - paragraph: "Author: SOMA Sound"
  - 'link "Monday Music Club with Will Anderson Monday Music Club with Will Anderson Author: Vox Media Podcast Network"':
    - /url: /podcast/6804289312
    - img "Monday Music Club with Will Anderson"
    - heading "Monday Music Club with Will Anderson" [level=2]
    - paragraph: "Author: Vox Media Podcast Network"
  - 'link "Million Dollaz Worth Of Game Million Dollaz Worth Of Game Author: Barstool Sports"':
    - /url: /podcast/1460157002
    - img "Million Dollaz Worth Of Game"
    - heading "Million Dollaz Worth Of Game" [level=2]
    - paragraph: "Author: Barstool Sports"
  - 'link "Big Bootie Mixes Vol. 1-27 - Two Friends Big Bootie Mixes Vol. 1-27 - Two Friends Author: Two Friends"':
    - /url: /podcast/1047970546
    - img "Big Bootie Mixes Vol. 1-27 - Two Friends"
    - heading "Big Bootie Mixes Vol. 1-27 - Two Friends" [level=2]
    - paragraph: "Author: Two Friends"
  - 'link "Celebrity Jobber Podcast with Jeff Zito Celebrity Jobber Podcast with Jeff Zito Author: Podcast Playground"':
    - /url: /podcast/1644147062
    - img "Celebrity Jobber Podcast with Jeff Zito"
    - heading "Celebrity Jobber Podcast with Jeff Zito" [level=2]
    - paragraph: "Author: Podcast Playground"
  - 'link "WE BUILT DIFFERENT WE BUILT DIFFERENT Author: MUSICHYPEBEAST"':
    - /url: /podcast/1864597979
    - img "WE BUILT DIFFERENT"
    - heading "WE BUILT DIFFERENT" [level=2]
    - paragraph: "Author: MUSICHYPEBEAST"
  - 'link "PRISMATIC PRISMATIC Author: Tiësto"':
    - /url: /podcast/251507798
    - img "PRISMATIC"
    - heading "PRISMATIC" [level=2]
    - paragraph: "Author: Tiësto"
  - 'link "Sticky Notes: The Classical Music Podcast Sticky Notes: The Classical Music Podcast Author: Joshua Weilerstein"':
    - /url: /podcast/1215386938
    - 'img "Sticky Notes: The Classical Music Podcast"'
    - 'heading "Sticky Notes: The Classical Music Podcast" [level=2]'
    - paragraph: "Author: Joshua Weilerstein"
  - 'link "93X Half-Assed Morning Show 93X Half-Assed Morning Show Author: 93X | Cumulus Media Minneapolis | KXXR-FM"':
    - /url: /podcast/708337036
    - img "93X Half-Assed Morning Show"
    - heading "93X Half-Assed Morning Show" [level=2]
    - paragraph: "Author: 93X | Cumulus Media Minneapolis | KXXR-FM"
  - 'link "The Track Star Podcast The Track Star Podcast Author: Jack Coyne"':
    - /url: /podcast/1836496108
    - img "The Track Star Podcast"
    - heading "The Track Star Podcast" [level=2]
    - paragraph: "Author: Jack Coyne"
  - 'link "Every Single Album Every Single Album Author: The Ringer"':
    - /url: /podcast/1592726009
    - img "Every Single Album"
    - heading "Every Single Album" [level=2]
    - paragraph: "Author: The Ringer"
  - 'link "Bob’s Blues & The News Bob’s Blues & The News Author: Robert (Bob) Jeter"':
    - /url: /podcast/1770745684
    - img "Bob’s Blues & The News"
    - heading "Bob’s Blues & The News" [level=2]
    - paragraph: "Author: Robert (Bob) Jeter"
  - 'link "The Questlove Show The Questlove Show Author: iHeartPodcasts"':
    - /url: /podcast/1485250501
    - img "The Questlove Show"
    - heading "The Questlove Show" [level=2]
    - paragraph: "Author: iHeartPodcasts"
  - 'link "Evolution of a Snake: The Taylor Swift Fan Podcast Evolution of a Snake: The Taylor Swift Fan Podcast Author: Evolution of a Snake: The Taylor Swift Fan Podcast"':
    - /url: /podcast/1452608225
    - 'img "Evolution of a Snake: The Taylor Swift Fan Podcast"'
    - 'heading "Evolution of a Snake: The Taylor Swift Fan Podcast" [level=2]'
    - paragraph: "Author: Evolution of a Snake: The Taylor Swift Fan Podcast"
  - 'link "Here''s The Thing with Alec Baldwin Here''s The Thing with Alec Baldwin Author: iHeartPodcasts"':
    - /url: /podcast/472939437
    - img "Here's The Thing with Alec Baldwin"
    - heading "Here's The Thing with Alec Baldwin" [level=2]
    - paragraph: "Author: iHeartPodcasts"
  - 'link "Zach Sang Show Zach Sang Show Author: Sangasong, LLC"':
    - /url: /podcast/1273079673
    - img "Zach Sang Show"
    - heading "Zach Sang Show" [level=2]
    - paragraph: "Author: Sangasong, LLC"
  - 'link "Switched on Pop Switched on Pop Author: Vulture"':
    - /url: /podcast/934552872
    - img "Switched on Pop"
    - heading "Switched on Pop" [level=2]
    - paragraph: "Author: Vulture"
  - 'link "Hit Parade | Music History and Music Trivia Hit Parade | Music History and Music Trivia Author: Slate Podcasts"':
    - /url: /podcast/1291058235
    - img "Hit Parade | Music History and Music Trivia"
    - heading "Hit Parade | Music History and Music Trivia" [level=2]
    - paragraph: "Author: Slate Podcasts"
  - 'link "Dissect Dissect Author: The Ringer"':
    - /url: /podcast/1143845868
    - img "Dissect"
    - heading "Dissect" [level=2]
    - paragraph: "Author: The Ringer"
  - 'link "The Ebro, Laura, Rosenberg Show The Ebro, Laura, Rosenberg Show Author: Ebro, Laura, Rosenberg"':
    - /url: /podcast/1861635232
    - img "The Ebro, Laura, Rosenberg Show"
    - heading "The Ebro, Laura, Rosenberg Show" [level=2]
    - paragraph: "Author: Ebro, Laura, Rosenberg"
  - 'link "Sound Opinions Sound Opinions Author: Sound Opinions"':
    - /url: /podcast/94793843
    - img "Sound Opinions"
    - heading "Sound Opinions" [level=2]
    - paragraph: "Author: Sound Opinions"
  - 'link "Markus Schulz presents Global DJ Broadcast Markus Schulz presents Global DJ Broadcast Author: Markus Schulz"':
    - /url: /podcast/460107093
    - img "Markus Schulz presents Global DJ Broadcast"
    - heading "Markus Schulz presents Global DJ Broadcast" [level=2]
    - paragraph: "Author: Markus Schulz"
  - 'link "HardLore HardLore Author: Colin Young, Bo Lueders, Knotfest"':
    - /url: /podcast/1621352294
    - img "HardLore"
    - heading "HardLore" [level=2]
    - paragraph: "Author: Colin Young, Bo Lueders, Knotfest"
  - 'link "Defected Radio Defected Radio Author: Defected"':
    - /url: /podcast/120107389
    - img "Defected Radio"
    - heading "Defected Radio" [level=2]
    - paragraph: "Author: Defected"
  - 'link "Tiny Desk Concerts - Audio Tiny Desk Concerts - Audio Author: NPR"':
    - /url: /podcast/657476401
    - img "Tiny Desk Concerts - Audio"
    - heading "Tiny Desk Concerts - Audio" [level=2]
    - paragraph: "Author: NPR"
  - 'link "Strong Songs Strong Songs Author: Kirk Hamilton"':
    - /url: /podcast/1443417194
    - img "Strong Songs"
    - heading "Strong Songs" [level=2]
    - paragraph: "Author: Kirk Hamilton"
  - 'link "what i will say - a Taylor Swift Podcast what i will say - a Taylor Swift Podcast Author: Bop Culture"':
    - /url: /podcast/1527132455
    - img "what i will say - a Taylor Swift Podcast"
    - heading "what i will say - a Taylor Swift Podcast" [level=2]
    - paragraph: "Author: Bop Culture"
  - 'link "Angie Martinez IRL Angie Martinez IRL Author: iHeartPodcasts and The Volume"':
    - /url: /podcast/1633466636
    - img "Angie Martinez IRL"
    - heading "Angie Martinez IRL" [level=2]
    - paragraph: "Author: iHeartPodcasts and The Volume"
  - 'link "Norah Jones Is Playing Along Norah Jones Is Playing Along Author: iHeartPodcasts"':
    - /url: /podcast/1645438817
    - img "Norah Jones Is Playing Along"
    - heading "Norah Jones Is Playing Along" [level=2]
    - paragraph: "Author: iHeartPodcasts"
  - 'link "No Jumper No Jumper Author: No Jumper"':
    - /url: /podcast/1001659715
    - img "No Jumper"
    - heading "No Jumper" [level=2]
    - paragraph: "Author: No Jumper"
  - 'link "All Songs Considered All Songs Considered Author: NPR"':
    - /url: /podcast/1880097970
    - img "All Songs Considered"
    - heading "All Songs Considered" [level=2]
    - paragraph: "Author: NPR"
  - 'link "Nora En Pure - Purified Radio Nora En Pure - Purified Radio Author: This Is Distorted"':
    - /url: /podcast/897935770
    - img "Nora En Pure - Purified Radio"
    - heading "Nora En Pure - Purified Radio" [level=2]
    - paragraph: "Author: This Is Distorted"
  - 'link "Rolling Stone All Access Rolling Stone All Access Author: Rolling Stone"':
    - /url: /podcast/1078431985
    - img "Rolling Stone All Access"
    - heading "Rolling Stone All Access" [level=2]
    - paragraph: "Author: Rolling Stone"
  - 'link "R&B Money R&B Money Author: The Black Effect Podcast Network and iHeartPodcasts"':
    - /url: /podcast/1623212249
    - img "R&B Money"
    - heading "R&B Money" [level=2]
    - paragraph: "Author: The Black Effect Podcast Network and iHeartPodcasts"
  - 'link "2004: The Year Indie Rock Broke 2004: The Year Indie Rock Broke Author: Nevermind Media"':
    - /url: /podcast/6808750081
    - 'img "2004: The Year Indie Rock Broke"'
    - 'heading "2004: The Year Indie Rock Broke" [level=2]'
    - paragraph: "Author: Nevermind Media"
  - 'link "Our Thing: The Birth of Salsa in Nueva York Our Thing: The Birth of Salsa in Nueva York Author: Futuro Media"':
    - /url: /podcast/1896449326
    - 'img "Our Thing: The Birth of Salsa in Nueva York"'
    - 'heading "Our Thing: The Birth of Salsa in Nueva York" [level=2]'
    - paragraph: "Author: Futuro Media"
  - 'link "Garza Podcast Garza Podcast Author: Chris Garza"':
    - /url: /podcast/1551076579
    - img "Garza Podcast"
    - heading "Garza Podcast" [level=2]
    - paragraph: "Author: Chris Garza"
  - 'link "The Real Report with Tony Yayo and Uncle Murda The Real Report with Tony Yayo and Uncle Murda Author: iHeartPodcasts and The Volume"':
    - /url: /podcast/1875984132
    - img "The Real Report with Tony Yayo and Uncle Murda"
    - heading "The Real Report with Tony Yayo and Uncle Murda" [level=2]
    - paragraph: "Author: iHeartPodcasts and The Volume"
  - 'link "Professor of Rock Professor of Rock Author: Gamut Podcast Network"':
    - /url: /podcast/1805000392
    - img "Professor of Rock"
    - heading "Professor of Rock" [level=2]
    - paragraph: "Author: Gamut Podcast Network"
  - 'link "Big Bro with Kid Cudi Big Bro with Kid Cudi Author: Wave"':
    - /url: /podcast/1888620937
    - img "Big Bro with Kid Cudi"
    - heading "Big Bro with Kid Cudi" [level=2]
    - paragraph: "Author: Wave"
  - 'link "GOOD OL'' GRATEFUL DEADCAST GOOD OL'' GRATEFUL DEADCAST Author: Grateful Dead"':
    - /url: /podcast/1522914723
    - img "GOOD OL' GRATEFUL DEADCAST"
    - heading "GOOD OL' GRATEFUL DEADCAST" [level=2]
    - paragraph: "Author: Grateful Dead"
  - 'link "Rockonteurs with Gary Kemp and Guy Pratt Rockonteurs with Gary Kemp and Guy Pratt Author: Gary Kemp and Guy Pratt"':
    - /url: /podcast/1530701242
    - img "Rockonteurs with Gary Kemp and Guy Pratt"
    - heading "Rockonteurs with Gary Kemp and Guy Pratt" [level=2]
    - paragraph: "Author: Gary Kemp and Guy Pratt"
  - 'link "God''s Country God''s Country Author: The Brothers Hunt"':
    - /url: /podcast/1724974482
    - img "God's Country"
    - heading "God's Country" [level=2]
    - paragraph: "Author: The Brothers Hunt"
  - 'link "Living for the City Living for the City Author: Side Stage"':
    - /url: /podcast/1895831267
    - img "Living for the City"
    - heading "Living for the City" [level=2]
    - paragraph: "Author: Side Stage"
  - 'link "The Downbeat The Downbeat Author: Craig Reynolds"':
    - /url: /podcast/1807427163
    - img "The Downbeat"
    - heading "The Downbeat" [level=2]
    - paragraph: "Author: Craig Reynolds"
  - 'link "Indiecast Indiecast Author: Amazon Music"':
    - /url: /podcast/1524940951
    - img "Indiecast"
    - heading "Indiecast" [level=2]
    - paragraph: "Author: Amazon Music"
  - 'link "Shawn Stockman''s On That Note Shawn Stockman''s On That Note Author: Shawn Stockman"':
    - /url: /podcast/1799362003
    - img "Shawn Stockman's On That Note"
    - heading "Shawn Stockman's On That Note" [level=2]
    - paragraph: "Author: Shawn Stockman"
  - 'link "And The Writer Is...with Ross Golan And The Writer Is...with Ross Golan Author: And The Writer Is"':
    - /url: /podcast/1197924737
    - img "And The Writer Is...with Ross Golan"
    - heading "And The Writer Is...with Ross Golan" [level=2]
    - paragraph: "Author: And The Writer Is"
  - 'link "Straight Stuntin'' Digital with BX Thunder & Yami Doll Straight Stuntin'' Digital with BX Thunder & Yami Doll Author: StreetSweepers Ent. Inc"':
    - /url: /podcast/1896944902
    - img "Straight Stuntin' Digital with BX Thunder & Yami Doll"
    - heading "Straight Stuntin' Digital with BX Thunder & Yami Doll" [level=2]
    - paragraph: "Author: StreetSweepers Ent. Inc"
  - 'link "Pickin'' It Out with Andrew Pope Pickin'' It Out with Andrew Pope Author: Andrew Pope"':
    - /url: /podcast/1541545521
    - img "Pickin' It Out with Andrew Pope"
    - heading "Pickin' It Out with Andrew Pope" [level=2]
    - paragraph: "Author: Andrew Pope"
  - 'link "Before I Forget Before I Forget Author: Lil Xan"':
    - /url: /podcast/1854185870
    - img "Before I Forget"
    - heading "Before I Forget" [level=2]
    - paragraph: "Author: Lil Xan"
  - 'link "Pop Pantheon Pop Pantheon Author: DJ Louie XIV"':
    - /url: /podcast/1556457357
    - img "Pop Pantheon"
    - heading "Pop Pantheon" [level=2]
    - paragraph: "Author: DJ Louie XIV"
  - 'link "DJ LOFT Mixes DJ LOFT Mixes Author: Dj Loft"':
    - /url: /podcast/1346543786
    - img "DJ LOFT Mixes"
    - heading "DJ LOFT Mixes" [level=2]
    - paragraph: "Author: Dj Loft"
  - 'link "Carr Stereo Podcast Carr Stereo Podcast Author: Terrie Carr"':
    - /url: /podcast/6788435236
    - img "Carr Stereo Podcast"
    - heading "Carr Stereo Podcast" [level=2]
    - paragraph: "Author: Terrie Carr"
  - 'link "Peeling Back the Curtain Peeling Back the Curtain Author: DJ Five Venoms"':
    - /url: /podcast/1894014515
    - img "Peeling Back the Curtain"
    - heading "Peeling Back the Curtain" [level=2]
    - paragraph: "Author: DJ Five Venoms"
  - 'link "Know Your Gear Podcast Know Your Gear Podcast Author: Phillip Mcknight"':
    - /url: /podcast/1252877095
    - img "Know Your Gear Podcast"
    - heading "Know Your Gear Podcast" [level=2]
    - paragraph: "Author: Phillip Mcknight"
  - 'link "The Swiftie and The Scholar The Swiftie and The Scholar Author: Angela McDow | Dr. Jerry Coats"':
    - /url: /podcast/1828732605
    - img "The Swiftie and The Scholar"
    - heading "The Swiftie and The Scholar" [level=2]
    - paragraph: "Author: Angela McDow | Dr. Jerry Coats"
  - 'link "Fullklipp Ent Promos & Mixtape Fullklipp Ent Promos & Mixtape Author: Fullklipp Entertainment"':
    - /url: /podcast/1184642498
    - img "Fullklipp Ent Promos & Mixtape"
    - heading "Fullklipp Ent Promos & Mixtape" [level=2]
    - paragraph: "Author: Fullklipp Entertainment"
  - 'link "The Martin Garrix Show The Martin Garrix Show Author: Martin Garrix"':
    - /url: /podcast/1132914986
    - img "The Martin Garrix Show"
    - heading "The Martin Garrix Show" [level=2]
    - paragraph: "Author: Martin Garrix"
  - 'link "Drifting Cowboy Drifting Cowboy Author: Dillon Weldon"':
    - /url: /podcast/1813731646
    - img "Drifting Cowboy"
    - heading "Drifting Cowboy" [level=2]
    - paragraph: "Author: Dillon Weldon"
  - 'link "Oliver Heldens presents Heldeep Radio Oliver Heldens presents Heldeep Radio Author: Oliver Heldens"':
    - /url: /podcast/1236253646
    - img "Oliver Heldens presents Heldeep Radio"
    - heading "Oliver Heldens presents Heldeep Radio" [level=2]
    - paragraph: "Author: Oliver Heldens"
  - 'link "The Eddie Trunk Podcast The Eddie Trunk Podcast Author: SiriusXM"':
    - /url: /podcast/897720614
    - img "The Eddie Trunk Podcast"
    - heading "The Eddie Trunk Podcast" [level=2]
    - paragraph: "Author: SiriusXM"
  - 'link "Straight From the Source Podcast Straight From the Source Podcast Author: Benzino"':
    - /url: /podcast/1896686422
    - img "Straight From the Source Podcast"
    - heading "Straight From the Source Podcast" [level=2]
    - paragraph: "Author: Benzino"
  - 'link "Felix Sama Podcast Felix Sama Podcast Author: Felix Sama"':
    - /url: /podcast/1673957156
    - img "Felix Sama Podcast"
    - heading "Felix Sama Podcast" [level=2]
    - paragraph: "Author: Felix Sama"
  - 'link "Mastermind Master Studio Mastermind Master Studio Author: Mastermind Master Studio"':
    - /url: /podcast/1651447753
    - img "Mastermind Master Studio"
    - heading "Mastermind Master Studio" [level=2]
    - paragraph: "Author: Mastermind Master Studio"
  - 'link "DJ Akademiks Live Streams DJ Akademiks Live Streams Author: The Akademy"':
    - /url: /podcast/1756092897
    - img "DJ Akademiks Live Streams"
    - heading "DJ Akademiks Live Streams" [level=2]
    - paragraph: "Author: The Akademy"
  - 'link "The Runcast with John Richards The Runcast with John Richards Author: KEXP"':
    - /url: /podcast/76069540
    - img "The Runcast with John Richards"
    - heading "The Runcast with John Richards" [level=2]
    - paragraph: "Author: KEXP"
  - 'link "The Deadpod The Deadpod Author: J.Henrikson"':
    - /url: /podcast/73329726
    - img "The Deadpod"
    - heading "The Deadpod" [level=2]
    - paragraph: "Author: J.Henrikson"
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { preparePage } from "./helpers";
  3  | 
  4  | test.describe("catálogo", () => {
  5  |   test("muestra podcasts de fixture y filtra por búsqueda", async ({
  6  |     page,
  7  |   }) => {
  8  |     await preparePage(page);
  9  |     await page.goto("/");
  10 |     await expect(
  11 |       page.getByRole("link", { name: /Fixture Show/i }),
> 12 |     ).toBeVisible();
     |       ^ Error: expect(locator).toBeVisible() failed
  13 |     await expect(page.locator(".badge")).toHaveText("2");
  14 | 
  15 |     const search = page.getByLabel("Filtrar podcasts");
  16 |     await search.fill("");
  17 |     await search.pressSequentially("NPR");
  18 |     await expect(page.locator(".badge")).toHaveText("1", { timeout: 10_000 });
  19 |     await expect(
  20 |       page.getByRole("link", { name: /Fixture Show/i }),
  21 |     ).not.toBeVisible();
  22 |   });
  23 | 
  24 |   test("filtra por género", async ({ page }) => {
  25 |     await preparePage(page);
  26 |     await page.goto("/");
  27 |     await page.getByLabel("Filtrar por género").selectOption({
  28 |       label: "Music Commentary",
  29 |     });
  30 |     await expect(page.locator(".badge")).toHaveText("1", { timeout: 10_000 });
  31 |     await expect(
  32 |       page.getByRole("link", { name: /Fixture Show/i }),
  33 |     ).toBeVisible();
  34 |   });
  35 | });
  36 | 
```