.PHONY: dev build css push

dev:
	hugo server -D

css:
	npx tailwindcss -i ./assets/css/main.css -o ./assets/css/output.css --watch

build:
	hugo -D

push:
	git push && vercel --prod
