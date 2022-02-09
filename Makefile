.PHONY: update-bogons
update-bogons:
	curl -s -o data/fullbogons-ipv4.txt https://www.team-cymru.org/Services/Bogons/fullbogons-ipv4.txt