Workflow
=========

Each workflow should define a single CI/CD process, e.g. unit test, deploy, etc. It should have at least the following
three top-level YAML keys.

* ``name``: Descriptive name of the workflow, which appears in the web UI.

* ``on``: Contains one *or more* triggers of the workflow.

* ``jobs``: Defines all the jobs that make up the workflow.

Example:

.. code-block:: yaml

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

GitHub Actions provides quite a few different kinds of triggers, such as:

* ``workflow_dispatch``: Allows manual triggering of the workflow from web UI. Can take up to 10 input parameters.

* ``workflow_call``: Allows the workflow to be "called" by other workflows. Capable of taking input parameters.

* ``push`` and ``pull_request``: Triggers on push and pull request events. Allows fine-grained filtering on the branch
  name and/or the files changed.

* ``schedule``: Triggers workflow at scheduled time.

GitHub Actions has a "control plane" that watches for qualifying events in the repo and triggers the corresponding
workflows. For every job in the triggered workflow, the control plane finds a "runner" to execute it in. The control
plane is free to use. Users are charged by minutes on GitHub hosted runners only. In addition, actions on public
repos are completely free. Private repos have a generous free tier --- 2000 minutes a month.
