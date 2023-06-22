Steps
======

The core of a job is "steps" --- a sequence of shell commands to run. A step can only be one of the two kinds,
as we saw in the :doc:`example earlier <workflow>`:

* ``run``

  Just run one or more plain shell commands.

* ``uses``

  Use an existing custom action. This is similar to calling a shell function. A custom action can be made to take user
  inputs.

.. note:: A ``run`` step should not contain complex logic written in shell, because GitHub Actions is supposed to be
   declarations rather than code. Complex logic should be encapsulated in a custom action, which is rather easy
   to write. We will cover custom actions in later sections.

Naturally, one of these conveniences should be the ability for earlier steps to dynamically set variables that can be
used by later steps. GitHub Actions implements this by two mechanisms --- environment variables and contexts.

Environment variables
----------------------

Environment variables in GitHub Actions are similar to those of Unix shells. 

.. warning:: However, the :command:`export` command doesn't work --- we cannot :command:`export` an environment variable
   in an earlier step and use it in later ones, because GitHub Actions steps do not have a common parent process.

There are two ways of *setting* environment variables.

* In a ``run`` step:

  .. code-block:: yaml

     steps:
       - run: echo "KEY=VALUE" >> $GITHUB_ENV

  As can be inferred from the syntax, :envvar:`GITHUB_ENV` is a pre-defined environment variable on the runner VM and
  points to a file managed by GitHub Actions. The ``run`` step above simply writes a new line ``KEY=VALUE`` into that
  file. Before every subsequent step runs, GitHub Actions parses the contents of the file and uses them to set the
  environment variables for later steps.

  .. note::

     Because ``KEY=VALUE`` is expected to be written to a single line in a file, ``VALUE`` should not contain new line
     characters.

  Note that ``VALUE`` can be any embedded shell command that outputs a single-line string. This gives us a lot of
  flexibility in setting environment variables this way. For example:

  .. code-block:: yaml

     steps:
       - run: echo "SECRET_JSON=$(aws secretsmanager get-secret-value --secret-id SID | sed -z 's/\n//g')" >> $GITHUB_ENV

  Since GitHub Actions is declarations rather than code, it doesn't offer many string manipulation functionalities.
  Usually, simpler string manipulations are done by piping a string into :command:`sed`, as the example above does.

  Once set, environment variable *values* are logged in later steps. If they contain secrets, we should mask them
  by the ``::add-mask::`` `workflow command`_ *before* setting their values. Afterwards, whenever GitHub Actions
  encounter the same substrings in log messages, it replaces them with ``***``.

  .. code-block:: yaml

     steps:
       - run: >
           echo "::add-mask::$(aws secretsmanager get-secret-value --secret-id SID | sed -z 's/\n//g')" &&
           echo "SECRET_JSON=$(aws secretsmanager get-secret-value --secret-id SID | sed -z 's/\n//g')" >> $GITHUB_ENV

  .. _workflow command: https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions

  .. tip:: The step above calls the same AWS API twice. This is a good candidate to refactor into a custom action.
