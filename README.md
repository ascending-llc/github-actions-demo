# GitHub Actions Demo

## Introduction

This is the GitHub Actions demo created by Ascending. The repo has the standard structure of a
[Sphinx](https://www.sphinx-doc.org/en/master/) documentation project written with
[reStructuredText](https://docutils.sourceforge.io/rst.html).

## How to view

To view the nice-looking HTML pages built from the `.rst` source files, we need to first create a local Python
virtual environment and install [Sphinx](https://www.sphinx-doc.org/en/master/) and its dependencies.

The following steps work on macOS and Linux. On Windows, replace `pyenv` commands with equivalents of the
[Python Launcher](https://peps.python.org/pep-0397/) `py.exe`.

```bash
pyenv local 3.9
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

After installation, build the HTML pages by:

```bash
make html
```

Then open `build/html/index.html` by your favorite browser.
