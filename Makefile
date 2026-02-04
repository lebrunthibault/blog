.PHONY: dev build css push

dev:
	hugo server

css:
	npx tailwindcss -i ./assets/css/main.css -o ./assets/css/output.css --watch

build:
	hugo
