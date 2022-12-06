# Getting Started with GitHub Actions

## Overview

GitHub Actions is a CI/CD platform. It runs users' _workflows_ defined by declarative YAML files in the
`.github/workflows` folder of a GitHub repo.

### Workflow

Each workflow should define a single CI/CD process, e.g. unit test, deploy, etc. It should have at least the following
three top-level YAML keys.

- `name`: Descriptive name of the workflow, which appears in the web UI.

- `on`: Contains one or more triggers of the workflow.

- `jobs`: Defines all the jobs that make up the workflow.

Example:

```yaml
name: Hello World
on: workflow_dispatch
jobs:
  greeting:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: 'main'
      - run: echo 'Hello World!'
```
