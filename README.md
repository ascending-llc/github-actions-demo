# Getting Started with GitHub Actions

## Overview

GitHub Actions is a CI/CD platform. It runs users' _workflows_ defined by declarative YAML files in the
`.github/workflows` folder of a GitHub repo.

On a high-level:

- Each GitHub repo has one or more _workflows_.

- Each workflow is made up of one or more _jobs_, by default running concurrently in separate virtual machines.

- Each job consists of one or more _steps_, by default running sequentially but each in its own process.

### Workflow

Each workflow should define a single CI/CD process, e.g. unit test, deploy, etc. It should have at least the following
three top-level YAML keys.

- `name`: Descriptive name of the workflow, which appears in the web UI.

- `on`: Contains one _or more_ triggers of the workflow.

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

GitHub Actions provides quite a few different kinds of triggers, such as:

- `workflow_dispatch`: Allows manual triggering of the workflow from web UI. Can take up to 10 input parameters.

- `workflow_call`: Allows the workflow to be "called" by other workflows. Capable of taking input parameters.

- `push` and `pull_request`: Triggers on push and pull request events. Allows fine-grained filtering on the branch
  name and/or the files changed.

- `schedule`: Triggers workflow at scheduled time.

GitHub Actions has a "control plane" that watches for qualifying events in the repo and triggers the corresponding
workflows. For every job in the triggered workflow, the control plane finds a "runner" to execute it in. The control
plane is free to use. Users are charged by minutes on GitHub hosted runners only. In addition, actions on public
repos are completely free. Private repos have a generous free tier.

### Job

By default, each job is placed in a separate _ephemeral_ GitHub hosted runner and runs in parallel with other jobs
in the same workflow. The runner is a new virtual machine with a rich set of pre-installed tools. It is torn down
after the job finishes. Dependent relationships between jobs can be set up, but they still run in separate runners.

**Gotcha:**

- The build artifacts from a previous job are not readily available to the subsequent jobs that depend
  on it. Must use [actions/upload-artifact](https://github.com/actions/upload-artifact) and
  [actions/download-artifact](https://github.com/actions/download-artifact) to pass them around.

**Advantages:**

- Virtual machine provides better isolation between different users' workloads. Tearing down the VM afterwards makes
  it even more secure.

- Great support for deploying resources in AWS: Use an AWS provided CloudFormation template to create an
  `AWS::IAM::OIDCProvider` resource in user's AWS account. A runner can thereby authenticate itself to the
  `OIDCProvider` as the GitHub repo that triggers the workflow. This allows the runner to assume an IAM role used for
  deployment without using credentials. In addition, all assuming activities of the role are logged in CloudTrail.

### Steps

The core of a job is `steps` – a sequence of shell commands to run. In fact, GitHub Actions is primarily a set of
convenient features to help users run shell commands on a fresh VM.

A step can only be one of the two kinds:

- `run`

  Just run one or more plain shell commands.

- `uses`

  Use an existing custom action. This is similar to calling a shell function. A custom action can be made to take user
  inputs.

**Note:**

- A `run` step should not contain complex logic written in shell, because GitHub Actions is supposed to be declarations
  rather than code. Complex logic should be encapsulated in a custom action, which is rather easy to write. We will
  cover custom actions in later sections.

Naturally, one of these conveniences should be the ability for earlier steps to dynamically set variables that can be
used by later steps. GitHub Actions implements this by two mechanisms – environment variables and contexts.
