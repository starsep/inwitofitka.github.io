---
layout: page
title: Instrukcje dla sędziego
---

## I. Tworzenie turnieju w RRBridge
1. Włączamy RRBridge.
2. Klikamy **Kreator turnieju**.
3. Wybieramy sposób liczenia: **impy** lub **cav. uśr.**
4. Klikamy dalej.
5. Ustawiamy liczbę par oraz liczbę rozdań na rundę.
6. Wybieramy liczbę rund (prawdopodobnie **0** czyli wszystkie).
7. Wybieramy rozstawienie (prawdopodobnie **"kwiatek"** lub **Howell**).
8. Ustawiamy katalog roboczy na C:\Użytkownicy\GrzegorzGardynik\inwitofitka.github.io\YYMMDD
gdzie YYMMDD to data turnieju w formacie YYMMDD np. 170308 dla 8 marca 2017.
9. Zapisujemy turniej w katalogu roboczym (Plik -> Zapisz jako) pod nazwą **YYMMDD.rrt**.
10. (Opcjonalne) Dodajemy rozkłady.
11. Wchodzimy w zakładkę **Pierniczki** oraz klikamy **nowa baza**, zapisujemy
  w katalogu roboczym (nazwa pliku nie ma znaczenia, ale najlepiej *YYMMDD.bws*).

## II. Uruchamianie BridgeTab do zbierania wyników z tabletów
1. Włączamy programm **BOS**.
2. Create new.
3. Wpisujemy nazwę np. YYMMDD.
4. Create.
5. Klikamy **BridgeTab Admin**.
6. Uruchamiamy się okienko BridgeTab Admin.
7. Wracamy do BOS i klikamy **Start scoring**.
8. Klikamy **Browse for other database**.
9. Wybieramy plik BWS.
10. Klikamy **Launch Bridge Scorer Control**.
11. Klikamy **Start**.

## III. Dodawanie licytacji do turnieju w RRBridge

1. Ustawiamy w RRBridge nagłówek:
{% gist 1c90b39fce133a7fee8255eab754edac %}
2. Włączamy RRBridge Bidding Data.
3. Wybieramy plik BWS oraz katalog do zapisu plików z licytacją.
4. Klikamy uruchom.
5. Wysyłamy wyniki zgodnie z instrukcją **IV**.

## IV. Publikowanie wyników na https://inwitofitka.club
Odpalamy konsolę Git Bash.

{% gist 18c49a373429c19609a66b709036cde3 %}
