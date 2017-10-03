---
layout: page
title: Treningi licytacyjne na BridgeBaseOnline
---

1. Wchodzimy na bridgebase.com
2. Logujemy się.
3. Klikamy Practice.
![Practice](https://inwitofitka.club/public/img/practice.png)
4. Klikamy Otwórz stół do licytacji.
5. Ustawiamy opcje stołu, rezerujemy miejsca.
6. Klikamy Załóż stół.
7. Klikamy Źródło rozdań.
![Boards source](https://inwitofitka.club/public/img/boards-source.png)
8. Klikamy w zakładkę Zaawansowany
9. (opcjonalne) Klikamy Losowo obróc wygenerowane rozdanie o 180 stopni
10. Klikamy Użyj tego wejścia dla programu The Dealer (Rozdający)
11. Wklejamy ograniczenia z [https://github.com/starsep/bbo/tree/master/dealer_syntax](https://github.com/starsep/bbo/tree/master/dealer_syntax)
12. (opcjonalne) Możemy wkleić ograniczenia dla obu rąk, dodąjąc `&&` pomiędzy, postaci: `(OGRANICZENIA1) && (OGRANICZENIA2)`, przykładowo:

```
(hcp(north) >= 15 && spades(north) >= 7) && (hcp(south) <= 10 && diamonds(south) >= 5)
```
![Dealer](https://inwitofitka.club/public/img/dealer.png)
