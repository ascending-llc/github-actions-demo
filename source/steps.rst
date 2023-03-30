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
