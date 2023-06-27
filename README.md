# GitHub Actions Demo

## Introduction

This is the GitHub Actions demo created by Ascending. The repo has the standard structure of a
[Sphinx](https://www.sphinx-doc.org/en/master/) documentation project written with
[reStructuredText](https://docutils.sourceforge.io/rst.html).

## Build HTML pages

The HTML pages should first be built from the `.rst` source files, for which we need to create a local Python
virtual environment and install [Sphinx](https://www.sphinx-doc.org/en/master/) and its dependencies.

The following steps work on macOS and Linux. On Windows, replace `pyenv` commands with equivalents of the
[Python Launcher](https://peps.python.org/pep-0397/) `py.exe`.

```bash
pyenv local 3.9
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

After installation, run:

```bash
make html
```

This builds the HTML pages from their source `.rst` files and places the static web pages and assets in the
`build/html` folder.

## View the pages

There are two options for viewing the built HTML pages:

- Simply open `build/html/index.html` by a browser. This way, each HTML page is considered a separate website
  by the browser, which causes some unexpected viewing effects. For example, zooming in/out on one of the pages
  won't be automatically carried over to others.

- Run a static web server at `http://localhost:8080` using `nodemon`. This way, all the HTML pages are considered
  as belonging to one website. The commands to use are:

  ```bash
  npm install  # only needed for the first time
  npm start
  ```
