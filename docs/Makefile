# Sandman Jekyll Site Makefile
# Simple interface to the build_site.sh script

.PHONY: help install clean build serve test docs deploy-github deploy-netlify

# Default target
all: build

help:
	@echo "Sandman Jekyll Site Build Commands"
	@echo ""
	@echo "Available targets:"
	@echo "  install        Install Ruby dependencies"
	@echo "  serve          Start development server"
	@echo "  build          Build site for production"
	@echo "  clean          Clean build artifacts"
	@echo "  test           Run site tests"
	@echo "  docs           Generate API documentation"
	@echo "  deploy-github  Deploy to GitHub Pages"
	@echo "  deploy-netlify Deploy to Netlify"
	@echo ""
	@echo "Environment variables:"
	@echo "  JEKYLL_ENV     Set Jekyll environment (development, production, test)"
	@echo ""
	@echo "Examples:"
	@echo "  make install"
	@echo "  make serve"
	@echo "  make build"
	@echo "  JEKYLL_ENV=development make build"

install:
	@./build_site.sh install

clean:
	@./build_site.sh clean

build:
	@./build_site.sh build


serve:
	@./build_site.sh serve

test:
	@./build_site.sh test

docs:
	@./build_site.sh docs

deploy-github:
	@./build_site.sh deploy github

deploy-netlify:
	@./build_site.sh deploy netlify

